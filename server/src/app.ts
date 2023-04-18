import cors from 'cors';
import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import { buildResult, fetchJokes } from './helpers';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/jokes', async (req: Request, res: Response) => {
  try {
    const { amount, type } = req.query;

    const data = await fetchJokes(
      amount?.toString() || '10',
      type?.toString() || 'any'
    );

    const jokes = amount === '1' ? [data] : data.jokes;
    const result = buildResult(jokes);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

export default app;
