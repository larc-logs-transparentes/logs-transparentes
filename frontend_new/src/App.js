// ./App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage/HomePage';  // Import HomePage
import SearchBu from './pages/SearchBu.jsx';
// import NewPage from './pages/NewPage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Updated to use HomePage */}
          <Route path="/search" element={<SearchBu />} />
          {/* <Route path="/new" element={<NewPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
