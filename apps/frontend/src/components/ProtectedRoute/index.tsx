import { Auth } from 'aws-amplify';
import { Children, isValidElement } from 'react';
import { cloneElement, useEffect, useState } from 'react';
import { useNavigate, RouteProps } from 'react-router-dom';

const ProtectedRoute = (props: RouteProps) => {
  const [token, setToken] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const currentSession = await Auth.currentSession();
        const token = currentSession.getIdToken().getJwtToken();

        setToken(token)
        setLoading(false)
      } catch (e) {
        console.error(e);
        return navigate('/login');
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <div>Checking auth...</div>
  }

  return <>{Children.map(props.children, child => {
    return isValidElement(child) && cloneElement(child, { ...props, token })
  })}</>;
};

export default ProtectedRoute;
