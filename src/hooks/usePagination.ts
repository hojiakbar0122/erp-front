// hooks/usePagination.ts
import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pagination = {
    current: currentPage,
    pageSize,
    onChange: (page: number, size: number) => {
      setCurrentPage(page);
      setPageSize(size);
    },
  };

  return { pagination, currentPage, pageSize };
};
