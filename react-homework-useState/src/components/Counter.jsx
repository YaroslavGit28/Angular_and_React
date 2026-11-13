import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="counter">
      <h2>Упражнение 1. Счетчик с шагом</h2>

      <label>Шаг: </label>

      <input
        type="number"
        min="1"
        value={step}
        onChange={(e) =>
          setStep(Number(e.target.value) || 1)
        }
      />

      <h3>{count}</h3>

      <button onClick={() => setCount(count - step)}>
        −
      </button>

      <button onClick={() => setCount(count + step)}>
        +
      </button>
    </div>
  );
}

export default Counter;