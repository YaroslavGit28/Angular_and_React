import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPost } from '../api/posts.js'

export default function PostDetailPage() {
  const { id } = useParams()
  const numericId = Number(id)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['posts', numericId],
    queryFn: () => getPost(numericId),
    enabled: Number.isInteger(numericId) && numericId > 0,
    retry: false,
  })

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['posts', numericId], exact: true })
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/posts')
    },
  })

  if (isLoading) return <div className="panel state-panel"><span className="spinner" /><p>Загрузка поста...</p></div>
  if (isError || !post) return <div className="panel state-panel"><div className="state-icon error-icon">?</div><h1>Пост не найден</h1><p>Пост с таким ID отсутствует или API не ответил.</p><Link className="button button-primary" to="/posts">Вернуться к списку</Link></div>

  return (
    <article className="detail-layout">
      <div className="breadcrumbs"><Link to="/posts">Посты</Link><span>/</span><span>Пост #{post.id}</span></div>
      <div className="detail-card panel">
        <div className="detail-meta"><span className="pill">Публикация</span><span className="post-id">ID {post.id}</span></div>
        <h1>{post.title}</h1>
        <div className="detail-divider" />
        <p className="detail-body">{post.body}</p>
        <div className="detail-info"><div><span className="info-label">Автор</span><strong>Пользователь #{post.userId}</strong></div><div><span className="info-label">Источник</span><strong>JSONPlaceholder</strong></div></div>
        <div className="form-actions detail-actions">
          <Link className="button button-secondary" to="/posts">← К списку</Link>
          <div className="inline-actions">
            <Link className="button button-secondary" to={`/posts/${post.id}/edit`}>Редактировать</Link>
            <button className="button button-danger" onClick={() => { if (window.confirm(`Удалить пост «${post.title}»?`)) mutation.mutate(post.id) }} disabled={mutation.isPending}>{mutation.isPending ? 'Удаление...' : 'Удалить'}</button>
          </div>
        </div>
      </div>
    </article>
  )
}
