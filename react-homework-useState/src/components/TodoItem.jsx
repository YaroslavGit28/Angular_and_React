import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  function save() {
    if (!value.trim()) {
      alert('Название задачи не может быть пустым!');
      return;
    }

    onEdit(todo.id, value.trim());
    setEditing(false);
  }

  return (
    <div className="todo-item">
      <div className="todo-left">

        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />

        {editing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span className={todo.done ? 'done' : ''}>
            {todo.text}
          </span>
        )}

        <span className={`priority-${todo.priority}`}>
          {todo.priority === 'high'
            ? 'Высокий'
            : todo.priority === 'medium'
            ? 'Средний'
            : 'Низкий'}
        </span>

      </div>

      <div>

        {editing ? (
          <>
            <button onClick={save}>
              Сохранить
            </button>

            <button
              onClick={() => {
                setValue(todo.text);
                setEditing(false);
              }}
            >
              Отмена
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>
            Редактировать
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
        >
          Удалить
        </button>

      </div>
    </div>
  );
}

export default TodoItem;
