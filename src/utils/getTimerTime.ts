export const getTimerTime = (
    differTime: number,
    focusTime: number,
    breakTime: number,
    totalCycles: number,
    longBreakTime: number
): number => {
    const cycleDuration = focusTime + breakTime;
    const totalCycleTime = cycleDuration * totalCycles;
    const totalCycleAndLongBreakTime = totalCycleTime + longBreakTime;

    if (differTime > totalCycleAndLongBreakTime) {
        return -1; // 타이머 끝을 알리는 변수입니다
    } else if (differTime >= totalCycleTime) {
        return (totalCycleAndLongBreakTime-differTime);
    }

    const remainderTime = differTime % cycleDuration;

    if (remainderTime < focusTime) {
        // 현재 focusTime 구간
        return (focusTime - remainderTime);
    } else {
        // 현재 breakTime 구간
        return (cycleDuration - remainderTime);
    }
}
