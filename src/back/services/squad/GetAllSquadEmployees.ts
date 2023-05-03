import SquadRepository from "@/back/repositories/SquadRepository";

export default class GetAllSquadEmployees {
    public async execute({ id }: { id: number }) {
        const squadRepository = new SquadRepository();
        const allSquadEmployyes = await squadRepository.getAllEmployees({ id });
        return allSquadEmployyes;
    }
}