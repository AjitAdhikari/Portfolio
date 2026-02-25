import { developerInfo } from '@/data/developer';
import { cn } from '@/lib/utils';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, User } from 'lucide-react';
import { useEffect, useRef } from 'react';

function StatCounter({ value, inView }: { value: string; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  // Extract number and suffix (e.g., "5+" -> 5 and "+")
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (inView) {
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [inView, numericValue, count]);

  return (
    <motion.span className="text-2xl font-bold text-gradient">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}

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
              {developerInfo.profileImage ? (
                <img
                  src={developerInfo.profileImage}
                  alt={developerInfo.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement?.querySelector('.fallback')?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={cn(
                "w-full h-full bg-gradient-to-br from-primary/20 to-glow-secondary/20 flex items-center justify-center fallback",
                developerInfo.profileImage ? "hidden" : "flex"
              )}>
                <User className="size-20 text-primary/30" />
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

            <div className="grid grid-cols-2 xs:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {[
                { label: 'Projects', value: '5+' },
                { label: 'Technologies', value: '5+' },
                { label: 'GitHub Repos', value: '20+' },
                { label: 'Years Coding', value: '2+' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-3 sm:p-4 text-center">
                  <StatCounter value={stat.value} inView={inView} />
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* <Button size="lg" className="gap-2" asChild>
              <a href={developerInfo.resumeUrl} download>
                <Download className="size-4" /> Download Resume
              </a>
            </Button> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
