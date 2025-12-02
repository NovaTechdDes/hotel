import { useState } from 'react';
import { useAuth } from '../../hooks/auth/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { LuHotel } from 'react-icons/lu';
import { TbLockPassword } from 'react-icons/tb';
import { CiMail } from 'react-icons/ci';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { ok, msg } = await login(email, password);

    if (ok) {
      navigate('/calendario');
    } else {
      setError(msg ?? 'Error al iniciar sesion');
    }

    setLoading(false);
  };

  return (
    <div id="login" className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-full ">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg flex flex-col items-center w-[500px] h-[600px] shadow-md pt-10 text-black px-5">
          <div className="flex flex-col items-center justify-center">
            <LuHotel size={40} className="text-2xl font-bold text-center bg-blue-700 p-2 rounded text-white" />
            <h1 className="text-2xl text-gray-200 font-bold text-center">Mis Casitas</h1>
            <h3 className="text-2xl text-gray-200 text-center">Sistema de Gestion Hotelera</h3>
          </div>
          <div className="mt-10 text-left px-10 w-full">
            <p className="text-red-500">{error}</p>
          </div>
          <form className="flex flex-col gap-4 w-full  px-10" onSubmit={handleLogin}>
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-white">Email</label>
              <div className="relative full">
                <CiMail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  className="border border-gray-200 text-white w-full px-10 placeholder:text-gray-200 py-2 opacity-80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="algo@outlook.com"
                />
              </div>
            </div>
            <div>
              <label className="flex flex-col gap-1">
                <span className="text-sm text-white">Contraseña</span>
                <div className="relative w-full">
                  <TbLockPassword size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="contrasena"
                    className="border border-gray-200 text-white w-full placeholder:text-gray-200 px-10 py-2 opacity-80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    placeholder="**********"
                  />
                </div>
              </label>
            </div>
            <button disabled={loading} type="submit" className="mt-2 cursor-pointer hover:opacity-80 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
              {loading ? 'Inicinado...' : 'Iniciar Sesión'}
            </button>
            <Link to="/recuperar-contraseña" className="text-blue-400 bg-slate-700 px-2 py-1 rounded-lg text-lg hover:underline text-center">
              ¿Olvidaste tu contraseña?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
