import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const users = [
  'Анна',
  'Иван',
  'Мария',
  'Павел',
  'Екатерина',
  'Дмитрий',
  'Ольга',
  'Максим',
];

function Search() {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);

  const debouncedText = useDebounce(text, 500);

  useEffect(() => {
    setTyping(true);
  }, [text]);

  useEffect(() => {
    setTyping(false);
  }, [debouncedText]);

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(debouncedText.toLowerCase())
  );

  return (
    <section>
      <h2>Поиск с useDebounce</h2>

      <input
        type="text"
        placeholder="Введите имя..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {typing && <p>Печатает...</p>}

      <ul>
        {filteredUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </section>
  );
}

export default Search;