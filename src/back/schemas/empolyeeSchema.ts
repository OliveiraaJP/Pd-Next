import { object, string, InferType, number,  } from 'yup';

export const empoloyeeSchema = object({
    name: string().required().min(0).max(255),
    estimatedHours: number().required().min(1).max(12),
    squadId: number().required()
})

export type Employee = InferType<typeof empoloyeeSchema>