import Categorias from "./components/Categorias";
import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <Categorias />
      </div>
    </div>
  );
}

export default App;
