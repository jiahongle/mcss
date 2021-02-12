import mcss from './mcssLogo.svg';
import './App.css';
import Introduction from './components/WhoWeAre/Introduction.js'
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
      <div className="AppContent">
        <Introduction/> 
        <Announcements/>
      </div>
    </div>

  );
}

export default App;
