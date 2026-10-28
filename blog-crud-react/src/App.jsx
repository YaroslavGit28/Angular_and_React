import { Link, Navigate, Route, Routes } from 'react-router-dom'
import PostsPage from './pages/PostsPage.jsx'
import NewPostPage from './pages/NewPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/posts" className="brand" aria-label="Блог — на главную">
            <span className="brand-mark">Б</span>
            <span><strong>Блог</strong><small>Каталог постов</small></span>
          </Link>
          <span className="header-badge">React · Query · Zod</span>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<NewPostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="*" element={<div className="panel"><h1>Страница не найдена</h1><Link to="/posts">Вернуться к постам</Link></div>} />
        </Routes>
      </main>
      <footer className="site-footer">Учебный проект · API JSONPlaceholder</footer>
    </div>
  )
}
