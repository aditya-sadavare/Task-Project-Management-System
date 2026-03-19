const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

dotenv.config();

const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from frontend build
const staticPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(staticPath));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

// Serve index.html for React Router (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

