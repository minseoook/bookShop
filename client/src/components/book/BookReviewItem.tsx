import { BookReviewItem as IBookReviewItem } from "@/models/book.model";
import { formatDate } from "@/utils/format";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

interface Props {
  review: IBookReviewItem;
}

const Star = ({ score }: Pick<IBookReviewItem, "score">) => {
  return (
    <span className="star">
      {Array.from({ length: score }, (_, index) => (
        <FaStar />
      ))}
    </span>
  );
};

export default function BookReviewItem({ review }: Props) {
  return (
    <BookReviewItemStyle>
      <header className="header">
        <div>
          <span>{review.userName}</span>
          <Star score={review.score} />
        </div>
        <div>{formatDate(review.createdAt)}</div>
      </header>

      <div className="content">{review.content}</div>
    </BookReviewItemStyle>
  );
}
const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .star {
    padding: 0 0 0 8px;
    svg {
      fill: ${({ theme }) => theme.color.primary};
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;
  }
  .content {
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
  }
`;
