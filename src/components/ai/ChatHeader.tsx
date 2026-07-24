import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 bg-(--navy) rounded-t-2xl">
      <div className="flex items-center gap-3">
        {/* Status dot */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span
              className="text-white text-xs font-bold"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              AI
            </span>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-(--navy)" />
        </div>

        <div>
          <p
            className="text-sm font-semibold text-white leading-tight"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            FastPlay Assistant
          </p>
          <p
            className="text-[11px] text-white/60"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Powered by Gemini AI
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Close chat"
        className="w-8 h-8 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150 cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
