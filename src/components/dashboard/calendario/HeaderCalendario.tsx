import { IoColorPaletteOutline } from "react-icons/io5"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useReservaStore } from "../../../store/reserva.store";

export const HeaderCalendario = () => {
    const { openModal } = useReservaStore();

    const handleModalReserva = () => {
        openModal()
    };

    return (
        <header className="flex justify-between items-center">
            <div className="flex gap-2 py-2 mx-5 items-center text-black font-bold">
                <div className=" p-1 hover:bg-green-300 border border-gray-300 rounded-lg cursor-pointer">
                    <MdKeyboardArrowLeft size={35} />
                </div>
                <p>OCT 2025</p>
                <div className=" p-1 hover:bg-green-300 border border-gray-300 rounded-lg cursor-pointer">
                    <MdKeyboardArrowRight size={35} />
                </div>
            </div>

            <div className="mx-5 py-2 flex gap-5">
                <button onClick={handleModalReserva} className='bg-black text-white rounded-lg py-1 px-2 text-sm hover:opacity-80 cursor-pointer'>Reservar</button>
            </div>
        </header>
    )
}
