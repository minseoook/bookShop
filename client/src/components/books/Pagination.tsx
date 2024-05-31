import React from "react";
import { Pagination as IPagination } from "../../models/pagination.model";
import { LIMIT } from "../../constant/pagination";
import styled from "styled-components";
import { QUERYSTRING } from "../../constant/querystring";
import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";

interface Props {
  pagination: IPagination;
}
const Pagination = ({ pagination }: Props) => {
  const { totalCount, currentPage } = pagination;
  const [searchParams, setSearchParams] = useSearchParams();
  const pages = Math.ceil(totalCount / LIMIT);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li>
                <Button
                  key={index}
                  size="small"
                  scheme={index + 1 === currentPage ? "primary" : "normal"}
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
};

const PaginationStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  ol {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export default Pagination;
