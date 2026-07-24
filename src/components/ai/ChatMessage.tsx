import ReactMarkdown from "react-markdown";
import type { UIMessage } from "@/src/types/ai.type";
import { ProductRecommendations } from "./ProductRecommendations";

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[78%] px-3.5 py-2 rounded-2xl rounded-tr-sm bg-(--navy) text-white text-xs leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      {/* AI Avatar */}
      <div className="shrink-0 w-7 h-7 rounded-full bg-(--navy) flex items-center justify-center mt-0.5">
        <span
          className="text-white text-[10px] font-bold"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          AI
        </span>
      </div>

      <div className="flex-1 min-w-0">
        {/* Answer bubble */}
        <div
          className="inline-block max-w-full px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white border border-[#E8E8EE] shadow-sm text-(--slate)"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <div className="markdown-body text-xs leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mb-1.5 last:mb-0 text-xs leading-relaxed">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-(--navy)">{children}</strong>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside pl-4 space-y-1 my-1.5">{children}</ol>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside pl-4 space-y-1 my-1.5">{children}</ul>
                ),
                li: ({ children }) => (
                  <li className="text-xs leading-relaxed">{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 className="text-sm font-bold text-(--navy) mb-1">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xs font-bold text-(--navy) mb-1">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xs font-semibold text-(--navy) mb-0.5">{children}</h3>
                ),
                code: ({ children }) => (
                  <code className="bg-(--cream) text-(--terracotta) text-[11px] px-1 py-0.5 rounded font-mono">
                    {children}
                  </code>
                ),
                hr: () => <hr className="border-[#E8E8EE] my-2" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Products — owned by this message */}
        {message.products && message.products.length > 0 && (
          <ProductRecommendations products={message.products} />
        )}
      </div>
    </div>
  );
}