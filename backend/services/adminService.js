const userRepository = require('../repositories/userRepository');

async function getAllUsers() {
  return userRepository.findAllUsers();
}

async function updateUserRole(userId, role) {
  const user = await userRepository.updateUserRole(userId, role);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
}

module.exports = {
  getAllUsers,
  updateUserRole
};

