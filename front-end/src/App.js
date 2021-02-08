import mcss from './mcssLogo.svg';
import './App.css';
import LogoBar from './components/logoBar/logoBar';
import Announcements from './components/announcements/announcement.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-header">
          <img src={mcss} className="App-logo" alt="logo" />
        </div>
        <LogoBar />
      </header>
      <Announcements />

    </div>

  );
}

export default App;
