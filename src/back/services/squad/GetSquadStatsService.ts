import SquadRepository from "@/back/repositories/SquadRepository";
import AppError from "@/errors/AppError";
import { Employee, Report } from "@prisma/client";

interface IRequest {
    id: number,
    startDate: Date,
    endDate: Date
}

interface EmployeeWithTotalHours extends Employee {
    totalWorkHours: number;
    averageWorkHoursPerDay: number
}

export class GetSquadStatsService {
    public async execute({ id, startDate, endDate }: IRequest) {
        const squadRepository = new SquadRepository()

        const hasSquad = await squadRepository.getOne({ id });
        if(!hasSquad){
            throw new AppError(`Squad com id:${id} não existe`, 404)
        }

        const squadStats = await squadRepository.getSquadReports({ id, startDate, endDate });
        return squadStats;
    }

    public transformQueryStringToDate({ startDate, endDate }: { startDate: string, endDate: string }) {
        const dateStartDate = new Date(startDate);
        dateStartDate.setUTCHours(0);
        dateStartDate.setUTCMinutes(0);
        dateStartDate.setUTCSeconds(0);
        dateStartDate.setUTCMilliseconds(0);

        const dateEndDate = new Date(endDate);
        dateEndDate.setUTCHours(23);
        dateEndDate.setUTCMinutes(59);
        dateEndDate.setUTCSeconds(59);
        dateEndDate.setUTCMilliseconds(999);

        return { dateStartDate, dateEndDate }
    }

    public sumTotalHours({ allSquadInfo, timeDiff }: { allSquadInfo: (Employee & { reports: Report[]; })[], timeDiff: number }) {
        let totalSquadHours = 0
        const newAllSquadInfo: (EmployeeWithTotalHours & { reports: Report[] })[] = []
        allSquadInfo.forEach(member => {
            let totalWorkPerMember = 0
            member.reports?.forEach(report => {
                totalSquadHours += report.spentHours
                totalWorkPerMember += report.spentHours
            })
            newAllSquadInfo.push({
                id: member.id,
                name: member.name,
                estimatedHours: member.estimatedHours,
                totalWorkHours: totalWorkPerMember,
                averageWorkHoursPerDay: Math.round(totalWorkPerMember / timeDiff),
                squadId: member.squadId,
                reports: member.reports
            })
        })
        return { totalSquadHours: Math.round(totalSquadHours), newAllSquadInfo }
    }

    public averageHoursPerDay({ totalSquadHours, timeDiff }: { totalSquadHours: number, timeDiff: number }) {
        return Math.round(totalSquadHours / timeDiff)
    }

    public subtractEndDateFromStartDate({ startDate, endDate }: { startDate: string, endDate: string }) {
        const dateStartDate = new Date(startDate);
        dateStartDate.setUTCHours(0);
        dateStartDate.setUTCMinutes(0);
        dateStartDate.setUTCSeconds(0);
        dateStartDate.setUTCMilliseconds(0);

        const dateEndDate = new Date(endDate);
        dateEndDate.setUTCHours(0);
        dateEndDate.setUTCMinutes(0);
        dateEndDate.setUTCSeconds(0);
        dateEndDate.setUTCMilliseconds(1);

        const timeDiff = Math.abs(dateEndDate.getTime() - dateStartDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));  //Ms * S * Min * H
        return diffDays;
    }
}