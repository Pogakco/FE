import { useState } from 'react';
import RoomListCard from "@/components/cards/RoomListCard";
import CircleButton from '@/components/buttons/CircleButton';
import { IoMdAdd } from 'react-icons/io';
import { IroomData } from '@/models/room.model';
import { MainStyle } from './MainStyle';
import Modal from '@/components/modal/Modal';
import ModalRoomCreate from '@/components/modal/modalContents/ModalRoomCreate';
import ModalRoomDetail from '@/components/modal/modalContents/ModalRoomDetail';

type TisRoomType = "all" | "filter";
type TModalContent = "detail" | "create" | null;

const Main = () => {
  const [isRunningChecked, setIsRunningChecked] = useState<boolean>(false);
  const [isRoomTypeChecked, setIsRoomTypeChecked] = useState<TisRoomType>("all");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<IroomData | null>(null);
  const [modalContent, setModalContent] = useState<TModalContent>(null);

  const handleCheckboxChange = () => {
    setIsRunningChecked(!isRunningChecked);
  };

  const handleRoomTypeChange = (type: TisRoomType) => () => {
    setIsRoomTypeChecked(type);
  };

  const handleRoomCardClick = (roomData: IroomData) => {
    setSelectedRoom(roomData);
    setModalContent("detail");
    setIsModal(true);
  };

  const handleCreateButtonClick = () => {
    setSelectedRoom(null);
    setModalContent("create");
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setModalContent(null);
  };

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
          {roomListDatas.map((roomData, index) => (
            <RoomListCard key={index}
            roomData={roomData}
            onClick={handleRoomCardClick} />
          ))}
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

const roomListDatas: IroomData[] = [
  {
    roomTitle: "집중의 시간",
    roomDescription: "집중해서 공부하는 방입니다.",
    totalCycles: 4,
    currentCycles: 2,
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    isRunning: true,
    maxParticipants: 10,
    currentParticipants: 8,
    ownerName: "김철수",
    ownerProfileImageUrl: "https://example.com/profile1.jpg"
  },
  {
    roomTitle: "휴식과 업무",
    roomDescription: "적절한 휴식을 가지며 업무를 합니다.",
    totalCycles: 6,
    currentCycles: 4,
    focusTime: 50,
    shortBreakTime: 10,
    longBreakTime: 30,
    isRunning: false,
    maxParticipants: 15,
    currentParticipants: 12,
    ownerName: "박영희"
  },
  {
    roomTitle: "코딩 마라톤",
    roomDescription: "코딩을 집중적으로 하는 방입니다.",
    totalCycles: 8,
    currentCycles: 5,
    focusTime: 45,
    shortBreakTime: 10,
    longBreakTime: 20,
    isRunning: true,
    maxParticipants: 20,
    currentParticipants: 18,
    ownerName: "이민수",
    ownerProfileImageUrl: "https://example.com/profile2.jpg"
  },
  {
    roomTitle: "독서 모임",
    roomDescription: "함께 책을 읽고 토론하는 방입니다.",
    totalCycles: 5,
    currentCycles: 3,
    focusTime: 30,
    shortBreakTime: 5,
    longBreakTime: 15,
    isRunning: false,
    maxParticipants: 12,
    currentParticipants: 10,
    ownerName: "최수진"
  },
  {
    roomTitle: "운동과 휴식",
    roomDescription: "운동을 하고 휴식을 취하는 방입니다.",
    totalCycles: 7,
    currentCycles: 6,
    focusTime: 40,
    shortBreakTime: 10,
    longBreakTime: 20,
    isRunning: true,
    maxParticipants: 8,
    currentParticipants: 7,
    ownerName: "홍길동",
    ownerProfileImageUrl: "https://example.com/profile3.jpg"
  }
];
export default Main;
