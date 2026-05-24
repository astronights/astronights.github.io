import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { load } from 'js-yaml';
import { Work } from '../types';
import SectionHeader from './SectionHeader';

const Experience = () => {
  const [experience, setExperience] = useState<Work[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);

  useEffect(() => {
    fetch('/content/experience.yaml')
      .then(r => r.text())
      .then(text => {
        const data = load(text) as Work[];
        setExperience(data);
        setExpanded(data.map(e => e.node));
      })
      .catch(console.error);
  }, []);

  const toggle = (node: number) => {
    setExpanded(prev =>
      prev.includes(node) ? prev.filter(n => n !== node) : [...prev, node]
    );
  };

  const sorted = [...experience].sort((a, b) => b.node - a.node).filter(e => e.node > 0);

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="02" title="Experience" />
      <div className="relative">
        <div
          className="absolute left-5 -top-8 -bottom-8 w-0.5 bg-zinc-300 dark:bg-zinc-600"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 48px, black calc(100% - 48px), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 48px, black calc(100% - 48px), transparent)',
          }}
        />
        <div className="space-y-8">
          {sorted.map(exp => {
            const isOpen = expanded.includes(exp.node);
            const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${exp.country}.svg`;

            return (
              <div key={exp.node} className="relative pl-16">
                <div className="absolute left-0 top-0.5 w-10 h-10 z-10 rounded-full overflow-hidden bg-white dark:bg-zinc-500 shadow-[0_2px_8px_rgba(0,0,0,0.18)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                  <img src={exp.image} alt={exp.firm} className="w-full h-full object-contain p-1" />
                </div>

                <button
                  onClick={() => toggle(exp.node)}
                  className="w-full text-left -mx-2 px-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                        {exp.title}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-0.5">{exp.firm}</p>
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-1 sm:hidden">
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">{exp.period}</p>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">{exp.location}</p>
                        <img className="w-4 h-3 object-cover rounded-sm" src={flagUrl} alt={exp.country} />
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 text-right">
                      <p className="text-zinc-500 dark:text-zinc-500 text-xs">{exp.period}</p>
                      <div className="flex items-center gap-1.5">
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">{exp.location}</p>
                        <img className="w-4 h-3 object-cover rounded-sm" src={flagUrl} alt={exp.country} />
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      {isOpen
                        ? <FiChevronUp size={14} className="text-zinc-400" />
                        : <FiChevronDown size={14} className="text-zinc-400" />
                      }
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-2 ml-px">
                    <ul className="space-y-1.5">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="text-teal-500 mt-0.5 flex-shrink-0 font-medium">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {(exp.badges?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.badges!.map(badge => (
                          <span
                            key={badge}
                            className="px-2 py-0.5 rounded text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

