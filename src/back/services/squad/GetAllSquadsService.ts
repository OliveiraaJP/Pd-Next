import SquadRepository from "@/back/repositories/SquadRepository";

export default class GetAllSquadsService{
    public async execute(){
        const squadRepository = new SquadRepository();
        const allSquads = await squadRepository.getAll();
        return allSquads;
    }
}