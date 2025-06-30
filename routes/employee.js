const express = require('express');
const router = express.Router();
const empController = require('../controllers/employeeController');

router.get('/', empController.getAllEmployees);
router.get('/search', empController.searchEmployees);
router.post('/', empController.createEmployee);
router.delete('/:pno', empController.deleteEmployee);

module.exports = router;