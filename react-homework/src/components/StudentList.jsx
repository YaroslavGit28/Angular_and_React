import StudentCard from './StudentCard';

// StudentList принимает массив студентов и рендерит их карточки.
// Используем метод .map() — он превращает массив данных в массив компонентов.

function StudentList({
    students,
    sortBy = "name",
}) {
  const sortedStudents = [...students];

  sortedStudents.sort((a, b) => {
    switch (sortBy) {
      case "age":
        return a.age - b.age;
      case "course":
        return a.course - b.course;
      case "gpa":
        return b.gpa - a.gpa;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Обработка пустого массива — важная практика UX
  if (students.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
        Студентов пока нет 😔
      </p>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        // Адаптивная сетка: 1 колонка на мобильном, больше на широком экране.
        // auto-fill + minmax — мощный приём без медиа-запросов
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}
    >
      {sortedStudents.map((student) => (
        // key = student.id — уникальный идентификатор из данных
        // student={student} — передаём весь объект в пропс
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default StudentList;