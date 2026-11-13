import LoginForm from './components/LoginForm';
import OrderForm from './components/OrderForm';
import ServerErrorForm from './components/ServerErrorForm';
import PostDetails from './components/PostDetails';
import DeletePosts from './components/DeletePosts';
import Pagination from './components/Pagination';

function App() {
  return (
    <div className="container">
      <h1>Практическая работа. Части 11–12</h1>

      <LoginForm />

      <hr />

      <OrderForm />

      <hr />

      <ServerErrorForm />

      <hr />

      <PostDetails />

      <hr />

      <DeletePosts />

      <hr />

      <Pagination />
    </div>
  );
}

export default App;