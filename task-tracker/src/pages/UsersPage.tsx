import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers(): Promise<User[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки пользователей");
  }

  return response.json();
}

export default function UsersPage() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>Ошибка загрузки.</h2>;
  }

  return (
    <div>
      <h1>Пользователи</h1>

      {data.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15,
            borderRadius: 8,
            background: "#fff",
          }}
        >
          <h3>{user.name}</h3>

          <p>{user.email}</p>

          <Link to={`/users/${user.id}`}>
            Подробнее →
          </Link>
        </div>
      ))}
    </div>
  );
}