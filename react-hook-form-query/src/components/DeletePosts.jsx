import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

async function fetchPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки');
  }

  return response.json();
}

async function deletePost(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: 'DELETE',
    }
  );

  // Для демонстрации оптимистичного обновления
  // можно раскомментировать следующую строку:
  // throw new Error('Ошибка удаления');

  if (!response.ok) {
    throw new Error('Ошибка удаления');
  }

  return id;
}

function DeletePosts() {
  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ['delete-posts'],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: deletePost,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ['delete-posts'],
      });

      const previousPosts = queryClient.getQueryData([
        'delete-posts',
      ]);

      queryClient.setQueryData(
        ['delete-posts'],
        (old = []) => old.filter((post) => post.id !== id)
      );

      return { previousPosts };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ['delete-posts'],
        context.previousPosts
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['delete-posts'],
      });
    },
  });

  return (
    <section>
      <h2>Удаление постов</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '10px' }}>
            {post.title}

            <button
              style={{ marginLeft: '10px' }}
              onClick={() => mutation.mutate(post.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DeletePosts;