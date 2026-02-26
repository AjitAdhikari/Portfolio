import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { developerInfo } from '@/data/developer';
import { motion, useInView } from 'framer-motion';
import { Github, Globe, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message sent!', description: "Thanks for reaching out. I'll get back to you soon." });
    setFormState({ name: '', email: '', message: '' });
  };

  const socials = [
    { icon: Github, href: developerInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: developerInfo.linkedin, label: 'LinkedIn' },
    // { icon: Facebook, href: developerInfo.facebook, label: 'Facebook' },
    // { icon: Instagram, href: developerInfo.instagram, label: 'Instagram' },
    // { icon: AtSign, href: (developerInfo as any).threads, label: 'Threads' },
    { icon: Globe, href: developerInfo.website, label: 'Website' },
    { icon: Mail, href: `mailto:${developerInfo.email}`, label: 'Email' },
    // { icon: Phone, href: `tel:${developerInfo.Phone}`, label: 'Phone' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 lg:px-8 bg-secondary/30">
      <div ref={ref} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-2">Let's connect</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Get In Touch</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { key: 'name', label: 'Your Name', type: 'text' },
              { key: 'email', label: 'Your Email', type: 'email' },
            ].map((field) => (
              <div key={field.key} className="relative group">
                <motion.label
                  initial={{ y: 0, scale: 1 }}
                  animate={{
                    y: focused === field.key || formState[field.key as keyof typeof formState] ? -28 : 0,
                    scale: focused === field.key || formState[field.key as keyof typeof formState] ? 0.85 : 1,
                    color: focused === field.key ? 'var(--primary)' : 'var(--muted-foreground)'
                  }}
                  className="absolute left-3 top-3 transition-colors pointer-events-none z-10"
                >
                  {field.label}
                </motion.label>
                <div className="relative">
                  <Input
                    type={field.type}
                    value={formState[field.key as keyof typeof formState]}
                    onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                    onFocus={() => setFocused(field.key)}
                    onBlur={() => setFocused(null)}
                    className="glass border-border focus-visible:ring-1 focus-visible:ring-primary transition-all duration-300 relative z-0 h-12"
                    required
                  />
                  <motion.div
                    className="absolute inset-0 border-2 border-primary rounded-md pointer-events-none z-10"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: focused === field.key ? 1 : 0, scale: focused === field.key ? 1 : 0.98 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            ))}
            <div className="relative group">
              <motion.label
                initial={{ y: 0, scale: 1 }}
                animate={{
                  y: focused === 'message' || formState.message ? -28 : 0,
                  scale: focused === 'message' || formState.message ? 0.85 : 1,
                  color: focused === 'message' ? 'var(--primary)' : 'var(--muted-foreground)'
                }}
                className="absolute left-3 top-3 transition-colors pointer-events-none z-10"
              >
                Your Message
              </motion.label>
              <div className="relative">
                <Textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  rows={5}
                  className="glass border-border focus-visible:ring-1 focus-visible:ring-primary transition-all duration-300 relative z-0 pt-4 resize-none"
                  required
                />
                <motion.div
                  className="absolute inset-0 border-2 border-primary rounded-md pointer-events-none z-10"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: focused === 'message' ? 1 : 0, scale: focused === 'message' ? 1 : 0.98 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full gap-2 glow-border">
              <Send className="size-4" /> Send Message
            </Button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="glass rounded-xl p-8 space-y-6">
              <h3 className="text-xl font-semibold">Let's work together</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Phone className="size-4" />
                    Phone:
                  </span>
                  <a href={`tel:${developerInfo.Phone}`} className="text-primary hover:underline">
                    {developerInfo.Phone}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Mail className="size-4" />
                    Email:
                  </span>
                  <a href={`mailto:${developerInfo.email}`} className="text-primary hover:underline">
                    {developerInfo.email}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="size-4" />
                    Location:
                  </span>
                  {developerInfo.location}
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="glass rounded-xl p-3 sm:p-4 hover:glow-border transition-all duration-300"
                >
                  <s.icon className="size-5 sm:size-6 text-muted-foreground hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
