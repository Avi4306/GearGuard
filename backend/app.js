const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Userrouter = require('./Routes/user.route');
const AuthRouter = require('./routes/auth.route');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', AuthRouter);


// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api', Userrouter);
app.use('/api/auth', AuthRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
