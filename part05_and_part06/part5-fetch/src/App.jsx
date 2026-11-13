import CatFact from './components/CatFact';
import Weather from './components/Weather';
import Posts from './components/Posts';
import Search from './components/Search';

function App() {
  return (
    <div className="container">
      <h1>Практическая работа. Часть 5</h1>

      <CatFact />

      <hr />

      <Weather />

      <hr />

      <Posts />

      <hr />

      <Search />
    </div>
  );
}

export default App;