import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const StyledApp = styled.div``;

type Ticket = {
  title: string;
  id: number;
};

export const Dashboard = () => {
  const [todos, setTodos] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let token: string
      try {
        const currentSession = await Auth.currentSession();
        token = currentSession.getIdToken().getJwtToken();
      } catch (e) {
        console.error(e)
        return navigate("/login");
      }

      const response = await fetch('http://localhost:3333/api/todos', { headers: { Authorization: `Bearer ${token}` } })
      const todos = await response.json()
      setTodos(todos)
    }

    fetchData().catch(console.error)
  }, []);

  return (
    <StyledApp>
      <header className="flex">
        <h1>Welcome to Qeetup!</h1>
      </header>
      <main>
        {todos.map(t => (
          <p key={t.id}>
            {t.title}
          </p>
        ))}
      </main>
    </StyledApp>
  );
};

export default Dashboard;