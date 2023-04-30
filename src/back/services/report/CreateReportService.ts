import EmployeeRepository from "@/back/repositories/EmployeeRepository";
import ReportRepository from "@/back/repositories/ReportRepository";
import AppError from "@/errors/AppError";

interface IRequest {
    description: string;
    employeeId: number;
    spentHours: number;
}

export default class CreateReportService {
    public async execute({ description, employeeId, spentHours }: IRequest) {
        const employeeRepository = new EmployeeRepository()
        const hasEmployee = await employeeRepository.getOne({ id: employeeId });
        if (!hasEmployee) {
            throw new AppError(`Employee com id:${employeeId} não existe`, 404);
        }
        const reportRepository = new ReportRepository();
        const newReport = await reportRepository.create({ description, employeeId, spentHours });
        return newReport;
    }
}