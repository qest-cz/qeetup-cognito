import { useState, useEffect } from "react";

import styled from 'styled-components';

const StyledApp = styled.div``;


type Ticket = {
  title: string;
  id: number;
};

export const App = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/api/tickets')
      .then(t => t.json())
      .then(setTickets);
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