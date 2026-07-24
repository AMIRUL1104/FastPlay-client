import { SuggestedQuestion } from "@/src/types/ai.type";

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onSelect: (text: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 pb-3">
      <p
        className="text-[11px] text-(--slate-muted) mb-2"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Try asking —
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelect(q.text)}
            className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-(--copper) text-(--copper) hover:bg-(--copper) hover:text-white transition-all duration-150 cursor-pointer"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {q.text}
          </button>
        ))}
      </div>
    </div>
  );
}
