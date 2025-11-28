import express, { Application } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Simple message endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from GitHub Actions Demo>>>>>>>>>>>',
    timestamp: new Date().toISOString(),
    status: 'success',    
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    message: process.env.HEALTH_MESSAGE || 'Server is running fine!',    
  });
});

// Simple API endpoint
app.get('/api/message', (req, res) => {
  res.json({
    message: process.env.API_MESSAGE || 'This is a simple API response',
    data: {
      version: '1.0.0',      
    }
  });
});

// Start server (only if not in test environment)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);    
  });
}

export default app;

