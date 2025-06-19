import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import Tools from './pages/Tools';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import StatusBar from './components/StatusBar';
import { useEffect, useState } from 'react';
import BootScreen from './components/BootScreen';
import AISamrat from './pages/AISamrat';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    transition={{ duration: 0.3 }}
    className="p-6"
  >
    {children}
  </motion.div>
);

const App = () => {
  const location = useLocation();
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBoot(false), 3500); // fallback timeout
    return () => clearTimeout(timer);
  }, []);

  if (showBoot) {
    return <BootScreen onDone={() => setShowBoot(false)} />;
  }

  return (
    <div className="flex h-screen font-mono bg-zinc-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/about" />} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
            <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
            <Route path="/tools" element={<PageWrapper><Tools /></PageWrapper>} />
            <Route path="/ai-samrat" element={<PageWrapper><AISamrat /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;