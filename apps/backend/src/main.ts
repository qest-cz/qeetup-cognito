import * as express from 'express';
import { verifyToken } from './app/auth';
import * as cors from 'cors'

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
  const authHeaderParts = authorization?.split(' ');
  const token = authHeaderParts && authHeaderParts.length === 2 && authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;

  // curl https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_PsbjHfdX5/.well-known/jwks.json
  const jwk = ['TODO from cognito'] as any[] // TODO
  verifyToken(token, jwk)
}

const ticketController = (req, res) => {
  res.send(tickets);
}

app.get('/api/tickets', cors({ origin: '*' }), /*verifyUser,*/ ticketController);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);