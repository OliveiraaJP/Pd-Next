import axios from "axios";


export async function getSquadEmployees({ id }: {id: number}) {
    const request = await axios.get('api/squad/' + id + '/members');
    return await request.data;
}