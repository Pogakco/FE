import { feedback } from "@/api/feedback.api";
import { useMutation } from "@tanstack/react-query";

const useFeedback = () => {
  const {
    mutate: feedbackMutate,
    isSuccess,
    isPending,
    reset
  } = useMutation({
    mutationFn: (reqBody: { contents: string }) => feedback(reqBody),
    onError: () => {
      reset();
    }
  });

  return { feedbackMutate, isSuccess, isPending };
};

export default useFeedback;
