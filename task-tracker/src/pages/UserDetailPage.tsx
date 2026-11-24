import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

async function getUser(id: number): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки пользователя");
  }

  return response.json();
}

export default function UserDetailPage() {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>Ошибка загрузки.</h2>;
  }

  if (!user) {
    return <h2>Пользователь не найден.</h2>;
  }

  return (
    <div>
      <Link to="/users">← Назад</Link>

      <h1>{user.name}</h1>

      <p>
        <strong>Логин:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Телефон:</strong> {user.phone}
      </p>

      <p>
        <strong>Сайт:</strong> {user.website}
      </p>
    </div>
  );
}