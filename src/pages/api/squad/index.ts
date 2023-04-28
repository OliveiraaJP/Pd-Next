import { squadSchema } from "@/back/schemas/squadSchema";
import SendRequestError from "@/back/services/app/SendRequestErrorService";
import CreateSquadService from "@/back/services/squad/CreateSquadService";
import { schemaValidator } from "@/back/shared/schemaValidator";
import AppError from "@/errors/AppError";
import RouteNotFoundError from "@/errors/RouteNotFoundError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await handlePost(req, res);
    } else {
        const { statusCode, message } = new RouteNotFoundError()
        res.status(statusCode).json({ message })
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name } = req.body

        const validateBody = await schemaValidator(squadSchema, req.body)
        if (validateBody.errors) {
            throw new AppError(validateBody.errors, 406)
        }
        const createSquadService = new CreateSquadService()
        const newSquad = await createSquadService.execute({ name })

        res.status(201).json({ message: "Squad criado", data: newSquad })

    } catch (error) {
        const sendRequestError = new SendRequestError();
        sendRequestError.execute({ res, error });
    }
}