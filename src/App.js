import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PaletteDetail from './components/PaletteDetail';
import CreatePalette from './components/CreatePalette';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/palette/:id" element={<PaletteDetail />} />
        <Route path="/create" element={<CreatePalette />} />
      </Routes>
    </Router>
  );
}

export default App;
