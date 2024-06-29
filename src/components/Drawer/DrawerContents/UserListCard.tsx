import styled from 'styled-components'

const UserListCard = () => {
  return (
    <UserListCardStyle>
      <div className='userRank'>1</div>
      <div className='userImg'></div>
      <div className='userName'>ChangChangwoo</div>
      <div className='userCycle'>2</div>
    </UserListCardStyle>
  )
}

const UserListCardStyle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 5px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey2};
  
  .userRank {
    width: 30px;
    height: 30px;
    background-color: grey;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .userImg {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background-color: grey;
  }
  
  .userName {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.black};
  }
  
  .userCycle {
    margin-left: auto;
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`

export default UserListCard
