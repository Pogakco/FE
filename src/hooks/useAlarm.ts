import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage
} from "@/utils/localStorage";
import { useCallback, useState, useRef, useEffect } from "react";

// TODO: 알람소리 정해지면 다르게 설정하기
import focusMp3 from "../assets/audios/whistle.mp3";
import shortBreakMp3 from "../assets/audios/whistle.mp3";
import longBreakMp3 from "../assets/audios/whistle.mp3";
import endMp3 from "../assets/audios/whistle.mp3";

const LOCALSORAGE_ITEM = "isMuted";

const useAlarm = () => {
  const focusAlarm = useRef<HTMLAudioElement | null>(null);
  const shortBreakTAlarm = useRef<HTMLAudioElement | null>(null);
  const longBreakAlarm = useRef<HTMLAudioElement | null>(null);
  const endAlarm = useRef<HTMLAudioElement | null>(null);

  const [isMute, setIsMute] = useState<boolean>(
    getLocalStorage(LOCALSORAGE_ITEM) === "true" ? true : false
  );

  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);

  useEffect(() => {
    focusAlarm.current = new Audio(focusMp3);
    shortBreakTAlarm.current = new Audio(shortBreakMp3);
    longBreakAlarm.current = new Audio(longBreakMp3);
    endAlarm.current = new Audio(endMp3);

    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
    };

    const audios = [
      focusAlarm.current,
      shortBreakTAlarm.current,
      longBreakAlarm.current,
      endAlarm.current
    ];

    audios.forEach((audio) => {
      if (audio) {
        audio.addEventListener("canplaythrough", handleCanPlayThrough, {
          once: true
        }); // 오디오가 중단 없이 끝까지 재생될 수 있도록 충분한 데이터를 로드
      }
    });

    return () => {
      audios.forEach((audio) => {
        if (audio) {
          audio.removeEventListener("canplaythrough", handleCanPlayThrough);
        }
      });
    };
  }, []);

  const _playAlarm = useCallback(
    (alarm: React.MutableRefObject<HTMLAudioElement | null>) => {
      if (audioLoaded && !isMute && alarm.current) {
        alarm.current.play().catch((err) => {
          console.error(err);
        });
      }
    },
    [audioLoaded, isMute]
  );

  const playFocusAlarm = () => _playAlarm(focusAlarm);
  const playShortBreakAlarm = () => _playAlarm(shortBreakTAlarm);
  const playLongBreakAlarm = () => _playAlarm(longBreakAlarm);
  const playEndAlarm = () => _playAlarm(endAlarm);

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
      if (focusAlarm.current) {
        focusAlarm.current.pause();
        focusAlarm.current.currentTime = 0;
      }
      if (shortBreakTAlarm.current) {
        shortBreakTAlarm.current.pause();
        shortBreakTAlarm.current.currentTime = 0;
      }
      if (longBreakAlarm.current) {
        longBreakAlarm.current.pause();
        longBreakAlarm.current.currentTime = 0;
      }
      if (endAlarm.current) {
        endAlarm.current.pause();
        endAlarm.current.currentTime = 0;
      }
    }
  }, [isMute]);

  return {
    playFocusAlarm,
    playShortBreakAlarm,
    playLongBreakAlarm,
    playEndAlarm,
    changeMute,
    isMute
  };
};

export default useAlarm;
