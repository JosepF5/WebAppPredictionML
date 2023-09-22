import React from 'react'
import { auth } from "../../firebase/app";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue } from 'firebase/database';
import { database } from "../../firebase/app";
import { useEffect } from 'react';

const Admin = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleLogout = () => {
        console.log("???");
        setIsAuthenticated(false);
        navigate("/");
    };

    useEffect(() => {
        // Obtiene una referencia a la base de datos en la ruta "usuarios"
        const usuariosRef = ref(database, 'usuarios');

        // Escucha cambios en los datos de la ruta "usuarios"
        onValue(usuariosRef, (snapshot) => {
            const data = snapshot.val() || {};

            // Convierte los datos en un array de objetos
            const usuariosArray = Object.entries(data).map(([key, value]) => ({
                id: key,
                ...value
            }));

            // Actualiza el estado de la aplicación con los usuarios
            setUsuarios(usuariosArray);
        });
    }, [database]);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuario registrado con éxito
                const user = userCredential.user;
                console.log('Usuario registrado:', user);

                const newUserData = {
                    correo: email,
                    nombre: name,
                    cargo: position
                };
                const userId = user.uid;
                const usuariosRef = ref(database, `usuarios/usuario${userId}`);
                set(usuariosRef, newUserData);
            })
            .catch((error) => {
                // Hubo un error al registrar al usuario
                console.error('Error al registrar usuario:', error);
            });

        setEmail('');
        setPassword('');
        setName('');
        setPosition('');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="bg-blue-500 text-white py-4">
                <ul className="flex justify-center space-x-4">
                    <li>
                        <Link to="/menu" className="hover:text-yellow-300">
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/historico" className="hover:text-yellow-300">
                            Historico
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin" className="hover:text-yellow-300">
                            Admin
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="hover:text-yellow-300 focus:outline-none"
                        >
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </nav>
            <main className="container mx-auto mt-8 flex-grow items-center justify-center relative">
                <section className="text-center h-full">
                    <div class="max-w-md mx-auto mt-4 p-6 bg-white shadow-md rounded-lg">
                        <h1 class="text-2xl font-semibold mb-4">Registro de Usuario</h1>
                        <form>
                            <div class="mb-4">
                                <label for="name" class="block text-gray-600">Nombre:</label>
                                <input type="text" id="name" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={name} onChange={handleNameChange} />
                            </div>
                            <div class="mb-4">
                                <label for="email" class="block text-gray-600">Correo Electrónico:</label>
                                <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={email} onChange={handleEmailChange} />
                            </div>
                            <div class="mb-4">
                                <label for="password" class="block text-gray-600">Contraseña:</label>
                                <input type="password" id="password" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={password} onChange={handlePasswordChange} />
                            </div>
                            <div class="mb-4">
                                <label for="position" class="block text-gray-600">Cargo:</label>
                                <input type="text" id="position" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200" value={position} onChange={handlePositionChange} />
                            </div>
                            <div class="mb-4">
                                <button type="button" class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSignUp}>
                                    Registrarse
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <div className="container mx-auto mt-5">
                    <h1 className="text-2xl font-bold mb-3">Lista de Usuarios</h1>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Nombre</th>
                                <th className="border px-4 py-2">Correo</th>
                                <th className="border px-4 py-2">Cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td className="border px-4 py-2">{usuario.nombre}</td>
                                    <td className="border px-4 py-2">{usuario.correo}</td>
                                    <td className="border px-4 py-2">{usuario.cargo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <footer className="bg-blue-500 text-white py-2 text-center">
                <p className="text-sm">
                    &copy; 2023 Nuestra Empresa. Todos los derechos reservados.
                </p>
                <p className="text-sm">
                    <a href="#privacy" className="hover:text-yellow-300">
                        Política de privacidad
                    </a>{" "}
                    |{" "}
                    <a href="#terms" className="hover:text-yellow-300">
                        Términos y condiciones
                    </a>
                </p>
            </footer>
        </div>
    )
}

export default Admin