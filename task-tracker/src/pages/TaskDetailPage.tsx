import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getTask } from "../api/tasks";

export default function TaskDetailPage() {
  const { id } = useParams();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>Ошибка загрузки задачи.</h2>;
  }

  if (!task) {
    return <h2>Задача не найдена.</h2>;
  }

  return (
    <div>
      <Link to="/tasks">← Назад</Link>

      <h1 style={{ marginTop: 20 }}>{task.title}</h1>

      <p>
        <strong>ID:</strong> {task.id}
      </p>

      <p>
        <strong>Пользователь:</strong> {task.userId}
      </p>

      <p>
        <strong>Статус:</strong>{" "}
        {task.completed ? "Выполнена" : "Не выполнена"}
      </p>
    </div>
  );
}