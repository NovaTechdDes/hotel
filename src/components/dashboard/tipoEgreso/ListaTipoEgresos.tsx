import { useTipoEgreso } from '../../../hooks/tipoEgreso/useTipoEgreso';
import { Loading } from '../../ui/Loading';
import TipoEgresoCard from './TipoEgresoCard';

export const ListaTipoEgresos = () => {
  const { data: tipoEgresos, isLoading } = useTipoEgreso();

  if (isLoading) {
    return <Loading text="Cargando Tipos de Egreso..." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {tipoEgresos?.map((elem) => (
        <TipoEgresoCard key={elem.id} tipoEgreso={elem} />
      ))}
    </div>
  );
};
