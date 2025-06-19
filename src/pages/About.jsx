import { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const messages = [
  "Hi, I'm Samrat Mukherjee",
  "→ building backend + AI tools"
];

const TypingHeader = () => {
  const [text, setText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = messages[msgIndex];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 60);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          setCharIndex(current.length);
        } else {
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, msgIndex]);

  return (
    <h1 className="text-xl sm:text-3xl font-bold mb-4 text-fuchsia-400 text-left sm:text-left">
      {text}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

const About = () => (
  <div className="px-4 sm:px-8 lg:px-12 pb-10">
    <TypingHeader />

    <p className="text-base sm:text-lg leading-relaxed mt-4 text-zinc-300 text-justify">
      I'm a backend-focused software engineer with 4 years of experience at SAP Labs, 
      where I've helped build, scale, and secure high-throughput microservices using Spring Boot, React, Kubernetes, 
      and AWS. I work at the intersection of clean architecture and smart systems — recently diving deep into GenAI, 
      Redis, and Temporal to design intelligent backend flows. I enjoy solving messy problems with structured thinking, 
      and when I'm not engineering solutions, I'm usually cooking or playing Ghosts Of Tsushima.
    </p>

    <div className="mt-6 space-y-3 text-sm sm:text-base text-zinc-400">
      <div className="flex items-center gap-2">
        <FaPhoneAlt className="text-fuchsia-400" />
        <span>+91 98367 46818</span>
      </div>
      <div className="flex items-center gap-2">
        <FaEnvelope className="text-fuchsia-400" />
        <span>mukherjeesamrat47@gmail.com</span>
      </div>
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-fuchsia-400" />
        <span>Bengaluru, India</span>
      </div>
    </div>
  </div>
);

export default About;