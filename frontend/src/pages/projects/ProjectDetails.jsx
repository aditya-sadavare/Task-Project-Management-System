import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { showErrorToast } from '../../services/api';
import './Projects.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [projectRes, tasksRes] = await Promise.all([
          api.get(`/projects/${id}`),
          api.get('/tasks'),
        ]);

        setProject(projectRes.data);
        setTasks((tasksRes.data || []).filter((t) => String(t.project_id) === String(id)));
      } catch (error) {
        showErrorToast(error.response?.data?.message || 'Failed to load project');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, navigate]);

  const summary = useMemo(() => {
    const total = tasks.length;
    const normalize = (s) => String(s || '').trim().toLowerCase();
    const completed = tasks.filter((t) => normalize(t.status) === 'completed').length;
    const pending = tasks.filter((t) => normalize(t.status) === 'pending').length;
    const inProgress = tasks.filter((t) => normalize(t.status) === 'in progress').length;
    const other = Math.max(0, total - completed - pending - inProgress);
    return { total, completed, pending, inProgress };
  }, [tasks]);

  const progressPct = useMemo(() => {
    if (!summary.total) return 0;
    return Math.round((summary.completed / summary.total) * 100);
  }, [summary.completed, summary.total]);

  if (loading) {
    return (
      <div className="projects-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="projects-container">
        <div className="empty-state">Project not found</div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <button className="btn-secondary" onClick={() => navigate('/projects')} style={{ maxWidth: 220 }}>
        ← Back to Projects
      </button>

      <div style={{ marginTop: '1rem' }} className="form-card">
        <div className="projects-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>{project.name}</h1>
            <p className="project-description" style={{ marginTop: 0 }}>
              {project.description}
            </p>
            <p className="project-meta" style={{ marginTop: '0.5rem' }}>
              <span className="project-meta-label">Created by</span>{' '}
              <strong>{project.created_by_name || '—'}</strong>
            </p>
          </div>
        </div>

        <div className="project-dates" style={{ borderTop: 'none', paddingTop: 0 }}>
          <span>Start: {project.start_date ? new Date(project.start_date).toLocaleDateString() : '—'}</span>
          <span>End: {project.end_date ? new Date(project.end_date).toLocaleDateString() : '—'}</span>
        </div>

        <div className="project-progress" style={{ marginTop: '1.25rem' }}>
          <div className="project-progress-row">
            <div>
              <div className="project-progress-title">Project progress</div>
              <div className="project-progress-subtitle">
                {summary.completed}/{summary.total} tasks completed
              </div>
            </div>
            <div className="project-progress-pct">{progressPct}%</div>
          </div>
          <div className="project-progress-bar" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
            <div className="project-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="project-progress-legend">
            <span className="legend-item"><span className="legend-dot completed" />Completed ({summary.completed})</span>
            <span className="legend-item"><span className="legend-dot inprogress" />In Progress ({summary.inProgress})</span>
            <span className="legend-item"><span className="legend-dot pending" />Pending ({summary.pending})</span>
          </div>
        </div>

        <div className="projects-grid" style={{ marginTop: '1.25rem' }}>
          {[
            { label: 'Total Tasks', value: summary.total },
            { label: 'Completed', value: summary.completed },
            { label: 'Pending', value: summary.pending },
            { label: 'In Progress', value: summary.inProgress },
          ].map((c) => (
            <div key={c.label} className="project-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem' }}>{c.label}</h3>
              <p style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#2c3e50' }}>{c.value}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>Tasks</h3>
          {tasks.length === 0 ? (
            <div className="empty-state" style={{ padding: '1.5rem' }}>
              No tasks in this project yet.
            </div>
          ) : (
            <div className="projects-grid">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="project-card"
                  style={{ padding: '1.25rem', cursor: 'pointer' }}
                  onClick={() => navigate(`/task/${t.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') navigate(`/task/${t.id}`);
                  }}
                >
                  <h3 style={{ marginBottom: 0 }}>{t.title}</h3>
                  <p className="project-description" style={{ marginTop: 0 }}>
                    {t.description}
                  </p>
                  <div className="project-dates">
                    <span>Status: {t.status}</span>
                    <span>Assigned: {t.assigned_user_name || 'Unassigned'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

