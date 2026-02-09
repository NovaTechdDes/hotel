import { BsPerson } from 'react-icons/bs';
import { usePrecio } from '../../hooks/precio/usePrecio';
import { Loading } from '../../components';
import Swal from 'sweetalert2';
import { useMutatePrecio } from '../../hooks/precio/useMutatePrecio';
import { useState } from 'react';
import { useRolAuth } from '../../hooks/auth/useRolAuth';

export const Precios = () => {
  const [precio, setPrecio] = useState<string>('');
  const { data, isLoading } = usePrecio();
  const { putPrecio } = useMutatePrecio();
  const { data: user } = useRolAuth();

  if (isLoading) return <Loading text="Cargando Tarifas..." />;

  if (user && user?.rol !== 'admin') return null;

  const { id, base = 0, aumento = 0, division = 1 } = data ?? {};
  const { mutateAsync: modificarPrecio, isPending: isPendingModificar } = putPrecio;

  const handlePrecio = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isConfirmed } = await Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      title: '¿Actualizar Tarifa Base?',
      text: 'Este cambio afectará a todos los cálculos automáticos.',
      background: '#FDFCFB',
      color: '#2D2926',
      confirmButtonColor: '#B59E6B',
    });

    if (isConfirmed) {
      await modificarPrecio({
        id,
        base: Number(precio),
        aumento,
        division,
      });

      setPrecio('');
    }
  };

  const calculatedPrices = [
    { label: '1 Persona', price: base / division, icon: <BsPerson /> },
    { label: '2 Personas', price: base, icon: <BsPerson />, highlight: true },
    { label: '3 Personas', price: base + aumento, icon: <BsPerson /> },
    { label: '4 Personas', price: base + 2 * aumento, icon: <BsPerson /> },
    { label: '5 Personas', price: base + 3 * aumento, icon: <BsPerson /> },
    { label: '6 Personas', price: base + 4 * aumento, icon: <BsPerson /> },
  ];

  return (
    <div className="p-8">
      <div className="mb-10">
        <h2 className="text-2xl font-serif text-[#2D2926] dark:text-[#FDFCFB]">Precios</h2>
        <p className="text-sm text-[#2D2926]/50 dark:text-[#FDFCFB]/40 mt-1 uppercase tracking-widest text-[9px]">Ajuste de precios base y proyecciones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="bg-[#FDFCFB] dark:bg-white/5 p-6 rounded-sm border border-[#F5F0E1] dark:border-white/5">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#B59E6B] mb-6">Modificar Base (2 Pax)</h3>
            <form className="flex flex-col gap-4" onSubmit={handlePrecio}>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D2926]/30 dark:text-[#FDFCFB]/30">$</span>
                <input
                  disabled={isPendingModificar}
                  type="number"
                  name="precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  id="precio"
                  className="w-full bg-white dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm pl-8 pr-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10"
                  placeholder="Ej: 60000"
                />
              </div>

              <button
                type="submit"
                className="bg-[#2D2926] dark:bg-[#B59E6B] text-white dark:text-[#2D2926] py-3 rounded-sm text-xs uppercase tracking-widest font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                disabled={isPendingModificar}
              >
                {isPendingModificar ? 'Actualizando...' : 'Guardar Nueva Tarifa'}
              </button>
            </form>
            <p className="mt-4 text-[10px] text-[#2D2926]/40 dark:text-[#FDFCFB]/30 leading-relaxed italic">
              * El precio base de referencia se utiliza para calcular las variaciones por ocupación adicional.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#B59E6B]">Proyección de Tarifas</h3>

          <div className="space-y-3">
            {calculatedPrices.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-5 py-4 rounded-sm border transition-all duration-300 ${
                  item.highlight ? 'bg-[#B59E6B]/10 border-[#B59E6B]/30 text-[#B59E6B]' : 'bg-white dark:bg-white/5 border-[#F5F0E1] dark:border-white/5 text-[#2D2926] dark:text-[#FDFCFB]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${item.highlight ? 'text-[#B59E6B]' : 'text-[#2D2926]/30 dark:text-[#FDFCFB]/20'}`}>{item.icon}</span>
                  <span className="text-sm tracking-wide font-medium">{item.label}</span>
                </div>
                <span className="font-serif text-lg tracking-tight">${item.price.toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#B59E6B]/10">
            <h4 className="text-[10px] uppercase tracking-widest text-[#B59E6B] mb-2 font-bold">Lógica de Cálculo</h4>
            <ul className="text-[10px] text-[#2D2926]/50 dark:text-[#FDFCFB]/40 space-y-1 font-sans">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#B59E6B] rounded-full" />
                Individual: 50% de la tarifa base.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#B59E6B] rounded-full" />
                Adicional (3+): Base + ${aumento.toLocaleString('es-AR')} por persona.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
