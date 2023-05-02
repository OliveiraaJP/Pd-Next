import IEmployee from "@/interfaces/models/IEmployee";
import { prisma } from "../config/database";

export default class EmployeeRepository {
    public async create({ name, squadId, estimatedHours }: IEmployee) {
        return await prisma.employee.create({ data: { name, estimatedHours, squadId } });
    }

    public async getOne({ id }: { id: number }) {
        return await prisma.employee.findFirst({ where: { id } });
    }

    public async getAll() {
        return await prisma.employee.findMany();
    }
}