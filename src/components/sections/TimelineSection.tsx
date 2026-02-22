import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { developerInfo } from '@/data/developer';

export function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="py-24 md:py-32 px-6 lg:px-8">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-2">My journey</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Timeline</h2>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {developerInfo.timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex items-start mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="glass rounded-xl p-6 hover:glow-border transition-shadow duration-300">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-accent text-accent-foreground mb-3">
                      {item.year} • {item.type === 'academic' ? '🎓 Academic' : '🚀 Project'}
                    </span>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
