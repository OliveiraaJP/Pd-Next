import { object, string, InferType, number,  } from 'yup';

export const reportSchema = object({
    description: string().required().min(0).max(255),
    spentHours: number().required().min(1),
    employeeId: number().required()
})

export type Report = InferType<typeof reportSchema>