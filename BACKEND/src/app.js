import express from 'express';
import cors from 'cors';
import signup from './controlers/signup.js';
import signin from './controlers/signin.js';
import getUserProfile from './controlers/userLoged.js';
import getAllUsers from './controlers/getUsers.js'
import getUserById from './controlers/getUserById.js';
import verifyToken from './middleware/verifyToken.js';
import Chat from './controlers/MessageChat.js' 
import listMessage from './controlers/listMessage.js';
import sendMessage from './controlers/sendMessage.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/signup", signup)
app.post("/signin", signin)
app.post("/chat", verifyToken, Chat);
app.post("/sendMessage/:chat_id", verifyToken, sendMessage);
app.get("/listMessage/:chat_id", verifyToken, listMessage);
app.get("/me", verifyToken, getUserProfile);
app.get("/getUsers", verifyToken,getAllUsers);
app.get("/getUserById/:id", verifyToken,getUserById);

export default app;