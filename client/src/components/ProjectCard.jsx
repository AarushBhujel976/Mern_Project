import { Link } from 'react-router-dom';
import { getInitials, hashHue } from '../utils/format.js';
import { ArrowUpRight, ExternalLink, Github } from './Icons.jsx';

export default function ProjectCard({ project }) {
  const hue = hashHue(project.title);
  const coverStyle = project.image
    ? undefined
    : {
        background: `linear-gradient(135deg, hsl(${hue} 75% 58%), hsl(${(hue + 55) % 360} 75% 42%))`
      };

  return (
    <article className="project-card">
      <div className="project-cover" style={coverStyle}>
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <span className="project-initials">{getInitials(project.title)}</span>
        )}
        {project.featured && <span className="featured-badge">Featured</span>}
      </div>

      <div className="project-body">
        <div className="project-meta">
          {project.category}
          {project.year ? ` · ${project.year}` : ''}
        </div>
        <h3>{project.title}</h3>
        <p className="project-summary">{project.summary}</p>

        {project.techStack?.length > 0 && (
          <ul className="tech-list">
            {project.techStack.slice(0, 5).map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}

        <div className="project-links">
          <Link className="text-link" to={`/projects/${project._id}`}>
            Case study <ArrowUpRight width={16} height={16} />
          </Link>
          {project.liveUrl && (
            <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">
              <ExternalLink width={15} height={15} /> Live
            </a>
          )}
          {project.repoUrl && (
            <a className="text-link" href={project.repoUrl} target="_blank" rel="noreferrer">
              <Github width={15} height={15} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
