"use client";


import { useAIChat } from "@/src/hooks/useAIChat";
import { AIChatWindow } from "./AIChatWindow";
import { MessageCircle, X } from "lucide-react";

export function AIChatButton() {
  const {
    isOpen,
    messages,
    isLoading,
    error,
    hasUserSentMessage,
    suggestedQuestions,
    openChat,
    closeChat,
    send,
  } = useAIChat();

  const handleToggle = () => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AIChatWindow
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        error={error}
        hasUserSentMessage={hasUserSentMessage}
        suggestedQuestions={suggestedQuestions}
        onClose={closeChat}
        onSend={send}
      />

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className={`
          fixed bottom-20 right-4 z-50
          sm:right-6 sm:bottom-6
          w-14 h-14 rounded-full
          bg-(--navy) text-white
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          cursor-pointer border-2 border-white
          ${isOpen ? "rotate-0" : "rotate-0"}
        `}
      >
        <span
          className={`absolute transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
            }`}
        >
          <X size={22} />
        </span>
        <span
          className={`absolute transition-all duration-300 ${isOpen ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
        >
          <MessageCircle size={22} />
        </span>

        {/* Pulse ring — shown when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-(--navy) animate-ping opacity-20" />
        )}
      </button>
    </>
  );
}
