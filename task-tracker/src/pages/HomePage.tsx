import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>Task Tracker</h1>

      <p style={{ marginTop: 20 }}>
        Добро пожаловать в приложение для управления задачами.
      </p>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
        }}
      >
        <Link to="/tasks">
          Перейти к задачам
        </Link>

        <Link to="/users">
          Пользователи
        </Link>
      </div>
    </div>
  );
}