const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const AuthRouter = require('./routes/auth.route');
const UserRouter = require('./routes/user.route');
const EquipmentRouter = require('./routes/equipment.route');
const RequestRouter = require('./routes/request.route');
const TeamRouter = require('./routes/team.route');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('GearGuard API is running');
});

app.use('/api/auth', AuthRouter);
app.use('/api', UserRouter);
app.use('/api', EquipmentRouter);
app.use('/api', RequestRouter);
app.use('/api', TeamRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});