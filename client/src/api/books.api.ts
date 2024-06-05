import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface fetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface fetchBooKsResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: fetchBooksParams) => {
  try {
    const response = await httpClient.get<fetchBooKsResponse>("/books", {
      params: params,
    });
    return response.data;
  } catch (e) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return response.data;
};
