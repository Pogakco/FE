import styled from 'styled-components'

interface UserListCardProps {
  rank: number;
}

const UserListCard = ({ rank }: UserListCardProps) => {
  return (
    <UserListCardStyle rank={rank}>
      {rank <= 2 ? (
        <div className='userRank'>{rank + 1}</div>
      ) : (
        <div className='userRankPlaceholder'></div>
      )}
      <div className='userImg'></div>
      <div className='userName'>changchangwoo</div>
      <div className='userCycle'>3회</div>
    </UserListCardStyle>
  );
};

const UserListCardStyle = styled.div<{ rank: number }>`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 5px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey2};
  transition: all 0.2s;
  

  &:hover {
    scale: 1.05;
  }

  .userRank, .userRankPlaceholder {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .userRank {
    background-color: ${({ rank }) => {
      if (rank === 0) return '#F6D000';
      if (rank === 1) return '#CBCBCB';
      if (rank === 2) return '#B67625';
      return 'grey';
    }};
  }

  .userRankPlaceholder {
    background-color: transparent;
  }
  
  .userImg {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.color.pink6};
  }
  
  .userName {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.pink6};
  }
  
  .userCycle {
    margin-left: auto;
    color: ${({ theme }) => theme.color.pink6};
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: bold;
  }
`

export default UserListCard;
