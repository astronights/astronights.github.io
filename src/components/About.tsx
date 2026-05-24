import { FiPaperclip, FiHelpCircle } from 'react-icons/fi';
import { useProfile } from '../context/ProfileContext';
import SectionHeader from './SectionHeader';

const About = () => {
  const profile = useProfile();

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="01" title="About" />
      <div className="space-y-4 mb-10">
        {profile.about.split('\n').filter(line => line.trim()).map((line, i) => (
          <p key={i} className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
            {line}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => window.open('CV.pdf', '_blank', 'noreferrer,noopener')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 dark:hover:border-teal-400 transition-colors"
        >
          <FiPaperclip size={14} />
          Curriculum Vitae
        </button>
        <button
          onClick={() => window.open('https://astronights.github.io/quizzing', '_blank', 'noreferrer,noopener')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 dark:hover:border-teal-400 transition-colors"
        >
          <FiHelpCircle size={14} />
          Quiz With Me!
        </button>
      </div>
    </section>
  );
};

export default About;

