// hooks/useAIChat.ts

"use client";

import { useState, useCallback, useRef } from "react";
import { SuggestedQuestion, UIMessage } from "../types/ai.type";
import { getConversation } from "../services/server/api";
import { sendMessage } from "../services/server/action";

const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { id: "1", text: "Show football under 5000" },
  { id: "2", text: "Recommend Adidas football" },
  { id: "3", text: "Best cricket bat" },
  { id: "4", text: "Gym equipment under 3000" },
];

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function useAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);

  const historyLoadedRef = useRef(false);

  const openChat = useCallback(async () => {
    setIsOpen(true);

    // Only load history once
    if (historyLoadedRef.current) return;
    historyLoadedRef.current = true;

    try {
      const history = await getConversation();
      if (!history || history.length === 0) return;
      console.log("history", history);

      const uiMessages: UIMessage[] = history.map((msg) => ({
        id: generateId(),
        role: msg.role,
        content: msg.content,
        createdAt: msg.createdAt,
      }));

      setMessages(uiMessages);

      // If there's history, suggested questions should be hidden
      setHasUserSentMessage(true);
    } catch {
      // Silently fail — empty conversation is fine
    }
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      setHasUserSentMessage(true);

      // Optimistic user message
      const userMessage: UIMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await sendMessage({ message: trimmed });
        console.log("response", response);
        if (!response) {
          throw new Error("No response from server.");
        }
        const assistantMessage: UIMessage = {
          id: generateId(),
          role: "assistant",
          content: response.answer,
          createdAt: new Date().toISOString(),
          products:
            response.products && response.products.length > 0
              ? response.products
              : undefined,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  return {
    isOpen,
    messages,
    isLoading,
    error,
    hasUserSentMessage,
    suggestedQuestions: SUGGESTED_QUESTIONS,
    openChat,
    closeChat,
    send,
  };
}
