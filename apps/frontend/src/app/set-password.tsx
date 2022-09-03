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

export const SetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const email = 'aaa' // TODO fill from queryParams
      const code = 'aaa' // TODO fill from queryParams

      // TODO test it
      await Auth.confirmSignUp(email, code);
      // await Auth.signIn(email, queryParams.auth)
      await Auth.completeNewPassword(email, password)

      navigate("/");
    } catch (e) {
      alert(e)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Confirm registration, create a new password</h1>
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

export default SetPassword;