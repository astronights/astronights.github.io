const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-3 mb-10">
    <span className="text-teal-500 font-mono text-xs font-bold tracking-widest">{number}</span>
    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
    <div className="flex-1 h-[1.5px] bg-zinc-400 dark:bg-zinc-700" />
  </div>
);

export default SectionHeader;
