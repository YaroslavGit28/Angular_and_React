import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();

    if (!trimmed) return;

    onAdd(trimmed);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
      }}
    >
      <input
        type="text"
        placeholder="Введите новую задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 }}
      />

      <button type="submit">
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;