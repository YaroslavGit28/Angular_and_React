import { useForm } from 'react-hook-form';

function ServerErrorForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmit(data) {
    // Имитация ответа сервера
    if (data.email === 'admin@mail.com') {
      setError('email', {
        type: 'server',
        message: 'Уже используется',
      });

      return;
    }

    alert('Регистрация успешна!');
    reset();
  }

  return (
    <section>
      <h2>Ошибка с сервера</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Введите email',
            })}
          />

          {errors.email && (
            <p>{errors.email.message}</p>
          )}
        </div>

        <br />

        <button type="submit">
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
}

export default ServerErrorForm;