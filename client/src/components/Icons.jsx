const baseProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false
};

export const Sun = (props) => (
  <svg {...baseProps} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

export const Moon = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const Menu = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Close = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

export const ArrowLeft = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ExternalLink = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M14 3h7v7M21 3l-9 9" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

export const Github = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const Mail = (props) => (
  <svg {...baseProps} {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

export const MapPin = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Send = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
  </svg>
);

export const Download = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const Trash = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
  </svg>
);

export const Check = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Inbox = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

export const Layers = (props) => (
  <svg {...baseProps} {...props}>
    <path d="m12 2 9 5-9 5-9-5 9-5z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </svg>
);

export const Code = (props) => (
  <svg {...baseProps} {...props}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

export const Briefcase = (props) => (
  <svg {...baseProps} {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const Sparkles = (props) => (
  <svg {...baseProps} {...props}>
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" />
    <path d="M19 15l.9 2.3L22 18.2l-2.1.9L19 21.5l-.9-2.4L16 18.2l2.1-.9L19 15z" />
  </svg>
);

export const socialIcons = {
  GitHub: Github,
  Email: Mail
};
