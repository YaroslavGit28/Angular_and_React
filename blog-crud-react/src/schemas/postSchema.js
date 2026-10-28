import { z } from 'zod'

const today = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

const todayISO = () => {
  const now = new Date()
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
}

export const postSchema = z.object({
  title: z.string().trim().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
  body: z.string().trim().min(10, 'Минимум 10 символов').max(1000, 'Максимум 1000 символов'),
  userId: z.coerce.number().int('Введите целое число').positive('ID автора должен быть положительным'),
  // useFieldArray работает с объектами; перед проверкой преобразуем их в строки.
  tags: z.preprocess(
    (items) => Array.isArray(items) ? items.map((item) => typeof item === 'string' ? item : item?.value ?? '') : items,
    z.array(z.string().trim().min(2, 'Минимум 2 символа').max(20, 'Максимум 20 символов'))
      .min(1, 'Добавьте хотя бы один тег').max(5, 'Можно добавить не более 5 тегов'),
  ),
  status: z.enum(['draft', 'published'], { errorMap: () => ({ message: 'Выберите статус' }) }),
  publishDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Укажите дату в формате ГГГГ-ММ-ДД')
    .refine((value) => {
      if (!value) return false
      const date = new Date(`${value}T00:00:00`)
      return !Number.isNaN(date.getTime()) && date >= today()
    }, 'Дата не может быть в прошлом'),
})

export const defaultPostValues = {
  title: '',
  body: '',
  userId: 1,
  tags: [{ value: 'react' }],
  status: 'draft',
  publishDate: todayISO(),
}
