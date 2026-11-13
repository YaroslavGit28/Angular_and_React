import { useState } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getWeather() {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError('');
      setWeather(null);

      // 1. Поиск координат города
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Город не найден');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Получение погоды
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
      );

      const weatherData = await weatherResponse.json();

      setWeather({
        city: `${name}, ${country}`,
        temperature: weatherData.current.temperature_2m,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>🌤 Погода</h2>

      <input
        type="text"
        placeholder="Введите город"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>
        Найти
      </button>

      {loading && <p>Загрузка...</p>}

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {weather && (
        <div style={{ marginTop: 20 }}>
          <h3>{weather.city}</h3>

          <p>
            Температура: <strong>{weather.temperature}°C</strong>
          </p>
        </div>
      )}
    </section>
  );
}

export default Weather;