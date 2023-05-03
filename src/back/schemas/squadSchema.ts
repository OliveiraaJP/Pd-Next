import { object, string, InferType, number } from 'yup';

export const squadSchema = object({
  name: string().required('O nome da squad é obrigatório.')
    .min(0, 'O nome da squad deve ter no mínimo 0 caracteres.')
    .max(255, 'O nome da squad deve ter no máximo 255 caracteres.')
});

export const squadQuerySchema = object({
  squadId: number().required('O id da squad é obrigatório.')
    .min(0, 'O id da squad deve ser maior ou igual a 0.'),
  startDate: string().required('A data de início é obrigatória.')
    .matches(RegExp(/^\d{4}-\d{2}-\d{2}$/), 'A data de início deve estar no formato YYYY-MM-DD.'),
  endDate: string().required('A data de término é obrigatória.')
    .matches(RegExp(/^\d{4}-\d{2}-\d{2}$/), 'A data de término deve estar no formato YYYY-MM-DD.')
}).strict()

export type Squad = InferType<typeof squadSchema>;
export type SquadQuery = InferType<typeof squadQuerySchema>;