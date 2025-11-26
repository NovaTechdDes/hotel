import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { LuHotel } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';

const RecoverPassword = () => {
  const { recuperarContraseña } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    // Simulate API call
    try {
      recuperarContraseña(email);

      setMessage('Si el correo electrónico está registrado, recibirás un enlace de recuperación.');
      setEmail('');
    } catch (err) {
      setError('Ocurrió un error al intentar recuperar la contraseña. Inténtalo de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <LuHotel size={40} className="text-2xl font-bold text-center bg-blue-700 p-2 rounded text-white" />
          <h1 className="text-2xl text-black mt-2 font-bold text-center">Recuperar Contraseña</h1>
          <h3 className="text-2xl text-gray-500 text-center">Sistema de Gestion Hotelera</h3>
        </div>

        <p className="mb-4 text-center mt-5 text-sm text-left text-gray-600">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {message && <p className="text-green-500 text-xs italic mb-4">{message}</p>}
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Enviar Enlace de Recuperación
            </button>
          </div>

          <div className="flex gap-2 items-center justify-center mt-5">
            <IoMdArrowBack className="text-blue-600" />
            <Link to="/login" className="text-blue-600 hover:underline">
              Volver al Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
