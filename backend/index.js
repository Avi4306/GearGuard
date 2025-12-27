import express from 'express';
import cors from 'cors'


const app = express();

//middleware
app.use(cors());

app.listen(5000, () =>{
    console.log("Server has started on port ")
})