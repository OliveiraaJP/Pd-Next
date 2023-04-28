import { object, string, InferType } from 'yup';

export const squadSchema = object({
  name: string().required().min(0).max(255)
});

export type Squad = InferType<typeof squadSchema>;