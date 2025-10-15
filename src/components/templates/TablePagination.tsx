import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface TemplatePaginationProps {
  page: number;
  totalPages: number;
  total_records?: number;
  onPageChange: (newPage: number) => void;
}

export function TemplatePagination({
  page,
  totalPages,
  total_records,
  onPageChange,
}: TemplatePaginationProps) {
  return (
    <div className="flex gap-2 bg-white p-2 w-1/2 items-center justify-between border-b">
      <span className="mr-auto">
        Total: <span className="font-medium text-gray-900">{total_records}</span> items
      </span>
      <div className="flex gap-2">
      <Button
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className="border-none bg-transparent hover:bg-transparent p-0"
      >
        <ChevronLeft className="text-black" />
      </Button>

      <span className="flex items-center px-2">
        Page {page} of {totalPages}
      </span>

      <Button
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        className="border-none bg-transparent hover:bg-transparent p-0"
      >
        <ChevronRight className="text-black" />
      </Button>
      </div>
    </div>
  );
}
