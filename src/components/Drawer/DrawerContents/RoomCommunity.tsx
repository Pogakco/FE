import styled from "styled-components";

const RoomCommunity = () => {
  return (
    <RoomCommunityStyle>
      <div className="title">소통</div>
      <hr></hr>
    </RoomCommunityStyle>
  );
};

const RoomCommunityStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-size: ${({ theme }) => theme.fontSize.title};
    font-weight: bold;
  }
  hr {
    background-color: ${({ theme }) => theme.color.white};
    height: 1px;
    border: none;
    margin: 0px 0;
  }
`;

export default RoomCommunity;
