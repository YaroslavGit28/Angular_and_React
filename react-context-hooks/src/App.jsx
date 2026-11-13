import ThemeSwitcher from './components/ThemeSwitcher';
import LoginPanel from './components/LoginPanel';
import ProductList from './components/ProductList';
import Search from './components/Search';
import PreviousCounter from './components/PreviousCounter';
import MemoList from './components/MemoList';

function App() {
  return (
    <div className="container">
      <h1>Практическая работа. Части 9–10</h1>

      <ThemeSwitcher />

      <hr />

      <LoginPanel />

      <hr />

      <ProductList />

      <hr />

      <Search />

      <hr />

      <PreviousCounter />

      <hr />

      <MemoList />
    </div>
  );
}

export default App;