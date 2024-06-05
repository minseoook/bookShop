import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/cart.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const navigate = useNavigate();
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const [addedCart, setaddedCart] = useState(false);

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
    if (!isloggedIn) {
      showAlert("로그인이 필요합니다");
      return;
    }
    if (!book) return;

    if (book.liked) {
      unlikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1, //낙관적 업데이트 ,리페치를 굳이 안해도 되서
        });
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1, //낙관적 업데이트 ,리페치를 굳이 안해도 되서
        });
      });
    }
  };
  const addTocart = (quantity: number) => {
    if (!book) return;
    addCart({ quantity: quantity, book_id: book.id }).then(() => {
      setaddedCart(true);
      setTimeout(() => {
        setaddedCart(false);
      }, 3000);
      // showAlert("장바구니 추가 완료되었습니다");
    });
  };
  return { book, likeToggle, addTocart, addedCart };
};
