import { styled } from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import useFeedback from "@/hooks/mutations/useFeedback";
import { IoIosCheckmarkCircle } from "react-icons/io";

const FeedBack = () => {
  const { register, handleSubmit } = useForm<{ contents: string }>();
  const { feedbackMutate, isSuccess } = useFeedback();

  const onSubmit: SubmitHandler<{ contents: string }> = (data) => {
    feedbackMutate(data);
  };

  return (
    <FeedBackStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="여러분의 소중한 피드백을 남겨주세요"
          {...register("contents", { required: true, maxLength: 500 })}
        />
        <button type="submit">
          {isSuccess ? <IoIosCheckmarkCircle /> : "제출하기"}
        </button>
      </form>
    </FeedBackStyle>
  );
};

const FeedBackStyle = styled.div`
  form {
    display: flex;
    gap: 10px;
    width: 334px;
    height: 30px;

    input {
      flex: 1;
      font-size: 13px;
      border: 1px solid ${({ theme }) => theme.color.grey2};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      outline: none;
      transition: border-color 0.3s;
      width: 100%;
      padding-inline: 10px;

      &:focus {
        border-color: ${({ theme }) => theme.color.grey3};
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 64px;
      height: 100%;
      font-size: ${({ theme }) => theme.fontSize.small};
      background-color: ${({ theme }) => theme.color.grey3};
      color: #fff;
      border: none;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      cursor: pointer;
      transition: 0.3s;
      white-space: nowrap;

      &:hover {
        background-color: ${({ theme }) => theme.color.grey4};
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
export default FeedBack;
