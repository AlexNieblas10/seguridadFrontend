import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Home from './views/Home.jsx'
import { Login } from './views/Login.jsx'
import { Register } from './views/Register.jsx'
import { useState } from 'react'

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => setIsAuthenticated(true)
  const logout = () => setIsAuthenticated(false)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home logout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login login={login} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  )
}
