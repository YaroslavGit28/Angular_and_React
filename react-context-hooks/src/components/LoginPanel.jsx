import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginPanel() {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <section>
      <h2>Авторизация через Context</h2>

      {user ? (
        <>
          <p>Вы вошли как: {user.name}</p>

          <button onClick={logout}>
            Выйти
          </button>
        </>
      ) : (
        <>
          <p>Пользователь не авторизован.</p>

          <button onClick={login}>
            Войти
          </button>
        </>
      )}
    </section>
  );
}

export default LoginPanel;