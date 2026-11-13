import { Link, useNavigate, useParams } from 'react-router-dom';

const users = {
  1: {
    name: 'Анна',
    email: 'anna@mail.ru',
    city: 'Москва'
  },
  2: {
    name: 'Пётр',
    email: 'petr@mail.ru',
    city: 'Санкт-Петербург'
  },
  3: {
    name: 'Мария',
    email: 'maria@mail.ru',
    city: 'Казань'
  }
};

function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = users[userId];

  if (!user) {
    return (
      <div>
        <h1>Пользователь не найден</h1>

        <p>ID: {userId}</p>

        <button onClick={() => navigate('/users')}>
          Вернуться к списку
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Город:</strong> {user.city}
      </p>

      <br />

      <button onClick={() => navigate(-1)}>
        ← Назад
      </button>

      {' '}

      <Link to="/users">
        Все пользователи
      </Link>
    </div>
  );
}

export default UserProfile;