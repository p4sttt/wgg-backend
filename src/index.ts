import { config } from 'dotenv';
config();

import cors from 'cors';
import express from 'express';
import http from 'http';

import { authRouter, roomRouter } from '~/routes';
import { socketService } from '~/services';

const app = express();

app.use(cors({ origin: process.env.ALLOWED_URLS }));
app.use(express.json());

const httpServer = http.createServer(app);

socketService.listen();

app.use('/api/auth', authRouter);
app.use('/api/room', roomRouter);

const port = Number(process.env.PORT);
httpServer.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
