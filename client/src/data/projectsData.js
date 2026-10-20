export const projectCategories = ['All', 'Full Stack', 'AI & Computer Vision'];

export const projects = [
  {
    id: 'sahara',
    title: 'SAHARA v2.0',
    subtitle: 'Emergency Healthcare Support Platform',
    category: 'Full Stack',
    featured: true,
    description:
      'A healthcare aggregation platform that brings hospitals, ambulance services, and blood banks into one place. It helps people find verified healthcare resources quickly in emergency situations.',
    problemSolved:
      'Emergency information is often scattered across separate services, slowing access to hospitals, ambulances, and blood banks when time matters.',
    keyFeatures: [
      'Centralized access to hospital, ambulance, and blood bank information.',
      'Responsive interface designed for quick navigation under pressure.',
      'Structured architecture prepared for future live-tracking and emergency-alert integrations.',
    ],
    techStack: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'NextAuth.js',
      'Prisma',
      'PostgreSQL',
      'Leaflet',
    ],
    githubUrl: 'https://github.com/Tejender09/SAHARA-v2.0',
    liveUrl: null,
    demoStatus: 'No live demo link provided',
    accentColor: 'from-secondary via-card to-background',
    iconType: 'shield',
  },
  {
    id: 'muqabla',
    title: 'Muqabla',
    subtitle: 'Sports Management Web Application',
    category: 'Full Stack',
    featured: true,
    description:
      'A full-stack sports management application for organizing events and participants. Its admin dashboard brings event administration and participant data together in a single workflow.',
    problemSolved:
      'Sports events can be difficult to coordinate when participant records and event operations are handled across separate tools.',
    keyFeatures: [
      'Admin dashboard for organizing and managing sports events.',
      'Participant management backed by a structured database.',
      'Full-stack architecture for coordinating event information in one application.',
    ],
    techStack: [
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/RohitTak06/Muqabla',
    liveUrl: null,
    demoStatus: 'No live demo link provided',
    accentColor: 'from-secondary via-card to-background',
    iconType: 'trophy',
  },
  {
    id: 'driver-drowsiness',
    title: 'Driver Drowsiness Detection',
    subtitle: 'Real-Time Computer Vision System',
    category: 'AI & Computer Vision',
    featured: true,
    description:
      'A real-time driver alertness monitoring system that processes a webcam feed at approximately 30 FPS. It combines Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) signals to detect eye closure and yawning.',
    problemSolved:
      'Driver fatigue can go unnoticed. Monitoring multiple facial cues helps identify signs of drowsiness and trigger an alert.',
    keyFeatures: [
      'Live webcam monitoring using OpenCV and MediaPipe.',
      'Hybrid EAR and MAR detection for eye closure and yawning.',
      'Per-user adaptive threshold calibration to reduce false alerts.',
      'Lightweight, CPU-friendly processing with sub-100 ms detection latency.',
    ],
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    githubUrl:
      'https://github.com/Riyachauhan18/driver-drowsiness-detection',
    liveUrl: null,
    demoStatus: 'No live demo link provided',
    accentColor: 'from-secondary via-card to-background',
    iconType: 'eye',
  },
];
