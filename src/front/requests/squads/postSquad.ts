import axios from "axios";

interface IPostSquadRequest {
    body: object;
}

export async function postSquad({ body }: IPostSquadRequest) {
    const request = await axios.post('api/squad', body);
    return await request.data;
}