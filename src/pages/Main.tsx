import { useState } from 'react';
import RoomListCard from "@/components/cards/RoomListCard";
import CircleButton from '@/components/buttons/CircleButton';
import { IoMdAdd } from 'react-icons/io';
import { IroomData } from '@/models/room.model';
import { MainStyle } from './MainStyle';
import Modal from '@/components/modal/Modal';
import ModalRoomCreate from '@/components/modal/modalContents/ModalRoomCreate';
import ModalRoomDetail from '@/components/modal/modalContents/ModalRoomDetail';
import useModal from '@/hooks/useModal';
import useFetchRooms from '@/hooks/queries/useFetchRooms';

type TisRoomType = "all" | "filter";

const Main = () => {
  const [isRunningChecked, setIsRunningChecked] = useState<boolean>(false);
  const [isRoomTypeChecked, setIsRoomTypeChecked] = useState<TisRoomType>("all");
  const [selectedRoom, setSelectedRoom] = useState<IroomData | null>(null);
  const { isModal, modalContent, openModal, closeModal, setIsModal } = useModal();
  const { data: response, isLoading, error } = useFetchRooms();
  const roomListDatas = response?.data ?? [];

  const handleCheckboxChange = () => {
    setIsRunningChecked(!isRunningChecked);
  };

  const handleRoomTypeChange = (type: TisRoomType) => () => {
    setIsRoomTypeChecked(type);
  };

  const handleRoomCardClick = (roomData: IroomData) => {
    setSelectedRoom(roomData);
    openModal('detail');
  };

  const handleCreateButtonClick = () => {
    openModal('create');
  };

  const filteredRoomList = roomListDatas.filter(room => {
    if (isRunningChecked && room.isRunning) {
      return false;
    }
    return true;
  });

  return (
    <MainStyle>
      {isModal &&
        <Modal setIsModal={setIsModal} onClose={closeModal}>
          {modalContent === "detail" && selectedRoom && <ModalRoomDetail roomData={selectedRoom} />}
          {modalContent === "create" && <ModalRoomCreate />}
        </Modal>
      }
      <div className="mainContents">
        <h1 className="title">#뽀모도로 친구들</h1>
        <span className="buttonGroup">
          <button onClick={handleRoomTypeChange("all")} className={`button ${isRoomTypeChecked === "all" ? "active" : ""}`}>전체 방</button>
          <button onClick={handleRoomTypeChange("filter")} className={`button ${isRoomTypeChecked === "filter" ? "active" : ""}`}>참여한 방</button>
        </span>
        <span className={`options ${isRunningChecked ? "checked" : ""}`}>
          <input 
            type="checkbox" 
            checked={isRunningChecked} 
            onChange={handleCheckboxChange} 
          />
          <span onClick={handleCheckboxChange}>휴식중인 방만 보기</span>
        </span>
        <div className="roomList">
          {isLoading && <div>로딩 중</div>}
          {error && <div>오류발생</div>}
          {
            filteredRoomList.length > 0 ? (
              filteredRoomList.map((roomData, index) => (
                <RoomListCard key={index} roomData={roomData} onClick={handleRoomCardClick} />
              ))
            ) : (
              <div>현재 방이 없습니다</div>
            )
          }
        </div>
      </div>
      <div className="createButton" onClick={handleCreateButtonClick}>
        <CircleButton buttonSize='large'>
          <IoMdAdd />
        </CircleButton>
      </div>
    </MainStyle>
  );
};

export default Main;
