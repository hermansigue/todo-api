const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require('module-alias/register');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '8mb' }));
app.use(express.static('src/public'));
app.use('/api/v1/cms', require('./routes/cms'));

app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const response = {
    message,
    code: statusCode,
  };

  if (err) { console.log(err); }
  // Tangani SequelizeUniqueConstraintError
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    response.message = 'Invalid request body';
    response.code = statusCode;
    response.errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Tambahkan detail errors jika berasal dari ValidationError
  if (err.name === 'ValidationError' && Array.isArray(err.errors)) {
    response.errors = err.errors; // array of { field, message }
  }

  res.status(statusCode).json(response);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => console.log('listening on port ' + port));
