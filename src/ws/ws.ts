import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new SocketIO(server, { cors: { origin: '*' } });

export function initializeSocket() {
  io.on('connection', (socket) => {
    console.log('Im Online!');
    socket.on('disconnect', () => {
      console.log('Im Offline!');
    });
  });
}

export { app, server, io };
