import React from 'react';
import { achievements } from '../data/experienceData';
import { Trophy, Star, Users, Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { IconSpaceLightning } from '../components/AnimatedIcon';

export const Achievements = () => {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 border border-primary/20">
            <Trophy className="w-4 h-4" />
            <span>Recognition</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Hackathon <span className="gradient-text">Achievement</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A highlight from my hackathon experience.
          </p>
        </div>

        {/* Achievements Cards Grid */}
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 rounded-2xl border border-border flex flex-col justify-between hover:border-primary/40 transition-all duration-300 group"
            >
              <div>
                {item.imagePath && (
                  <a
                    href={item.imagePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full certificate: ${item.imageAlt}`}
                  >
                    <img
                      src={item.imagePath}
                      alt={item.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto mb-5 max-h-[26rem] max-w-full rounded-xl border border-border object-contain"
                    />
                  </a>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 text-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                    {item.year}
                  </span>
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                  {item.category}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mb-3">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Resume highlight</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
