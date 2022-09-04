import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // aws cognito-idp admin-set-user-password --user-pool-id eu-west-1_PsbjHfdX5 --username sevipe7495@rxcay.com --password "sevipe7495@rxcay.com" --permanent
    // await Auth.signIn({ username: 'sevipe7495@rxcay.com', password: 'sevipe7495@rxcay.com' });
    try {
      await Auth.signIn({ username: email, password });
      navigate("/");
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>Password:
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
        <button onClick={() => navigate("/registration")}>Register</button>
      </div>
    </div>
  );
};

export default Login;