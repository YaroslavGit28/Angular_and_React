import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { defaultPostValues, postSchema } from '../schemas/postSchema.js'

function FieldError({ children }) {
  return children ? <p className="field-error" role="alert">{children}</p> : null
}

export default function PostForm({ initialData, isEdit = false, onSubmit, isPending = false }) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: initialData
      ? { ...initialData, tags: (initialData.tags ?? ['react']).map((tag) => ({ value: typeof tag === 'string' ? tag : tag.value ?? '' })) }
      : defaultPostValues,
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'tags' })

  // Поля массива в RHF требуют объектов, поэтому преобразуем строки тегов
  // при инициализации и передаём наружу обычный массив строк.
  useEffect(() => {
    // Здесь намеренно нет reset: форма монтируется родителем только после загрузки данных.
  }, [])

  const submit = async (values) => {
    try {
      await onSubmit({
        ...values,
        userId: Number(values.userId),
        tags: values.tags.map((tag) => tag.trim()),
      })
    } catch (error) {
      if (error?.field && ['title', 'body', 'userId', 'status', 'publishDate'].includes(error.field)) {
        setError(error.field, { type: 'server', message: error.message || 'Ошибка сервера' })
      } else {
        setError('root.serverError', { type: 'server', message: error?.message || 'Не удалось сохранить пост' })
      }
    }
  }

  return (
    <form className="panel post-form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-grid">
        <label className="field field-wide">
          <span>Заголовок <b>*</b></span>
          <input {...register('title')} placeholder="Например, Как изучать React" />
          <FieldError>{errors.title?.message}</FieldError>
        </label>

        <label className="field field-wide">
          <span>Текст поста <b>*</b></span>
          <textarea {...register('body')} rows="6" placeholder="Введите текст поста (минимум 10 символов)" />
          <FieldError>{errors.body?.message}</FieldError>
        </label>

        <label className="field">
          <span>ID автора <b>*</b></span>
          <input type="number" min="1" step="1" {...register('userId')} />
          <FieldError>{errors.userId?.message}</FieldError>
        </label>

        <label className="field">
          <span>Статус <b>*</b></span>
          <select {...register('status')}>
            <option value="draft">Черновик</option>
            <option value="published">Опубликован</option>
          </select>
          <FieldError>{errors.status?.message}</FieldError>
        </label>

        <label className="field">
          <span>Дата публикации <b>*</b></span>
          <input type="date" {...register('publishDate')} />
          <FieldError>{errors.publishDate?.message}</FieldError>
        </label>

        <section className="field field-wide tags-field">
          <div className="field-heading">
            <span>Теги <b>*</b></span>
            <button type="button" className="button button-small button-ghost" onClick={() => append({ value: '' })} disabled={fields.length >= 5}>
              + Добавить тег
            </button>
          </div>
          {fields.map((field, index) => (
            <div className="tag-row" key={field.id}>
              <input {...register(`tags.${index}.value`)} placeholder={`Тег ${index + 1}`} aria-label={`Тег ${index + 1}`} />
              <button type="button" className="button button-icon button-ghost" onClick={() => remove(index)} disabled={fields.length <= 1} aria-label={`Удалить тег ${index + 1}`}>×</button>
              <FieldError>{errors.tags?.[index]?.message}</FieldError>
            </div>
          ))}
          <FieldError>{errors.tags?.root?.message || errors.tags?.message}</FieldError>
        </section>
      </div>

      {errors.root?.serverError && <div className="alert alert-error">{errors.root.serverError.message}</div>}

      <div className="form-actions">
        <Link className="button button-secondary" to="/posts">Отмена</Link>
        <button className="button button-primary" type="submit"
          disabled={!isValid || isSubmitting || isPending || (isEdit && !isDirty)}>
          {isSubmitting || isPending ? 'Сохранение...' : isEdit ? 'Сохранить изменения' : 'Создать пост'}
        </button>
      </div>
      <p className="form-note">Поля со звёздочкой обязательны. Учебный API не сохраняет изменения на постоянной основе.</p>
    </form>
  )
}
