import { auth } from "../../firebase/app";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importa el método de autenticación adecuado de Firebase
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Inicio de sesión exitoso");
        setIsAuthenticated(true);
        localStorage.setItem("email", email);
        navigate("/menu");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-black">
      <img
        src={
          "https://portal.andina.pe/EDPfotografia/Thumbnail/2015/12/01/000328030W.jpg"
        }
        alt="Fondo de inicio de sesión"
        className="absolute w-full h-full inset-0 z-10 opacity-40"
      />
      <div className="relative z-20 w-64 mx-auto mt-10 p-8 rounded rounded-xl bg-white">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={email}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={handleInputChange}
            value={password}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Iniciar Sesión
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
