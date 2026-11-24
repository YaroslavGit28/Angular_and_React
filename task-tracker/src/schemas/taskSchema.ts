import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(100, "Максимум 100 символов"),

  completed: z.boolean(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const defaultTaskValues: TaskFormData = {
  title: "",
  completed: false,
};