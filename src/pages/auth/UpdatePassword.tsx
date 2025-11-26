import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { LuHotel } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import Swal from 'sweetalert2';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { actualizarContraseña } = useAuth();
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (password !== passwordConfirm && passwordConfirm !== '') {
      setError('Las contraseñas no coinciden');
    } else {
      setError('');
    }
  }, [password, passwordConfirm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { ok, msg } = await actualizarContraseña(password);

    if (!ok) {
      await Swal.fire('Error al actualizar contraseña', msg, 'error');
    } else {
      await Swal.fire('Contraseña actualizada correctamente', '', 'success');
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <LuHotel size={40} className="text-2xl font-bold text-center bg-blue-700 p-2 rounded text-white" />
          <h1 className="text-2xl text-black mt-2 font-bold text-center">Actualizar Contraseña</h1>
          <h3 className="text-2xl text-gray-500 text-center">Sistema de Gestion Hotelera</h3>
        </div>

        <p className="mb-4 mt-5 text-sm text-left text-gray-600">Ingresa la nueva contraseña y su confirmacion.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña:
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Cambiar Contraseña
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

export default UpdatePassword;
