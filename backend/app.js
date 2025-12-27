import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Userrouter from './Routes/user.route.js'; // Changed from require
import maintenanceRoutes from './routes/maintenanceRoutes.js';
const AuthRouter = require('./routes/auth.route');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', Userrouter);
app.use('/api/auth', AuthRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
