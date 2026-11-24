import { Link, NavLink, Outlet } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Layout() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <>
      <header
        style={{
          background: "#1f2937",
          color: "white",
          padding: "15px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Task Tracker
          </Link>

          <nav
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <NavLink to="/">Главная</NavLink>

            <NavLink to="/tasks">Задачи</NavLink>

            <NavLink to="/users">Пользователи</NavLink>

            <span>⭐ {favorites.length}</span>

            {favorites.length > 0 && (
              <button onClick={clearFavorites}>
                Очистить избранное
              </button>
            )}
          </nav>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1000,
          margin: "30px auto",
          padding: 20,
        }}
      >
        <Outlet />
      </main>
    </>
  );
}