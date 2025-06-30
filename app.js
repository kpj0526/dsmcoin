const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const deptRoutes = require('./routes/dept');
const empRoutes = require('./routes/employee');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/dept', deptRoutes);
app.use('/api/employee', empRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});