import { config } from 'dotenv';
config();

import cors from 'cors';
import express from 'express';
import { handleHttpErrors } from 'middlewares';

import { authRouter, roomRouter } from '~/routes';
import { socketService } from '~/services';

socketService.listen();

const app = express();

app.use(cors({ origin: process.env.ALLOWED_URLS }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/room', roomRouter);

app.use(handleHttpErrors);

const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
