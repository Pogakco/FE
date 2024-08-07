import React, { useRef, useState } from "react";
import { FaInfoCircle, FaUser } from "react-icons/fa";
import RoomInfo from "./drawerContents/RoomInfo";
import RoomActiveUser from "./drawerContents/RoomActiveUser";
import RoomCommunity from "./drawerContents/RoomCommunity";
import {
  DrawerContents,
  DrawerController,
  DrawerStyle,
  Overlay
} from "./DrawerStyle";
import { IroomData } from "@/models/room.model";
import { handleOverlayClick } from "@/utils/handleOverlayClick";
import { IParticipant, IRoomUserData } from "@/models/roomDetail.model";

interface IdrawerData {
  id: number;
  title: string;
  component: React.FC<{
    roomData: IroomData;
    isRunning: boolean | null;
    currentCycle: number | null;
    userData: IRoomUserData;
    participants: IParticipant[];
    activeUsers: number;
    currentParticipants: number | null;
  }>;
  icon: React.FC;
}

interface Props {
  roomData: IroomData;
  isRunning: boolean | null;
  currentCycle: number | null;
  participants: IParticipant[] | null;
  activeUsers: number;
}

const drawerData: IdrawerData[] = [
  {
    id: 1,
    title: "info",
    component: RoomInfo,
    icon: FaInfoCircle
  },
  {
    id: 2,
    title: "user",
    component: RoomActiveUser,
    icon: FaUser
  }
  // {
  //   id: 3,
  //   title: "community",
  //   component: RoomCommunity,
  //   icon: FaRegCommentAlt
  // }
];

const drawerVariants = {
  hidden: { left: -365 },
  visible: { left: 0 }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Drawer = ({
  roomData,
  isRunning,
  currentCycle,
  participants,
  activeUsers
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [selectDrawer, setSelectDrawer] = useState<string | null>(null);
  const toggleDrawer = (drawerType: string) => {
    if (selectDrawer === drawerType) {
      setOpen(!open);
      setTimeout(() => {
        setSelectDrawer(null);
      }, 200);
    } else {
      setSelectDrawer(drawerType);
      setOpen(true);
    }
  };

  const handleSelectDrawer = () => {
    setSelectDrawer(null);
  };

  return (
    <>
      <Overlay
        open={open}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        variants={overlayVariants}
        transition={{ duration: 0.3 }}
        onClick={(e) =>
          handleOverlayClick(e, drawerRef, setOpen, handleSelectDrawer)
        }
      />
      <DrawerStyle
        open={open}
        ref={drawerRef}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        variants={drawerVariants}
        transition={{ type: "spring", stiffness: 200, damping: 40 }}
      >
        <DrawerContents>
          {selectDrawer === "info" && (
            <RoomInfo
              roomData={roomData}
              isRunning={isRunning}
              currentCycle={currentCycle}
              currentParticipants={participants ? participants.length : 0}
            />
          )}
          {selectDrawer === "user" && (
            <RoomActiveUser
              participants={participants}
              activeUsers={activeUsers}
            />
          )}
          {selectDrawer === "community" && <RoomCommunity />}
        </DrawerContents>
        <DrawerController>
          <ul>
            {drawerData.map((item) => (
              <li
                key={item.id}
                className={selectDrawer === item.title ? "active" : ""}
                onClick={() => toggleDrawer(item.title)}
              >
                <item.icon />
              </li>
            ))}
          </ul>
        </DrawerController>
      </DrawerStyle>
    </>
  );
};

export default Drawer;
