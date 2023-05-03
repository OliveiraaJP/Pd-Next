import { object, string, InferType, number, } from 'yup';

export const reportSchema = object({
    description: string()
        .required('O campo descrição é obrigatório')
        .min(0, 'O campo descrição deve ter no mínimo 0 caracteres')
        .max(255, 'O campo descrição deve ter no máximo 255 caracteres'),
    spentHours: number()
        .required('O campo horas gastas é obrigatório')
        .min(1, 'O campo horas gastas deve ser no mínimo 1'),
    employeeId: number().required('O campo ID do funcionário é obrigatório'),
});


export type Report = InferType<typeof reportSchema>