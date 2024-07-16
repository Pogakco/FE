import { requestHandler } from "./apiClient";

export const feedback = (reqBody: { contents: string }) => {
  return requestHandler("post", "/feedbacks", reqBody);
};
