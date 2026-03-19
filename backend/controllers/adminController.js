const adminService = require('../services/adminService');

async function getUsers(req, res, next) {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const { userId, role } = req.body;
    const user = await adminService.updateUserRole(userId, role);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  updateUserRole
};

