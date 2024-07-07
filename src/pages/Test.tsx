import styled from "styled-components";
import useAlarm from "@/hooks/useAlarm";
import SquareButton from "@/components/buttons/SquareButton";

const Test = () => {
  const {
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    changeMute,
    isMute
  } = useAlarm();

  return (
    <TestStyle>
      <SquareButton
        buttonColor="active"
        buttonSize="medium"
        onClick={playFocusAlarm}
      >
        집중 시간
      </SquareButton>
      <SquareButton
        buttonColor="active"
        buttonSize="medium"
        onClick={playShortBreakAlarm}
      >
        휴식 시간
      </SquareButton>
      <SquareButton
        buttonColor="active"
        buttonSize="medium"
        onClick={playLongBreakAlarm}
      >
        긴 휴식 시간
      </SquareButton>
      <SquareButton
        buttonColor="default"
        buttonSize="medium"
        onClick={changeMute}
      >
        {isMute ? "소리 켜기" : "소리 끄기"}
      </SquareButton>
    </TestStyle>
  );
};

const TestStyle = styled.div`
  display: flex;
  gap: 20px;
`;
export default Test;
