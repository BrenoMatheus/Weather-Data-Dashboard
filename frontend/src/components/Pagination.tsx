interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">

      {/* Botão anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-40"
      >
        Prev
      </button>

      {/* Página atual */}
      <span className="text-lg font-semibold text-slate-700">
        {currentPage} / {totalPages}
      </span>

      {/* Próxima */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
