import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export function Login({ login }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      })

      const data = await res.json()

      if (res.ok) {
        login()
        navigate('/')
      } else {
        setError(data.error || 'Error desconocido')
      }
    } catch (err) {
      setError('Error de conexión' + err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Iniciar Sesión</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Usuario"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Contraseña"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Entrar
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  )
}
