import { feedback } from "@/api/feedback.api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useFeedback = () => {
  const [lastRequestData, setLastRequestData] = useState<{
    contents: string;
  } | null>(null);

  const {
    mutate: feedbackMutate,
    isSuccess,
    isPending,
    reset
  } = useMutation({
    mutationFn: async (reqBody: { contents: string }) => {
      // 이전 요청과 동일하다면 요청 방지
      if (JSON.stringify(reqBody) === JSON.stringify(lastRequestData)) {
        throw new Error("이전 요청과 동일한 데이터입니다. 요청을 방지합니다.");
      }

      const response = await feedback(reqBody);

      setLastRequestData(reqBody);

      return response;
    },

    onError: () => {
      reset();
    }
  });

  return { feedbackMutate, isSuccess, isPending };
};

export default useFeedback;
