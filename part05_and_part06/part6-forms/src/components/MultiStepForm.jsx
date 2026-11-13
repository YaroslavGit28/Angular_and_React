import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function nextStep() {
    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        alert('Заполните имя и фамилию');
        return;
      }
    }

    if (step === 2) {
      if (!formData.address.trim() || !formData.city.trim()) {
        alert('Заполните адрес и город');
        return;
      }
    }

    setStep(step + 1);
  }

  function prevStep() {
    setStep(step - 1);
  }

  function finish() {
    alert('Форма успешно отправлена!');
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
    });
  }

  return (
    <section>
      <h2>Многошаговая форма</h2>

      {step === 1 && (
        <>
          <h3>Шаг 1. Личные данные</h3>

          <input
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
          />

          <button onClick={nextStep}>
            Далее
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Шаг 2. Адрес</h3>

          <input
            name="address"
            placeholder="Адрес"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="Город"
            value={formData.city}
            onChange={handleChange}
          />

          <button onClick={prevStep}>
            Назад
          </button>

          <button onClick={nextStep}>
            Далее
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Подтверждение</h3>

          <p><strong>Имя:</strong> {formData.firstName}</p>
          <p><strong>Фамилия:</strong> {formData.lastName}</p>
          <p><strong>Адрес:</strong> {formData.address}</p>
          <p><strong>Город:</strong> {formData.city}</p>

          <button onClick={prevStep}>
            Назад
          </button>

          <button onClick={finish}>
            Отправить
          </button>
        </>
      )}
    </section>
  );
}

export default MultiStepForm;