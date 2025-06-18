import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Sidebar = () => (
  <aside className="w-64 h-full bg-zinc-950 dark:bg-zinc-900 text-white p-6 flex flex-col justify-between">
    <nav className="space-y-4">
      {['about','experience','projects','skills','resume','blog'].map((s) => (
        <NavLink key={s} to={`/${s}`} className="block hover:text-blue-400">{`/${s}`}</NavLink>
      ))}
    </nav>
    <div className="flex gap-4 pt-8">
      <a href="https://github.com/samrat-19" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></a>
      <a href="https://www.linkedin.com/in/samrat-mukherjee-38478118b" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
    </div>
  </aside>
);

export default Sidebar;