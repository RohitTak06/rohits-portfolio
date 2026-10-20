import React from 'react';
import { GraduationCap, MapPin, Award, CalendarDays, Sparkles, Code2, Brain, Database } from 'lucide-react';
import { IconSpaceBook, IconSpaceCat } from '../components/AnimatedIcon';

const academicStats = [
  { label: 'Degree', value: 'B.Tech CSE', subtext: 'Computer Science', icon: GraduationCap },
  { label: 'CGPA', value: '6.75 / 10', subtext: 'JK Lakshmipat University', icon: Award },
  { label: 'Graduation', value: '2028', subtext: 'Started in 2024', icon: CalendarDays },
  { label: 'Based in', value: 'Jaipur', subtext: 'Rajasthan, India', icon: MapPin },
];

const technicalInterests = [
  {
    name: 'Full-Stack Development',
    desc: 'Building complete web applications, from user interfaces to backend data.',
    icon: Code2,
    color: 'from-primary/15 to-primary/5 text-primary',
  },
  {
    name: 'Computer Vision',
    desc: 'Exploring practical vision systems with OpenCV and MediaPipe.',
    icon: Brain,
    color: 'from-primary/15 to-primary/5 text-primary',
  },
  {
    name: 'Data & System Design',
    desc: 'Interested in data visualization, generative AI, and designing useful systems.',
    icon: Database,
    color: 'from-primary/15 to-primary/5 text-primary',
  },
];

export const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3 border border-primary/20">
            <IconSpaceBook size={16} />
            <span>Biography & Background</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About <span className="gradient-text">Rohit Tak</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Bridging technical rigor with thoughtful product engineering as a Computer Science student at JK Lakshmipat University.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Avatar */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary to-accent opacity-30 group-hover:opacity-60 blur-xl transition duration-500" />

              {/* Graphic Card */}
              <div className="relative w-72 sm:w-80 h-80 sm:h-96 rounded-3xl glass-card flex flex-col items-center justify-center p-8 text-center border border-border overflow-hidden">
                {/* Abstract Developer Monogram Avatar */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent flex items-center justify-center text-primary-foreground font-extrabold text-4xl shadow-xl shadow-primary/20 mb-6 group-hover:scale-105 transition-transform duration-300">
                  RT
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                  Rohit Tak
                </h3>
                <p className="text-xs text-primary font-mono mb-4">
                  B.Tech CSE • JK Lakshmipat University
                </p>

                <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Jaipur, Rajasthan, India</span>
                </div>

                {/* Subtle Cat Micro-interaction from IconSpace */}
                <div className="absolute bottom-3 right-3 opacity-60 hover:opacity-100 transition-opacity">
                  <IconSpaceCat size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-border space-y-4">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Engineering Mindset & Growth</span>
              </h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                I am a Computer Science undergraduate at{' '}
                <strong className="text-foreground font-semibold">
                  JK Lakshmipat University (JKLU), Jaipur
                </strong>
                , pursuing my B.Tech from 2024 to 2028. I enjoy turning practical problems into clear, useful software.
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                My projects include <strong className="text-foreground font-semibold">SAHARA</strong>, an emergency healthcare support platform; <strong className="text-foreground font-semibold">Muqabla</strong>, a sports management application; and a real-time <strong className="text-foreground font-semibold">driver drowsiness detection</strong> system.
              </p>
            </div>

            {/* Academic Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {academicStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 rounded-xl border border-border text-center space-y-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  <div className="text-base font-bold text-foreground">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.subtext}</div>
                </div>
              ))}
            </div>

            {/* Technical Interests */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Core Engineering Focus
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {technicalInterests.map((interest) => (
                  <div
                    key={interest.name}
                    className="p-3.5 rounded-xl border border-border bg-card/60 space-y-1.5 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${interest.color}`}>
                        <interest.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-foreground">{interest.name}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {interest.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
