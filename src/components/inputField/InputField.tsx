import { TInputFieldSchema } from "@/style/theme";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

export interface IInputField {
  icon?: React.ReactNode;
  name: string;
  placeholder?: string;
}
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputfield: IInputField;
  schema: TInputFieldSchema;
  isError?: boolean;
}
const InputField = forwardRef(
  (
    {
      inputfield: { icon, name, placeholder, ...props },
      schema,
      isError = false
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputFieldStyle $schema={schema} $isError={isError}>
        <label>
          {icon && icon}
          {name}
        </label>
        <input placeholder={placeholder} {...props} ref={ref} />
      </InputFieldStyle>
    );
  }
);

interface InputFieldStyleProps {
  $schema: TInputFieldSchema;
  $isError: boolean;
}
const InputFieldStyle = styled.div<InputFieldStyleProps>`
  display: flex;
  width: 100%;
  height: ${({ theme, $schema }) => theme.inputFieldSchema[$schema].height};

  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 15px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${({ theme, $isError }) =>
      $isError ? theme.color.pink6 : theme.color.grey2};
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 600;
    margin: 2px 0 0 0;
  }

  input {
    width: 100%;
    color: ${({ theme }) => theme.color.black};
    padding: 30px 20px 5px 19px;

    border: 1px solid
      ${({ theme, $isError }) =>
        $isError ? theme.color.pink6 : theme.color.grey2};
    border-radius: ${({ theme }) => theme.borderRadius.default};

    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.color.grey3};
    }

    &:focus {
      border-color: ${({ theme }) => theme.color.pink6};
    }
  }

  &:focus-within {
    label {
      color: ${({ theme }) => theme.color.pink6};
    }
  }

  ${({ theme, $isError }) =>
    $isError &&
    `
    input {
          border-color: ${theme.color.pink6};

    };
    `}
`;

export default InputField;
