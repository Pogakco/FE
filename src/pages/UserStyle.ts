import styled from "styled-components";

export const UserStyle = styled.main`
  position: absolute;
  inset: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${({ theme }) => theme.layoutWidth.auth};
  height: fit-content;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    width: 100%;

    fieldset {
      position: relative;
      button {
        position: absolute;
        top: 8px;
        right: -122px;
      }
    }
  }

  .help-message {
    margin: 8px 9px 0px 9px;
    font-size: ${({ theme }) => theme.fontSize.small};
    color: #ff0000;
  }

  .login-check {
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: ${({ theme }) => theme.color.grey3};
    text-align: center;
    margin: 29px 0 0 0;
    a {
      color: ${({ theme }) => theme.color.black};
      font-weight: bold;
    }
  }
`;

export const UserProfileStyle = styled(UserStyle)`
  width: 100%;
  position: static;
  transform: none;
  margin: 60px 0;

  .profile-content {
    width: ${({ theme }) => theme.layoutWidth.auth};
    margin: 0 auto;
  }
  .header {
    width: fit-content;
    height: fit-content;
    margin: 0 auto 50px;
    position: relative;
  }
`;
