import ReviewForm from './components/ReviewForm';
import CountryForm from './components/CountryForm';
import FileUpload from './components/FileUpload';
import InactiveTimer from './components/InactiveTimer';
import MultiStepForm from './components/MultiStepForm';

function App() {
  return (
    <div className="container">
      <h1>Практическая работа. День 6</h1>

      <ReviewForm />

      <hr />

      <CountryForm />

      <hr />

      <FileUpload />

      <hr />

      <InactiveTimer />

      <hr />

      <MultiStepForm />
    </div>
  );
}

export default App;