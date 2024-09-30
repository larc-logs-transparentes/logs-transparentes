import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage/HomePage";
import SearchBu from "./pages/SearchBu/SearchBu.jsx";
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import About from './pages/About/About.jsx';
import USPResults from './pages/USPResults/USPResults.jsx';
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div className="overflow-x-hidden custom-scrollbar">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:electionId" element={<HomePage />} />
          <Route path="/:electionId/search/:id" element={<SearchBu />} />
          <Route path="/:electionId/search" element={<SearchBu />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/resultadosUSP" element={<USPResults />} />

        </Routes>
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
