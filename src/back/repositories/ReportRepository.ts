import IReport from "@/interfaces/models/IReport";
import { prisma } from "../config/database";

export default class ReportRepository {
    public async create({ description, employeeId, spentHours }: IReport) {
        return await prisma.report.create({ data: { description, spentHours, employeeId } });
    }
}