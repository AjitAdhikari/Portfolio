import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { developerInfo } from '@/data/developer';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {developerInfo.name}. Built with <Heart className="inline size-3 text-destructive" /> in Nepal.
        </p>
        <div className="flex items-center gap-4">
          <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <Github className="size-5" />
          </a>
          <a href={developerInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <Linkedin className="size-5" />
          </a>
          <a href={`mailto:${developerInfo.email}`} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
