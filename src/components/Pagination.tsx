import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 pt-4">
      <Button
        variant="outline"
        size="sm"
        label="Previous"
        icon={<ChevronLeft size={14} />}
        iconPosition="left"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      />

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="px-2 text-gray-400 text-sm select-none">...</span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "primary" : "outline"}
            size="sm"
            label={String(p)}
            className="w-8 h-8 p-0!"
            onClick={() => onChange(p as number)}
          />
        )
      )}

      <Button
        variant="outline"
        size="sm"
        label="Next"
        icon={<ChevronRight size={14} />}
        iconPosition="right"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      />
    </div>
  );
}
