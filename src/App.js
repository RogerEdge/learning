import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './document.css';
import { Home } from './Home';
import { Admin } from './Admin';
import { Keywords } from './Keywords';
import { Mentorship } from './Mentorship';
import { Fib } from './Fib';
import { Tictactoe } from './Tictactoe';
import { NSYNC } from './NSYNC';
import { Connect4 } from './connect-4/Connect4';

function App() {
  return (
    <div className="App">
      <main-header basePath="/learning/"></main-header>
      <section>
        <Routes basename="/learning">
          <Route exact path="/learning/" element={<Home />} />
          <Route exact path="/learning/home" element={<Home />} />
          <Route path="/learning/admin" element={<Admin />} />
          <Route path="/learning/keywords" element={<Keywords />} />
          <Route path="/learning/mentorship" element={<Mentorship />} />
          <Route path="/learning/nsync" element={<NSYNC />} />
          <Route path="/learning/fib" element={<Fib />} />
          <Route path="/learning/tictactoe" element={<Tictactoe />} />
          <Route path="/learning/connect-4" element={<Connect4 />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;