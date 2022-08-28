import * as express from 'express';
import { verifyToken } from './app/auth';

const app = express();

type Ticket = {
  title: string;
  id: number;
};

const tickets: Ticket[] = [
  {
    title: `Install updates`,
    id: 1
  },
  {
    title: `Restore the backup`,
    id: 2
  }
];

const verifyUser = (req, res) => {
  const authorization = req?.headers.authorization
  if (!authorization) {
    throw new Error('Unauthorized 401')
  }

  const jwk = ['TODO from cognito'] as any [] // TODO
  verifyToken(authorization, jwk)
}

const ticketController = (req, res) => {
  res.send(tickets);
}

app.get('/api/tickets', /*verifyUser,*/ ticketController);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);