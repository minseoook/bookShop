import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constant/querystring";
import { LIMIT } from "../constant/pagination";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const location = useLocation();
  const [isEmpty, setisEmpty] = useState(false);
  const [books, setbooks] = useState<Book[]>([]);
  const [pagination, setpagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 1,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    fetchBooks({
      category_id: params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      news: params.get(QUERYSTRING.NEWS) ? true : undefined,
      currentPage: params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1,
      limit: LIMIT,
    }).then((res) => {
      setbooks(res.books);
      setpagination(res.pagination);
      setisEmpty(res.books.length === 0);
    });
  }, [location.search]); //서치파람스 바뀔대마다

  return { books, pagination, isEmpty };
};

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const useBooks2 = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } =
    useQuery<FetchBooksResponse>({
      queryKey: ["books", location.search],
      queryFn: () =>
        fetchBooks({
          category_id: params.get(QUERYSTRING.CATEGORY_ID)
            ? Number(params.get(QUERYSTRING.CATEGORY_ID))
            : undefined,
          news: params.get(QUERYSTRING.NEWS) ? true : undefined,
          currentPage: params.get(QUERYSTRING.PAGE)
            ? Number(params.get(QUERYSTRING.PAGE))
            : 1,
          limit: LIMIT,
        }),
    });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books?.length === 0,
    isBooksLoading,
  };
};
