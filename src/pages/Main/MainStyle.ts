import styled from "styled-components";

export const MainStyle = styled.div`
  position: relative;
  .mainContents {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: auto;
    padding: 40px 20px 40px 20px;
    max-width: ${({ theme }) => theme.layoutWidth.screen};
  }

  .title {
    font-size: ${({ theme }) => theme.fontSize.title};
    color: ${({ theme }) => theme.color.black};
    font-weight: 800;
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

  .createButton {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
`;

export const RoomListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row;
  align-items: start;
  align-content: start;
  height: 520px;
`;

export const Exception = styled.div`
  min-height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
