import { useProfile } from '../context/ProfileContext.jsx';
import Reveal from './Reveal.jsx';
import { MapPin, Mail, Briefcase } from './Icons.jsx';

export default function About() {
  const { profile } = useProfile();
  const skills = profile.skills || [];
  const skillCount = skills.reduce((total, group) => total + (group.items?.length || 0), 0);

  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">About me</span>
            <h2 className="section-title">A developer who sweats the details</h2>
            <p className="section-subtitle">
               I am a beginner developer learning the cruel ways of machine learning. 
            </p>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-copy">
            <p>{profile.bio}</p>
            <div className="fact-list">
              <div className="fact">
                <span className="fact-icon">
                  <MapPin width={18} height={18} />
                </span>
                <div>
                  <span className="fact-label">Location</span>
                  <strong>{profile.location || 'Remote'}</strong>
                </div>
              </div>
              <div className="fact">
                <span className="fact-icon">
                  <Mail width={18} height={18} />
                </span>
                <div>
                  <span className="fact-label">Email</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              </div>
              <div className="fact">
                <span className="fact-icon">
                  <Briefcase width={18} height={18} />
                </span>
                <div>
                  <span className="fact-label">Focus</span>
                  <strong>{profile.headline}</strong>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="stat-grid" delay={120}>
            <div className="stat-card">
              <span className="stat-value">{skills.length}</span>
              <span className="stat-label">Skill areas</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{skillCount}</span>
              <span className="stat-label">Tools & technologies</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Partial learning</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">No</span>
              <span className="stat-label">Job</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
