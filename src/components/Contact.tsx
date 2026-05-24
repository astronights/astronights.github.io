import { useState, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { FiGithub, FiMail, FiTrendingUp } from 'react-icons/fi';
import axios from 'axios';
import { useProfile } from '../context/ProfileContext';
import SectionHeader from './SectionHeader';

const Contact = () => {
  const profile = useProfile();
  const [views, setViews] = useState(42);

  useEffect(() => {
    axios
      .get('https://astronights.goatcounter.com/counter//.json')
      .then(res => setViews(res.data?.count || 42))
      .catch(() => {});
  }, []);

  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="07" title="Contact" />
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          Let's stay in touch!
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
          Drop me an email to reach out!
        </p>
        <p className="text-teal-600 dark:text-teal-400 font-semibold text-sm mb-8">
          {profile.email}
        </p>
        <div className="flex items-center justify-center gap-6 mb-10">
          {[
            { icon: FaLinkedin, url: profile.linkedin },
            { icon: FiGithub,   url: profile.github   },
            { icon: FiMail,     url: profile.email ? `mailto:${profile.email}` : '' },
          ].filter(({ url }) => url).map(({ icon: Icon, url }) => (
            <button
              key={url}
              onClick={() => window.open(url, '_blank', 'noreferrer,noopener')}
              className="text-zinc-400 dark:text-zinc-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <Icon size={22} />
            </button>
          ))}
        </div>
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-zinc-900 shadow-[0_2px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06]">
          <div className="text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">Page Visits</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{views}</p>
            <p className="text-xs text-teal-500 mt-1">
              <FiTrendingUp size={12} className="inline" /> {Math.round(((views % 42) + views / 4200) * 100) / 100}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

