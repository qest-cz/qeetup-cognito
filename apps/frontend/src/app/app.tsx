import { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import styled from 'styled-components';

const env = process.env as any

Amplify.configure({
  Auth: {
    region: env.NX_REGION,
    userPoolId: env.NX_USER_POOL_ID,
    userPoolWebClientId: env.NX_USER_POOL_CLIENT_ID,
  },
});

const StyledApp = styled.div``;

type Ticket = {
  title: string;
  id: number;
};

export const App = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // aws cognito-idp admin-set-user-password --user-pool-id eu-west-1_PsbjHfdX5 --username sevipe7495@rxcay.com --password "sevipe7495@rxcay.com" --permanent
      await Auth.signIn({ username: 'sevipe7495@rxcay.com', password: 'sevipe7495@rxcay.com' });

      const currentSession = await Auth.currentSession();
      const token = currentSession.getIdToken().getJwtToken();

      const response = await fetch('http://localhost:3333/api/tickets', { headers: { Authorization: `Bearer ${token}` } })
      const tickets = await response.json()
      setTickets(tickets)
    }

    fetchData().catch(console.error)
  }, []);

  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to tickets!</h1>
      </header>
      <main>
        {tickets.map(t => (
          <p className="ticket flex" key={t.id}>
            {t.title}
          </p>
        ))}
      </main>
    </StyledApp>
  );
};

export default App;