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
  //파람스에서 가져옴 스트링임
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/likes/${bookId}`);
  return response.data;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);
  return response.data;
};
