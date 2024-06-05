import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook } from "../api/books.api";
import { useNavigate } from "react-router-dom";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookId) return;
    fetchBook(bookId).then(
      (book) => setBook(book),
      (err) => {
        navigate("/");
      }
    );
  }, [bookId]);
  return book;
};
