import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: 'Ноутбук',
    price: 50000,
  },
  {
    id: 2,
    name: 'Мышь',
    price: 2500,
  },
  {
    id: 3,
    name: 'Клавиатура',
    price: 5000,
  },
];

function ProductList() {
  const { items, dispatch, total } =
    useContext(CartContext);

  return (
    <section>
      <h2>Корзина</h2>

      <h3>Товары</h3>

      {products.map((product) => (
        <div key={product.id}>
          {product.name} — {product.price} ₽

          <button
            onClick={() =>
              dispatch({
                type: 'ADD',
                payload: product,
              })
            }
          >
            Добавить
          </button>
        </div>
      ))}

      <hr />

      <h3>Товары в корзине</h3>

      {items.length === 0 && (
        <p>Корзина пуста.</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          style={{ marginBottom: 15 }}
        >
          <strong>{item.name}</strong>

          <p>
            Количество: {item.quantity}
          </p>

          <p>
            Стоимость:{' '}
            {item.price * item.quantity} ₽
          </p>

          <button
            onClick={() =>
              dispatch({
                type: 'INCREMENT',
                payload: item.id,
              })
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch({
                type: 'DECREMENT',
                payload: item.id,
              })
            }
          >
            -
          </button>

          <button
            onClick={() =>
              dispatch({
                type: 'REMOVE',
                payload: item.id,
              })
            }
          >
            Удалить
          </button>

          <hr />
        </div>
      ))}

      <h2>Итого: {total} ₽</h2>
    </section>
  );
}

export default ProductList;