import * as express from 'express';
import { verifyUser } from './auth';
import * as cors from 'cors'

const app = express();

const todos = [
  {
    id: 1,
    title: 'Listen presentaions',
  },
  {
    title: 'Drink beer',
    id: 2,
  }
];

const ticketController = (req, res) => {
  res.send(todos);
}

app.use(cors())
app.get('/api/todos', verifyUser, ticketController);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);