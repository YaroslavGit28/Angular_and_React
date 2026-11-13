import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeSwitcher() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section>

      <h2>Переключение темы</h2>

      <p>

        Текущая тема:

        <strong> {theme}</strong>

      </p>

      <button onClick={toggleTheme}>
        Сменить тему
      </button>

    </section>
  );
}

export default ThemeSwitcher;