import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

import Notes from './components/Notes';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const STORAGE_KEY = 'todos-v1';

function App() {
  // Todo с сохранением
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);

  // Счетчик с сохранением
  const [count, setCount] = useLocalStorage('counter', 0);

  // Тема с сохранением
  const [theme, setTheme] = useLocalStorage('theme', 'light');


  function addTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  }

  function clearAll() {
    if (window.confirm('Удалить все задачи?')) {
      setTodos([]);
    }
  }

  function resetStorage() {
    if (window.confirm('Очистить все сохраненные данные?')) {
      localStorage.clear();
      setTodos([]);
      setCount(0);
      setTheme('light');
      localStorage.removeItem('note');
    }
  }

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div
      className="container"
      style={{
        background: theme === 'dark' ? '#222' : '#fff',
        color: theme === 'dark' ? '#fff' : '#222'
      }}
    >
      <h1>📘 Часть 7. localStorage</h1>

      <hr />

      <h2>1. Счетчик</h2>

      <h3>{count}</h3>

      <button onClick={() => setCount(count - 1)}>
        -
      </button>

      <button onClick={() => setCount(count + 1)}>
        +
      </button>

      <hr />

      <h2>2. Переключение темы</h2>

      <button
        onClick={() =>
          setTheme(
            theme === 'light'
              ? 'dark'
              : 'light'
          )
        }
      >
        {theme === 'light'
          ? 'Темная тема'
          : 'Светлая тема'}
      </button>

      <hr />

      <Notes />

      <hr />

      <h2>4. Todo List</h2>

      <TodoForm onAdd={addTodo} />

      <p>
        Всего: {todos.length} |
        Выполнено: {doneCount}
      </p>

      {todos.length === 0 ? (
        <p>Задач пока нет.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      <br />

      <button onClick={clearAll}>
        Очистить задачи
      </button>

      <button
        onClick={resetStorage}
        style={{
          marginLeft: '10px',
          background: 'crimson'
        }}
      >
        Сбросить всё
      </button>
    </div>
  );
}

export default App;