import React, { useRef, useState } from "react";
import { FaInfoCircle, FaRegCommentAlt, FaUser } from "react-icons/fa";
import RoomInfo from "./DrawerContents/RoomInfo";
import RoomActiveUser from "./DrawerContents/RoomActiveUser";
import RoomCommunity from "./DrawerContents/RoomCommunity";
import {
  DrawerContents,
  DrawerController,
  DrawerStyle,
  Overlay
} from "./DrawerStyle";

interface IdrawerData {
  id: number;
  title: string;
  component: React.FC;
  icon: React.FC;
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
  },
  {
    id: 3,
    title: "community",
    component: RoomCommunity,
    icon: FaRegCommentAlt
  }
];

const Drawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [selectDrawer, setSelectDrawer] = useState<string | null>(null);

  const drawerOverlayClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setOpen(false);
      setTimeout(() => {
        setSelectDrawer(null);
      }, 200);
    }
  };

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

  return (
    <>
      <Overlay open={open} onClick={drawerOverlayClick} />
      <DrawerStyle open={open} ref={drawerRef}>
        <DrawerContents>
          {drawerData.map(
            (item) =>
              selectDrawer === item.title && <item.component key={item.id} />
          )}
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
