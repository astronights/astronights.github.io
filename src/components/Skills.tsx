import { useState, useEffect } from 'react';
import { load } from 'js-yaml';
import { Icon } from '@iconify/react';
import SkillNet from './SkillGraph';
import SectionHeader from './SectionHeader';
import { Skills } from '../types';

const profLabel = (n: number) =>
  n > 4 ? 'Advanced' : n > 3 ? 'Intermediate' : 'Basic';

const profLabelClass = (n: number) =>
  n > 4
    ? 'bg-teal-500 dark:bg-teal-700 text-teal-50 dark:text-teal-100'
    : n > 3
    ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
    : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400';

const langLabel = (n: number) =>
  n >= 4 ? 'Native / Bilingual' : n >= 3 ? 'Professional' : n >= 2 ? 'Conversational' : 'Beginner';

const langLabelClass = (n: number) =>
  n >= 4
    ? 'bg-teal-500 dark:bg-teal-700 text-teal-50 dark:text-teal-100'
    : n >= 3
    ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300'
    : n >= 2
    ? 'bg-zinc-100 dark:bg-zinc-700 text-teal-600 dark:text-teal-400'
    : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400';


const langmap: Record<string, string> = {
  English: 'GB', Hindi: 'IN', French: 'FR', Tamil: 'IN',
  Mandarin: 'CN', Russian: 'RU',
};

const iconIds: Record<string, string> = {
  // Programming languages
  Python: 'simple-icons:python',
  TypeScript: 'simple-icons:typescript',
  R: 'simple-icons:r',
  'C++': 'simple-icons:cplusplus',
  Rust: 'simple-icons:rust',
  Java: 'devicon-plain:java',
  // AI/ML
  'Claude Code': 'simple-icons:claude',
  LangChain: 'simple-icons:langchain',
  LangGraph: 'simple-icons:langgraph',
  LangFlow: 'simple-icons:langflow',
  Anthropic: 'simple-icons:anthropic',
  OpenAI: 'simple-icons:openai',
  'AWS Bedrock': 'simple-icons:amazonaws',
  pgvector: 'simple-icons:postgresql',
  OpenSearch: 'simple-icons:opensearch',
  MLflow: 'simple-icons:mlflow',
  PyTorch: 'simple-icons:pytorch',
  'Scikit-Learn': 'simple-icons:scikitlearn',
  // Data frameworks
  Pandas: 'simple-icons:pandas',
  Polars: 'simple-icons:polars',
  DuckDB: 'simple-icons:duckdb',
  Kafka: 'simple-icons:apachekafka',
  Hive: 'simple-icons:apachehive',
  Spark: 'simple-icons:apachespark',
  // Databases
  PostgreSQL: 'simple-icons:postgresql',
  MongoDB: 'simple-icons:mongodb',
  ElasticSearch: 'simple-icons:elastic',
  Hadoop: 'simple-icons:apachehadoop',
  SQL: 'simple-icons:mysql',
  // MLOps / DevOps
  Docker: 'simple-icons:docker',
  Kubernetes: 'simple-icons:kubernetes',
  Git: 'simple-icons:git',
  'GitHub Actions': 'simple-icons:githubactions',
  Terraform: 'simple-icons:terraform',
  Vercel: 'simple-icons:vercel',
  EKS: 'logos:aws-eks',
  ECS: 'logos:aws-ecs',
  Lambda: 'logos:aws-lambda',
  Glue: 'logos:aws-glue',
  S3: 'logos:aws-s3',
  CloudWatch: 'logos:aws-cloudwatch',
  // Web / Also worked with
  FastAPI: 'simple-icons:fastapi',
  Springboot: 'simple-icons:spring',
  NodeJS: 'simple-icons:nodedotjs',
  React: 'simple-icons:react',
  Kibana: 'simple-icons:kibana',
  Grafana: 'simple-icons:grafana',
  OpenAPI: 'simple-icons:swagger',
};

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl bg-white dark:bg-zinc-900 shadow-[0_2px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:ring-1 dark:ring-white/[0.06] p-4 h-full">
    <h3 className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
      {title}
    </h3>
    {children}
  </div>
);

const ToolIcon = ({ name, size = 15 }: { name: string; size?: number }) => {
  const id = iconIds[name];
  if (!id) return <div style={{ width: size, height: size }} className="flex-shrink-0" />;
  const isLogo = id.startsWith('logos:');
  return (
    <Icon
      icon={id}
      width={size}
      className={`flex-shrink-0 ${isLogo ? 'grayscale opacity-60' : 'text-zinc-500 dark:text-zinc-400'}`}
    />
  );
};

const ColHeader = ({ label }: { label: string }) => (
  <p className="text-[10px] uppercase tracking-wider font-medium text-zinc-400 dark:text-zinc-600 mb-2.5">{label}</p>
);

const ProfBar = ({ level }: { level: number }) => (
  <div className="flex gap-0.5 w-10 flex-shrink-0">
    {[1, 2, 3, 4, 5].map(i => (
      <div
        key={i}
        className={`w-1.5 h-4 rounded-sm ${
          i <= Math.floor(level)
            ? 'bg-teal-500'
            : i - 0.5 <= level
            ? 'bg-teal-200 dark:bg-teal-800'
            : 'bg-zinc-100 dark:bg-zinc-800'
        }`}
      />
    ))}
  </div>
);

const SkillsSection = () => {
  const [skills, setSkills] = useState<Skills | null>(null);
  const isWideScreen =
    typeof window !== 'undefined' && window.visualViewport!.width > 768;

  useEffect(() => {
    fetch('/content/skills.yaml')
      .then(r => r.text())
      .then(text => setSkills(load(text) as Skills))
      .catch(console.error);
  }, []);

  if (!skills) return null;

  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 scroll-mt-20">
      <SectionHeader number="05" title="Skills" />

      {isWideScreen ? (
        <div className="mb-8">
          <SkillNet skills={skills} color="teal" />
        </div>
      ) : (
        <p className="text-sm text-zinc-400 dark:text-zinc-600 font-mono mb-8 text-center">
          {'<'} 3D skill graph – best viewed on desktop {' />'}
        </p>
      )}

      <div className="grid grid-cols-6 gap-4">

        {/* Row 1: Programming Languages (narrow) + AI & ML (wide) */}
        <div className="col-span-6 sm:col-span-2">
          <Card title="Programming Languages">
            <div className="space-y-2.5">
              {Object.entries(skills.technology.languages).map(([lang, level]) => {
                const id = iconIds[lang];
                return (
                  <div key={lang} className="flex items-center gap-2">
                    {id ? (
                      <Icon icon={id} width={16} className="flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
                    ) : (
                      <img src={`/images/${lang.toLowerCase()}.png`} alt={lang} className="w-4 h-4 object-contain flex-shrink-0 grayscale opacity-70" />
                    )}
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 flex-1">{lang}</span>
                    <ProfBar level={level} />
                    <span className={`text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap text-center flex-shrink-0 ${profLabelClass(level)}`}>
                      {profLabel(level)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="col-span-6 sm:col-span-4">
          <Card title="AI & Machine Learning">
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_3fr] gap-x-4 gap-y-4 items-start">
              <div>
                <ColHeader label="AI" />
                <div className="space-y-2.5">
                  {skills.aiml.ai.map(tool => (
                    <div key={tool} className="flex items-center gap-2">
                      <ToolIcon name={tool} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ColHeader label="RAG" />
                <div className="space-y-2.5">
                  {skills.aiml.rag.map(tool => (
                    <div key={tool} className="flex items-center gap-2">
                      <ToolIcon name={tool} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tool}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <ColHeader label="ML" />
                </div>
                <div className="space-y-2.5">
                  {skills.aiml.ml.map(tool => (
                    <div key={tool} className="flex items-center gap-2">
                      <ToolIcon name={tool} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <ColHeader label="Techniques" />
                </div>
                <div className="space-y-1.5">
                  {skills.aiml.techniques.map(t => (
                    <div key={t} className="flex items-center gap-2">
                      <span className="text-teal-500 font-medium flex-shrink-0">›</span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Row 2: Engineering Stack + MLOps (equal halves) */}
        <div className="col-span-6 sm:col-span-3">
          <Card title="Engineering Stack">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4 items-start">
              <div>
                <ColHeader label="Databases" />
                <div className="space-y-2.5">
                  {skills.data.databases.map(db => (
                    <div key={db} className="flex items-center gap-2">
                      <ToolIcon name={db} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{db}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ColHeader label="Frameworks" />
                <div className="space-y-2.5">
                  {skills.data.frameworks.map(fw => (
                    <div key={fw} className="flex items-center gap-2">
                      <ToolIcon name={fw} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{fw}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ColHeader label="Web" />
                <div className="space-y-2.5">
                  {skills.also.map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <ToolIcon name={item} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Card title="MLOps & DevOps">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4 items-start">
              <div>
                <ColHeader label="DevOps" />
                <div className="space-y-2.5">
                  {skills.mlops.devops.map(tool => (
                    <div key={tool} className="flex items-center gap-2">
                      <ToolIcon name={tool} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ColHeader label="AWS" />
                <div className="space-y-2.5">
                  {skills.mlops.aws.map(tool => (
                    <div key={tool} className="flex items-center gap-2">
                      <ToolIcon name={tool} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <ColHeader label="Observability" />
                <div className="space-y-2.5">
                  {skills.mlops.observability.map(tool => (
                    <div key={tool} className="flex items-center gap-2">
                      <ToolIcon name={tool} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Row 3: Spoken Languages + Soft Skills (equal halves) */}
        <div className="col-span-6 sm:col-span-3">
          <Card title="Spoken Languages">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-2 gap-y-2.5 items-center">
              {Object.entries(skills.languages).map(([lang, level]) => (
                <>
                  <div key={lang} className="flex items-center gap-2 min-w-0">
                    <img
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${langmap[lang]}.svg`}
                      alt={langmap[lang]}
                      className="w-4 h-3 object-cover rounded-sm flex-shrink-0"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate">{lang}</span>
                  </div>
                  <ProfBar key={`${lang}-bar`} level={level} />
                  <span key={`${lang}-label`} className={`text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap text-center flex-shrink-0 ${langLabelClass(level)}`}>
                    {langLabel(level)}
                  </span>
                </>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Card title="Soft Skills">
            <div className="space-y-2">
              {skills.others.map(skill => (
                <div key={skill} className="flex items-center gap-2">
                  <span className="text-teal-500 font-medium flex-shrink-0">›</span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{skill}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
