import BookFilter from "../../components/BookFilter/BookFilter";
import BookList from "../../components/BookLists/BookList";
import styled from "./books.module.css";
import { useBooks } from "../../hooks/useBooks";
import BookEmpty from "../../components/BookEmpty/BookEmpty";
import Pagination from "../../components/Pagination/Pagination";

const Books = () => {
  const { books, pagination } = useBooks();
  return (
    <div className={styled.container}>
      <BookFilter />
      {books.length > 0 ? <BookList books={books} /> : <BookEmpty />}
      {books.length > 0 && <Pagination pagination={pagination} />}
    </div>
  );
};

export default Books;
