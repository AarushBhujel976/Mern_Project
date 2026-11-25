import { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch.js';
import { fallbackProjects } from '../data/fallbackData.js';
import ProjectCard from './ProjectCard.jsx';
import Reveal from './Reveal.jsx';

export default function Projects() {
  const { data: projects, error } = useFetch('/projects', {
    fallback: fallbackProjects,
    enabled: !import.meta.env.DEV
  });
  const [category, setCategory] = useState('All');

  const list = projects || [];
  const categories = useMemo(
    () => ['All', ...new Set(list.map((project) => project.category).filter(Boolean))],
    [list]
  );

  const filtered =
    category === 'All' ? list : list.filter((project) => project.category === category);

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">Selected work</span>
            <h2 className="section-title">Projects I&apos;m proud of</h2>
            <p className="section-subtitle">
              A selection of full-stack builds, from real-time dashboards to design systems.
            </p>
          </div>
        </Reveal>

        <div className="filter-row" role="tablist" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={category === item}
              className={`filter-chip ${category === item ? 'active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {error && (
          <p className="inline-note">
            Showing sample projects — the API is currently unreachable.
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No projects in this category yet</h3>
            <p className="muted">Try a different filter or check back soon.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filtered.map((project, index) => (
              <Reveal key={project._id || project.slug || project.title} delay={index * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
