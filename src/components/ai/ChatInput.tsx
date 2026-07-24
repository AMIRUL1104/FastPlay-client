"use client";

import { useState, type KeyboardEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { useSession } from "@/src/lib/auth-client";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const {
    data: session, // Session data (null if not authenticated)
  } = useSession()

  if (session) {
    console.log("session", session);
    return (
      <div className="px-3 py-3 border-t border-[#E8E8EE] bg-white">
        <div className="flex items-end gap-2 bg-(--cream) rounded-xl px-3 py-2 border border-[#E0DAD6] focus-within:border-(--copper) transition-colors duration-150">
          <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask me anything about sports gear..."
            aria-label="Chat message input"
            className="flex-1 resize-none bg-transparent text-sm text-(--slate) placeholder:text-(--slate-muted) outline-none leading-5 max-h-24 disabled:opacity-50"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-(--navy) text-white hover:bg-(--navy-deep) disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          >
            <SendHorizonal size={15} />
          </button>
        </div>
        <p
          className="text-[10px] text-(--slate-muted) text-center mt-1.5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    );
  } else {
    return (
      <div className="px-3 py-3 border-t border-[#E8E8EE] bg-white">
        <p className="text-center text-xs text-(--slate-muted) mt-1.5">
          Please login to use the AI assistant
        </p>
      </div>
    )
  }

}
