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
      <main-header></main-header>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/keywords" element={<Keywords />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/nsync" element={<NSYNC />} />
          <Route path="/fib" element={<Fib />} />
          <Route path="/tictactoe" element={<Tictactoe />} />
          <Route path="/connect-4" element={<Connect4 />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;