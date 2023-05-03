import { object, string, InferType, number,  } from 'yup';

export const empoloyeeSchema = object({
  name: string()
    .required('O campo nome é obrigatório')
    .min(0, 'O campo nome deve ter no mínimo 0 caracteres')
    .max(255, 'O campo nome deve ter no máximo 255 caracteres'),
  estimatedHours: number()
    .required('O campo horas estimadas é obrigatório')
    .min(1, 'O campo horas estimadas deve ser no mínimo 1')
    .max(12, 'O campo horas estimadas deve ser no máximo 12'),
  squadId: number().required('O campo ID do squad é obrigatório'),
});

export type Employee = InferType<typeof empoloyeeSchema>