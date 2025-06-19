import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['about','samBot','experience','projects','skills','resume','blog','tools'];

  return (
    <>
      {/* Hamburger toggle (mobile only) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-950 text-white p-6 pt-20 pb-10 flex flex-col z-40 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:flex md:pt-6`}
      >
        <nav className="space-y-4 mb-6">
          {navLinks.map((s) => (
            <NavLink
              key={s}
              to={`/${s}`}
              className={({ isActive }) =>
                `block hover:text-blue-400 ${isActive ? 'text-blue-400 font-semibold' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {`/${s}`}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
        <div className="flex gap-4">
          <a
            href="https://github.com/samrat-19"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/samrat-mukherjee-38478118b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://leetcode.com/u/SamratMukherjee1999/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode size={20} />
          </a>
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;