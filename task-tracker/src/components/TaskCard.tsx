import { memo } from "react";
import { Link } from "react-router-dom";
import { Task } from "../api/tasks";
import { useFavorites } from "../context/FavoritesContext";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  console.log("TaskCard render:", task.id);

  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(task.id);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div>
          <h3>{task.title}</h3>

          <p>
            Статус:{" "}
            <strong>
              {task.completed ? "✅ Выполнена" : "⏳ В работе"}
            </strong>
          </p>
        </div>

        <button
          onClick={() => toggleFavorite(task.id)}
          style={{
            fontSize: 24,
            border: "none",
            background: "transparent",
          }}
        >
          {favorite ? "⭐" : "☆"}
        </button>
      </div>

      <div
        style={{
          marginTop: 15,
        }}
      >
        <Link to={`/tasks/${task.id}`}>
          Подробнее →
        </Link>
      </div>
    </div>
  );
}

export default memo(TaskCard);