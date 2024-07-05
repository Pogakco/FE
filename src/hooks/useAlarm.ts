import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from "@/utils/localStorage";
import { useCallback, useState, useRef, useEffect } from "react";

const LOCALSORAGE_ITEM = "isMuted";

// TODO: 알람 소리 정해지면 모든 소리의 길이를 일정하게 맞추는 작업하기
const useAlarm = () => {
  const focusAlarm = useRef(new Audio("src/assets/audios/ready.mp3"));
  const shortBreakTAlarm = useRef(new Audio("src/assets/audios/bb_bb.mp3"));
  const longBreakAlarm = useRef(
    new Audio("src/assets/audios/twinkle_star.mp3")
  );

  const [isMute, setIsMute] = useState<boolean>(
    getLocalStorage(LOCALSORAGE_ITEM) === "true" ? true : false
  );

  const _playAlarm = useCallback(
    (alarm: React.MutableRefObject<HTMLAudioElement>) => {
      if (!isMute) {
        alarm.current.play();
      }
    },
    [isMute]
  );

  const playFocusAlarm = () => _playAlarm(focusAlarm);
  const playShortBreakAlarm = () => _playAlarm(shortBreakTAlarm);
  const playLongBreakAlarm = () => _playAlarm(longBreakAlarm);

  const changeMute = useCallback(() => {
    if (isMute) {
      removeLocalStorage(LOCALSORAGE_ITEM);
    } else {
      setLocalStorage(LOCALSORAGE_ITEM, "true");
    }
    setIsMute(!isMute);
  }, [isMute]);

  useEffect(() => {
    if (isMute) {
      focusAlarm.current.pause(); // 오디오 끄기
      focusAlarm.current.currentTime = 0; // 재생 위치 초기화
      shortBreakTAlarm.current.pause();
      shortBreakTAlarm.current.currentTime = 0;
      longBreakAlarm.current.pause();
      longBreakAlarm.current.currentTime = 0;
    }
  }, [isMute]);

  return {
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    changeMute,
    isMute
  };
};

export default useAlarm;
