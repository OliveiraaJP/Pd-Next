import axios from "axios";


export async function getAllSquads() {
    const request = await axios.get('api/squad');
    return await request.data;
}