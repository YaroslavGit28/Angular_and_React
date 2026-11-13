import { useEffect, useRef, useState } from 'react';

function InactiveTimer() {
  const timerRef = useRef(null);

  const [message, setMessage] = useState('');

  function resetTimer() {
    clearTimeout(timerRef.current);

    setMessage('');

    timerRef.current = setTimeout(() => {
      setMessage('👋 Всё ещё с нами?');
    }, 30000);
  }

  useEffect(() => {
    resetTimer();

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <section>
      <h2>Проверка активности</h2>

      <input
        placeholder="Начните печатать..."
        onChange={resetTimer}
      />

      {message && (
        <p
          style={{
            marginTop: 10,
            color: 'orange'
          }}
        >
          {message}
        </p>
      )}
    </section>
  );
}

export default InactiveTimer;