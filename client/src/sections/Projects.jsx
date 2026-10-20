import React, { useState } from 'react';
import {
  ArrowUpRight,
  Github,
  Layers,
  ShieldCheck,
  Trophy,
  Eye,
} from 'lucide-react';
import { projects, projectCategories } from '../data/projectsData';

const iconTypeMap = {
  shield: ShieldCheck,
  trophy: Trophy,
  eye: Eye,
};

const ProjectArtwork = ({ project, ProjectIcon }) => (
  <div
    aria-hidden="true"
    className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.accentColor} sm:h-52`}
  >
    <div className="absolute inset-0 bg-slate-950/35" />
    <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
    <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-black/25 blur-3xl" />
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.24) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/30 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
        <div className="absolute inset-3 rounded-[1.35rem] border border-white/20" />
        <ProjectIcon className="relative h-12 w-12 text-white drop-shadow-lg" strokeWidth={1.5} />
        <span className="absolute -right-3 top-3 h-3 w-3 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.8)]" />
        <span className="absolute -bottom-2 left-5 h-1.5 w-12 rounded-full bg-white/50" />
      </div>
    </div>

    <div className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3 text-white">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
        Project preview
      </span>
      <span className="rounded-full border border-white/25 bg-black/15 px-2.5 py-1 text-[10px] font-medium backdrop-blur">
        {project.category}
      </span>
    </div>
  </div>
);

export const Projects = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="relative border-t border-border/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Layers className="h-3.5 w-3.5" />
              <span>Selected work</span>
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Projects <span className="gradient-text">I’ve Built</span>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Products and experiments built to solve practical problems, from emergency
              healthcare and sports operations to real-time computer vision.
            </p>
          </div>

          <div
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2 lg:justify-end"
          >
            {projectCategories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? projects.length
                  : projects.filter((project) => project.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4 ${
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {category}
                  <span className="ml-2 font-mono text-[10px] opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => {
            const ProjectIcon = iconTypeMap[project.iconType] || Layers;

            return (
              <article
                key={project.id}
                className="glass-card group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-border/80"
              >
                <ProjectArtwork project={project} ProjectIcon={ProjectIcon} />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        {project.subtitle}
                      </p>
                    </div>
                    {project.featured && (
                      <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-foreground/75">
                    {project.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-border/80 bg-muted/70 px-2.5 py-1 text-[10px] font-medium text-foreground/80"
                      >
                        {technology}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-lg px-1.5 py-1 text-[10px] font-medium text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg text-xs font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span>View project</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Live demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/50 p-5 text-center sm:flex-row sm:px-7 sm:text-left">
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              More projects and experiments
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Explore the rest of my work on GitHub.
            </p>
          </div>
          <a
            href="https://github.com/RohitTak06"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-85"
          >
            <Github className="h-4 w-4" />
            <span>Visit GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
