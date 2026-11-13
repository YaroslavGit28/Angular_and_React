import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Notes() {
  const [savedNote, setSavedNote] = useLocalStorage('note', '');
  const [text, setText] = useState(savedNote);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setSaved(false);

    const timer = setTimeout(() => {
      setSavedNote(text);
      setSaved(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [text, setSavedNote]);

  return (
    <div style={{ margin: '25px 0' }}>
      <h2>Черновик заметки</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст..."
      />

      <p
        style={{
          marginTop: '10px',
          color: saved ? 'green' : 'gray'
        }}
      >
        {saved ? '✓ Сохранено' : 'Сохранение...'}
      </p>
    </div>
  );
}

export default Notes;