export function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-(--navy) flex items-center justify-center">
        <span className="text-white text-xs font-bold" style={{ fontFamily: "Sora, sans-serif" }}>
          AI
        </span>
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-[#E8E8EE] shadow-sm">
        <span className="text-xs text-(--slate-muted) mr-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
          AI is typing
        </span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-(--copper) inline-block"
            style={{
              animation: "typingBounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
