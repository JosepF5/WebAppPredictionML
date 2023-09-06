import { auth } from "../../firebase/app";
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa el método de autenticación adecuado de Firebase

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        navigate('/menu');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleInputChange}
          value={email}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleInputChange}
          value={password}
        />
      </div>
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;