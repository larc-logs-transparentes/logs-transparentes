// ./App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage/HomePage';  // Import HomePage
import SearchBu from './pages/SearchBu/SearchBu.jsx';
// import NewPage from './pages/NewPage/NewPage.jsx';
import SendBu from './pages/SendBu/SendBu.jsx';

function App() {
  return (
    <Router >
      <div className='overflow-x-hidden'>

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/search/:id" element={<SearchBu />} />
          {/* <Route path="/new" element={<NewPage />} /> */}
          <Route path="/sendBu" element={<SendBu />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
