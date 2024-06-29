import React, { useRef, useState } from "react";
import { FaInfoCircle, FaRegCommentAlt, FaUser } from "react-icons/fa";
import RoomInfo from "./DrawerContents/RoomInfo";
import RoomActiveUser from "./DrawerContents/RoomActiveUser";
import RoomCommunity from "./DrawerContents/RoomCommunity";
import { DrawerContents, DrawerController, DrawerStyle, Overlay } from "./DrawerStyle";

const Drawer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [selectDrawer, setSelectDrawer] = useState<string | null>(null);

  const drawerOverlayClick = (e: React.MouseEvent) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      console.log("Overlay clicked, closing modal");
      setOpen(false);
    }
  };

  const toggleDrawer = (drawerType: string) => {
    if (selectDrawer === drawerType) {
      setOpen(!open);
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
          {selectDrawer === "info" && <RoomInfo />}
          {selectDrawer === "user" && <RoomActiveUser />}
          {selectDrawer === "community" && <RoomCommunity />}
        </DrawerContents>
        <DrawerController>
          <ul>
            <li onClick={() => toggleDrawer("info")}>
              <FaInfoCircle />
            </li>
            <li onClick={() => toggleDrawer("user")}>
              <FaUser />
            </li>
            <li onClick={() => toggleDrawer("community")}>
              <FaRegCommentAlt />
            </li>
          </ul>
        </DrawerController>
      </DrawerStyle>
    </>
  );
};

export default Drawer;
