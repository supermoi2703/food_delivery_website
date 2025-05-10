import express from 'express';
import cors from 'cors';


//app config
const app = express();
const port = 4000;

//middle ware
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("API is running");
})


app.listen(port, () =>{
    console.log(`Server Started on http://localhost:${port}`);
})