import { useEffect, useState } from "react";
import RoomListCard from "@/components/cards/RoomListCard";
import CircleButton from "@/components/buttons/CircleButton";
import { IoMdAdd } from "react-icons/io";
import { IroomCardData, IroomData } from "@/models/room.model";
import { MainStyle } from "./MainStyle";
import Modal from "@/components/modal/Modal";
import ModalRoomCreate from "@/components/modal/modalContents/ModalRoomCreate";
import ModalRoomDetail from "@/components/modal/modalContents/ModalRoomDetail";
import useModal from "@/hooks/useModal";
import useFetchRooms from "@/hooks/queries/useFetchRooms";
import Pagination from "@/components/pagination/Paginiation";
import { useSearchParams } from "react-router-dom";
import React from "react";
import MainSlider from "@/components/slider/Slider";

type TisRoomType = "all" | "filter";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRunningChecked, setIsRunningChecked] = useState<boolean>(true);
  const [isRoomTypeChecked, setIsRoomTypeChecked] =
    useState<TisRoomType>("all");
  const [selectedRoom, setSelectedRoom] = useState<IroomCardData | null>(null);
  const { isModal, modalContent, openModal, closeModal, setIsModal } =
    useModal();
  const page = searchParams.get("page") || "1";

  const {
    data: response,
    isLoading,
    error,
    refetch
  } = useFetchRooms(page, isRunningChecked);

  const roomListDatas = response?.data ?? [];
  const pagination = response?.pagination ?? null;

  useEffect(() => {
    refetch();
  }, [searchParams, isRunningChecked]);

  const handleCheckboxChange = () => {
    setIsRunningChecked(!isRunningChecked);
  };

  const handleRoomTypeChange = (type: TisRoomType) => () => {
    setIsRoomTypeChecked(type);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams);
  };

  const handleRoomCardClick = (roomData: IroomCardData) => {
    setSelectedRoom(roomData);
    openModal("detail");
  };

  const handleCreateButtonClick = () => {
    openModal("create");
  };

  return (
    <>
      {isModal && (
        <Modal setIsModal={setIsModal} onClose={closeModal}>
          {modalContent === "detail" && selectedRoom && (
            <ModalRoomDetail roomData={selectedRoom} />
          )}
          {modalContent === "create" && <ModalRoomCreate />}
        </Modal>
      )}
      <MainSlider />
      <MainStyle>
        <div className="mainContents">
          <h1 className="title">#뽀모도로 친구들</h1>
          <span className="buttonGroup">
            <button
              onClick={handleRoomTypeChange("all")}
              className={`button ${
                isRoomTypeChecked === "all" ? "active" : ""
              }`}
            >
              전체 방
            </button>
            <button
              onClick={handleRoomTypeChange("filter")}
              className={`button ${
                isRoomTypeChecked === "filter" ? "active" : ""
              }`}
            >
              참여한 방
            </button>
          </span>
          <span className={`options ${isRunningChecked ? "" : "checked"}`}>
            <input
              type="checkbox"
              checked={!isRunningChecked}
              onChange={handleCheckboxChange}
            />
            <span onClick={handleCheckboxChange}>휴식중인 방만 보기</span>
          </span>
          <div className="roomList">
            {isLoading && <div>로딩 중</div>}
            {error && <div>오류발생</div>}
            {roomListDatas.length > 0 ? (
              roomListDatas.map((roomData, index) => (
                <RoomListCard
                  key={index}
                  roomData={roomData}
                  onClick={handleRoomCardClick}
                />
              ))
            ) : (
              <div>현재 방이 없습니다</div>
            )}
          </div>
          {pagination && <Pagination pagination={pagination} />}
        </div>
        <div className="createButton" onClick={handleCreateButtonClick}>
          <CircleButton buttonSize="large">
            <IoMdAdd />
          </CircleButton>
        </div>
      </MainStyle>
    </>
  );
};

export default Main;
