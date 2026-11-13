import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z
    .string()
    .min(1, 'Введите email')
    .email('Некорректный email'),

  password: z
    .string()
    .min(6, 'Минимум 6 символов'),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  function onSubmit(data) {
    alert(JSON.stringify(data, null, 2));
    reset();
  }

  return (
    <section>
      <h2>Форма логина</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
          />

          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />

          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>

        <br />

        <button
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default LoginForm;