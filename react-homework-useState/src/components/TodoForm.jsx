import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    onAdd({
      text: text.trim(),
      priority
    });

    setText('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Введите задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">Высокий</option>
        <option value="medium">Средний</option>
        <option value="low">Низкий</option>
      </select>

      <button type="submit">
        Добавить
      </button>

    </form>
  );
}

export default TodoForm;