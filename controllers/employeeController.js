const db = require('../models/db');

exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT E.P_NO, E.NAME, E.SALARY, D.DEPT_NAME
      FROM EMPLOYEE E
      JOIN DEPT D ON E.DEPT_NO = D.DEPT_NO
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ 사원 목록 조회 실패:', err);
    res.status(500).json({ error: '사원 목록 조회 중 오류 발생' });
  }
};

exports.createEmployee = async (req, res) => {
  const { NAME, SALARY, DEPT_NO } = req.body;
  if (!NAME || !SALARY || !DEPT_NO) {
    return res.status(400).json({ error: '이름, 급여, 부서번호는 필수입니다.' });
  }
  try {
    const [deptCheck] = await db.query('SELECT * FROM DEPT WHERE DEPT_NO = ?', [DEPT_NO]);
    if (deptCheck.length === 0) {
      return res.status(400).json({ error: '해당 부서번호가 존재하지 않습니다.' });
    }

    await db.query('INSERT INTO EMPLOYEE (NAME, SALARY, DEPT_NO) VALUES (?, ?, ?)', [
      NAME,
      SALARY,
      DEPT_NO
    ]);
    res.status(201).json({ message: '사원 등록 완료' });
  } catch (err) {
    console.error('❌ 사원 등록 실패:', err);
    res.status(500).json({ error: '사원 등록 중 오류 발생' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { pno } = req.params;
  try {
    await db.query('DELETE FROM EMPLOYEE WHERE P_NO = ?', [pno]);
    res.json({ message: '사원 삭제 완료' });
  } catch (err) {
    console.error('❌ 사원 삭제 실패:', err);
    res.status(500).json({ error: '사원 삭제 중 오류 발생' });
  }
};
