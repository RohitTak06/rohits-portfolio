import React from 'react';

const FADE = 'linear-gradient(to bottom, #000, rgb(0 0 0 / 0.2) 66%, transparent)';

export const CloudSkyBackground = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none fixed inset-0 z-0 isolate overflow-hidden bg-white dark:bg-background ${className}`}
  >
    <div
      className="absolute inset-0"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <img
        src="/clouds/sky.png"
        alt=""
        draggable="false"
        className="cloud-sky-drift absolute -top-[5%] -left-[5%] h-[110%] w-[110%] max-w-none object-cover blur-[12.5px] dark:opacity-40 dark:mix-blend-screen"
      />
    </div>
    <div className="absolute inset-0 shadow-[inset_0_0_54px_0_rgba(255,255,255,0.45)] dark:shadow-[inset_0_0_64px_0_rgba(5,8,18,0.72)]" />
  </div>
);

export default CloudSkyBackground;
