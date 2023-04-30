import { squadQuerySchema } from "@/back/schemas/squadSchema";
import SendRequestError from "@/back/services/app/SendRequestErrorService";
import { GetSquadStatsService } from "@/back/services/squad/GetSquadStatsService";
import { dateValidator } from "@/back/shared/dateValidator";
import { schemaValidator } from "@/back/shared/schemaValidator";
import AppError from "@/errors/AppError";
import RouteNotFoundError from "@/errors/RouteNotFoundError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await handleGet(req, res);
    } else {
        const { statusCode, message } = new RouteNotFoundError()
        res.status(statusCode).json({ message })
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { squadId, startDate, endDate } = req.query;
        const numSquadId = Number(squadId)

        if (typeof startDate !== 'string' || typeof endDate !== 'string') {
            throw new AppError('startDate e endDate devem ser strings não vazias', 406);
        }

        const validateBody = await schemaValidator(squadQuerySchema, { squadId: numSquadId, startDate, endDate })
        if (validateBody.errors) {
            throw new AppError(validateBody.errors, 406)
        }

        const validateDate = dateValidator({ startDate, endDate })
        if (validateDate.errors) {
            throw new AppError(validateDate.errors, 406)
        }

        const getSquadStatsService = new GetSquadStatsService()
        const { dateStartDate, dateEndDate } = getSquadStatsService.transformQueryStringToDate({ startDate, endDate })

        const allSquadInfo = await getSquadStatsService.execute({ id: numSquadId, startDate: dateStartDate, endDate: dateEndDate })

        const timeDiff = getSquadStatsService.subtractEndDateFromStartDate({ startDate, endDate });
        const { totalSquadHours, newAllSquadInfo } = getSquadStatsService.sumTotalHours({ allSquadInfo, timeDiff });
        const averageSquadHoursPerDay = getSquadStatsService.averageHoursPerDay({ timeDiff, totalSquadHours });

        const response = { totalSquadHours, averageSquadHoursPerDay, members: newAllSquadInfo }
        
        res.status(200).json({ message: "Squad recebido!", data: response });
    } catch (error) {
        const sendRequestError = new SendRequestError();
        sendRequestError.execute({ res, error });
    }
}