import { useState } from 'react';
import usePrevious from '../hooks/usePrevious';

function PreviousCounter() {
  const [count, setCount] = useState(0);

  const previousCount = usePrevious(count);

  return (
    <section>
      <h2>usePrevious</h2>

      <p>
        Текущее значение: <strong>{count}</strong>
      </p>

      <p>
        Предыдущее значение:{' '}
        <strong>
          {previousCount === undefined ? '—' : previousCount}
        </strong>
      </p>

      <button onClick={() => setCount(count + 1)}>
        Увеличить
      </button>
    </section>
  );
}

export default PreviousCounter;