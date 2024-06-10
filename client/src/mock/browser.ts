import { setupWorker } from "msw/browser";
import { addReview, reviewById } from "./review";

const handlers = [reviewById, addReview];

export const worker = setupWorker(...handlers);
