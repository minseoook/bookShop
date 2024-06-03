export interface Book {
  id: number;
  title: string;
  img: number;
  categoryId: number;
  form: string;
  isbn: string;
  summary: string;
  detail: string;
  author: string;
  pages: number;
  contents: string;
  price: number;
  pubDate: string;
  likes: number;
}

export interface BookDetail extends Book {
  categoryName: string;
  liked: boolean;
}

export interface BookReviewItem {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  score: number;
}

export type BookReviewItemWrite = Pick<BookReviewItem, "content" | "score">;
