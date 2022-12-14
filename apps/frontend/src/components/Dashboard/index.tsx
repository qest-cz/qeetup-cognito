import { useState, useEffect } from 'react';

type Todo = {
  title: string;
  id: number;
};

const fetchTodos = async (token?: string) => {
  const response = await fetch('http://localhost:3333/api/todos', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const todos = await response.json();

  return todos;
};

export const Dashboard = ({ token }: { token?: string}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await fetchTodos(token);

        setTodos(todos);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Welcome to the Qeetup!</h1>
      <div>
        <h2>My TODOs:</h2>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
