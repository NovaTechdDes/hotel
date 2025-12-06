import { useState } from 'react';
import { useCaracteristicas, useMutateCaracteristicas } from '../../../hooks';
import CaracteristicaItem from './CaracteristicaItem';
import { Loading } from '../../ui/Loading';

export const CaracteristicaLista = () => {
  const { data: caracteristicas, isLoading } = useCaracteristicas();
  const { addCaracteristica } = useMutateCaracteristicas();
  const { mutateAsync: agregar, isPending } = addCaracteristica;

  const [nombre, setNombre] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleAdd = async () => {
    if (nombre.trim() === '') {
      setError(true);
      return;
    }

    const ok = await agregar(nombre);
    console.log(ok);
    if (ok) {
      setNombre('');
      setError(false);
    }
  };

  if (isLoading) return <Loading text="Cargando caracteristicas" />;

  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Caracteristicas</h2>
        <p className="dark:text-white">Administra las caracteristicas del sistema</p>
      </div>

      <div className="flex gap-5 mt-5 border-b border-gray-300 pb-5">
        <div className="w-full">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-500 rounded-lg px-2 py-2 dark:placeholder:text-gray-400 dark:text-white"
            placeholder="Agregar caracteristica"
            type="text"
            name="nombre"
            id="nombre"
          />
          {error && <p className="text-red-500">El nombre es requerido</p>}
        </div>
        <button disabled={isPending} onClick={handleAdd} className="bg-blue-500 mb-auto text-white px-5 py-2 rounded-lg cursor-pointer hover:opacity-80">
          {isPending ? 'Agregando...' : 'Agregar'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 mt-5 gap-5 overflow-y-auto h-[calc(100vh-350px)]">
        {caracteristicas?.map((caracteristica) => (
          <CaracteristicaItem caracteristica={caracteristica} key={caracteristica.id} />
        ))}
      </div>
    </div>
  );
};
