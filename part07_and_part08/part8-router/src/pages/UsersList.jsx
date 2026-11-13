import { Link } from 'react-router-dom';

const users = [
  {
    id: 1,
    name: 'Анна'
  },
  {
    id: 2,
    name: 'Пётр'
  },
  {
    id: 3,
    name: 'Мария'
  }
];

function UsersList() {
  return (
    <div>
      <h1>Пользователи</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;