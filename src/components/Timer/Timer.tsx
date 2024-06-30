import styled from 'styled-components'

const TimerContainer = styled.div`
    width: 335px;
    height: 335px;
    border-radius: 335px;
    background-color: #FF8080;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    font-weight: bold;
    color : white;
    margin-bottom: 40px;
`
const Timer = () => {
  return (
    <TimerContainer>
        55:30
    </TimerContainer>
  )
}

export default Timer