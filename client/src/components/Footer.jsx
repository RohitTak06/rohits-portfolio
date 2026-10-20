import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { IconSpaceCat } from './AnimatedIcon';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50 text-card-foreground pt-12 pb-8 overflow-hidden">
      {/* Decorative Radial Background */}
      <div className="absolute inset-0 bg-glow-radial pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow">
                RT
              </div>
              <span className="font-heading font-bold text-lg tracking-tight flex items-center gap-1.5">
                Rohit Tak
                <IconSpaceCat size={18} className="opacity-80" />
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Computer Science undergraduate at JK Lakshmipat University, Jaipur. Building practical software across web development and computer vision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary transition-colors">
                  Experience & Timeline
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact & Hire
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Connect & Source
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <a
                href="https://github.com/RohitTak06"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub / RohitTak06</span>
              </a>
              <a
                href="https://www.linkedin.com/in/rohit-tak-7150762b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn / rohit-tak</span>
              </a>
              <a
                href="mailto:rohittak006@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>rohittak006@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-muted-foreground">
          <p>
            © {currentYear} Rohit Tak. Crafted with MERN Stack • JK Lakshmipat University, Jaipur.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-all hover:-translate-y-0.5"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
