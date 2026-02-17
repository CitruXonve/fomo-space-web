import { useEffect, useRef, useState } from "react";
import { Dots, Spinner } from "@/components/Spinner";
import { Popup } from "@/components/Popup";
import Button from "@/components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import ReactMarkdown from "react-markdown";
import { cn } from "@/utils/classname";
import { Transition } from "@headlessui/react";

interface ApiResponse<T> {
  messages: Array<T>;
  session_id: string;
  status: string;
}

type ChatResponse = ApiResponse<{ id: string; type: string; content: string }>;

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config); // GET /api/*
  return response.data;
}

export async function post<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

// SSE streaming function
async function postChatStreamSSE(
  message: string,
  onChunk: (chunk: string) => void,
  onComplete?: () => void,
  onError?: (error: Error) => void,
): Promise<void> {
  try {
    const response = await fetch("/api/chat-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("ReadableStream not supported");
    }

    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          onComplete?.();
          break;
        }

        // Decode the chunk
        buffer += decoder.decode(value, { stream: true });

        // Process decoded SSE messages
        const data = decoder.decode(value, { stream: true });
        try {
          // Try to parse as JSON if needed, or use raw text
          const parsed = JSON.parse(data);
          onChunk(parsed.content || parsed.text || data);
        } catch {
          // If not JSON, use raw data
          onChunk(data);
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    onError?.(error as Error);
    throw error;
  }
}

const chatApi = {
  testChat: () => get("/health"),
  postChat: (message: string) => post("/chat", { message }),
  postChatStream: postChatStreamSSE,
};

const useTestQuery = (enabled: boolean = true) =>
  useQuery({
    queryKey: ["test"],
    queryFn: chatApi.testChat,
    enabled,
  });

export function usePostChat(onError?: (error: Error) => void) {
  return useMutation({
    mutationFn: (message: string) => {
      return chatApi.postChat(message);
    },
    onSuccess: () => {},
    onError,
  });
}

export const useChatStreamMutation = (
  onChunk: (chunk: string) => void,
  onComplete?: () => void,
  onError?: (error: Error) => void,
) => {
  return useMutation({
    mutationFn: async (message: string) => {
      await chatApi.postChatStream(message, onChunk, onComplete, (error) => {
        throw error;
      });
    },
    onError,
  });
};

const ChatField = ({
  children,
  className,
  style,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center relative",
      "dark:bg-gray-900/50 bg-white py-4 rounded-lg border-1 border-solid border-gray-200 dark:border-gray-700 shadow-sm w-full overflow-x-auto backdrop-blur-md",
      className,
    )}
    style={style}
    {...props}
  >
    {children}
  </div>
);

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

// handle scrolling to the bottom of the page with debounce to avoid flickering
const useHandleScroll = () => {
  const DEBOUNCE_MS = 200;
  const AT_BOTTOM_THRESHOLD = 40;
  const FLOATING_THRESHOLD = 160;
  const SCROLL_COOLDOWN_MS = 500; // ignore "switch to floating" briefly after smooth scroll

  const [isAtBottom, setIsAtBottom] = useState(true);
  const isAtBottomRef = useRef(true);
  const lastSwitchedToInFlowAt = useRef(0);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkAtBottom = (isInitial = false) => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      const distanceFromBottom = scrollHeight - scrollY - innerHeight;

      if (isInitial) {
        const atBottom = distanceFromBottom <= AT_BOTTOM_THRESHOLD;
        isAtBottomRef.current = atBottom;
        setIsAtBottom(atBottom);
        return;
      }

      if (isAtBottomRef.current) {
        const withinCooldown =
          Date.now() - lastSwitchedToInFlowAt.current < SCROLL_COOLDOWN_MS;
        if (!withinCooldown && distanceFromBottom > FLOATING_THRESHOLD) {
          isAtBottomRef.current = false;
          setIsAtBottom(false);
        }
      } else {
        if (distanceFromBottom <= AT_BOTTOM_THRESHOLD) {
          isAtBottomRef.current = true;
          setIsAtBottom(true);
          lastSwitchedToInFlowAt.current = Date.now();
          scrollToBottom();
        }
      }
    };
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => checkAtBottom(false), DEBOUNCE_MS);
    };
    checkAtBottom(true); // initial sync without hysteresis
    window.addEventListener("scroll", debouncedCheck, { passive: true });
    window.addEventListener("resize", debouncedCheck);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", debouncedCheck);
      window.removeEventListener("resize", debouncedCheck);
    };
  }, []);
  return isAtBottom;
};

export const ChatBox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("Test");
  const [answer, setAnswer] = useState<string[]>([]);
  const [streamingAnswer, setStreamingAnswer] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const { mutate, isPending: isAnswerPosting } = usePostChat((error) => {
    console.error("Answer error:", error);
    setPopupTitle("Answer API Error");
    setPopupMessage(error.message ?? "Unknown error");
    setIsPopupOpen(true);
  });

  const { mutate: streamMutate, isPending: isStreamPosting } =
    useChatStreamMutation(
      (chunk) => {
        // This is called for each chunk as it arrives
        setStreamingAnswer((prev) => {
          // prev + chunk
          const newAnswer = prev.length > 0 ? [...prev] : [""];
          newAnswer[newAnswer.length - 1] += chunk;
          return newAnswer;
        });
      },
      () => {
        // This is called when streaming is complete
      },
      (error) => {
        console.error("Stream error:", error);
        setPopupTitle("Stream API Error");
        setPopupMessage(error.message ?? "Unknown error");
        setIsPopupOpen(true);
      },
    );

  const testQuery = useTestQuery(false);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const MAX_TEXTAREA_HEIGHT = 120; // ~max-h-30 (7.5rem), roughly 5 lines of text

  const isAtBottom = useHandleScroll();

  const resizeTextarea = () => {
    const textarea = promptRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight +
        5 /* expand slightly to avoid unnecessary scrolling */,
      MAX_TEXTAREA_HEIGHT,
    )}px`;
  };

  const handleTest = () => {
    testQuery
      .refetch()
      .then(({ data }) => {
        const message = (data as { message: string })?.message ?? "No response";
        setPopupTitle("Test LLM API");
        setPopupMessage(message);
        setIsPopupOpen(true);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  const handleSend = (prompt: string) => {
    setQuestions((prev) => [...prev, prompt]);
    mutate(prompt, {
      onSuccess: (data) => {
        const response = data as ChatResponse;
        if (response.status !== "success") {
          throw new Error(
            "Failed to get reply" + JSON.stringify(response.messages),
          );
        }
        const answer =
          response.messages[response.messages.length - 1].content ?? "";
        if (answer === "") {
          throw new Error("Empty answer");
        }
        setAnswer((prev) => [...prev, answer]);
      },
    });
  };
  const handleStreamSend = (prompt: string) => {
    // Clear previous streaming answer
    // setStreamingAnswer("");
    setQuestions((prev) => [...prev, prompt]);
    setStreamingAnswer((prev) => [...prev, ""]);
    streamMutate(prompt);
  };

  const handleValidation = (
    value: string | undefined,
    onSubmit: (value: string) => void,
  ) => {
    if (!value) {
      setPopupTitle("Don't leave it blank");
      setPopupMessage("Please fill out this field and try again.");
      setIsPopupOpen(true);
      return;
    }
    onSubmit(value);
  };

  const SendBox = ({
    className,
    title,
  }: {
    className?: string;
    title?: string;
  }) => (
    <ChatField
      className={cn(
        "max-w-2xl mx-auto",
        "flex relative justify-end w-full mx-auto",
        className,
      )}
    >
      <Popup
        isOpen={isPopupOpen}
        title={popupTitle}
        message={popupMessage}
        onClose={() => setIsPopupOpen(false)}
        className="dark:bg-white/80"
      />
      <form
        className="flex flex-col gap-3 items-center justify-center w-full px-4"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {title && <h3 className="font-semibold dark:text-white">{title}</h3>}
        <textarea
          required
          placeholder="Prompt or describe the problem..."
          className={cn(
            "w-full min-h-18 max-h-30 mx-6 px-4 word-wrap break-words",
            "border-1 border-gray-300 dark:border-gray-900",
            "bg-gray-100 dark:bg-gray-950/75 dark:text-white",
            "rounded-sm p-2 overflow-y-auto resize-none backdrop-blur-lg",
          )}
          ref={promptRef}
          onInput={resizeTextarea}
          style={{
            boxShadow: "none",
          }}
        />
        <span className="flex max-[300px]:flex-col justify-between gap-2">
          <Button
            onClick={handleTest}
            size="sm"
            className="font-semibold bg-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:border-1 data-hover:bg-gray-600 data-open:bg-gray-700 disabled:bg-gray-700"
            disabled={testQuery.isLoading}
          >
            {testQuery.isLoading ? <Spinner size="sm" /> : "Test"}
          </Button>
          <Button
            type="submit"
            size="sm"
            className="font-semibold dark:border-blue-600 dark:border-1 dark:bg-gray-900/75"
            disabled={isAnswerPosting}
            onClick={() =>
              handleValidation(promptRef.current?.value?.trim(), handleSend)
            }
          >
            {isAnswerPosting ? <Spinner size="sm" /> : "Send"}
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="font-semibold bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 data-hover:bg-green-600 data-open:bg-green-700 disabled:bg-green-700 dark:bg-gray-900/75 dark:border-green-600 dark:border-1"
            disabled={isStreamPosting}
            onClick={() =>
              handleValidation(
                promptRef.current?.value?.trim(),
                handleStreamSend,
              )
            }
          >
            {isStreamPosting ? <Spinner size="sm" /> : "Stream"}
          </Button>
        </span>
      </form>
    </ChatField>
  );

  const renderBox = (
    answer: string,
    position: "left" | "right",
    index: number,
    isLoading: boolean = false,
  ) => (
    <ChatField
      key={index}
      className={cn(
        position === "right" ? "left-[20%] right-0" : "right-[20%] left-0",
        "shadow-md shadow-cyan-400/50 dark:shadow-cyan-600/50",
      )}
      style={{
        minWidth: "120px",
        width: "fit-content",
        maxWidth: "80%", // override parent's width
      }}
    >
      <div
        className={cn(
          "w-full px-4 justify-start",
          "text-left dark:text-white word-wrap break-words rounded-md",
        )}
      >
        <p
          className={cn(
            "w-full word-wrap break-words",
            "rounded-sm p-2 overflow-y-auto resize-none backdrop-blur-lg",
          )}
        >
          <ReactMarkdown>{answer}</ReactMarkdown>
          {isLoading && <Dots />}
        </p>
      </div>
    </ChatField>
  );

  const mixBox = (questions: any[], answers: any[]) => {
    const mixed: any[] = [];
    answers.forEach((answer, index) => {
      mixed.push(questions[index], answer);
    });
    mixed.concat(questions.slice(answers.length));
    return mixed;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {questions.length + answer.length > 0 &&
        mixBox(
          questions.map((question, index) =>
            renderBox(question, "left", index),
          ),
          answer.map((answer, index) =>
            renderBox(
              answer,
              "right",
              index,
              index === answer.length - 1 && isAnswerPosting,
            ),
          ),
        )}
      {questions.length + streamingAnswer.length > 0 &&
        mixBox(
          questions.map((question, index) =>
            renderBox(question, "left", index),
          ),
          streamingAnswer.map((answer, index) =>
            renderBox(
              answer,
              "right",
              index,
              index === streamingAnswer.length - 1 && isStreamPosting,
            ),
          ),
        )}
      <div className={cn("relative w-full", isAtBottom ? "pb-6" : "pb-48")}>
        {/* add some buffer space so as to scroll to the bottom and display the send box */}
        <Transition
          show={isAtBottom}
          enter="transition-transform duration-300 ease-in-out"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition-transform duration-300 ease-in-out"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-full opacity-0"
        >
          <div className="shadow-lg">
            <SendBox
              className="shadow-cyan-400/30 dark:shadow-cyan-600/30"
              title={
                questions.length === 0
                  ? "What's the challenge today?"
                  : undefined
              }
            />
          </div>
        </Transition>
        <Transition
          show={!isAtBottom}
          enter="transition-transform duration-300 ease-in-out"
          enterFrom="translate-y-full opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition-transform duration-300 ease-in-out"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-full opacity-0"
        >
          <div
            className="fixed bottom-0 left-0 right-0 z-20 flex justify-center px-4 pb-4"
            style={{
              background:
                "linear-gradient(to bottom, rgba(24,24,27,0) 0%, rgba(24,24,27,0.6) 10%)",
            }}
          >
            <div className="w-full max-w-2xl mb-4 flex flex-col items-center shadow-lg shadow-blue-400/30 dark:shadow-blue-600/30">
              <button
                type="button"
                className={cn(
                  "self-center py-1 px-3",
                  "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700",
                  "text-gray-700 font-semibold text-xs text-gray-700 dark:text-gray-300",
                  "rounded-tl-md rounded-tr-md shadow",
                  "border-l-2 border-r-2 border-t-2 border-b-0 border-gray-300 dark:border-cyan-500/50",
                )}
                onClick={scrollToBottom}
                aria-label="Scroll to Bottom"
              >
                ↓ Scroll to Bottom ↓
              </button>
              <SendBox
                title={
                  questions.length === 0
                    ? "What's the challenge today?"
                    : undefined
                }
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
