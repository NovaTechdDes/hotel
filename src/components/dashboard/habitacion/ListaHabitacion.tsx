import { useHabitaciones } from '../../../hooks';
import { Loading } from '../../ui/Loading';
import HabitacionCard from './HabitacionCard';

const ListaHabitacion = () => {
  const { data: habitaciones, isLoading } = useHabitaciones();

  if (isLoading) {
    return <Loading text="Cargando Habitaciones..." />;
  }

  return (
    <div className=" h-[80vh] border border-gray-300 shadow-2xl rounded-lg mx-1 md:mx-5 overflow-auto">
      <div className="w-full text-black rounded-lg grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {habitaciones?.map((elem) => (
          <HabitacionCard key={elem.id} habitacion={elem} />
        ))}
      </div>
    </div>
  );
};

export default ListaHabitacion;
