export const fallbackProfile = {
  name: 'Aarush Bhujel',
  headline: 'Full-Stack Developer & UI Engineer',
  bio: "Im a beginner developer. Im still learning some things. And no I'm not a professional developer. I'm just a beginner developer learning the cruel ways of machine learning.",
  location: 'Kathmandu, Nepal',
  email: 'aarushbhujel976@gmail.com',
  phone: '',
  avatar: '/absolute-annapurna.jpg',
  resumeUrl: '',
  socials: [{ label: 'Email', url: 'mailto:aarushbhujel976@gmail.com' }],
  skills: [
    {
      category: 'Frontend',
      items: ['React', 'HTML', 'Vite']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'MongoDB']
    },
    {
      category: 'DevOps',
      items: ['Git', 'AWS']
    },
    {
      category: 'Design',
      items: ['Figma']
    }
  ]
};

export const fallbackProjects = [
  {
    _id: 'demo-orbit',
    title: 'Orbit Analytics',
    summary:
      'A real-time analytics dashboard that turns raw product events into actionable, live insights.',
    description:
      'Orbit Analytics is a real-time dashboard for product teams who need to understand user behaviour as it happens.\n\nThe backend ingests events over WebSockets and aggregates them in MongoDB, while the React frontend renders live charts and cohort breakdowns without a page refresh.\n\nHighlights:\n- Streaming event pipeline with Socket.IO\n- Custom chart components built from scratch with SVG\n- Role-based access and saved dashboard views\n- Dark and light themes with persisted preferences',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.IO', 'Chart.js'],
    image: '',
    category: 'Web App',
    year: 2025,
    featured: true
  },
  {
    _id: 'demo-nova',
    title: 'Nova Commerce',
    summary:
      'A headless e-commerce storefront with a fast, accessible checkout and a custom CMS.',
    description:
      'Nova Commerce is a headless storefront built for speed. Products are served from a Node API, carts persist across sessions, and checkout is handled with Stripe.\n\nThe focus of this project was conversion: every screen was measured, A/B tested, and refined until the checkout flow felt effortless on mobile.\n\nHighlights:\n- Stripe checkout with webhook order tracking\n- Server-side rendered product pages\n- Optimistic cart updates\n- Fully keyboard accessible',
    techStack: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind CSS', 'Node.js'],
    image: '',
    category: 'E-commerce',
    year: 2024,
    featured: true
  },
  {
    _id: 'demo-taskly',
    title: 'Taskly',
    summary:
      'A collaborative kanban board with drag-and-drop, presence indicators, and real-time sync.',
    description:
      'Taskly is a lightweight project management tool for small teams. Boards update in real time so everyone sees the same state, and presence indicators show who is online.\n\nIt was built to explore optimistic UI patterns and conflict-free list reordering.\n\nHighlights:\n- Drag-and-drop with accessible keyboard controls\n- Real-time sync via Socket.IO rooms\n- Offline-first queue with retry logic\n- Keyboard shortcuts for power users',
    techStack: ['React', 'Express', 'Socket.IO', 'MongoDB'],
    image: '',
    category: 'Web App',
    year: 2024,
    featured: false
  },
  {
    _id: 'demo-devfolio',
    title: 'DevFolio',
    summary:
      'A portfolio content management system — the very template this site is built on.',
    description:
      'DevFolio is a self-hosted portfolio CMS. It pairs a React frontend with an Express and MongoDB API so you can manage projects, profile data, and contact messages without touching code.\n\nHighlights:\n- JWT-protected admin dashboard\n- CRUD for projects and profile content\n- Contact inbox with read states\n- Seeded demo content to get started fast',
    techStack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Vite'],
    image: '',
    category: 'Full-Stack',
    year: 2025,
    featured: true
  },
  {
    _id: 'demo-pulsechat',
    title: 'PulseChat',
    summary:
      'A real-time chat application with typing indicators, read receipts, and message search.',
    description:
      'PulseChat explores the tricky parts of real-time messaging: delivery guarantees, presence, and keeping the UI snappy under load.\n\nRedis pub/sub fans messages out across server instances, and the client reconciles optimistic messages with server acknowledgements.\n\nHighlights:\n- Redis pub/sub for horizontal scaling\n- Typing indicators and read receipts\n- Full-text message search\n- File and image sharing',
    techStack: ['Node.js', 'Express', 'Socket.IO', 'Redis', 'React'],
    image: '',
    category: 'Web App',
    year: 2023,
    featured: false
  },
  {
    _id: 'demo-aperture',
    title: 'Aperture UI',
    summary: 'An accessible, themeable React component library documented with Storybook.',
    description:
      'Aperture UI is a small component library focused on accessibility and composability. Every component ships with keyboard support, focus management, and theme tokens.\n\nHighlights:\n- 30+ accessible components\n- Theme tokens for light and dark mode\n- Storybook documentation\n- Automated interaction tests',
    techStack: ['React', 'TypeScript', 'Storybook', 'CSS'],
    image: '',
    category: 'Design System',
    year: 2023,
    featured: false
  }
];
