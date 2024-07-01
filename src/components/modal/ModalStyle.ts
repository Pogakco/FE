import styled from "styled-components";

export const ModalStyle = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.overlay.default};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: ${({ theme }) => theme.layoutWidth.modal};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  background-color: #FFFFFF;
  padding: 40px 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.default};

  .exitButton {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color.pink6};
    top: 10px;
    right: 10px;
    padding: 2px;
    cursor: pointer;

    svg {
      color: ${({ theme }) => theme.color.white};
    }
  }
`;

export const ModalRoomCreateStyle = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .title {
      margin-top: 20px;
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

export const ModalRoomDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0px 30px;

  span {
    border: 1px solid ${({ theme }) => theme.color.grey1};
    border-radius: ${({ theme }) => theme.borderRadius.default};
  }
  .userName {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: bold;
  }
  .descript {
    width: 100%;
    height: 42px;
    font-size: ${({ theme }) => theme.fontSize.small};
    margin-bottom: 20px;
    text-align: center;
    color: ${({ theme }) => theme.color.grey3};
  }
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  h1 {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: bold;
  }
  hr {
    width: 100%;
    background-color: ${({ theme }) => theme.color.grey1};
    height: 1px;
    border: none;
  }
`;
