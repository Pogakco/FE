import { FaBook, FaKey, FaSmile } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { ICreateInputField, IInputField } from "@/components/inputField/InputField";
import { IcreateRoomForm } from "@/models/room.model";
import { CREATE_ROOM_REGEX } from "./regex";
import { CgSandClock } from "react-icons/cg";
import { IoIosAlarm } from "react-icons/io";
import { GiTomato } from "react-icons/gi";

export type AUTH_TYPE = "nickname" | "email" | "password" | "checkPassword";

export const AUTH_INPUT_FIELD: { [key in AUTH_TYPE]: IInputField } = {
  nickname: {
    icon: <FaSmile />,
    name: "닉네임",
    placeholder: "2-10자 이내로 입력해주세요"
  },
  email: {
    icon: <IoPerson />,
    name: "이메일",
    placeholder: "이메일을 입력해주세요"
  },
  password: {
    icon: <FaKey />,
    name: "비밀번호",
    placeholder: "8-20자 이내로 입력해주세요"
  },

  checkPassword: {
    icon: <FaKey />,
    name: "비밀번호 확인",
    placeholder: "비밀번호를 일치하게 입력해주세요"
  }
};

export const AUTH_INPUT_FIELD_ERROR: { [key in AUTH_TYPE]: string } = {
  nickname: "한글, 영문, 숫자만 가능하며 2-10자리 입력, 공백 불가",
  email: "이메일 형식이 아닙니다",
  password: "영문, 숫자, 특수문자를 각각 하나 이상 포함, 8~20자리 입력",
  checkPassword: "비밀번호가 일치하지 않습니다."
};

type IcreateRoomFormKeys = keyof IcreateRoomForm;

export const CREATE_ROOM_INPUT_FIELD_ERROR : { [key in IcreateRoomFormKeys] : string} = {
  roomTitle: "방 제목은 20자 이내여야 합니다.",
  roomDescription: "방 상세 설명은 80자 이내여야 합니다.",
  focusTime : "집중 시간은 25분에서 60분 사이여야 합니다.",
  shortBreakTime : "짧은 휴식 시간은 5분에서 15분 사이여야 합니다.",
  longBreakTime : "긴 휴식 시간은 30분에서 60분 사이여야 합니다.",
  totalCycles : "뽀모도로 사이클 수는 1회에서 4회 사이여야 합니다",
  maxParticipants : "수용 인원 수는 최소 1명 이상이어야 합니다.",

} 

export const ROOM_CREATE_INFO_FIELD: ICreateInputField[] = [
  {
    name: "방 제목",
    field: "roomTitle",
    placeHolder: "20자 이내",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.roomTitle,
    regex : CREATE_ROOM_REGEX.roomTitle,
    defaultValue : "",
  },
  {
    name: "상세 설명",
    field: "roomDescription",
    placeHolder: "80자 이내",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.roomDescription,
    regex : CREATE_ROOM_REGEX.roomDescription,
    defaultValue : "",

  },
  {
    name: "수용 인원",
    field: "maxParticipants",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.maxParticipants,
    regex: CREATE_ROOM_REGEX.maxParticipants,
    placeHolder: "1명 이상",
    defaultValue : "",

  }
];

export const ROOM_CREATE_TIMER_FIELD: ICreateInputField[] = [
  {
    icon: <FaBook />,
    name: "집중시간 (분)",
    field: "focusTime",
    placeHolder: "25 - 60분",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.focusTime,
    regex: CREATE_ROOM_REGEX.focusTime,
    defaultValue : "",

  },
  {
    icon: <CgSandClock />,
    name: "휴식시간 (분)",
    field: "shortBreakTime",
    placeHolder: "5 - 15분",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.shortBreakTime,
    regex: CREATE_ROOM_REGEX.shortBreakTime,
    defaultValue : "",

  },
  {
    icon: <IoIosAlarm />,
    name: "대 휴식 (분) ",
    field: "longBreakTime",
    placeHolder: "30 - 60분",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.longBreakTime,
    regex: CREATE_ROOM_REGEX.longBreakTime,
    defaultValue : "",

  },
  {
    icon: <GiTomato />,
    name: "뽀모도로 사이클 (횟수) ",
    field: "totalCycles",
    placeHolder: "1 - 4회",
    message: CREATE_ROOM_INPUT_FIELD_ERROR.totalCycles,
    regex: CREATE_ROOM_REGEX.totalCycles,
    defaultValue : "",

  }
];