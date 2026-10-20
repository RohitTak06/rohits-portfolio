import React, { useState } from 'react';
import { skillGroups } from '../data/skillsData';
import {
  Code,
  Layout,
  Server,
  Database,
  Brain,
  Wrench,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { IconSpaceLightning } from '../components/AnimatedIcon';

const iconMap = {
  frontend: Layout,
  backend: Server,
  languages: Code,
  data: Database,
  interests: Brain,
  creative: Wrench,
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGroups =
    activeCategory === 'all'
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-secondary/20 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 border border-primary/20">
            <IconSpaceLightning size={16} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Technical, data, and creative skills drawn from my resume.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                : 'glass hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            All Disciplines ({skillGroups.length})
          </button>
          {skillGroups.map((group) => {
            const Icon = iconMap[group.category] || Code;
            const isActive = activeCategory === group.category;
            return (
              <button
                key={group.category}
                type="button"
                onClick={() => setActiveCategory(group.category)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                    : 'glass hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{group.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => {
            const Icon = iconMap[group.category] || Code;
            return (
              <div
                key={group.title}
                className="glass-card p-6 rounded-2xl border border-border flex flex-col justify-between hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">{group.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{group.description}</p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2.5 mt-5">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-xl bg-background/50 border border-border/60 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                            Resume
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer badge */}
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{group.skills.length} core technologies</span>
                  <span className="text-primary font-medium">Resume-listed</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
