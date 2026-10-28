const API_URL = 'https://jsonplaceholder.typicode.com'
const STORAGE_KEY = 'blog-crud-react.posts.v1'
const REQUEST_TIMEOUT_MS = 7000

function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

function makeDemoPosts() {
  return [
    { id: 1, userId: 1, title: 'Добро пожаловать в каталог постов', body: 'Это демонстрационная публикация. Здесь можно просматривать, создавать, редактировать и удалять записи.', tags: ['react', 'старт'], status: 'published', publishDate: todayISO() },
    { id: 2, userId: 2, title: 'Как устроен React', body: 'React позволяет создавать интерфейсы из небольших повторно используемых компонентов. Состояние и свойства помогают обновлять интерфейс.', tags: ['react', 'frontend'], status: 'draft', publishDate: todayISO() },
    { id: 3, userId: 1, title: 'Зачем нужна валидация форм', body: 'Проверка данных помогает обнаруживать ошибки до отправки формы и показывает пользователю, что нужно исправить.', tags: ['forms', 'validation'], status: 'published', publishDate: todayISO() },
  ]
}

function readStoredPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeStoredPosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.warn('Не удалось сохранить посты в localStorage:', error)
  }
}

async function request(url, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
    if (!response.ok) {
      const error = new Error(`Ошибка запроса: ${response.status} ${response.statusText}`)
      error.status = response.status
      throw error
    }
    if (response.status === 204) return null
    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Сервер не ответил за 7 секунд. Используются локальные данные.')
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}

function normalizeRemotePost(post) {
  return {
    ...post,
    tags: Array.isArray(post.tags) && post.tags.length ? post.tags : ['react'],
    status: post.status === 'published' ? 'published' : 'draft',
    publishDate: post.publishDate || todayISO(),
  }
}

export async function getPosts() {
  const stored = readStoredPosts()
  if (stored !== null) return stored

  try {
    const remotePosts = await request('/posts?_limit=10')
    const posts = remotePosts.map(normalizeRemotePost)
    writeStoredPosts(posts)
    return posts
  } catch (error) {
    // Каталог остаётся работоспособным даже без доступа к внешнему API.
    const demoPosts = makeDemoPosts()
    writeStoredPosts(demoPosts)
    return demoPosts
  }
}

export async function getPost(id) {
  const posts = await getPosts()
  const found = posts.find((post) => Number(post.id) === Number(id))
  if (found) return found

  // Для постов, которые могли быть добавлены до первого заполнения кеша,
  // пробуем запрос к демонстрационному API с ограничением времени.
  try {
    const post = await request(`/posts/${id}`)
    if (post?.id) return normalizeRemotePost(post)
  } catch {
    // Ошибка будет представлена как «пост не найден» ниже.
  }
  const error = new Error('Пост не найден')
  error.status = 404
  throw error
}

export async function createPost(post) {
  const posts = readStoredPosts() ?? await getPosts()
  const newId = Math.max(0, ...posts.map((item) => Number(item.id) || 0)) + 1
  const created = {
    ...post,
    id: newId,
    userId: Number(post.userId) || 1,
    tags: Array.isArray(post.tags) ? post.tags : ['react'],
    status: post.status || 'draft',
    publishDate: post.publishDate || todayISO(),
  }
  writeStoredPosts([created, ...posts])
  return created
}

export async function updatePost(id, post) {
  const posts = readStoredPosts() ?? await getPosts()
  const updated = { ...post, id: Number(id), userId: Number(post.userId) || 1 }
  const index = posts.findIndex((item) => Number(item.id) === Number(id))
  if (index === -1) {
    const error = new Error('Пост не найден в локальном каталоге')
    error.status = 404
    throw error
  }
  const next = [...posts]
  next[index] = { ...posts[index], ...updated }
  writeStoredPosts(next)
  return next[index]
}

export async function deletePost(id) {
  const posts = readStoredPosts() ?? await getPosts()
  writeStoredPosts(posts.filter((post) => Number(post.id) !== Number(id)))
  return { success: true, id: Number(id) }
}
