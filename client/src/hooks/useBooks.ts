import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constant/querystring";
import { LIMIT } from "../constant/pagination";

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
