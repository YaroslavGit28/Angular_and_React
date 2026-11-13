import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    alert(`Email: ${email}\nПароль: ${password}`);

    setEmail('');
    setPassword('');
  }

  return (
    <div className="login">
      <h2>Упражнение 3. Форма входа</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!email || !password}
        >
          Войти
        </button>

      </form>
    </div>
  );
}

export default LoginForm;