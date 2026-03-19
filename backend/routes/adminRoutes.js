const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/users',
  authenticateJWT,
  authorizeRoles('Admin'),
  adminController.getUsers
);

router.put(
  '/user-role',
  authenticateJWT,
  authorizeRoles('Admin'),
  adminController.updateUserRole
);

module.exports = router;

