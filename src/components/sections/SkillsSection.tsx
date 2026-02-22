import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { developerInfo } from '@/data/developer';
import type { Skill } from '@/types';

const categories = [
  { key: 'frontend', label: 'Frontend', icon: '🎨' },
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'database', label: 'Database', icon: '🗄️' },
  { key: 'tools', label: 'Tools', icon: '🔧' },
] as const;

function ProgressBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-glow-secondary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState<string>('frontend');

  const skills = developerInfo.skills[active as keyof typeof developerInfo.skills];

  return (
    <section id="skills" className="py-24 md:py-32 px-6 lg:px-8">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-2">What I know</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Skills & Technologies</h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat.key
                  ? 'bg-primary text-primary-foreground glow-border'
                  : 'glass text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {skills.map((skill, i) => (
            <div key={skill.name} className="glass rounded-xl p-6 hover:glow-border transition-shadow duration-300">
              <ProgressBar skill={skill} delay={i * 0.1} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
