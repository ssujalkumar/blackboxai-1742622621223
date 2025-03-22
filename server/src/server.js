const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

// MongoDB Connection with improved options
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to InnovateInk API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      articles: '/api/articles'
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  
  res.status(status).json({ 
    error: {
      message,
      status,
      timestamp: new Date().toISOString()
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}`);
});

module.exports = app;
