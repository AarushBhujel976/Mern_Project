import { useProfile } from '../context/ProfileContext.jsx';
import useSectionNav from '../hooks/useSectionNav.js';
import SocialLinks from './SocialLinks.jsx';
import { getInitials } from '../utils/format.js';
import { ArrowRight, Download, Sparkles } from './Icons.jsx';

export default function Hero() {
  const { profile } = useProfile();
  const go = useSectionNav();
  const firstName = profile.name.split(' ')[0];

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles width={14} height={14} /> Available for new opportunities
          </span>
          <h1 className="hero-title">
            Hi, I&apos;m <span>{firstName}</span>.
          </h1>
          <p className="hero-role">{profile.headline}</p>
          <p className="hero-lead">{profile.bio}</p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => go('projects')}>
              View my work <ArrowRight width={18} height={18} />
            </button>
            {profile.resumeUrl ? (
              <a
                className="btn btn-outline"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Download width={18} height={18} /> Download CV
              </a>
            ) : (
              <button className="btn btn-outline" onClick={() => go('contact')}>
                Get in touch
              </button>
            )}
          </div>

          <SocialLinks socials={profile.socials} className="hero-socials" />
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="avatar-ring">
            <div className="avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                <span className="avatar-initials">{getInitials(profile.name)}</span>
              )}
            </div>
          </div>
          <span className="float-chip chip-1">React</span>
          <span className="float-chip chip-2">Node.js</span>
          <span className="float-chip chip-3">MongoDB</span>
          <span className="float-chip chip-4">Express</span>
        </div>
      </div>

      <button className="scroll-hint" onClick={() => go('about')}>
        Scroll to explore <span className="scroll-line" />
      </button>
    </section>
  );
}
