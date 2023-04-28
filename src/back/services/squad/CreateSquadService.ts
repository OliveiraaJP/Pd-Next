import SquadRepository from "@/back/repositories/SquadRepository";

interface IRequest {
    name: string
}

export default class CreateSquadService {
    public async execute({ name }: IRequest) {
        const squadRepository = new SquadRepository();
        const newSquad = await squadRepository.create({ name });
        return newSquad;
    }
}