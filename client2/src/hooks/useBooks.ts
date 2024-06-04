import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";

export const useBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalCount: 0,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchBooks({
      category_id: params.get("category_id")
        ? Number(params.get("category_id"))
        : undefined,
      news: params.get("news") ? true : undefined,
      currentPage: params.get("page") ? Number(params.get("page")) : 1,
      //limit: 8,
      q: params.get("q") ? params.get("q")?.toString() : undefined,
    }).then((res) => {
      setBooks(res.books);
      setPagination(res.pagination);
    });
  }, [location.search]);
  return { books, pagination };
};
