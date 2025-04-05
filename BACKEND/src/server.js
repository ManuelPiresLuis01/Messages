import app from "./app.js";
import http from 'http';
import { Server } from 'socket.io';
import dotenv from "dotenv"

dotenv.config()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('send_message', (data) => {
    console.log('📨 Mensagem recebida:', data);
    
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, '0.0.0.0',  () => {
  console.log(`http://0.0.0.0:${PORT}`);
});