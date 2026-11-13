import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  return response.json();
}

async function fetchPost(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  return response.json();
}

function PostDetails() {
  const [selectedId, setSelectedId] = useState(null);

  const {
    data: posts = [],
    isLoading,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const {
    data: post,
    isLoading: loadingPost,
  } = useQuery({
    queryKey: ['posts', selectedId],
    queryFn: () => fetchPost(selectedId),
    enabled: !!selectedId,
  });

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <section>
      <h2>Посты</h2>

      <ul>
        {posts.slice(0, 10).map((item) => (
          <li
            key={item.id}
            style={{
              cursor: 'pointer',
              marginBottom: 10,
            }}
            onClick={() => setSelectedId(item.id)}
          >
            {item.title}
          </li>
        ))}
      </ul>

      {loadingPost && <p>Загрузка поста...</p>}

      {post && (
        <>
          <hr />

          <h3>{post.title}</h3>

          <p>{post.body}</p>
        </>
      )}
    </section>
  );
}

export default PostDetails;