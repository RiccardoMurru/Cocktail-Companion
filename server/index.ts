import express from 'express';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT;
const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  credentials: true
};
app.use(express.json({ limit: '10mb' }));

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('Our server is running successfully sire');
});
