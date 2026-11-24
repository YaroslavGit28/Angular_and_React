import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 80,
      }}
    >
      <h1>404</h1>

      <h2>Страница не найдена</h2>

      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}