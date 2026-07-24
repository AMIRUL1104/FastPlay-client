"use client";

import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { SuggestedQuestion, UIMessage } from "@/src/types/ai.type";

interface AIChatWindowProps {
  isOpen: boolean;
  messages: UIMessage[];
  isLoading: boolean;
  error: string | null;
  hasUserSentMessage: boolean;
  suggestedQuestions: SuggestedQuestion[];
  onClose: () => void;
  onSend: (message: string) => void;
}

export function AIChatWindow({
  isOpen,
  messages,
  isLoading,
  error,
  hasUserSentMessage,
  suggestedQuestions,
  onClose,
  onSend,
}: AIChatWindowProps) {
  return (
    <div
      role="dialog"
      aria-label="AI Shopping Assistant"
      aria-hidden={!isOpen}
      className={`
        fixed bottom-24 right-4 z-50
        w-[calc(100vw-2rem)] max-w-sm
        sm:right-6 sm:bottom-28
        bg-white rounded-2xl shadow-2xl border border-[#E8E8EE]
        flex flex-col
        transition-all duration-300 ease-out
        ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
      style={{ height: "min(520px, calc(100dvh - 140px))" }}
    >
      <ChatHeader onClose={onClose} />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        error={error}
        hasUserSentMessage={hasUserSentMessage}
        suggestedQuestions={suggestedQuestions}
        onSuggestedSelect={onSend}
      />

      <ChatInput onSend={onSend} isLoading={isLoading} />
    </div>
  );
}
