import { GoTag } from 'react-icons/go';
import { useEgresoPorTipo } from '../../../hooks/egreso/useEgresoPorTipo';
import { ListaEgresos } from './ListaEgresos';
import { Loading } from '../../ui/Loading';

export const EgresoMain = () => {
  const { data: tipoEgresos, isLoading } = useEgresoPorTipo();

  return (
    <div className="grid mx-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <ListaEgresos />

      <div className="border px-5 mt-5 border-gray-300 rounded-lg bg-white dark:bg-gray-600">
        <h3 className="text-2xl font-semibold mt-2 mb-5 ml-2 dark:text-gray-200">Egresos Por Tipo</h3>
        {isLoading ? (
          <Loading text="Cargando Categorias..." />
        ) : (
          tipoEgresos?.map((elem) => (
            <div key={elem.descripcion} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GoTag className="dark:text-gray-300" />
                <p className="dark:text-gray-200">{elem.descripcion}</p>
              </div>
              <span className="font-semibold dark:text-gray-200">${elem.importe.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
