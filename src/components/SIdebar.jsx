import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import StatusBar from './StatusBar';

const Sidebar = () => (
  <aside className="w-64 h-full bg-zinc-950 dark:bg-zinc-900 text-white p-6 flex flex-col">
    {/* Navigation */}
    <nav className="space-y-4 mb-6">
      {['about','experience','projects','skills','resume','blog','tools','ai-samrat'].map((s) => (
        <NavLink key={s} to={`/${s}`} className="block hover:text-blue-400">{`/${s}`}</NavLink>
      ))}
    </nav>

    {/* Spacer pushes footer to bottom */}
    <div className="mt-auto space-y-4">
      {/* Social Icons */}
      <div className="flex gap-4">
        <a href="https://github.com/samrat-19" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
        <a href="https://www.linkedin.com/in/samrat-mukherjee-38478118b" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
      </div>

      {/* Status Bar */}
      <div className="pt-2 border-t border-zinc-800 text-xs text-green-400 font-mono">
        <StatusBar />
      </div>
    </div>
  </aside>
);

export default Sidebar;