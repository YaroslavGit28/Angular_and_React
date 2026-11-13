function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      <span
        className={todo.done ? 'done' : ''}
        style={{ flex: 1 }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: 'crimson'
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;