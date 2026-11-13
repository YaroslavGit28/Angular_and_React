import { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, [page]);

  async function loadPosts() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await response.json();
      setPosts(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>📄 Список постов</h2>

      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ← Назад
        </button>

        <span style={{ margin: '0 15px' }}>
          Страница {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
        >
          Вперед →
        </button>
      </div>

      {loading && <p>Загрузка...</p>}

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>

            <p>{post.body}</p>
          </li>
        ))}
      </ul>

    </section>
  );
}

export default Posts;