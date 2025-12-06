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

  if (isLoading) return <Loading text="Cargando Precio" />;

  if (user && user?.rol !== 'admin') return;

  const { id, base = 0, aumento = 0, division = 1 } = data ?? {};
  const { mutateAsync: modificarPrecio, isPending: isPendingModificar } = putPrecio;

  const handlePrecio = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isConfirmed } = await Swal.fire({
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      title: 'Seguro quiere cambiar el precio?',
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

  return (
    <div className="mx-5">
      <div>
        <h2 className="text-xl font-bold mt-5 dark:text-white">Configuracion de Precios</h2>
        <p className="text-gray-500 dark:text-gray-400">Define el precio base para 2 personas. Los demas precios se calcular automaticamente</p>
      </div>

      <div className="flex flex-col md:flex-row mt-10 mb-10 w-full justify-between gap-10">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Precio Base (2 Personas)</h3>
          <form className="flex gap-5" onSubmit={handlePrecio}>
            <input
              disabled={isPendingModificar}
              type="number"
              name="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              id="precio"
              className="w-full border border-gray-500 rounded-md px-3 py-2 dark:placeholder:text-gray-400 dark:text-white"
              placeholder="$ 60000"
            />

            <button type="submit" className="bg-blue-800 cursor-pointer hover:bg-blue-700 text-white rounded-sm px-2 py-1" disabled={isPendingModificar}>
              {isPendingModificar ? 'Guardando...' : 'Guardar'}
            </button>
          </form>
          <span className="text-xs text-gray-600 dark:text-gray-400">Este es el precio referencia para habitaciones de 2 personas</span>
        </div>

        <div className="font-semibold">
          <h3 className="text-xl dark:text-white">Tabla de los precios Calculados</h3>

          <div className="flex justify-between text-lg mt-5 ">
            <div className="flex gap-2 items-center dark:text-white">
              <BsPerson />
              <p>1 Persona</p>
            </div>
            <p className="dark:text-white">${base / division}</p>
          </div>

          <div className="flex justify-between text-lg mt-5">
            <div className="flex gap-2 items-center dark:text-white">
              <BsPerson />
              <p>2 Personas</p>
            </div>
            <p className="dark:text-white">${base}</p>
          </div>

          <div className="flex justify-between text-lg mt-5">
            <div className="flex gap-2 items-center dark:text-white">
              <BsPerson />
              <p>3 Personas</p>
            </div>
            <p className="dark:text-white">${base + aumento}</p>
          </div>
          <div className="flex justify-between text-lg mt-5">
            <div className="flex gap-2 items-center dark:text-white">
              <BsPerson />
              <p>4 Personas</p>
            </div>
            <p className="dark:text-white">${base + 2 * aumento}</p>
          </div>
          <div className="flex justify-between text-lg mt-5">
            <div className="flex gap-2 items-center dark:text-white">
              <BsPerson />
              <p>5 Personas</p>
            </div>
            <p className="dark:text-white">${base + aumento * 3}</p>
          </div>
          <div className="flex justify-between text-lg mt-5">
            <div className="flex gap-2 items-center dark:text-white">
              <BsPerson />
              <p>6 Personas</p>
            </div>
            <p className="dark:text-white">${base + aumento * 4}</p>
          </div>

          <ul className="text-xs text-gray-500 mt-5 dark:text-gray-400">
            <li>. 1 Persona: Mitad de precio base</li>
            <li>. 2 Personas: Percio Base</li>
            <li>. 3+ Personas: precio base + ${aumento} por persona adicional</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
