import { useEffect, useState } from 'react';

function Search() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  // Debounce 500 мс
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  const users = [
    'Анна',
    'Пётр',
    'Мария',
    'Иван',
    'Екатерина',
    'Дмитрий',
    'Ольга',
    'Алексей',
    'Максим',
    'Наталья'
  ];

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <h2>🔍 Поиск с debounce</h2>

      <input
        type="text"
        placeholder="Введите имя..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p style={{ marginTop: 10 }}>
        Поисковый запрос: <strong>{query || '—'}</strong>
      </p>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </section>
  );
}

export default Search;