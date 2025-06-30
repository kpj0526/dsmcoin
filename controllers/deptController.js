const db = require('../models/db');

exports.getAllDepts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM DEPT');
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createDept = async (req, res) => {
  const { DEPT_NO, DEPT_NAME, CELL_NO, CHECK } = req.body;
  try {
    await db.query(
      'INSERT INTO DEPT (DEPT_NO, DEPT_NAME, CELL_NO, `CHECK`) VALUES (?, ?, ?, ?)',
      [DEPT_NO, DEPT_NAME, CELL_NO || null, CHECK]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteDept = async (req, res) => {
  const deptNo = req.params.id;
  try {
    await db.query('DELETE FROM DEPT WHERE DEPT_NO = ?', [deptNo]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
