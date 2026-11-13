import { useState } from 'react';

function ShoppingList() {
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);

  function addProduct() {
    if (!product.trim()) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: product
      }
    ]);

    setProduct('');
  }

  function deleteProduct(id) {
    setProducts(products.filter(item => item.id !== id));
  }

  return (
    <div>
      <h2>Упражнение 4. Список покупок</h2>

      <input
        type="text"
        placeholder="Введите товар"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <button onClick={addProduct}>
        Добавить
      </button>

      <div style={{ marginTop: '15px' }}>
        {products.length === 0 ? (
          <p>Список пуст.</p>
        ) : (
          products.map(item => (
            <div
              key={item.id}
              className="shopping-item"
            >
              <span>{item.name}</span>

              <button
                onClick={() => deleteProduct(item.id)}
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShoppingList;