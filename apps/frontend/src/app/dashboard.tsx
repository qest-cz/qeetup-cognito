import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledApp = styled.div``;

type Todo = {
  title: string;
  id: number;
};

const verifyLogin = async () => {
  const currentSession = await Auth.currentSession();
  return currentSession.getIdToken().getJwtToken();
};

const fetchTodos = async (token: string) => {
  const response = await fetch('http://localhost:3333/api/todos', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const todos = await response.json();

  return todos;
};

export const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await verifyLogin();
        const todos = await fetchTodos(token);

        setTodos(todos);
      } catch (e) {
        console.error(e);
        return navigate('/login');
      }
    };

    fetchData();
  }, []);

  return (
    <StyledApp>
      <h1>Welcome to Qeetup!</h1>
      <div>
        <h3>My TODOs</h3>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </div>
    </StyledApp>
  );
};

export default Dashboard;
