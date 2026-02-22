import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const langColors: Record<string, string> = {
  TypeScript: 'hsl(210 80% 55%)',
  JavaScript: 'hsl(50 90% 50%)',
  Python: 'hsl(210 60% 45%)',
  HTML: 'hsl(15 80% 55%)',
  CSS: 'hsl(200 80% 50%)',
  Java: 'hsl(20 80% 50%)',
  'C++': 'hsl(210 50% 50%)',
  C: 'hsl(210 40% 45%)',
  PHP: 'hsl(240 35% 55%)',
};

export function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { data: repos, isLoading, error } = useGitHubRepos();
  const [filter, setFilter] = useState<string>('all');

  const languages = useMemo(() => {
    if (!repos) return [];
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));
    return Array.from(langs) as string[];
  }, [repos]);

  const filtered = useMemo(() => {
    if (!repos) return [];
    const list = filter === 'all' ? repos : repos.filter((r) => r.language === filter);
    return list.slice(0, 12);
  }, [repos, filter]);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 lg:px-8 bg-secondary/30">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-2">My work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-3">Fetched live from GitHub</p>
        </motion.div>

        {/* Filter */}
        {languages.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === 'all' ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === lang ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-xl" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Could not load projects from GitHub.</p>
          </div>
        )}

        {/* Projects grid */}
        {filtered.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {filtered.map((repo) => (
              <motion.div
                key={repo.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass rounded-xl p-6 flex flex-col gap-4 hover:glow-border transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg group-hover:text-gradient transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="size-4" />
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {repo.description || 'No description available.'}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="size-2.5 rounded-full" style={{ background: langColors[repo.language] || 'hsl(0 0% 50%)' }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1"><Star className="size-3" />{repo.stargazers_count}</span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1"><GitFork className="size-3" />{repo.forks_count}</span>
                    )}
                  </div>
                </div>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent text-accent-foreground">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/AjitAdhikari?tab=repositories" target="_blank" rel="noopener noreferrer">
              View All on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
