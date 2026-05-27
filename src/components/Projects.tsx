import { useState, useEffect } from 'react';
import { FiExternalLink, FiLock, FiChevronRight } from 'react-icons/fi';
import { load } from 'js-yaml';
import SectionHeader from './SectionHeader';
import { Project } from '../types';

const ProjectCard = ({ project }: { project: Project }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!project.images?.length || project.images.length <= 1) return;
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setImgIndex(i => (i + 1) % project.images!.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, [project.images?.length]);

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-900 shadow-[0_2px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06] overflow-hidden flex flex-col">
      {project.images && project.images.length > 0 && (
        <div className="relative aspect-[2/1] bg-zinc-50 dark:bg-zinc-800 overflow-hidden">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
              style={{ opacity: imgIndex === i && !fading ? 1 : 0 }}
            />
          ))}
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
            {project.title}
          </h3>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex-shrink-0 p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors"
            >
              <FiExternalLink size={13} />
            </a>
          ) : (
            <span className="flex-shrink-0 p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-400">
              <FiLock size={13} />
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
          {project.description}
        </p>
        {project.badges && project.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {project.badges.map(b => (
              <span
                key={b}
                className="px-2 py-0.5 rounded text-xs font-medium bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/content/projects.yaml')
      .then(r => r.text())
      .then(text => setProjects(load(text) as Project[]))
      .catch(console.error);
  }, []);

  const SubHeading = ({ label }: { label: string }) => (
    <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
      {label}
    </p>
  );

  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="04" title="Projects" />

      <SubHeading label="Published Libraries" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {projects.filter(p => p.node > 1000).map(p => (
          <ProjectCard key={p.node} project={p} />
        ))}
      </div>

      <SubHeading label="Personal Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {projects.filter(p => p.node > 0 && p.node < 1000).map(p => (
          <ProjectCard key={p.node} project={p} />
        ))}
      </div>

      <SubHeading label="Other Projects" />
      <div className="rounded-xl bg-white dark:bg-zinc-900 shadow-[0_2px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06] divide-y divide-zinc-50 dark:divide-zinc-700">
        {projects.filter(p => p.node < 0).map(p => (
          <div key={p.title} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-start gap-2 min-w-0">
              <FiChevronRight
                size={14}
                className="text-teal-500 mt-0.5 flex-shrink-0"
              />
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors min-w-0"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">: {p.description}</span>
                </a>
              ) : (
                <p className="text-sm text-zinc-700 dark:text-zinc-300 min-w-0">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">: {p.description}</span>
                </p>
              )}
            </div>
            {p.badges && p.badges.length > 0 && (
              <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
                {p.badges[0]}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

