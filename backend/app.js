const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const Userrouter = require('./Routes/user.route');


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
