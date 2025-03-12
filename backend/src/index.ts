import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from './config';
import paymentRoutes from './routes/payment.routes';
import { AppError } from './types/stripe';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api', paymentRoutes);

// Error handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
}); 