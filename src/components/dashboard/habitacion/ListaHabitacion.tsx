import { useHabitaciones } from "../../../hooks"
import { Loading } from "../../ui/Loading";
import HabitacionCard from "./HabitacionCard";


const ListaHabitacion = () => {
    const { data: habitaciones, isLoading } = useHabitaciones();

    if (isLoading) {
        return <Loading text='Cargando Habitaciones...' />
    }

    return (
        <div className="bg-white mx-5">
            <table className="w-full text-black">
                <thead className="border border-gray-300 rounded-lg">
                    <tr>
                        <th className="py-2">Nombre</th>
                        <th>Tipo</th>
                        <th>Precio </th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className="border border-gray-300 rounded-lg">
                    {habitaciones?.map(elem => (
                        <HabitacionCard key={elem.id} habitacion={elem} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaHabitacion