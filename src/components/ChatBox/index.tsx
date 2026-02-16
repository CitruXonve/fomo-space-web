import { useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Popup } from "@/components/Popup";
import Button from "@/components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import ReactMarkdown from "react-markdown";
import { cn } from "@/utils/classname";

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

export const ChatBox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("Test");
  const [answer, setAnswer] = useState("");
  const [streamingAnswer, setStreamingAnswer] = useState("");
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
        setStreamingAnswer((prev) => prev + chunk);
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
        setAnswer(answer);
      },
    });
  };
  const handleStreamSend = (prompt: string) => {
    // Clear previous streaming answer
    setStreamingAnswer("");
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

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "dark:bg-gray-900/50 bg-white py-4 rounded-lg border-1 border-solid border-gray-200 dark:border-gray-700 shadow-sm w-full max-w-2xl overflow-x-auto backdrop-blur-md",
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
        <h3 className="font-semibold dark:text-white">
          What's the challenge today?
        </h3>
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
      {(answer || streamingAnswer) && (
        <div className="mt-4 w-full px-4">
          <h3 className="font-semibold my-2">Reply</h3>
          <div className="w-full bg-gray-100 text-sm text-gray-600 word-wrap break-words border-1 border-gray-300 rounded-md p-2">
            <div className="text-left">
              <ReactMarkdown>{streamingAnswer || answer}</ReactMarkdown>
            </div>
            {(isAnswerPosting || isStreamPosting) && (
              <>
                <br />
                <span className="inline-block mt-1 animate-pulse">
                  <Spinner size="md" />
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
