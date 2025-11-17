import { useEgresos } from "../../../hooks/egreso/useEgresos"
import { Loading } from "../../ui/Loading";
import { EgresoCard } from "./EgresoCard";

export const ListaEgresos = () => {

    const { data: egresos, isLoading } = useEgresos();

    if (isLoading) return (
        <div className="col-span-3">
            <Loading text="Cargando Egresos..." />
        </div>
    )

    return (
        <div className="col-span-3 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-lg pr-2">

            {egresos?.map(elem => (
                <EgresoCard egreso={elem} key={elem.id} />
            ))}

        </div>
    )
}
