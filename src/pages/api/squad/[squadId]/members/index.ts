import { squadQuerySchema } from "@/back/schemas/squadSchema";
import SendRequestError from "@/back/services/app/SendRequestErrorService";
import GetAllSquadEmployees from "@/back/services/squad/GetAllSquadEmployees";
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
        const { squadId } = req.query;
        const numSquadId = Number(squadId)

        if (typeof numSquadId !== 'number') {
            throw new AppError('id do squad deve ser um número não vazio', 406);
        }

        const squadService = new GetAllSquadEmployees()
        const response = await squadService.execute({ id: numSquadId })

        res.status(200).json({ message: "Squad recebido!", data: response });
    } catch (error) {
        const sendRequestError = new SendRequestError();
        sendRequestError.execute({ res, error });
    }
}