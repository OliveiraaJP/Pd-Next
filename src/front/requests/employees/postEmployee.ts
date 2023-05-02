import axios from "axios";

interface IPostEmployeeRequest {
    body: object;
}

export async function postEmployee({ body }: IPostEmployeeRequest) {
    const request = await axios.post('api/employee', body);
    return await request.data;
}