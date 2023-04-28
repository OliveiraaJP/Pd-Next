import { empoloyeeSchema } from "@/back/schemas/empolyeeSchema";
import SendRequestError from "@/back/services/app/SendRequestErrorService";
import CreateEmployeeService from "@/back/services/employee/CreateEmployeeService";
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
        const { name, estimatedHours, squadId } = req.body
        const validateBody = await schemaValidator(empoloyeeSchema, req.body)
        if (validateBody.errors) {
            throw new AppError(validateBody.errors, 406)
        }
        const employeeService = new CreateEmployeeService()
        const newEmployee = await employeeService.execute({ name, estimatedHours, squadId })
        res.status(201).json({ message: "Employee criado", data: newEmployee })
    } catch (error) {
        const sendRequestError = new SendRequestError();
        sendRequestError.execute({ res, error });
    }
}