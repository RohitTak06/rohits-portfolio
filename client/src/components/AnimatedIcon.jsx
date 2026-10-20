import React from 'react';

/**
 * Custom animated SVG icons derived and inspired by IconSpace (https://iconspace.dev/)
 * adhering to currentColor inheritance, fluid transitions, and accessible labeling.
 */

export const IconSpaceBook = ({ size = 20, className = '', animated = true }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0.75 2.25 20 20"
    fill="none"
    width={size}
    height={size}
    className={`inline-block text-current transition-transform duration-300 ${animated ? 'hover:scale-110' : ''} ${className}`}
    aria-hidden="true"
  >
    <path
      d="M4.083 3.752C6.544 3.748 8.918 4.638 10.75 6.252L10.75 20.751C8.918 19.139 6.544 18.248 4.083 18.251 2.521 18.251 1.74 18.251 1.395 18.031 1.188 17.898 1.103 17.813 0.971 17.606 0.75 17.261 0.75 16.645 0.75 15.414L0.75 7.155C0.75 5.727 0.75 5.013 1.299 4.434 1.847 3.856 2.409 3.826 3.533 3.766 3.715 3.756 3.899 3.752 4.083 3.752Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.417 3.752C14.956 3.748 12.582 4.638 10.75 6.252L10.75 20.751C12.582 19.139 14.956 18.248 17.417 18.251 18.979 18.251 19.76 18.251 20.105 18.031 20.312 17.898 20.396 17.813 20.529 17.606 20.75 17.261 20.75 16.645 20.75 15.414L20.75 7.155C20.75 5.727 20.75 5.013 20.201 4.434 19.652 3.856 19.091 3.826 17.967 3.766 17.785 3.756 17.601 3.752 17.417 3.752Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.75 3.751C14.25 3.181 10.75 6.251 10.75 6.251L10.75 20.751C10.75 20.751 13.25 17.751 19.75 18.251 20.299 18.19 20.75 17.75 20.75 17.198L20.744 5.626C20.744 4.798 20.069 3.918 18.75 3.751Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconSpaceClock = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2 1.75 20 20"
    fill="none"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block text-current transition-transform duration-300 hover:rotate-12 ${className}`}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.25" fill="currentColor" fillOpacity="0.1" />
    <line x1="12" y1="12" x2="12" y2="8" />
    <line x1="12" y1="12" x2="15" y2="15" />
    <line x1="2" y1="5.25" x2="5" y2="2.25" />
    <line x1="22" y1="5.25" x2="19" y2="2.25" />
  </svg>
);

export const IconSpaceMail = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 15"
    fill="none"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="1.5"
    className={`inline-block text-current transition-all duration-300 group-hover:-translate-y-0.5 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M 2.25 14.25 C 7.25 14.25 12.25 14.25 17.25 14.25 C 18.078 14.25 18.75 13.578 18.75 12.75 C 18.75 9.25 18.75 5.75 18.75 2.25 C 18.75 1.422 18.077 0.75 17.248 0.75 C 11.347 0.75 8.153 0.75 2.252 0.75 C 1.424 0.75 0.75 1.422 0.75 2.25 C 0.75 5.75 0.75 9.25 0.75 12.75 C 0.75 13.578 1.422 14.25 2.25 14.25 Z"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path d="M 1.75 0.75 C 1.75 0.75 7.734 6.217 8.734 6.717 C 9.734 7.217 9.734 7.217 10.667 6.717 C 11.599 6.217 17.602 0.75 17.602 0.75" />
  </svg>
);

export const IconSpaceGlobe = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2 2 20 20"
    fill="none"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`inline-block text-current transition-transform duration-300 hover:scale-105 ${className}`}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
    <path d="M2.461 9H21.539" />
    <path d="M2.461 15H21.539" />
    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22" />
    <path d="M12 2C9.239 2 7 6.477 7 12C7 17.523 9.239 22 12 22" />
    <path d="M12 2C14.761 2 17 6.477 17 12C17 17.523 14.761 22 12 22" />
  </svg>
);

export const IconSpaceLightning = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 20"
    fill="none"
    width={size}
    height={size}
    className={`inline-block text-current transition-transform duration-300 hover:scale-110 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M14.183 8.222L8.985 8.222C8.868 8.22 8.757 8.173 8.676 8.089 8.594 8.005 8.549 7.893 8.551 7.776L8.551 1.203C8.551 0.763 7.994 0.589 7.756 0.956L0.822 10.861C0.63 11.157 0.836 11.554 1.182 11.554L6.382 11.554C6.621 11.554 6.815 11.754 6.815 12L6.815 18.31C6.815 18.751 7.372 18.924 7.61 18.558L14.544 8.914C14.736 8.618 14.53 8.222 14.183 8.222Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.2"
    />
  </svg>
);

export const IconSpaceLaptop = ({ size = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 17"
    width={size}
    height={size}
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0.5"
    strokeLinejoin="round"
    strokeLinecap="round"
    className={`inline-block text-current transition-transform duration-300 hover:scale-105 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M18.2865 10.9043L19.4281 13.7568C19.9536 15.0706 18.9856 16.5 17.5707 16.5H2.00232C0.587687 16.4997 -0.380403 15.0704 0.144897 13.7568L1.2865 10.9043H18.2865ZM1.07361 14.1289C0.811271 14.7855 1.29524 15.4997 2.00232 15.5H17.5707C18.2781 15.5 18.7619 14.7857 18.4994 14.1289L17.4486 11.5H2.12439L1.07361 14.1289Z"
      fillRule="evenodd"
    />
    <path
      d="M16.2865 0C17.3911 0 18.2865 0.895431 18.2865 2V10.9043H1.2865V2C1.2865 0.895579 2.18213 0.000240011 3.2865 0H16.2865ZM3.2865 1C2.73442 1.00024 2.2865 1.44786 2.2865 2V10.5H17.2865V2C17.2865 1.44772 16.8388 1 16.2865 1H3.2865ZM9.7865 2C10.2007 2 10.5365 2.33579 10.5365 2.75C10.5365 3.16421 10.2007 3.5 9.7865 3.5C9.37249 3.49976 9.0365 3.16407 9.0365 2.75C9.0365 2.33593 9.37249 2.00024 9.7865 2Z"
      fillRule="evenodd"
    />
  </svg>
);

export const IconSpaceCat = ({ size = 24, className = '' }) => (
  <svg
    viewBox="0 0 22 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={`inline-block transition-transform duration-300 hover:scale-125 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M1.28527 3.1378C1.12465 3.35791 0.970796 3.58438 0.826236 3.81723L0.820312 23.8526C2.12473 24.3155 2.92785 24.2764 4.10377 23.446C6.30597 24.3101 8.48112 24.663 10.7112 23.5642C11.8635 23.0058 12.8297 22.0799 13.4773 20.912C14.2669 19.4122 14.4901 18.4017 14.6904 16.709C15.9044 15.3911 18.8269 11.5692 17.1285 9.72924C16.0988 8.61414 13.3463 8.41131 11.8728 8.45679L11.817 8.45861C10.7281 7.30441 9.9394 6.60588 8.613 5.76638C8.43125 3.83906 7.87752 -0.230768 5.32279 0.0102605C3.87466 0.146782 2.17545 1.90992 1.28527 3.1378Z"
      fill="hsl(var(--primary))"
    />
    <path
      d="M4.58963 10.2742C6.70268 10.2807 5.05233 13.5079 3.63584 14.1997C1.43593 14.2572 3.02447 10.9957 4.58963 10.2742Z"
      fill="hsl(var(--primary))"
    />
    <path
      d="M8.68291 13.9394C10.8382 13.8986 9.24144 16.9074 7.77829 17.5994C5.68722 17.721 7.1144 15.0405 7.92135 14.3928C8.18606 14.1816 8.38223 14.084 8.68291 13.9394Z"
      fill="hsl(var(--primary))"
    />
  </svg>
);
