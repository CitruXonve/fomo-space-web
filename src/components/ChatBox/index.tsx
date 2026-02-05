import { useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";
import { Popup } from "@/components/Popup";
import Button from "@/components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import ReactMarkdown from "react-markdown";

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

export function usePostChat() {
  return useMutation({
    mutationFn: (message: string) => {
      return chatApi.postChat(message);
    },
    onSuccess: () => {},
    onError: (error) => {
      console.log("onError", error);
    },
  });
}

export const useChatStreamMutation = (
  onChunk: (chunk: string) => void,
  onComplete?: () => void,
) => {
  return useMutation({
    mutationFn: async (message: string) => {
      await chatApi.postChatStream(message, onChunk, onComplete, (error) => {
        throw error;
      });
    },
    onError: (error) => {
      console.error("Stream error:", error);
    },
  });
};

export const ChatBox = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, _] = useState("Test LLM API");
  const [popupMessage, setPopupMessage] = useState("Test");
  const [answer, setAnswer] = useState("");
  const [streamingAnswer, setStreamingAnswer] = useState("");
  const { mutate, isPending: isAnswerPosting } = usePostChat();

  const { mutate: streamMutate, isPending: isStreamPosting } =
    useChatStreamMutation(
      (chunk) => {
        // This is called for each chunk as it arrives
        setStreamingAnswer((prev) => prev + chunk);
      },
      () => {
        // This is called when streaming is complete
      },
    );

  const testQuery = useTestQuery(false);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const handleTest = () => {
    testQuery
      .refetch()
      .then(({ data }) => {
        const message = (data as { message: string })?.message ?? "";
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

  return (
    <div className="flex flex-col items-center justify-center dark:bg-white/5 bg-white py-3 rounded-lg border-1 border-solid border-gray-200 dark:border-gray-700 shadow-sm w-full max-w-2xl">
      <form
        className="flex flex-col gap-3 items-center justify-center w-full px-4"
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
          className="w-full mx-6 px-4 word-wrap break-words border-1 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-950/50 dark:text-white rounded-md p-2 overflow-y-auto"
          ref={promptRef}
        />
        <span className="flex flex-row justify-between gap-2">
          <Button
            onClick={handleTest}
            size="sm"
            className="font-semibold bg-gray-500 data-hover:bg-gray-600 data-open:bg-gray-700 disabled:bg-gray-700"
            disabled={testQuery.isLoading}
          >
            {testQuery.isLoading ? <Spinner size="sm" /> : "Test"}
          </Button>
          <Popup
            isOpen={isPopupOpen}
            title={popupTitle}
            message={popupMessage}
            onClose={() => setIsPopupOpen(false)}
          />
          <Button
            type="submit"
            size="sm"
            className="font-semibold"
            disabled={isAnswerPosting}
            onClick={() => {
              if (!promptRef.current?.value) return;
              handleSend(promptRef.current.value);
            }}
          >
            {isAnswerPosting ? <Spinner size="sm" /> : "Send"}
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="font-semibold bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 data-hover:bg-green-600 data-open:bg-green-700 disabled:bg-green-700"
            disabled={isStreamPosting}
            onClick={() => {
              if (!promptRef.current?.value) return;
              handleStreamSend(promptRef.current.value);
            }}
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
