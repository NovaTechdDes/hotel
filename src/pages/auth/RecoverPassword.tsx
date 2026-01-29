import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { LuHotel } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { CiMail } from 'react-icons/ci';

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
    <div id="recuperarContraseña" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white/10 backdrop-blur-sm rounded-lg flex flex-col items-center w-[600px] h-[500px] shadow-md pt-10 text-black px-5">
        <div className="flex flex-col items-center justify-center">
          <LuHotel size={40} className="text-2xl font-bold text-center bg-blue-700 p-2 rounded text-white" />
          <h1 className="text-2xl text-white mt-2 font-bold text-center">Recuperar Contraseña</h1>
          <h3 className="text-2xl text-gray-200 text-center">Sistema de Gestion Hotelera</h3>
        </div>

        <p className="mb-4 text-center mt-5 text-sm  text-gray-200">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
              Correo Electrónico:
            </label>
            <div className="relative w-full">
              <CiMail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
              <input
                type="email"
                id="email"
                className="border border-gray-200 text-white w-full px-10 placeholder:text-gray-200 py-2 opacity-80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {message && <p className="text-green-500 text-xs italic mb-4">{message}</p>}
          <div className="flex items-center justify-between">
            <button type="submit" className="mt-2 px-5 mx-2 cursor-pointer hover:opacity-80 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
              Enviar Enlace de Recuperación
            </button>
          </div>

          <div className="flex gap-2 bg-slate-700 rounded-lg py-1 items-center justify-center mt-5">
            <IoMdArrowBack className="text-blue-500" size={25} />
            <Link to="/login" className="text-blue-500 hover:underline text-lg">
              Volver al Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
