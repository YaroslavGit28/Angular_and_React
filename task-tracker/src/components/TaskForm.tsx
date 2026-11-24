import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  TaskFormData,
  defaultTaskValues,
} from "../schemas/taskSchema";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({
  onSubmit,
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultTaskValues,
    mode: "onChange",
  });

  function submit(data: TaskFormData) {
    onSubmit(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      style={{
        marginBottom: 30,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <input
        placeholder="Название задачи..."
        {...register("title")}
      />

      {errors.title && (
        <span style={{ color: "red" }}>
          {errors.title.message}
        </span>
      )}

      <label>
        <input
          type="checkbox"
          {...register("completed")}
        />
        Выполнена
      </label>

      <button
        type="submit"
        disabled={!isValid}
      >
        Создать задачу
      </button>
    </form>
  );
}