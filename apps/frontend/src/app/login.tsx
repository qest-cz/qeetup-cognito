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

export const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    // aws cognito-idp admin-set-user-password --user-pool-id eu-west-1_PsbjHfdX5 --username sevipe7495@rxcay.com --password "sevipe7495@rxcay.com" --permanent
    // await Auth.signIn({ username: 'sevipe7495@rxcay.com', password: 'sevipe7495@rxcay.com' });
    try {
      event.preventDefault();
      await Auth.signIn({ username, password });
      navigate("/");
    } catch (e) {
      alert(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default App;