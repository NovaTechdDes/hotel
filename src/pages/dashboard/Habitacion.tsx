import { HeaderMain } from '../../components';
import ListaHabitacion from '../../components/dashboard/habitacion/ListaHabitacion';
import ModalHabitacion from '../../components/dashboard/habitacion/ModalHabitacion';
import { useHabitacionStore } from '../../store';

export const Habitacion = () => {
  const { isModalOpen, openModal } = useHabitacionStore();

  return (
    <div className="min-h-screen bg-[#adadad] dark:bg-[#1E1B18] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <HeaderMain botonText="Agregar Habitación" openModal={openModal} title="Inventario de Habitaciones" />

        <section className="mt-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <ListaHabitacion />
        </section>

        {isModalOpen && <ModalHabitacion />}
      </div>
    </div>
  );
};
