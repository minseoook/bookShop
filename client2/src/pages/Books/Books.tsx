import BookFilter from "../../components/BookFilter/BookFilter";
import BookList from "../../components/BookLists/BookList";
import styled from "./books.module.css";

const Books = () => {
  return (
    <div className={styled.container}>
      <BookFilter />
      <BookList />
    </div>
  );
};

export default Books;
