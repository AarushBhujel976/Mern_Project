import { useState } from 'react';
import api from '../api/axios.js';
import { useProfile } from '../context/ProfileContext.jsx';
import Reveal from './Reveal.jsx';
import SocialLinks from './SocialLinks.jsx';
import { Mail, MapPin, Send, Check } from './Icons.jsx';

const emptyForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { profile } = useProfile();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const { data } = await api.post('/contact', form);
      setStatus({ type: 'success', message: data.message });
      setForm(emptyForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.response?.data?.message ||
          `Something went wrong. Please email me directly at ${profile.email}.`
      });
    }
  };

  const isLoading = status.type === 'loading';

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading center">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Let&apos;s build something together</h2>
            <p className="section-subtitle">
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <form className="contact-card" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  className="input"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="input textarea"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about what you're working on…"
                  required
                />
              </div>

              <button className="btn btn-primary btn-block" type="submit" disabled={isLoading}>
                {isLoading ? (
                  'Sending…'
                ) : (
                  <>
                    Send message <Send width={18} height={18} />
                  </>
                )}
              </button>

              {status.type === 'success' && (
                <p className="form-status success">
                  <Check width={16} height={16} /> {status.message}
                </p>
              )}
              {status.type === 'error' && <p className="form-status error">{status.message}</p>}
            </form>
          </Reveal>

          <Reveal className="contact-info" delay={120}>
            <h3>Prefer a direct line?</h3>
            <p className="muted">
              I usually reply within a day. Reach out however works best for you.
            </p>

            <a className="info-item" href={`mailto:${profile.email}`}>
              <span className="info-icon">
                <Mail width={18} height={18} />
              </span>
              <span>
                <span className="fact-label">Email</span>
                <strong>{profile.email}</strong>
              </span>
            </a>

            <div className="info-item">
              <span className="info-icon">
                <MapPin width={18} height={18} />
              </span>
              <span>
                <span className="fact-label">Location</span>
                <strong>{profile.location || 'Remote'}</strong>
              </span>
            </div>

            <div className="contact-socials">
              <span className="fact-label">Find me online</span>
              <SocialLinks socials={profile.socials} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
