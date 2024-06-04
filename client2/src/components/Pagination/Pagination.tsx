import styled from "./pagination.module.css";
import { Pagination as TPagination } from "../../models/pagination.model";
import { useSearchParams } from "react-router-dom";

type Props = {
  pagination: TPagination;
};

const Pagination = ({ pagination }: Props) => {
  const { totalCount } = pagination;

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageClick = (pageNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", pageNumber.toString());

    setSearchParams(newSearchParams);
    window.scrollTo(0, 0);
  };
  const handleLeftClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", pageNumber.toString());

    setSearchParams(newSearchParams);
    window.scrollTo(0, 0);
  };
  const handleRightClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", pageNumber.toString());

    setSearchParams(newSearchParams);
    window.scrollTo(0, 0);
  };

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCount / 8); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styled.container}>
      <div className={styled.left} onClick={handleLeftClick}>
        {"<"}
      </div>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={styled.button}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <div className={styled.left} onClick={handleRightClick}>
        {">"}
      </div>
    </div>
  );
};

export default Pagination;
