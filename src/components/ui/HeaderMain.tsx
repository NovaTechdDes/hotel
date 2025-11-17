
interface Props {
    botonText: string,
    openModal: (arg: undefined) => void;
}

export const HeaderMain = ({ botonText = 'Agregar', openModal }: Props) => {

    const click = () => {
        openModal(undefined)
    }
    return (
        <header className='text-black flex justify-end m-5'>
            <div className='flex'>
                <button className='border border-gray-300 bg-black text-white font-bold cursor-pointer rounded-lg px-2 py-1 text-md hover:opacity-80 transition-all duration-200' onClick={click}>{botonText}</button>
            </div>

        </header>
    )
}