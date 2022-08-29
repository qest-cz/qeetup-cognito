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

const verifyUser = (req, res, next) => {
  const authorization = req?.headers.authorization
  const authHeaderParts = authorization?.split(' ');
  const token = authHeaderParts && authHeaderParts.length === 2 && authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;

  // curl https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_PsbjHfdX5/.well-known/jwks.json
  const jwk = [{"alg":"RS256","e":"AQAB","kid":"q3Dngj2awqpixmPZDXxU1aQc5TzE21Q0vLe/cR2cc0A=","kty":"RSA","n":"3Rrv5KwfR9v6inyt9_IkB3JM-UuiFYXzicha1Le4_d8ZLeWKVq3AHR0NxnBI66nv2cu8FX5XHNJT6fkDCl-gUl9r6BjaBUddLIqzEJs2BlAxDB5k5mTf7frC7L__THHETdpMVgM-Xd-PHB4OQCorkxLyxa6GbmS7zc_xEjK1kNTnUUPpb--wB0GAThgLmJ-0enrwFi96K2qTUZON7C9Sxxrg2vYJHxqQZWzP5VWNm46Seb13r3lmzHJGkZ46cln1scvxMU6ezFO1eDqP7fFc5qFqVpX-rQ-rDc_MPgWlJiRSwiODB8-dvQxAfSYgXJYsYaRNJh3_WwubeLo5MyWeQw","use":"sig"},{"alg":"RS256","e":"AQAB","kid":"Jc0ALYU2Hb/oaSMRDFr1HFNrgq3sqhSccDKxLPIU1ds=","kty":"RSA","n":"y_5nPbExls0B9zM1M_S4I5FN1olBp7h0wy5rbZHSEAzmDmd4VaG-TSceRxB0p8g5DJrDO2PaJk_T0LMe47dOTEvCm4qNba4sX18N3wW7opU6HiLcKQ5vy9ifDFlLHsz8BJT4jjGg6DaM3pesg5_MENR2hpgGAOIDU9BHcCpijcOJkG-eagMrytarpMi_4N7h4RczC4EIG__8Vb6uQfD1nvnoJcJHmT1_g7pTWS_fZfEt5G5TyUA3wSa9W-qVEXgXYU6tM2nTZLXMWMz_w8-Arsk8ww1jjnYtabrBsmB6Mo_R6fKM-dzM3jeXvMpKmIlI79xJ0O2t2RAxh7hVZMf7lw","use":"sig"}] as any[] // TODO
  
  const user = verifyToken(token, jwk)

  next()
}

const ticketController = (req, res) => {
  res.send(tickets);
}

app.use(cors())
app.get('/api/tickets', verifyUser, ticketController);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error  );