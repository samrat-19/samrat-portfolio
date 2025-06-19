import { useEffect, useState } from 'react';

const logs = [
  'kubectl get pods -n prod --watch',
  'mvn clean install -DskipTests=true',
  'docker ps --filter "status=running"',
  'aws s3 sync ./build s3://samrat-prod-deploy',
  'now playing: Ghost of Tsushima OST - "Jin\'s Theme"',
];

const StatusBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-950/90 text-fuchsia-400 text-[0.7rem] sm:text-xs font-mono px-4 py-2 border-t border-zinc-800 z-50 overflow-x-auto whitespace-nowrap shadow-inner shadow-zinc-800">
      <span className="text-green-400">samrat@portfolio:~$</span> {logs[index]}
    </div>
  );
};

export default StatusBar;