import { Exception, RoomListStyle } from "./MainStyle";
import RoomListCard from "@/components/cards/RoomListCard";
import { IroomCardData } from "@/models/room.model";

interface Props {
    roomListDatas: IroomCardData[];
    handleRoomCardClick : (roomData: IroomCardData) => void;
    isLoading : boolean;
    roomType : string;
    isLoggedIn : boolean;

}
const RoomList = ({roomListDatas, handleRoomCardClick, isLoading, isLoggedIn, roomType} : Props) => {

 if(!isLoggedIn && roomType === "myRoom") {
    return <Exception>로그인이 필요합니다</Exception>
 }
  if (isLoading) {
    return <Exception>Loading...</Exception>;
  }

  return (
    <RoomListStyle>
      {roomListDatas.length > 0 ? (
        roomListDatas.map((roomData, index) => (
          <RoomListCard
            key={index}
            roomData={roomData}
            onClick={handleRoomCardClick}
          />
        ))
      ) : (
        <div>방이 없습니다.</div>
      )}
    </RoomListStyle>
  );
};

export default RoomList;
