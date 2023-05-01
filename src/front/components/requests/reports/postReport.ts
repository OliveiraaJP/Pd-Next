import axios from "axios";

interface IPostReportRequest {
    body: object;
}

export async function postReport({ body }: IPostReportRequest) {
    console.log("Post report: ", body);
    const request = await axios.post('api/report', body);
    console.log("Na função post report: ", request);
    return await request.data;
}