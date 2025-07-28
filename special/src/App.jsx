import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import BirthdayWish from './pages/BirthdayWish';
import BirthdayPage from './pages/BirthdayPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/birthday" />
          ) : (
            <Login onSuccess={() => setIsAuthenticated(true)} />
          )
        }
      />
      <Route
        path="/birthday"
        element={
          isAuthenticated ? <BirthdayWish /> : <Navigate to="/" />
        }
      />
       <Route
        path="/birthdayWish"
        element={
          isAuthenticated ? <BirthdayPage /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;
