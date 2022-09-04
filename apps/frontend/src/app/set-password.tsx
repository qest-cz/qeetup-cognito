import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export const SetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const email = 'rivexen690@otodir.com' // TODO fill from queryParams
      const code = '657448' // TODO fill from queryParams

      // TODO test it
      await Auth.confirmSignUp(email, code);
      // await Auth.signIn(email, queryParams.auth)
      // await Auth.completeNewPassword(email, password)

      navigate("/");
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default SetPassword;