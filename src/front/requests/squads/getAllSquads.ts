import axios from "axios";


export async function getAllSquads() {
    const request = await axios.get('api/squad');
    console.log(request);
    return await request.data;
}