import { GoTag } from "react-icons/go"

import { BiPencil } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useMutateTipoEgreso } from "../../../hooks/tipoEgreso/useMutateTipoEgreso";
import { useTipoEgresoStore } from "../../../store";
import type { TipoEgreso } from "../../../interface/TipoEgreso";

interface Props {
    tipoEgreso: TipoEgreso
}

const TipoEgresoCard = ({ tipoEgreso }: Props) => {
    const { id, descripcion } = tipoEgreso;
    const { openModal } = useTipoEgresoStore();

    const { removeTipoEgreso } = useMutateTipoEgreso();
    const { isPending, mutateAsync } = removeTipoEgreso;


    const handleDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            title: `Quiere eliminar el Tipo Egreso ${descripcion}`,
        });

        if (isConfirmed && id) {
            mutateAsync(id);
        };
    };

    const handlePut = () => {
        openModal(tipoEgreso)
    };


    return (
        <div className={`text-black mx-5 bg-gray-100 my-5 rounded-lg shadow-xl border border-gray-300 ${isPending ? "opacity-70 pointer-events-none relative" : ""}`}>
            <div className="flex gap-5 items-center m-5">
                <GoTag size={25} className="text-blue-800" />
                <h3 className="text-xl font-semibold">{descripcion}</h3>
            </div>

            <div className="flex gap-5 justify-center mb-5">
                <button
                    className="border cursor-pointer hover:bg-gray-200 border-gray-300 rounded-lg flex items-center gap-2 px-4"
                    disabled={isPending}
                    onClick={handlePut}
                >
                    <BiPencil />
                    Editar
                </button>

                <button
                    className="border cursor-pointer hover:bg-gray-200 text-red-500 border-gray-300 rounded-lg flex items-center gap-2 px-4"
                    disabled={isPending}
                    onClick={handleDelete}
                >
                    <MdDeleteOutline />
                    Eliminar
                </button>
            </div>
            {isPending && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                    <span className="text-red-600 font-semibold text-base">Eliminando...</span>
                </div>
            )}
        </div>
    )
}

export default TipoEgresoCard