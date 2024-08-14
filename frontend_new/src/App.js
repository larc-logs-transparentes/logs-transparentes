import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage/HomePage';
import SearchBu from './pages/SearchBu/SearchBu.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
