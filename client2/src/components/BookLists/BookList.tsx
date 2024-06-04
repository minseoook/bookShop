import { Book } from "../../models/book.model";
import BookItem from "../BookItem/BookItem";
import styled from "./booklist.module.css";

type Props = {
  books: Book[];
};
const BookList = ({ books }: Props) => {
  return (
    <div className={styled.container}>
      {books.map((book) => (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
};

export default BookList;
