import ISquad from "@/interfaces/models/ISquad";
import { prisma } from "../config/database";

export default class SquadRepository {
    public async create({ name }: ISquad) {
        return await prisma.squad.create({ data: { name } })
    }
}