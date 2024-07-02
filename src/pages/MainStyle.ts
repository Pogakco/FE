import styled from "styled-components";

export const MainStyle = styled.div`
  height: 100vh;

  .mainContents {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
    padding: 120px 20px 0px 20px;
    max-width: ${({ theme }) => theme.layoutWidth.screen};
  }

  .title {
    font-size: ${({ theme }) => theme.fontSize.title};
    color: ${({ theme }) => theme.color.black};
    font-weight: bolder;
  }

  .buttonGroup {
    display: flex;
    gap: 10px;
  }

  .button {
    padding: 5px 27px;
    border: 1px solid ${({ theme }) => theme.color.grey3};
    border-radius: 20px;
    color: ${({ theme }) => theme.color.grey3};
    background-color: ${({ theme }) => theme.color.purewhite};
    cursor: pointer;

    &.active {
      border-color: ${({ theme }) => theme.color.pink6};
      color: ${({ theme }) => theme.color.pink6};
    }
  }

  .options {
    display: flex;
    gap: 5px;
    align-items: center;
    color: ${({ theme }) => theme.color.grey3};

    &.checked {
      color: ${({ theme }) => theme.color.black};
      font-weight: bold;
    }

    input {
      width: ${({ theme }) => theme.fontSize.medium};
      height: ${({ theme }) => theme.fontSize.medium};
      accent-color: ${({ theme }) => theme.color.black};
    }

    span {
      cursor: pointer;
    }
  }

  .roomList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }

  .createButton {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
`;
