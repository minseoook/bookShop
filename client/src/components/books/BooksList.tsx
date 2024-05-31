import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { ViewMode } from "./BooksViewSwitcher";
import { QUERYSTRING } from "../../constant/querystring";

interface Props {
  books: Book[];
}
const BooksList = ({ books }: Props) => {
  const [view, setView] = useState<ViewMode>("grid");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);
  return (
    <BooksListStyle view={view}>
      {books.map((book) => (
        <BookItem book={book} key={book.id} view={view} />
      ))}
    </BooksListStyle>
  );
};

interface BooksStytleProps {
  view: ViewMode;
}

const BooksListStyle = styled.div<BooksStytleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;
export default BooksList;
