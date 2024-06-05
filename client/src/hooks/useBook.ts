import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook } from "../api/books.api";
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

  const likeToggle = () => {
    if (!book) return;

    if (book.liked) {
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1, //낙관적 업데이트
        });
      });
    }
  };
  return { book, likeToggle };
};
