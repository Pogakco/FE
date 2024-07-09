import styled from "styled-components";

interface Props {
  isRunning: boolean | null;
}

const RunningStatus = ({ isRunning }: Props) => {
  return (
    <RunningStatusStyle>
      <div
        className="statusCircle"
        style={{ backgroundColor: isRunning ? "#FF8080" : "#43F780" }}
      />
      <div className="description">{isRunning ? "집중" : "휴식"}</div>
    </RunningStatusStyle>
  );
};

const RunningStatusStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  .statusCircle {
    width: 10px;
    height: 10px;
    border-radius: 10px;
  }

  .description {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: 400;
  }
`;

export default RunningStatus;
