import Profile from '@/components/profile/Profile';
import styled from 'styled-components';

interface Props {
  rank: number;
  user: {
    nickname: string;
    profileImageUrl?: string;
    pomodoroCount: number;
    isCurrentParticipant : boolean ;
    isActive: boolean;
  }
}

const UserListBox = ({ rank, user }: Props) => {
  console.log(user)
  return (
    <UserListCardStyle $rank={rank} $isCurrentParticipant={user.isCurrentParticipant}>
      {rank <= 2 ? (
        <div className='userRank'>{rank + 1}</div>
      ) : (
        <div className='userRankPlaceholder'></div>
      )}
      <Profile size='small' url={user.profileImageUrl}/>
      <div className='userName'>{user.nickname}</div>
      <div className='userCycle'>{user.pomodoroCount}회</div>
    </UserListCardStyle>
  );
};

const UserListCardStyle = styled.div<{ $rank: number, $isCurrentParticipant: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 5px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey2};
  transition: all 0.2s;
  opacity: ${({$isCurrentParticipant}) => $isCurrentParticipant ? "1" : "0.5"};

  &:hover {
    scale: 1.05;
  }

  .userRank, .userRankPlaceholder {
    width: 30px;
    height: 30px;
    border-radius: ${({ theme }) => theme.borderRadius.default};;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .userRank {
    background-color: ${({ $rank }) => {
      if ($rank === 0) return '#F6D000';
      if ($rank === 1) return '#CBCBCB';
      if ($rank === 2) return '#B67625';
      return 'grey';
    }};
  }

  .userRankPlaceholder {
    background-color: transparent;
  }

  .userImg {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.color.pink6};
  }

  .userName {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.color.black};
  }

  .userCycle {
    margin-left: auto;
    color: ${({ theme }) => theme.color.black};
    font-size: ${({ theme }) => theme.fontSize.small};
    font-weight: bold;
  }
`;

export default UserListBox;
