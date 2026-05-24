import { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';

const Header = () => {
  const profile = useProfile();
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const roles = profile.headerRole ? profile.headerRole.split(';') : [''];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex(prev => (prev + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="header" className="min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-6">
          Hi, I'm
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 leading-none mb-4">
          {profile.headerName || 'Shubhankar Agrawal'}
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 h-14 md:h-16">
          <span
            className="text-teal-500 dark:text-teal-400 transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {roles[roleIndex]}
          </span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          {profile.headerDesc}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.open(profile.linkedin, '_blank', 'noreferrer,noopener')}
            className="px-6 py-3 rounded-full bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 active:bg-teal-700 transition-colors"
          >
            Let's connect!
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 dark:hover:border-teal-400 transition-colors"
          >
            Contact me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
