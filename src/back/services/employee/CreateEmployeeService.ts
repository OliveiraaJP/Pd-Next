import EmployeeRepository from "@/back/repositories/EmployeeRepository";
import SquadRepository from "@/back/repositories/SquadRepository";
import AppError from "@/errors/AppError";

interface IRequest {
    name: string;
    estimatedHours: number;
    squadId: number;
}

export default class CreateEmployeeService {
    public async execute({ name, estimatedHours, squadId }: IRequest) {

        const squadRepository = new SquadRepository();
        const hasSquad = await squadRepository.getOne({ id: squadId });
        if (!hasSquad) {
            throw new AppError(`Squad com id:${squadId} nao existe`, 404);
        }

        const employeeRepository = new EmployeeRepository();
        const newEmployee = employeeRepository.create({ name, squadId, estimatedHours });
        return newEmployee;
    }
}