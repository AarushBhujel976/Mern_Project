import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import useSectionNav from '../hooks/useSectionNav.js';
import SocialLinks from './SocialLinks.jsx';
import { getInitials } from '../utils/format.js';

const footerLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export default function Footer() {
  const { profile } = useProfile();
  const { user } = useAuth();
  const go = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand brand-static">
            <span className="brand-mark">
              {profile.avatar ? <img src={profile.avatar} alt="" /> : getInitials(profile.name)}
            </span>
            <span className="brand-text">
              {profile.name.split(' ')[0]}
              <span className="brand-dot">.</span>
            </span>
          </div>
          <p className="muted">{profile.headline}</p>
          <SocialLinks socials={profile.socials} />
        </div>

        <nav className="footer-links" aria-label="Footer">
          <span className="footer-heading">Explore</span>
          {footerLinks.map((link) => (
            <button key={link.id} className="footer-link" onClick={() => go(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="footer-links">
          <span className="footer-heading">Get in touch</span>
          <a className="footer-link" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <span className="footer-link muted">{profile.location}</span>
          <Link className="footer-link" to={user ? '/admin' : '/login'}>
            {user ? 'Dashboard' : 'Admin login'}
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span className="muted">© {year} {profile.name}. Absolutely no rights reserved.</span>
        <span className="muted">Built with the MERN stack.</span>
      </div>
    </footer>
  );
}
