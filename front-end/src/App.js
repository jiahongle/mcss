import mcss from './mcss.jpg';
import './App.css';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={mcss} className="App-logo" alt="logo" />
        <Header></Header>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;