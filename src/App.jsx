import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SIdebar.jsx';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Resume from './pages/Resume';
import Blog from './pages/Blog';

const App = () => (
  <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-6 relative">
      <Routes>
        <Route path="/" element={<Navigate to="/about" />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </main>
  </div>
);

export default App;