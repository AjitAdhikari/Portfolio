import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, MapPin } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 px-6 lg:px-8 bg-secondary/30">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-2">Get to know me</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden glass glow-border">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-glow-secondary/20 flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
              <MapPin className="size-4 text-primary" />
              <span className="font-medium">{developerInfo.location}</span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">{developerInfo.bio}</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Projects', value: '20+' },
                { label: 'Technologies', value: '15+' },
                { label: 'GitHub Repos', value: '30+' },
                { label: 'Years Coding', value: '3+' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="gap-2" asChild>
              <a href={developerInfo.resumeUrl} download>
                <Download className="size-4" /> Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
