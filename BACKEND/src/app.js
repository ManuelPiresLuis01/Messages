import express from 'express';
import cors from 'cors';
import Signup from './controlers/signup.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/signup", Signup)


export default app;