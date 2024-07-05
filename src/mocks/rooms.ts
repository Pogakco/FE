import { http, HttpResponse } from "msw";

export const mock_fetchRooms = http.get("/api/Mockrooms", () => {
    return HttpResponse.json({
        data: [
            {
                roomId: 1,
                roomTitle: "Room 1",
                roomDescription: "Description for Room 1",
                totalCycles: 5,
                currentCycles: 2,
                focusTime: 25,
                shortBreakTime: 5,
                longBreakTime: 15,
                isRunning: true,
                maxParticipants: 10,
                currentParticipants: 5,
                ownerName: "Owner 1",
                ownerProfileImageUrl: "https://example.com/owner1.jpg"
            },
            {
                roomId: 2,
                roomTitle: "Room 2",
                roomDescription: "Description for Room 2",
                totalCycles: 6,
                currentCycles: 3,
                focusTime: 30,
                shortBreakTime: 5,
                longBreakTime: 20,
                isRunning: false,
                maxParticipants: 8,
                currentParticipants: 4,
                ownerName: "Owner 2",
                ownerProfileImageUrl: "https://example.com/owner2.jpg"
            },
            {
                roomId: 3,
                roomTitle: "Room 3",
                roomDescription: "Description for Room 3",
                totalCycles: 4,
                currentCycles: 1,
                focusTime: 20,
                shortBreakTime: 5,
                longBreakTime: 10,
                isRunning: true,
                maxParticipants: 12,
                currentParticipants: 6,
                ownerName: "Owner 3",
                ownerProfileImageUrl: "https://example.com/owner3.jpg"
            },
            {
                roomId: 4,
                roomTitle: "Room 4",
                roomDescription: "Description for Room 4",
                totalCycles: 7,
                currentCycles: 4,
                focusTime: 25,
                shortBreakTime: 5,
                longBreakTime: 15,
                isRunning: false,
                maxParticipants: 15,
                currentParticipants: 10,
                ownerName: "Owner 4"
            },
            {
                roomId: 5,
                roomTitle: "Room 5",
                roomDescription: "Description for Room 5",
                totalCycles: 5,
                currentCycles: 2,
                focusTime: 35,
                shortBreakTime: 10,
                longBreakTime: 20,
                isRunning: true,
                maxParticipants: 5,
                currentParticipants: 3,
                ownerName: "Owner 5",
                ownerProfileImageUrl: "https://example.com/owner5.jpg"
            },
            {
                roomId: 6,
                roomTitle: "Room 6",
                roomDescription: "Description for Room 6",
                totalCycles: 3,
                currentCycles: 1,
                focusTime: 15,
                shortBreakTime: 5,
                longBreakTime: 10,
                isRunning: false,
                maxParticipants: 20,
                currentParticipants: 10,
                ownerName: "Owner 6",
                ownerProfileImageUrl: "https://example.com/owner6.jpg"
            },
            {
                roomId: 7,
                roomTitle: "Room 7",
                roomDescription: "Description for Room 7",
                totalCycles: 6,
                currentCycles: 3,
                focusTime: 25,
                shortBreakTime: 5,
                longBreakTime: 15,
                isRunning: true,
                maxParticipants: 8,
                currentParticipants: 5,
                ownerName: "Owner 7",
                ownerProfileImageUrl: "https://example.com/owner7.jpg"
            },
            {
                roomId: 8,
                roomTitle: "Room 8",
                roomDescription: "Description for Room 8",
                totalCycles: 4,
                currentCycles: 2,
                focusTime: 20,
                shortBreakTime: 5,
                longBreakTime: 10,
                isRunning: false,
                maxParticipants: 10,
                currentParticipants: 7,
                ownerName: "Owner 8",
                ownerProfileImageUrl: "https://example.com/owner8.jpg"
            },
            {
                roomId: 9,
                roomTitle: "Room 9",
                roomDescription: "Description for Room 9",
                totalCycles: 5,
                currentCycles: 3,
                focusTime: 30,
                shortBreakTime: 5,
                longBreakTime: 20,
                isRunning: true,
                maxParticipants: 12,
                currentParticipants: 8,
                ownerName: "Owner 9",
                ownerProfileImageUrl: "https://example.com/owner9.jpg"
            }
        ],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalElements: 9,
            limit: 9
        }
    }, { status: 200 });
});
