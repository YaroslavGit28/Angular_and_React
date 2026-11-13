import {
  Routes,
  Route,
  NavLink,
  Outlet
} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import UsersList from './pages/UsersList';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

function Layout() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    color: isActive ? '#fff' : '#333',
    backgroundColor: isActive ? 'royalblue' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal'
  });

  return (
    <div className="container">

      <nav>
        <NavLink to="/" end style={linkStyle}>
          Главная
        </NavLink>

        <NavLink to="/about" style={linkStyle}>
          О проекте
        </NavLink>

        <NavLink to="/users" style={linkStyle}>
          Пользователи
        </NavLink>
      </nav>

      <main>
        <Outlet />
      </main>

    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/users"
          element={<UsersList />}
        />

        <Route
          path="/users/:userId"
          element={<UserProfile />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
}

export default App;