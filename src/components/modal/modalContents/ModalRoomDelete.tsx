import styled from "styled-components";
import SquareButton from "@/components/buttons/SquareButton";

interface Props {
  onCancel: () => void;
  onDelete: () => void;
}
const ModalRoomDelete = ({ onCancel, onDelete }: Props) => {
  return (
    <ModalRoomDeleteStyle>
      <div className="header">
        <h1>방을 정말 삭제하시겠습니까?</h1>
      </div>
      <p className="notice">
        삭제 즉시 모든 정보가 삭제되며, 데이터 복구가 불가해요.
      </p>
      <div className="buttons">
        <SquareButton
          buttonColor="default"
          buttonSize="medium"
          onClick={onCancel}
        >
          취소
        </SquareButton>
        <SquareButton
          buttonColor="active"
          buttonSize="medium"
          onClick={onDelete}
        >
          삭제
        </SquareButton>
      </div>
    </ModalRoomDeleteStyle>
  );
};

const ModalRoomDeleteStyle = styled.div`
  width: 408px;
  padding: 36px 24px;
  text-align: center;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme }) => theme.boxShadow.default};

  .header {
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 600;
    line-height: 1.6;
    margin: 0 0 5px 0;
  }
  .notice {
    color: ${({ theme }) => theme.color.grey3};
    line-height: 1.5;
    margin: 0 0 20px 0;
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;

    button {
      flex: 1;
    }
  }
`;
export default ModalRoomDelete;
