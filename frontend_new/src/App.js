import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage/HomePage';
import SearchBu from './pages/SearchBu/SearchBu.jsx';
import Inclusion from './pages/Verification/Inclusion.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div className='overflow-x-hidden custom-scrollbar'>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/:electionId" element={<HomePage />} /> 
          <Route path="/:electionId/search/:id" element={<SearchBu />} />
          <Route path="/:electionId/search" element={<SearchBu />} /> 
          <Route path="/inclusion/:id" element={<Inclusion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
