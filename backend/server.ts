import express, { Request, Response } from 'express';
import cors from 'cors';

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

app.post('/test', async (req: Request, res: Response) => {
  console.log({ body: req.body });

  res.json({ message: 'Successfully submitted form' }).status(201);

  // await Promise.resolve(
  //   setTimeout(() => {
  //     res.status(403).json({ message: 'You are not allowed to access this resource' });
  //   }, 5000)
  // );
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
