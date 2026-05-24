import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { load } from 'js-yaml';
import { Study } from '../types';
import { useTheme } from '../context/ThemeContext';
import EduNeuralNet from './EduNeuralNet';
import SectionHeader from './SectionHeader';

const Education = () => {
  const { isDark } = useTheme();
  const [education, setEducation] = useState<Study[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);

  useEffect(() => {
    fetch('/content/education.yaml')
      .then(r => r.text())
      .then(text => {
        const data = load(text) as Study[];
        setEducation(data);
        setExpanded(data.map(e => e.node));
      })
      .catch(console.error);
  }, []);

  // Toggle a single node (used by timeline button and institution neural net node)
  const onToggleNode = (node: number) => {
    setExpanded(prev =>
      prev.includes(node) ? prev.filter(n => n !== node) : [...prev, node]
    );
  };

  // Toggle all nodes in a group (used by activation neural net nodes)
  const onToggleGroup = (groupKey: number) => {
    const groupNodes = education
      .filter(e => Math.floor(e.node) === groupKey)
      .map(e => e.node);
    const allIn = groupNodes.every(n => expanded.includes(n));
    setExpanded(prev =>
      allIn
        ? prev.filter(n => !groupNodes.includes(n))
        : [...new Set([...prev, ...groupNodes])]
    );
  };

  const eduSort = (a: Study, b: Study) => {
    const sameGroup = Math.floor(a.node) === Math.floor(b.node);
    if (sameGroup && a.node !== b.node) return a.node < b.node ? -1 : 1;
    return a.node < b.node ? 1 : -1;
  };

  const sorted = [...education].sort(eduSort);
  const isWide = typeof window !== 'undefined' && window.innerWidth >= 768;

  return (
    <section id="education" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="03" title="Education" />

      {isWide ? (
        <div className="mb-8">
          <EduNeuralNet
            education={education}
            expanded={expanded}
            onToggleNode={onToggleNode}
            onToggleGroup={onToggleGroup}
            isDark={isDark}
          />
        </div>
      ) : (
        <p className="text-xs text-zinc-400 dark:text-zinc-600 font-mono mb-8 text-center">
          Neural net viz — best viewed on desktop
        </p>
      )}

      <div className="relative">
        <div
          className="absolute left-5 -top-8 -bottom-8 w-0.5 bg-zinc-300 dark:bg-zinc-600"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 48px, black calc(100% - 48px), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 48px, black calc(100% - 48px), transparent)',
          }}
        />
        <div className="space-y-8">
          {sorted.map(edu => {
            const isOpen = expanded.includes(edu.node);

            return (
              <div
                key={edu.title}
                className="relative pl-16"
              >
                <div className="absolute left-0 top-0.5 w-10 h-10 z-10 rounded-full overflow-hidden bg-white dark:bg-zinc-500 shadow-[0_2px_8px_rgba(0,0,0,0.18)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                  <img src={edu.image} alt={edu.institution} className="w-full h-full object-contain p-1" />
                </div>

                <button
                  onClick={() => onToggleNode(edu.node)}
                  className="w-full text-left -mx-2 px-2 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                        {edu.degree}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-0.5">{edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-1 sm:hidden">
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">{edu.period}</p>
                        {edu.grade && (
                          <>
                            <span className="text-zinc-300 dark:text-zinc-600">·</span>
                            <p className="text-zinc-500 dark:text-zinc-500 text-xs">{edu.grade}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-0.5 flex-shrink-0 text-right">
                      <p className="text-zinc-500 dark:text-zinc-500 text-xs">{edu.period}</p>
                      {edu.grade && (
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">{edu.grade}</p>
                      )}
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
                    {(edu.description?.length ?? 0) > 0 && (
                      <ul className="space-y-1.5">
                        {edu.description.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <span className="text-teal-500 mt-0.5 flex-shrink-0 font-medium">›</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {(edu.badges?.length ?? 0) > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {edu.badges!.map(badge => (
                          <span key={badge}
                            className="px-2 py-0.5 rounded text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
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

export default Education;
