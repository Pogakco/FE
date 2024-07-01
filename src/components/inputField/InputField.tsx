import { TInputFieldSchema } from "@/style/theme";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";

export interface IInputField {
  icon?: React.ReactNode;
  title: string;
  placeholder?: string;
}
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputfield: IInputField;
  schema: TInputFieldSchema;
  disabled?: boolean;
}
const InputField = forwardRef(
  (
    {
      inputfield: { icon, title, placeholder },
      schema,
      disabled,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputFieldStyle $schema={schema}>
        <label>
          {icon && icon}
          {title}
        </label>
        <input
          placeholder={placeholder}
          {...props}
          ref={ref}
          disabled={disabled}
        />
      </InputFieldStyle>
    );
  }
);

interface InputFieldStyleProps {
  $schema: TInputFieldSchema;
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
    color: ${({ theme }) => theme.color.grey2};
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 600;
    margin: 2px 0 0 0;
  }

  input {
    width: 100%;
    color: ${({ theme }) => theme.color.black};
    padding: 30px 20px 5px 19px;

    border: 1px solid ${({ theme }) => theme.color.grey2};
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
`;

export default InputField;
