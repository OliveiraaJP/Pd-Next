import { reportSchema } from "@/back/schemas/reportSchema";
import SendRequestError from "@/back/services/app/SendRequestErrorService";
import CreateReportService from "@/back/services/report/CreateReportService";
import { schemaValidator } from "@/back/shared/schemaValidator";
import AppError from "@/errors/AppError";
import RouteNotFoundError from "@/errors/RouteNotFoundError";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await handlePost(req, res);
    } else {
        const { message, statusCode } = new RouteNotFoundError()
        res.status(statusCode).json({ message })
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { description, employeeId, spentHours } = req.body
        const validateBody = await schemaValidator(reportSchema, req.body)
        if (validateBody.errors) {
            throw new AppError(validateBody.errors, 406)
        }
        const reportService = new CreateReportService()
        const newReport = await reportService.execute({ description, employeeId, spentHours })
        res.status(201).json({ message: "Report criado", data: newReport })
    } catch (error) {
        const sendRequestError = new SendRequestError()
        sendRequestError.execute({ res, error })
    }
}