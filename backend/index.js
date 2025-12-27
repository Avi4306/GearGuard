import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';


dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());


app.listen(3000, () =>{
    console.log(`Server is running on port http://localhost:${process.env.PORT || 3000}`)
})