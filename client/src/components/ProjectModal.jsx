import React, { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl shadow-2xl border border-border bg-card text-card-foreground my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
              Featured Architecture
            </span>
          )}
        </div>

        {/* Title */}
        <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold mb-1">
          {project.title}
        </h2>
        <p className="text-sm font-medium text-muted-foreground mb-6">
          {project.subtitle}
        </p>

        {/* Problem Solved */}
        <div className="mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> The Problem It Solves
          </h3>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {project.problemSolved}
          </p>
        </div>

        {/* Full Description */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Overview
          </h3>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Implemented Features */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Core Implemented Features
          </h3>
          <ul className="space-y-2">
            {project.keyFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-muted text-foreground border border-border/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links and Actions */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border border-border hover:bg-secondary transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/80 text-muted-foreground text-xs font-medium border border-border">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>{project.demoStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
