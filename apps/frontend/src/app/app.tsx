import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import Registration from '../components/Registration';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
