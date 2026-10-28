import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPost, updatePost } from '../api/posts.js'
import PostForm from '../components/PostForm.jsx'

function toFormData(post) {
  return {
    title: post.title ?? '',
    body: post.body ?? '',
    userId: post.userId ?? 1,
    tags: Array.isArray(post.tags) && post.tags.length ? post.tags : ['react'],
    status: post.status === 'published' ? 'published' : 'draft',
    publishDate: post.publishDate || new Date(Date.now() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 10),
  }
}

export default function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const numericId = Number(id)
  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['posts', numericId],
    queryFn: () => getPost(numericId),
    enabled: Number.isInteger(numericId) && numericId > 0,
    retry: false,
  })

  const mutation = useMutation({
    mutationFn: (values) => updatePost(numericId, values),
    onSuccess: (updated) => {
      queryClient.setQueryData(['posts', numericId], updated)
      queryClient.setQueryData(['posts'], (oldPosts = []) =>
        oldPosts.map((item) => item.id === updated.id ? updated : item),
      )
      navigate('/posts', { replace: true })
    },
  })

  if (isLoading) return <div className="panel state-panel"><span className="spinner" /><p>Загрузка поста...</p></div>
  if (isError || !post) return <div className="panel state-panel"><h2>Не удалось найти пост</h2><p className="muted">{error?.message || 'Пост не найден.'}</p><Link className="button button-primary" to="/posts">Вернуться к списку</Link></div>

  return (
    <section>
      <div className="breadcrumbs"><Link to="/posts">Посты</Link><span>/</span><Link to={`/posts/${id}`}>Пост #{id}</Link><span>/</span><span>Редактирование</span></div>
      <div className="page-heading compact-heading"><div><p className="eyebrow">РЕДАКТИРОВАНИЕ</p><h1>Изменить пост</h1><p className="page-subtitle">Изменения сохраняются в локальном каталоге браузера.</p></div></div>
      <PostForm initialData={toFormData(post)} isEdit onSubmit={(values) => mutation.mutateAsync(values)} isPending={mutation.isPending} />
    </section>
  )
}
