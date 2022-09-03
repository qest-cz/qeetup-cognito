import { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const env = process.env as any

Amplify.configure({
  Auth: {
    region: env.NX_REGION,
    userPoolId: env.NX_USER_POOL_ID,
    userPoolWebClientId: env.NX_USER_POOL_CLIENT_ID,
  },
});

export const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      await Auth.signUp({ username: email, password });
      navigate("/login");
    } catch (e) {
      alert(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration</h1>
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
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Registration;