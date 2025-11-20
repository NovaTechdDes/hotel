import { useHabitaciones } from "../../../hooks"
import { Loading } from "../../ui/Loading";
import HabitacionCard from "./HabitacionCard";


const ListaHabitacion = () => {
    const { data: habitaciones, isLoading } = useHabitaciones();

    if (isLoading) {
        return <Loading text='Cargando Habitaciones...' />
    }

    return (
        <div className="bg-white h-[80vh] border border-gray-300 shadow-2xl rounded-lg mx-5">
            <table className="w-full text-black rounded-lg">
                <thead className="border border-gray-300 rounded-lg">
                    <tr>
                        <th className="py-2">Nombre</th>
                        <th>Tipo</th>
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