const pool = require('../config/db');

async function getUserDashboard(userId) {
  const [taskCountsResult] = await Promise.all([
    pool.query(
      `SELECT 
          COUNT(*)::int AS total_tasks,
          SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END)::int AS completed_tasks,
          SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END)::int AS pending_tasks,
          SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END)::int AS in_progress_tasks
       FROM tasks
       WHERE assigned_user = $1`,
      [userId]
    )
  ]);

  const row = taskCountsResult.rows[0] || {};

  return {
    totalTasks: row.total_tasks || 0,
    completedTasks: row.completed_tasks || 0,
    pendingTasks: row.pending_tasks || 0,
    inProgressTasks: row.in_progress_tasks || 0
  };
}

async function getManagerDashboard(managerId) {
  const [projectCountsResult, taskCountsResult] = await Promise.all([
    pool.query(
      `SELECT COUNT(*)::int AS total_projects
       FROM projects
       WHERE created_by = $1`,
      [managerId]
    ),
    pool.query(
      `SELECT 
          COUNT(t.*)::int AS total_tasks,
          SUM(CASE WHEN t.status = 'Completed' THEN 1 ELSE 0 END)::int AS completed_tasks,
          SUM(CASE WHEN t.status = 'Pending' THEN 1 ELSE 0 END)::int AS pending_tasks,
          SUM(CASE WHEN t.status = 'In Progress' THEN 1 ELSE 0 END)::int AS in_progress_tasks
       FROM tasks t
       LEFT JOIN projects p ON p.id = t.project_id
       WHERE p.created_by = $1`,
      [managerId]
    )
  ]);

  const projectRow = projectCountsResult.rows[0] || {};
  const taskRow = taskCountsResult.rows[0] || {};

  return {
    totalProjects: projectRow.total_projects || 0,
    totalTasks: taskRow.total_tasks || 0,
    completedTasks: taskRow.completed_tasks || 0,
    pendingTasks: taskRow.pending_tasks || 0,
    inProgressTasks: taskRow.in_progress_tasks || 0
  };
}

async function getAdminDashboard() {
  const [projectCountsResult, taskCountsResult] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int AS total_projects FROM projects`),
    pool.query(
      `SELECT 
          COUNT(*)::int AS total_tasks,
          SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END)::int AS completed_tasks,
          SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END)::int AS pending_tasks,
          SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END)::int AS in_progress_tasks
       FROM tasks`
    )
  ]);

  const projectRow = projectCountsResult.rows[0] || {};
  const taskRow = taskCountsResult.rows[0] || {};

  return {
    totalProjects: projectRow.total_projects || 0,
    totalTasks: taskRow.total_tasks || 0,
    completedTasks: taskRow.completed_tasks || 0,
    pendingTasks: taskRow.pending_tasks || 0,
    inProgressTasks: taskRow.in_progress_tasks || 0
  };
}

module.exports = {
  getUserDashboard,
  getManagerDashboard,
  getAdminDashboard
};

