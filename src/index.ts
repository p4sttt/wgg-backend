import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { authRouter } from '~/routes';

import handleSocketConnection from './socket';

config();

const app = express();

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

const io = new Server(httpServer, { cors: { origin: '*' } });
io.on('connection', handleSocketConnection);

app.use('/api/auth', authRouter);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`server started on port ${port}`);
});
