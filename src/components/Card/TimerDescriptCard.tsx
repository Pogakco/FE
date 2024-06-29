import React from 'react'
import styled from 'styled-components'

const TimerDescriptCard = () => {
  return (
    <div>TimerDescriptCard</div>
  )
}

const TimerDescriptCardStyle = styled.div`
    width: 100%;
    height: 90px;
    border-radius: 8px;
    background-color:  ${({ theme }) => theme.color.white};
    
`
export default TimerDescriptCard