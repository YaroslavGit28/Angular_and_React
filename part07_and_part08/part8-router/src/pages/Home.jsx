import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Главная страница</h1>

      <p>
        Добро пожаловать в приложение, созданное с использованием React Router.
      </p>

      <br />

      <Link to="/users">
        Перейти к пользователям →
      </Link>
    </div>
  );
}

export default Home;