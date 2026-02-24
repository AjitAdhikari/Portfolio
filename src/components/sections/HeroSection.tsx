import { Button } from '@/components/ui/button';
import { developerInfo } from '@/data/developer';
import { motion } from 'framer-motion';
import { Phone, FolderOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProjectsSection } from './ProjectsSection';

const roles = developerInfo.roles;

function useTypingEffect() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return text;
}

export function HeroSection() {
  const typedText = useTypingEffect();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Image and Overlay */}
      <div className="absolute inset-0">
        {developerInfo.heroBackground ? (
          <>
            <img
              src={developerInfo.heroBackground}
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-background" />
        )}

        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'var(--gradient-start)' }}
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
          style={{ background: 'var(--gradient-end)' }}
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(from_var(--border)_h_s_l_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(from_var(--border)_h_s_l_/_0.3)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.p
            className="text-sm font-mono tracking-widest uppercase text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>

          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight px-2">
            <span className="text-gradient leading-tight">{developerInfo.name}</span>
          </h1>

          <div className="h-10 flex items-center justify-center mt-2">
            <p className="text-lg sm:text-xl md:text-2xl font-mono text-muted-foreground">
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </p>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-border"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FolderOpen className="size-4" /> Learn More
            </Button>
            {/* <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={developerInfo.resumeUrl} download>
                <Download className="size-4" /> Resume
              </a>
            </Button> */}
            <Button
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-border"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Phone className="size-4" /> Get in Touch
            </Button>
          </motion.div>
        </motion.div>

      </div>

      {/* Simplified Mouse Scroll Indicator - Positioned outside content div */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-1.5 hover:border-primary/60 transition-colors">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{
              y: [0, 15, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
