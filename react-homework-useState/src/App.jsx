import { useState } from 'react';

import Counter from './components/Counter';
import ThemeSwitcher from './components/ThemeSwitcher';
import LoginForm from './components/LoginForm';
import ShoppingList from './components/ShoppingList';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filters from './components/Filters';

function App() {

  // ==========================
  // Todo List
  // ==========================

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'Изучить React',
      done: true,
      priority: 'high',
      createdAt: Date.now()
    },
    {
      id: 2,
      text: 'Сделать домашнее задание',
      done: false,
      priority: 'medium',
      createdAt: Date.now() + 1
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');

  // ==========================
  // Добавление
  // ==========================

  function addTodo({ text, priority }) {

    const todo = {
      id: Date.now(),
      text,
      priority,
      done: false,
      createdAt: Date.now()
    };

    setTodos(prev => [...prev, todo]);

  }

  // ==========================
  // Выполнено
  // ==========================

  function toggleTodo(id) {

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );

  }

  // ==========================
  // Удаление
  // ==========================

  function deleteTodo(id) {

    setTodos(prev =>
      prev.filter(todo => todo.id !== id)
    );

  }

  // ==========================
  // Редактирование
  // ==========================

  function editTodo(id, text) {

    if (!text.trim()) return;

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text }
          : todo
      )
    );

  }

  // ==========================
  // Массовые операции
  // ==========================

  function completeAll() {

    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        done: true
      }))
    );

  }

  function removeCompleted() {

    setTodos(prev =>
      prev.filter(todo => !todo.done)
    );

  }

  function clearAll() {

    setTodos([]);

  }

  // ==========================
  // Фильтрация
  // ==========================

  let visibleTodos = [...todos];

  if (filter === 'active') {
    visibleTodos = visibleTodos.filter(t => !t.done);
  }

  if (filter === 'done') {
    visibleTodos = visibleTodos.filter(t => t.done);
  }

  if (priorityFilter !== 'all') {
    visibleTodos = visibleTodos.filter(
      t => t.priority === priorityFilter
    );
  }

  visibleTodos = visibleTodos.filter(todo =>
    todo.text
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (sort === 'alphabet') {

    visibleTodos.sort((a, b) =>
      a.text.localeCompare(b.text)
    );

  } else {

    visibleTodos.sort(
      (a, b) => b.createdAt - a.createdAt
    );

  }

  const done = todos.filter(t => t.done).length;
  const percent =
    todos.length === 0
      ? 0
      : Math.round(done / todos.length * 100);

  return (

    <div className="container">

      <h1>Домашняя работа React</h1>

      <Counter />

      <ThemeSwitcher />

      <LoginForm />

      <ShoppingList />

      <hr />

      <h2>Todo List</h2>

      <TodoForm onAdd={addTodo} />

      <input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      <button onClick={() => setSort('date')}>
        По дате
      </button>

      <button onClick={() => setSort('alphabet')}>
        По алфавиту
      </button>

      <Filters

        current={filter}

        onChange={setFilter}

        priority={priorityFilter}

        onPriorityChange={setPriorityFilter}

        counts={{
          all: todos.length,
          active: todos.filter(t => !t.done).length,
          done
        }}

      />

      <div className="progress">

        <div
          className="progress-bar"
          style={{
            width: percent + '%'
          }}
        />

      </div>

      <p>

        Выполнено {done} из {todos.length}
        ({percent}%)

      </p>

      <TodoList

        todos={visibleTodos}

        onToggle={toggleTodo}

        onDelete={deleteTodo}

        onEdit={editTodo}

      />

      <br />

      <button onClick={completeAll}>
        Отметить все
      </button>

      <button onClick={removeCompleted}>
        Удалить выполненные
      </button>

      <button onClick={clearAll}>
        Очистить всё
      </button>

    </div>

  );

}

export default App;