import { memo, useState } from 'react';

const Item = memo(function Item({ name }) {
  console.log(`Рендер элемента: ${name}`);

  return <li>{name}</li>;
});

function MemoList() {
  const [count, setCount] = useState(0);

  const users = [
    'Анна',
    'Иван',
    'Мария',
    'Дмитрий',
    'Ольга',
  ];

  return (
    <section>
      <h2>Оптимизация списка (React.memo)</h2>

      <p>Счетчик: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Увеличить счетчик
      </button>

      <ul>
        {users.map((user) => (
          <Item
            key={user}
            name={user}
          />
        ))}
      </ul>
    </section>
  );
}

export default MemoList;