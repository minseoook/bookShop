import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
import { httpClient } from "./http";

export const fetchBookReview = async (bookId: string) => {
  const response = await httpClient.get<BookReviewItem[]>(`/reviews/${bookId}`);
  return response.data;
  //   return await requestHandler<Category[]>("get", "/category");
};

export const addBookReview = async (
  bookId: string,
  data: BookReviewItemWrite
) => {
  const response = await httpClient.post(`/reviews/${bookId}`, data);
  return response.data;
};
