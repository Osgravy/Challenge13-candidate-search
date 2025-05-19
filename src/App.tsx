import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Search Candidates</Link></li>
          <li><Link to="/saved">Saved Candidates</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<CandidateSearch />} />
        <Route path="/saved" element={<SavedCandidates />} />
      </Routes>
    </Router>
  );
}

export default App;