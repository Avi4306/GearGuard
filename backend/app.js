import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Userrouter from './Routes/user.route.js'; // Changed from require
import maintenanceRoutes from './routes/maintenanceRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
  res.send('Hamlo chamans');
});

app.use('/api', Userrouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
