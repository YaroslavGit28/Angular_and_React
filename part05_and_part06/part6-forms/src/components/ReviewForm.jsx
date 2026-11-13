import { useRef, useState } from 'react';

function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const nameRef = useRef();
  const ratingRef = useRef();
  const reviewRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      nameRef.current.focus();
      return;
    }

    if (!rating) {
      ratingRef.current.focus();
      return;
    }

    if (review.trim().length < 10) {
      reviewRef.current.focus();
      return;
    }

    alert('Отзыв отправлен!');

    setName('');
    setRating('');
    setReview('');
  }

  return (
    <section>
      <h2>Форма отзыва</h2>

      <form onSubmit={handleSubmit}>
        <input
          ref={nameRef}
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          ref={ratingRef}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Оценка</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>

        <textarea
          ref={reviewRef}
          rows="5"
          placeholder="Текст отзыва"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button
          disabled={
            !name.trim() ||
            !rating ||
            review.trim().length < 10
          }
        >
          Отправить
        </button>
      </form>
    </section>
  );
}

export default ReviewForm;