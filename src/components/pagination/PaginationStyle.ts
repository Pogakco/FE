import styled from "styled-components";

export const PaginationStyle = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;  
  .controllButton {
    border: none;
    font-size: ${({ theme }) => theme.fontSize.title};
    background-color: ${({ theme }) => theme.color.white};

    svg {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .pageButton {
    font-size: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 40px;
    height: 40px;
    font-weight: bold;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${({ theme}) => theme.color.grey2};;
    }
  }
    .pageButton.active {
    background-color: ${({ theme}) => theme.color.pink4};
    color: ${({ theme }) => theme.color.black};
  }
  
  li {
    margin: 0 5px;
    list-style: none;
  }
  
  button {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: ${({ theme }) => theme.color.white};;
  }
`;