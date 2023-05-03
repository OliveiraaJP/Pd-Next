import ISquad from "@/interfaces/models/ISquad";
import { prisma } from "../config/database";

export default class SquadRepository {
    public async create({ name }: ISquad) {
        return await prisma.squad.create({ data: { name } })
    }

    public async getOne({ id }: { id: number }) {
        return await prisma.squad.findFirst({ where: { id } })
    }

    public async getAllEmployees({ id }: { id: number }) {
        return await prisma.employee.findMany({ where: { squadId: id } })
    }

    public async getAll() {
        return await prisma.squad.findMany()
    }

    public async getSquadReports({ id, startDate, endDate }: { id: number, startDate: Date, endDate: Date }) {
        return await prisma.employee.findMany({
            where: { squadId: id },
            include: {
                reports: {
                    where: {
                        createdAt: {
                            gte: startDate,
                            lte: endDate
                        }
                    }
                }
            }
        })
    }
}