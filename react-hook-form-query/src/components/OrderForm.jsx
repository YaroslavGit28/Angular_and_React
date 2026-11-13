import { useFieldArray, useForm } from 'react-hook-form';

function OrderForm() {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      products: [
        {
          name: '',
          quantity: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  function onSubmit(data) {
    alert(JSON.stringify(data, null, 2));
    reset();
  }

  return (
    <section>
      <h2>Форма заказа</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <input
              placeholder="Название товара"
              {...register(`products.${index}.name`)}
            />

            <br />
            <br />

            <input
              type="number"
              min="1"
              {...register(`products.${index}.quantity`, {
                valueAsNumber: true,
              })}
            />

            <br />
            <br />

            <button
              type="button"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              Удалить
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              name: '',
              quantity: 1,
            })
          }
        >
          Добавить товар
        </button>

        <br />
        <br />

        <button type="submit">
          Оформить заказ
        </button>
      </form>
    </section>
  );
}

export default OrderForm;