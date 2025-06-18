import { useEffect, useState } from 'react';

const lines = [
  'samrat.dev booting...',
  '✔ Loading personal modules',
  '✔ Initializing GenAI runtime',
  '✔ Mounting Redis cache',
  '✔ Injecting backend chaos',
  '✔ Hello, world.'
];

const BootScreen = ({ onDone }) => {
  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedLines((prev) => [...prev, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setTimeout(onDone, 800); // slight pause after final line
      }
    }, 400);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 text-sm font-mono p-6 flex items-center justify-center">
      <pre className="text-left">
        {displayedLines.join('\n')}
        <span className="animate-pulse">█</span>
      </pre>
    </div>
  );
};

export default BootScreen;