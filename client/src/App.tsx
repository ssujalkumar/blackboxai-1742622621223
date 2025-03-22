import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { ReaderPanel } from './pages/ReaderPanel';
import { WriterPanel } from './pages/WriterPanel';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reader" element={<ReaderPanel />} />
              <Route path="/writer" element={<WriterPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
