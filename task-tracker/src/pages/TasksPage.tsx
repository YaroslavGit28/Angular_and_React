import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import {
  createTask,
  getTasks,
  Task,
} from "../api/tasks";

import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import EmptyState from "../components/EmptyState";

import { TaskFormData } from "../schemas/taskSchema";
import { useFavorites } from "../context/FavoritesContext";

export default function TasksPage() {
  const queryClient = useQueryClient();

  const { favorites } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createMutation = useMutation({
    mutationFn: createTask,

    onSuccess(newTask) {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
        newTask,
        ...old,
      ]);
    },
  });

  function handleCreate(data: TaskFormData) {
    createMutation.mutate({
      userId: 1,
      title: data.title,
      completed: data.completed,
    });
  }

  let tasks = data;

  if (filter === "favorites") {
    tasks = data.filter((task) => favorites.includes(task.id));
  }

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>Ошибка загрузки.</h2>;
  }

  return (
    <div>
      <h1>Задачи</h1>

      <TaskForm onSubmit={handleCreate} />

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => setSearchParams({})}
        >
          Все
        </button>

        <button
          onClick={() =>
            setSearchParams({
              filter: "favorites",
            })
          }
        >
          Избранные
        </button>
      </div>

      {data.length === 0 && (
        <EmptyState
          title="Задач пока нет. Создай первую!"
          hint="Добавь задачу через форму выше."
        />
      )}

      {filter === "favorites" &&
        favorites.length === 0 && (
          <EmptyState
            title="Ты пока ничего не добавил в избранное ⭐"
          />
        )}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}