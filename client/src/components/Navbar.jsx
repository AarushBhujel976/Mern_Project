import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import useSectionNav from '../hooks/useSectionNav.js';
import { getInitials } from '../utils/format.js';
import { Menu, Close, Sun, Moon } from './Icons.jsx';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const { profile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const go = useSectionNav();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = (id) => {
    setOpen(false);
    go(id);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <button className="brand" onClick={() => navigateTo('home')} aria-label="Back to top">
          <span className="brand-mark">
            {profile.avatar ? <img src={profile.avatar} alt="" /> : getInitials(profile.name)}
          </span>
          <span className="brand-text">
            {profile.name.split(' ')[0]}
            <span className="brand-dot">.</span>
          </span>
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          {links.map((link) => (
            <button key={link.id} className="nav-link" onClick={() => navigateTo(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
          </button>
          <Link to={user ? '/admin' : '/login'} className="btn btn-ghost btn-sm nav-cta">
            {user ? 'Dashboard' : 'Admin'}
          </Link>
          <button
            className="icon-btn mobile-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
