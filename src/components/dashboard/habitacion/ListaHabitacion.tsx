import { useHabitaciones } from '../../../hooks';
import { Loading } from '../../ui/Loading';
import HabitacionCard from './HabitacionCard';

const ListaHabitacion = () => {
  const { data: habitaciones, isLoading } = useHabitaciones();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading text="Preparando Suites..." />
      </div>
    );
  }

  return (
    <div className="min-h-[60vh]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {habitaciones?.map((elem) => (
          <HabitacionCard key={elem.id} habitacion={elem} />
        ))}
      </div>
    </div>
  );
};

export default ListaHabitacion;
