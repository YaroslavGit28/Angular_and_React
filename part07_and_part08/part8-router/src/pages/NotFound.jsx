import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404</h1>

      <p>Страница не найдена.</p>

      <br />

      <Link to="/">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFound;