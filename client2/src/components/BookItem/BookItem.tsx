import { FaHeart } from "react-icons/fa";
import { Book } from "../../models/book.model";
import { formatNumber } from "../../utils/format";
import { getImgSrc } from "../../utils/image";
import styled from "./bookItem.module.css";

type Props = {
  book: Book;
};
const BookItem = ({ book }: Props) => {
  return (
    <div className={styled.container}>
      <div className={styled.img}>
        <img src={getImgSrc(book.id)} alt={book.title} />
      </div>
      <div className={styled.content}>
        <h2 className={styled.title}>{book.title}</h2>
        <p className={styled.summary}>{book.summary}</p>
        <p className={styled.author}>{book.author}</p>
        <p className={styled.price}>{formatNumber(book.price)}원</p>
        <div className={styled.likes}>
          <FaHeart />
          <span>{book.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
