import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';
import { formatDate } from '../utils/format.js';
import { Inbox, Layers, Trash, Check, ExternalLink } from '../components/Icons.jsx';

const makeEmptyProject = () => ({
  title: '',
  summary: '',
  description: '',
  techStack: '',
  category: 'Web App',
  year: new Date().getFullYear(),
  image: '',
  liveUrl: '',
  repoUrl: '',
  featured: false
});

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [newProject, setNewProject] = useState(makeEmptyProject);
  const [creating, setCreating] = useState(false);

  const handleAuthError = useCallback(
    (err) => {
      if (err.response?.status === 401) {
        logout();
        navigate('/login', { replace: true });
        return true;
      }
      return false;
    },
    [logout, navigate]
  );

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [messagesRes, projectsRes] = await Promise.all([
        api.get('/contact'),
        api.get('/projects')
      ]);
      setMessages(messagesRes.data);
      setProjects(projectsRes.data);
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.response?.data?.message || 'Could not load dashboard data.');
      }
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const unread = messages.filter((message) => !message.read).length;

  const markRead = async (id) => {
    setActionError('');
    try {
      const { data } = await api.patch(`/contact/${id}/read`);
      setMessages((list) => list.map((message) => (message._id === id ? data : message)));
    } catch (err) {
      if (!handleAuthError(err)) {
        setActionError(err.response?.data?.message || 'Could not update the message.');
      }
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    setActionError('');
    try {
      await api.delete(`/contact/${id}`);
      setMessages((list) => list.filter((message) => message._id !== id));
    } catch (err) {
      if (!handleAuthError(err)) {
        setActionError(err.response?.data?.message || 'Could not delete the message.');
      }
    }
  };

  const handleProjectChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewProject((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const createProject = async (event) => {
    event.preventDefault();
    setCreating(true);
    setActionError('');

    try {
      const payload = {
        ...newProject,
        year: newProject.year ? Number(newProject.year) : undefined,
        techStack: newProject.techStack
          .split(',')
          .map((tech) => tech.trim())
          .filter(Boolean)
      };
      const { data } = await api.post('/projects', payload);
      setProjects((list) => [data, ...list]);
      setNewProject(makeEmptyProject());
    } catch (err) {
      if (!handleAuthError(err)) {
        setActionError(err.response?.data?.message || 'Could not create the project.');
      }
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    setActionError('');
    try {
      await api.delete(`/projects/${id}`);
      setProjects((list) => list.filter((project) => project._id !== id));
    } catch (err) {
      if (!handleAuthError(err)) {
        setActionError(err.response?.data?.message || 'Could not delete the project.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-page container">
      <header className="admin-head">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome back, {user?.name?.split(' ')[0] || 'Admin'}</h1>
          <p className="muted">Manage projects and read messages from your portfolio.</p>
        </div>
        <div className="admin-head-actions">
          <Link className="btn btn-outline btn-sm" to="/">
            <ExternalLink width={16} height={16} /> View site
          </Link>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === 'messages' ? 'active' : ''}`}
          onClick={() => setTab('messages')}
        >
          <Inbox width={17} height={17} /> Messages
          {unread > 0 && <span className="badge-count">{unread}</span>}
        </button>
        <button
          className={`admin-tab ${tab === 'projects' ? 'active' : ''}`}
          onClick={() => setTab('projects')}
        >
          <Layers width={17} height={17} /> Projects
          <span className="badge-count">{projects.length}</span>
        </button>
      </div>

      {actionError && <p className="form-status error">{actionError}</p>}
      {error && <p className="form-status error">{error}</p>}

      {loading ? (
        <Loader label="Loading dashboard…" />
      ) : tab === 'messages' ? (
        <section className="admin-panel">
          {messages.length === 0 ? (
            <div className="admin-empty">
              <Inbox width={28} height={28} />
              <h3>No messages yet</h3>
              <p className="muted">New contact form submissions will appear here.</p>
            </div>
          ) : (
            <div className="admin-list">
              {messages.map((message) => (
                <article
                  key={message._id}
                  className={`message-card ${message.read ? '' : 'unread'}`}
                >
                  <div className="message-head">
                    <div>
                      <h3>{message.subject || 'Portfolio contact'}</h3>
                      <p className="muted">
                        {message.name} ·{' '}
                        <a href={`mailto:${message.email}`}>{message.email}</a>
                      </p>
                    </div>
                    <div className="message-meta">
                      <span className="status-pill">{message.read ? 'Read' : 'New'}</span>
                      <span className="muted">{formatDate(message.createdAt)}</span>
                    </div>
                  </div>

                  <p className="message-body">{message.message}</p>

                  <div className="message-actions">
                    {!message.read && (
                      <button className="btn btn-sm btn-outline" onClick={() => markRead(message._id)}>
                        <Check width={15} height={15} /> Mark read
                      </button>
                    )}
                    <button className="btn btn-sm btn-danger" onClick={() => deleteMessage(message._id)}>
                      <Trash width={15} height={15} /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="admin-projects">
          <form className="admin-form" onSubmit={createProject}>
            <h2>Add a project</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  className="input"
                  name="title"
                  value={newProject.title}
                  onChange={handleProjectChange}
                  placeholder="My new project"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  className="input"
                  name="category"
                  value={newProject.category}
                  onChange={handleProjectChange}
                  placeholder="Web App"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                id="summary"
                className="input"
                name="summary"
                value={newProject.summary}
                onChange={handleProjectChange}
                placeholder="One-line description shown on cards"
                maxLength={300}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="input textarea"
                name="description"
                rows={5}
                value={newProject.description}
                onChange={handleProjectChange}
                placeholder="Longer case-study description. Use a new line and '- ' for bullet points."
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="techStack">Tech stack (comma separated)</label>
                <input
                  id="techStack"
                  className="input"
                  name="techStack"
                  value={newProject.techStack}
                  onChange={handleProjectChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  id="year"
                  className="input"
                  name="year"
                  type="number"
                  value={newProject.year}
                  onChange={handleProjectChange}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  id="image"
                  className="input"
                  name="image"
                  value={newProject.image}
                  onChange={handleProjectChange}
                  placeholder="https://…"
                />
              </div>
              <div className="form-group">
                <label htmlFor="liveUrl">Live URL</label>
                <input
                  id="liveUrl"
                  className="input"
                  name="liveUrl"
                  value={newProject.liveUrl}
                  onChange={handleProjectChange}
                  placeholder="https://…"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="repoUrl">Repository URL</label>
              <input
                id="repoUrl"
                className="input"
                name="repoUrl"
                value={newProject.repoUrl}
                onChange={handleProjectChange}
                placeholder="https://github.com/…"
              />
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="featured"
                checked={newProject.featured}
                onChange={handleProjectChange}
              />
              Feature this project
            </label>

            <button className="btn btn-primary" type="submit" disabled={creating}>
              {creating ? 'Creating…' : 'Add project'}
            </button>
          </form>

          <div className="admin-list">
            {projects.length === 0 ? (
              <div className="admin-empty">
                <Layers width={28} height={28} />
                <h3>No projects yet</h3>
                <p className="muted">Add your first project using the form.</p>
              </div>
            ) : (
              projects.map((project) => (
                <article className="project-row" key={project._id}>
                  <div>
                    <h3>{project.title}</h3>
                    <p className="muted">
                      {project.category}
                      {project.year ? ` · ${project.year}` : ''}
                      {project.featured ? ' · Featured' : ''}
                    </p>
                  </div>
                  <div className="message-actions">
                    <Link className="btn btn-sm btn-outline" to={`/projects/${project._id}`}>
                      View
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteProject(project._id)}>
                      <Trash width={15} height={15} /> Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}
