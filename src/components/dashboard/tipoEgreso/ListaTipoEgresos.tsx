import { useTipoEgreso } from '../../../hooks/tipoEgreso/useTipoEgreso'
import { Loading } from '../../ui/Loading';
import TipoEgresoCard from './TipoEgresoCard';

export const ListaTipoEgresos = () => {

    const { data: tipoEgresos, error, isLoading } = useTipoEgreso();

    if (isLoading) {
        return <Loading text='Cargando Tipo de Egresos...' />
    }

    return (
        <div
            className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 bg-white mx-2 rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'
            style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#9ca3af #e5e7eb", // Thumb / Track (for Firefox)
            }}
        >
            {
                tipoEgresos?.map(elem => (
                    <TipoEgresoCard key={elem.id} tipoEgreso={elem} />
                ))
            }
        </div>

    )
}