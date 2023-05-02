import axios from "axios";

interface IPostReportRequest {
    body: object;
}

export async function postReport({ body }: IPostReportRequest) {
    const request = await axios.post('api/report', body);
    return await request.data;
}