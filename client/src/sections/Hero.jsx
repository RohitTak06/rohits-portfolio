import React from 'react';
import { ArrowDown, Github, Linkedin, Download } from 'lucide-react';
import { IconSpaceLightning } from '../components/AnimatedIcon';
import { ElasticText } from '../components/pixel-perfect/elastic-text';
import LineHoverText from '../components/pixel-perfect/line-hover';

export const Hero = ({ onOpenResumeModal }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          <span className="text-primary">
            <ElasticText color="hsl(var(--primary))">Rohit Tak</ElasticText>
          </span>
          .
        </h1>

        <h2
          aria-label="Computer science student and software developer"
          className="mb-7 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground"
        >
          <LineHoverText
            variant="color"
            lines={['COMPUTER SCIENCE', 'STUDENT & DEVELOPER']}
            className="gap-1"
          />
        </h2>

        {/* Concise Statement */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
          I'm a Computer Science student at{' '}
          <span className="text-foreground font-semibold">JK Lakshmipat University</span>, Jaipur.
          I build practical software across full-stack web development, computer vision, and
          emergency healthcare support.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/15 hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <IconSpaceLightning size={18} />
            <span>Explore Projects</span>
          </a>

          <button
            type="button"
            onClick={onOpenResumeModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold glass border border-border hover:bg-secondary/80 text-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Social Badges and Verified Profiles */}
        <div className="flex items-center justify-center gap-6 text-muted-foreground">
          <a
            href="https://github.com/RohitTak06"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
            aria-label="Rohit Tak's GitHub Profile"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium font-mono">github/RohitTak06</span>
          </a>

          <span className="text-border">•</span>

          <a
            href="https://www.linkedin.com/in/rohit-tak-7150762b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
            aria-label="Rohit Tak's LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform text-blue-500" />
            <span className="text-xs font-medium font-mono">linkedin/rohit-tak</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-16 sm:pt-20 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll down to about section"
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all animate-bounce"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
