

import { HeaderMain } from '../../components';
import ListaHabitacion from '../../components/dashboard/habitacion/ListaHabitacion'
import ModalHabitacion from '../../components/dashboard/habitacion/ModalHabitacion'
import { useHabitacionStore } from '../../store'

export const Habitacion = () => {

    const { isModalOpen, openModal } = useHabitacionStore();

    return (
        <main>
            <HeaderMain botonText='Agregar Habitacion' openModal={openModal} />
            <ListaHabitacion />
            {isModalOpen && <ModalHabitacion />}
        </main>
    )
}
