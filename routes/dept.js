const express = require('express');
const router = express.Router();
const deptController = require('../controllers/deptController');

router.get('/', deptController.getAllDepts);
router.post('/', deptController.createDept);
router.delete('/:id', deptController.deleteDept);

module.exports = router;
