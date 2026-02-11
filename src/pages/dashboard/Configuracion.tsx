import TipoEgreso from './TipoEgreso';
import { Precios } from './Precios';
import { useRolAuth } from '../../hooks/auth/useRolAuth';
import { CaracteristicaLista } from '../../components/dashboard/caracteristica/CaracteristicaLista';
import { Usuario } from './Usuario';
import { verificarRol } from '../../actions/auth.actions';
import { useEffect, useState } from 'react';

export const Configuracion = () => {
  const { data: user } = useRolAuth();
  const [rol, setRol] = useState<string>('');

  const buscarRolUser = async () => {
    const rol = await verificarRol();
    setRol(rol);
  };

  useEffect(() => {
    buscarRolUser();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] dark:bg-[#1E1B18] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 border-b border-[#B59E6B]/10 pb-8">
          <h2 className="text-4xl font-serif font-light tracking-tight text-[#2D2926] dark:text-[#FDFCFB]">Configuración</h2>
          <p className="mt-2 text-[#2D2926]/60 dark:text-[#FDFCFB]/50 font-sans tracking-wide uppercase text-[10px] letter-spacing-[0.2em]">
            Administración de activos, tarifas y parámetros del sistema
          </p>
        </header>

        <div className="space-y-12">
          {rol === 'admin' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-white dark:bg-[#2D2926] shadow-[var(--shadow-boutique-lg)] dark:shadow-none border border-[#B59E6B]/10 dark:border-[#B59E6B]/10 rounded-sm overflow-hidden transition-all duration-500">
                <Precios />
              </div>
            </section>
          )}

          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div className="bg-white dark:bg-[#2D2926] shadow-[var(--shadow-boutique-lg)] dark:shadow-none border border-[#B59E6B]/10 dark:border-[#B59E6B]/10 rounded-sm overflow-hidden transition-all duration-500">
              <CaracteristicaLista />
            </div>
          </section>

          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="bg-white dark:bg-[#2D2926] shadow-[var(--shadow-boutique-lg)] dark:shadow-none border border-[#B59E6B]/10 dark:border-[#B59E6B]/10 rounded-sm overflow-hidden transition-all duration-500 p-6">
              <TipoEgreso />
            </div>
          </section>

          {rol === 'admin' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <div className="bg-white dark:bg-[#2D2926] shadow-[var(--shadow-boutique-lg)] dark:shadow-none border border-[#B59E6B]/10 dark:border-[#B59E6B]/10 rounded-sm overflow-hidden transition-all duration-500 p-6">
                <Usuario />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
