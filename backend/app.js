import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import equipmentRouter from './routes/equipment.routes.js';
import requestRouter from './routes/request.route.js';
import teamRouter from './routes/team.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('GearGuard API is running');
});

app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', equipmentRouter);
app.use('/api', requestRouter);
app.use('/api', teamRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});