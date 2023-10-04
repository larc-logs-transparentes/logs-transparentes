// ./App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage/HomePage';  // Import HomePage
import SearchBu from './pages/SearchBu/SearchBu.jsx';
// import NewPage from './pages/NewPage/NewPage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/search" element={<SearchBu />} />
          {/* <Route path="/new" element={<NewPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
