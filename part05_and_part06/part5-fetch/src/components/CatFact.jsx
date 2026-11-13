import { useEffect, useState } from 'react';

function CatFact() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadFact() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://catfact.ninja/fact');

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await response.json();

      setFact(data.fact);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFact();
  }, []);

  return (
    <section>
      <h2>🐱 Случайный факт о кошках</h2>

      {loading && <p>Загрузка...</p>}

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <p>{fact}</p>
      )}

      <button
        onClick={loadFact}
        disabled={loading}
      >
        Ещё факт
      </button>
    </section>
  );
}

export default CatFact;