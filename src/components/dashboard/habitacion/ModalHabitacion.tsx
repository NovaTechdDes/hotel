
import { CgClose } from 'react-icons/cg'
import { useMutateHabitacion } from '../../../hooks/habitacion/useMutateHabitacion'
import type { Habitacion } from '../../../interface/Habitacion';
import { useForm } from '../../../hooks/useForm';
import { useState } from 'react';
import { useHabitacionStore } from '../../../store';


const initialState: Habitacion = {
    creado_en: new Date(),
    capacidad: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    tipo: 'individual'
}

const ModalHabitacion = () => {
    const { habitacionSeleccionado, closeModal } = useHabitacionStore();
    const { addHabitacion, putHabitacion } = useMutateHabitacion();
    const { isPending: isPendingAgregar, mutateAsync: agregarHabitacion } = addHabitacion;
    const { isPending: isPendingModificar, mutateAsync: modificarHabitacion } = putHabitacion;

    const { nombre, capacidad, formState, descripcion, onInputChange, onResetForm, precio, tipo } = useForm(habitacionSeleccionado ?? initialState);
    const [error, setError] = useState<boolean>(false);

    const handleCloseModal = () => {
        onResetForm();
        closeModal();
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (nombre === '') return setError(true);
        if (capacidad === 0) return setError(true);

        if (habitacionSeleccionado) {
            const result = await modificarHabitacion(formState);
            console.log(result)
            closeModal();
        } else {
            const result = await agregarHabitacion(formState);

            if (result) {
                closeModal()
            };
        };
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-lg shadow-lg w-4xl h-[80vh] p-8 text-black">
                <div className='flex justify-between border-b border-gray-300 mb-2 pb-2'>
                    <h2 className="text-3xl font-bold  text-left">{habitacionSeleccionado ? 'Modificar Habitacion' : 'Agregar Habitacion'}</h2>
                    <CgClose size={35} onClick={handleCloseModal} className='hover:bg-gray-300 rounded-lg p-2 cursor-pointer' />
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="nombre" className='block text-sm font-medium mb-1'>Nombre</label>
                            <input
                                type="text"
                                id='nombre'
                                name='nombre'
                                value={nombre}
                                onChange={onInputChange}
                                className='w-full border rounded-md px-3 py-2'
                                placeholder='Nombre'
                            />
                            {error && nombre === '' && <p className='text-red-500'>El nombre es obligatorio</p>}
                        </div>
                        <div>
                            <label htmlFor="capacidad" className='block text-sm font-medium mb-1'>Capacidad</label>
                            <input
                                type="number"
                                id='capacidad'
                                name='capacidad'
                                value={capacidad}
                                onChange={onInputChange}
                                className='w-full border rounded-md px-3 py-2'
                                placeholder='Capacidad'
                                min={1}
                            />
                            {error && capacidad === 0 && <p className='text-red-500'>La capacidad debe ser mayor a 0</p>}
                        </div>
                        <div>
                            <label htmlFor="precio" className='block text-sm font-medium mb-1'>Precio</label>
                            <input
                                type="number"
                                id='precio'
                                name='precio'
                                value={precio}
                                onChange={onInputChange}
                                className='w-full border rounded-md px-3 py-2'
                                placeholder='Precio'
                                min={0}
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label htmlFor="tipo" className='block text-sm font-medium mb-1'>Tipo</label>
                            <select
                                id='tipo'
                                name='tipo'
                                value={tipo}
                                onChange={onInputChange}
                                className='w-full border rounded-md px-3 py-2'>
                                <option value="individual">Individual</option>
                                <option value="doble">Doble</option>
                                <option value="suite">Suite</option>
                                <option value="casa">Casa</option>
                                <option value="hostel">Hostel</option>
                            </select>
                        </div>

                        <div className='col-span-2'>
                            <label htmlFor="descripcion" className='block text-sm font-medium mb-1'>Descripcion</label>
                            <textarea name="descripcion" id="decripcion" className='w-full border rounded-md px-3 py-2' value={descripcion} onChange={onInputChange}></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4 gap-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-green-300 cursor-pointer transition" onClick={handleCloseModal}>Cancelar</button>
                        {!habitacionSeleccionado && <button type="submit" disabled={isPendingAgregar} className="px-4 py-2 bg-black text-white rounded hover:opacity-80 cursor-pointer transition" >
                            {isPendingAgregar ? 'Guardando...' : 'Guardar'}
                        </button>}

                        {habitacionSeleccionado && <button type="submit" disabled={isPendingModificar} className="px-4 py-2 bg-black text-white rounded hover:opacity-80 cursor-pointer transition" >
                            {isPendingModificar ? 'Modificando...' : 'Modificar'}
                        </button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalHabitacion