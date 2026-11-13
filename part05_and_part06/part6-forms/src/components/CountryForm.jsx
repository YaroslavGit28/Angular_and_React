import { useState } from 'react';

const cities = {
  Россия: ['Москва', 'Санкт-Петербург', 'Казань'],
  Германия: ['Берлин', 'Мюнхен', 'Гамбург'],
  Франция: ['Париж', 'Лион', 'Марсель'],
};

function CountryForm() {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const availableCities = country ? cities[country] : [];

  function handleSubmit(e) {
    e.preventDefault();

    if (!country || !city) {
      alert('Заполните все поля');
      return;
    }

    alert(`Страна: ${country}\nГород: ${city}`);
  }

  return (
    <section>
      <h2>Страна и город</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setCity('');
          }}
        >
          <option value="">Выберите страну</option>

          {Object.keys(cities).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!country}
        >
          <option value="">Выберите город</option>

          {availableCities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit">
          Сохранить
        </button>
      </form>
    </section>
  );
}

export default CountryForm;