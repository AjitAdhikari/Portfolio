import { Github, Facebook, Instagram, Phone, Linkedin } from 'lucide-react';
import { developerInfo } from '@/data/developer';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {developerInfo.name}. All rights reserved.
          {/* Built with Built with React, TypeScript & Tailwind CSS. */}
        </p>
        <div className="flex items-center gap-4">
          <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <Github className="size-5" />
          </a>
          <a href={developerInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <Facebook className="size-5" />
          </a>
          <a href={developerInfo.Phone} target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground transition-colors' aria-label="Phone">
            <Phone className="size-5" />
          </a>
          <a href={`mailto:${developerInfo.linkedin}`} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
