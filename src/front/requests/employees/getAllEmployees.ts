import axios from "axios";


export async function getAllEmployees() {
    const request = await axios.get('api/employee');
    console.log(request);
    return await request.data;
}