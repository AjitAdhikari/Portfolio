import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { developerInfo } from '@/data/developer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

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
    { icon: Mail, href: `mailto:${developerInfo.email}`, label: 'Email' },
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
              <div key={field.key} className="relative">
                <label
                  className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                    focused === field.key || formState[field.key as keyof typeof formState]
                      ? 'text-xs -top-2.5 text-primary bg-background px-1'
                      : 'text-sm top-3 text-muted-foreground'
                  }`}
                >
                  {field.label}
                </label>
                <Input
                  type={field.type}
                  value={formState[field.key as keyof typeof formState]}
                  onChange={(e) => setFormState({ ...formState, [field.key]: e.target.value })}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  className="glass border-border focus:border-primary transition-colors pt-3"
                  required
                />
              </div>
            ))}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-300 pointer-events-none z-10 ${
                  focused === 'message' || formState.message
                    ? 'text-xs -top-2.5 text-primary bg-background px-1'
                    : 'text-sm top-3 text-muted-foreground'
                }`}
              >
                Your Message
              </label>
              <Textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                rows={5}
                className="glass border-border focus:border-primary transition-colors pt-4 resize-none"
                required
              />
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
                  <span className="text-muted-foreground">Email: </span>
                  <a href={`mailto:${developerInfo.email}`} className="text-primary hover:underline">
                    {developerInfo.email}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Location: </span>
                  {developerInfo.location}
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="glass rounded-xl p-4 hover:glow-border transition-all duration-300"
                >
                  <s.icon className="size-6 text-muted-foreground hover:text-foreground transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
