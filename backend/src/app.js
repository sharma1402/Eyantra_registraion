require('dotenv').config();
const express = require('express');
const cors = require('cors');

const lookupRoutes = require('./routes/lookupRoutes');
const otpRoutes = require('./routes/otpRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', lookupRoutes);
app.use('/api', otpRoutes);
app.use('/api', registrationRoutes);

app.use(errorHandler);

module.exports = app;