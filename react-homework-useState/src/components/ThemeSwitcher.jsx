import { useState, useEffect } from 'react';

function ThemeSwitcher() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.style.background = '#1e1e1e';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.background = '#f4f4f4';
      document.body.style.color = '#222222';
    }
  }, [dark]);

  return (
    <div className="theme">
      <h2>Упражнение 2. Переключатель темы</h2>

      <button onClick={() => setDark(!dark)}>
        {dark ? '☀️ Светлая тема' : '🌙 Темная тема'}
      </button>
    </div>
  );
}

export default ThemeSwitcher;