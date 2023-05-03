import axios from "axios";

interface IgetSquadDetails {
    squadId: number;
    startDate: string;
    endDate: string;
}

export async function getSquadDetails({ squadId, startDate, endDate }: IgetSquadDetails) {
    const request = await axios.get(`api/squad/${squadId}?startDate=${startDate}&endDate=${endDate}`);
    return await request.data;
}