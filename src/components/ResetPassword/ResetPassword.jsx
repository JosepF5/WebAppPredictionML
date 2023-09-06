import { auth } from "../../firebase/app";
import { useNavigate,Link } from 'react-router-dom';
import  { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; 
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        setResetEmailSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const handleBack = () => {
    navigate('/');
  }

  return (
<div className="relative w-screen h-screen flex justify-center items-center bg-black">
  <img
        src={'https://portal.andina.pe/EDPfotografia/Thumbnail/2015/12/01/000328030W.jpg'}
        alt="Fondo de inicio de sesión"
        className="absolute w-full h-full inset-0 z-10 opacity-40"
      />
  <div className="relative z-20 w-64 mx-auto mt-10 p-8 rounded rounded-xl bg-white">
    {resetEmailSent ? (<>
        <p>Se ha enviado un correo electrónico de restablecimiento de contraseña a {email}. Revise su bandeja de entrada.</p>
        <button
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      onClick={handleBack}
    >
      Volver al inicio
    </button>
        </>
        
            ) :(
            <>
    <h2 className="text-lg font-bold mb-4">Por favor, ingrese su dirección de correo electrónico:</h2>
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
    <button
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      onClick={handleResetPassword}
    >
      Enviar correo de restablecimiento
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
    </>)}
  </div>
</div>

  );
}

export default ResetPassword;