import logo from "./logo.svg";
import "./App.css";

const test = () => {
  throw new Error("This code is broken!");
};

function App() {
  return (
    <div className="App">
      <button onClick={test}>BROKEN!!!</button>
    </div>
  );
}

export default App;
