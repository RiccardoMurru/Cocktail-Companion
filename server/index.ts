import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();
const port = 3001;
const corsConfig = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('Our server is running successfully sire');
});
