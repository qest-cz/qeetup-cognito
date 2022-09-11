import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await Auth.signIn({ username: email, password });
      navigate('/');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <button onClick={() => navigate('/registration')}>Register</button>
      </div>
    </div>
  );
};

export default Login;
