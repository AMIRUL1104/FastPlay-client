"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { SuggestedQuestion, UIMessage } from "@/src/types/ai.type";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
  error: string | null;
  hasUserSentMessage: boolean;
  suggestedQuestions: SuggestedQuestion[];
  onSuggestedSelect: (text: string) => void;
}

export function ChatMessages({
  messages,
  isLoading,
  error,
  hasUserSentMessage,
  suggestedQuestions,
  onSuggestedSelect,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
      {/* Empty state */}
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-8">
          <div
            className="w-12 h-12 rounded-full bg-(--navy) flex items-center justify-center"
          >
            <span
              className="text-white text-base font-bold"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              AI
            </span>
          </div>
          <div className="text-center">
            <p
              className="text-sm font-semibold text-(--navy)"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              FastPlay Assistant
            </p>
            <p
              className="text-xs text-(--slate-muted) mt-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ask me anything about sports gear & equipment
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {/* Typing indicator */}
      {isLoading && <TypingIndicator />}

      {/* Error */}
      {error && (
        <div
          className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 text-center"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {error}
        </div>
      )}

      <div ref={bottomRef} />

      {/* Suggested questions — shown before first message */}
      {!hasUserSentMessage && (
        <SuggestedQuestions
          questions={suggestedQuestions}
          onSelect={onSuggestedSelect}
        />
      )}
    </div>
  );
}
