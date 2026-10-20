import React from 'react';
import { timelineEvents } from '../data/experienceData';
import {
  GraduationCap,
  Briefcase,
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { IconSpaceClock } from '../components/AnimatedIcon';

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  users: Users,
  award: Award,
  book: BookOpen,
};

export const Experience = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-secondary/15 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 border border-primary/20">
            <IconSpaceClock size={16} />
            <span>My Journey</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Education & <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            My computer science studies and student event team roles.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central Connecting Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent sm:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((item, index) => {
              const Icon = iconMap[item.iconType] || GraduationCap;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary shadow-lg shadow-primary/25 z-10">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 w-[calc(100%-3rem)] min-w-0 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="glass-card p-6 rounded-2xl border border-border hover:border-primary/40 transition-all duration-300">
                      {/* Header with Type & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${item.badgeColor}`}
                        >
                          {item.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="font-heading font-bold text-lg text-foreground mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-primary mb-3">
                        {item.organization}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1.5 pt-2 border-t border-border/60">
                        {item.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
