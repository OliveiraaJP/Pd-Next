import EmployeeRepository from "@/back/repositories/EmployeeRepository";

export default class GetAllEmployeesService {
    public async execute(){
        const employeeRepository = new EmployeeRepository();
        const allEmployees = await employeeRepository.getAll();
        return allEmployees;
    }
}