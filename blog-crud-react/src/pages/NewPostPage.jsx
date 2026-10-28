import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { createPost } from '../api/posts.js'
import PostForm from '../components/PostForm.jsx'

export default function NewPostPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (createdPost) => {
      queryClient.setQueryData(['posts'], (oldPosts = []) => [
        createdPost,
        ...oldPosts.filter((post) => post.id !== createdPost.id),
      ])
      queryClient.setQueryData(['posts', createdPost.id], createdPost)
      navigate('/posts', { replace: true })
    },
  })

  return (
    <section>
      <div className="breadcrumbs"><Link to="/posts">Посты</Link><span>/</span><span>Новая публикация</span></div>
      <div className="page-heading compact-heading"><div><p className="eyebrow">НОВАЯ ЗАПИСЬ</p><h1>Создать пост</h1><p className="page-subtitle">Заполните данные будущей публикации.</p></div></div>
      <PostForm onSubmit={(values) => mutation.mutateAsync(values)} isPending={mutation.isPending} />
    </section>
  )
}
