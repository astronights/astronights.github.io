import { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { load } from 'js-yaml';
import InterestCloud from './InterestCloud';
import SectionHeader from './SectionHeader';
import { Hobbies } from '../types';

const Interests = () => {
  const [hobbies, setHobbies] = useState<Hobbies>({ interests: {}, activities: [] });

  useEffect(() => {
    fetch('/content/hobbies.yaml')
      .then(r => r.text())
      .then(text => setHobbies(load(text) as Hobbies))
      .catch(console.error);
  }, []);
  const isWideScreen =
    typeof window !== 'undefined' && window.visualViewport!.width > 768;

  return (
    <section id="interests" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="06" title="Interests" />

      {isWideScreen ? (
        <div className="mb-8">
          <InterestCloud hobbies={hobbies} color="#14b8a6" />
        </div>
      ) : (
        <p className="text-sm text-zinc-400 dark:text-zinc-600 font-mono mb-8 text-center">
          {'<'} Word cloud - best viewed on desktop {' />'}
        </p>
      )}

      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
        Other Activities
      </p>
      <div className="rounded-xl bg-white dark:bg-zinc-900 shadow-[0_2px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06] divide-y divide-zinc-50 dark:divide-zinc-700">
        {hobbies.activities?.map((activity, i) => {
          const [bold, ...rest] = activity.split(',');
          return (
            <div key={i} className="flex items-start gap-2 px-4 py-3">
              <FiChevronRight size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{bold}</span>
                {rest.length > 0 ? `,${rest.join(',')}` : ''}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Interests;

