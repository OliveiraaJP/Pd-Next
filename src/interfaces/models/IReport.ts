export default interface IReport {
    id?: number;
    description: string;
    employeeId: number;
    spentHours: number;
    createdAt?: Date;
}