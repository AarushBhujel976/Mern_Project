import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios.js';
import { fallbackProjects } from '../data/fallbackData.js';
import Loader from '../components/Loader.jsx';
import Reveal from '../components/Reveal.jsx';
import { hashHue, getInitials } from '../utils/format.js';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from '../components/Icons.jsx';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (import.meta.env.DEV) {
      setProject(fallbackProjects.find((item) => item._id === id) || null);
      setLoading(false);
      return undefined;
    }

    let active = true;
    setLoading(true);

    api
      .get(`/projects/${id}`)
      .then(({ data }) => {
        if (active) setProject(data);
      })
      .catch(() => {
        const local = fallbackProjects.find((item) => item._id === id);
        if (active) setProject(local || null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, fallbackProjects]);

  if (loading) {
    return (
      <div className="detail-page container">
        <Loader label="Loading project…" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="detail-page container">
        <div className="empty-state">
          <h2>Project not found</h2>
          <p className="muted">The project you are looking for doesn&apos;t exist or was removed.</p>
          <Link className="btn btn-primary" to="/">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const hue = hashHue(project.title);
  const coverStyle = project.image
    ? undefined
    : {
        background: `linear-gradient(135deg, hsl(${hue} 75% 58%), hsl(${(hue + 55) % 360} 75% 42%))`
      };
  const blocks = (project.description || project.summary || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="detail-page">
      <div className="container">
        <Link className="detail-back" to="/">
          <ArrowLeft width={16} height={16} /> Back to portfolio
        </Link>

        <Reveal>
          <header className="detail-hero">
            <div className="project-meta">
              {project.category}
              {project.year ? ` · ${project.year}` : ''}
            </div>
            <h1>{project.title}</h1>
            <p className="detail-summary">{project.summary}</p>
            <div className="detail-actions">
              {project.liveUrl && (
                <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live site <ExternalLink width={17} height={17} />
                </a>
              )}
              {project.repoUrl && (
                <a className="btn btn-outline" href={project.repoUrl} target="_blank" rel="noreferrer">
                  <Github width={17} height={17} /> View source
                </a>
              )}
            </div>
          </header>
        </Reveal>

        <Reveal>
          <div className="detail-cover" style={coverStyle}>
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <span className="detail-initials">{getInitials(project.title)}</span>
            )}
          </div>
        </Reveal>

        <div className="detail-grid">
          <Reveal className="detail-body">
            <h2>Overview</h2>
            {blocks.map((line, index) =>
              line.startsWith('- ') ? (
                <p className="detail-bullet" key={index}>
                  {line.slice(2)}
                </p>
              ) : (
                <p key={index}>{line}</p>
              )
            )}
          </Reveal>

          <Reveal className="detail-sidebar" delay={120}>
            <div className="detail-card">
              <span className="fact-label">Tech stack</span>
              <ul className="tech-list vertical">
                {project.techStack?.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="detail-card">
              <span className="fact-label">Details</span>
              <div className="detail-fact">
                <span>Category</span>
                <strong>{project.category}</strong>
              </div>
              <div className="detail-fact">
                <span>Year</span>
                <strong>{project.year || '—'}</strong>
              </div>
              {project.liveUrl && (
                <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live demo <ArrowUpRight width={15} height={15} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
