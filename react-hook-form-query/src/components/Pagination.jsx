import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  return response.json();
}

function Pagination() {
  const [page, setPage] = useState(1);

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
  });

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (isError) {
    return <p>Ошибка загрузки данных.</p>;
  }

  return (
    <section>
      <h2>Пагинация постов</h2>

      <p>Страница: {page}</p>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>

      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
      >
        Назад
      </button>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        style={{ marginLeft: '10px' }}
      >
        Вперёд
      </button>
    </section>
  );
}

export default Pagination;