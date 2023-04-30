import { object, string, InferType, number } from 'yup';

export const squadSchema = object({
  name: string().required().min(0).max(255)
});

export const squadQuerySchema = object({
  squadId: number().required().min(0),
  startDate: string().required().matches(RegExp(/^\d{4}-\d{2}-\d{2}$/)),
  endDate: string().required().matches(RegExp(/^\d{4}-\d{2}-\d{2}$/))
}).strict()

export type Squad = InferType<typeof squadSchema>;
export type SquadQuery = InferType<typeof squadQuerySchema>;