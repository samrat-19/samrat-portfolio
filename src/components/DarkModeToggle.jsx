import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  return (
    <button className="absolute top-4 right-4 bg-zinc-700 dark:bg-zinc-600 px-3 py-1 rounded text-sm" onClick={() => setIsDark(!isDark)}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default DarkModeToggle;