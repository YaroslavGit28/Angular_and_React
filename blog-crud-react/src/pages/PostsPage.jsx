import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { deletePost, getPosts } from '../api/posts.js'

export default function PostsPage() {
  const queryClient = useQueryClient()
  const { data: posts = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previous = queryClient.getQueryData(['posts'])
      queryClient.setQueryData(['posts'], (old = []) => old.filter((post) => post.id !== id))
      return { previous }
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(['posts'], context.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const handleDelete = (post) => {
    if (window.confirm(`Удалить пост «${post.title}»?`)) deleteMutation.mutate(post.id)
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">ВАШ КОНТЕНТ</p>
          <h1>Каталог постов</h1>
          <p className="page-subtitle">Создавайте, редактируйте и просматривайте публикации.</p>
        </div>
        <Link to="/posts/new" className="button button-primary">＋ Создать пост</Link>
      </div>

      {isLoading && <div className="panel state-panel"><span className="spinner" /><p>Загрузка постов...</p></div>}
      {isError && <div className="panel state-panel"><div className="state-icon error-icon">!</div><h2>Не удалось загрузить посты</h2><p className="muted">{error.message}</p><button className="button button-primary" onClick={() => refetch()}>Повторить</button></div>}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="panel state-panel"><h2>Постов пока нет</h2><p>Создайте первую публикацию.</p><Link className="button button-primary" to="/posts/new">Создать пост</Link></div>
      )}

      {!isLoading && !isError && posts.length > 0 && (
        <>
          <div className="list-toolbar"><span>{posts.length} постов загружено</span><span className="api-indicator"><i /> Локальное хранилище браузера</span></div>
          <div className="posts-grid">
            {posts.map((post, index) => (
              <article className="post-card" key={post.id}>
                <div className="post-card-top"><span className="post-number">{String(index + 1).padStart(2, '0')}</span><span className="post-id">ID {post.id}</span></div>
                <h2><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
                <p>{post.body}</p>
                <div className="post-card-footer">
                  <span className="author-label">Автор #{post.userId}</span>
                  <div className="card-actions">
                    <Link className="text-button" to={`/posts/${post.id}/edit`}>Изменить</Link>
                    <button className="text-button danger-text" onClick={() => handleDelete(post)} disabled={deleteMutation.isPending && deleteMutation.variables === post.id}>Удалить</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="api-notice">Публикации сохраняются в памяти браузера (localStorage), поэтому созданные и изменённые посты остаются после перезагрузки на этом устройстве.</p>
        </>
      )}
    </section>
  )
}
