import axios from "axios";


export async function getAllEmployees() {
    const request = await axios.get('api/employee');
    return await request.data;
}