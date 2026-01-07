import { CgClose } from 'react-icons/cg';
import { useMutateHabitacion } from '../../../hooks/habitacion/useMutateHabitacion';
import type { Habitacion } from '../../../interface/Habitacion';
import { useForm } from '../../../hooks/useForm';
import { useEffect, useState } from 'react';
import { useHabitacionStore } from '../../../store';
import { useCaracteristicas } from '../../../hooks';

const initialState: Habitacion = {
  creado_en: new Date(),
  capacidad: 0,
  nombre: '',
  descripcion: '',
  tipo: 'individual',
  caracteristica_habitacion: [],
};

const ModalHabitacion = () => {
  const { data: caracteristicas } = useCaracteristicas();
  const { habitacionSeleccionado, closeModal } = useHabitacionStore();

  const { addHabitacion, putHabitacion } = useMutateHabitacion();
  const { isPending: isPendingAgregar, mutateAsync: agregarHabitacion } = addHabitacion;
  const { isPending: isPendingModificar, mutateAsync: modificarHabitacion } = putHabitacion;

  const { nombre, capacidad, formState, descripcion, onInputChange, onResetForm, tipo } = useForm(habitacionSeleccionado ?? initialState);
  const [caracterisitcasSeleccionadas, setCaracterisitcasSeleccionadas] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setCaracterisitcasSeleccionadas(habitacionSeleccionado?.caracteristica_habitacion ? habitacionSeleccionado.caracteristica_habitacion.map((c: any) => c.caracteristicaid) : []);
  }, [habitacionSeleccionado]);

  const handleCloseModal = () => {
    onResetForm();
    closeModal();
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nombre === '') return setError(true);
    if (capacidad === 0) return setError(true);

    if (habitacionSeleccionado) {
      await modificarHabitacion(formState);
      closeModal();
    } else {
      const result = await agregarHabitacion({ habitacion: formState, listadoCaracteristicas: caracterisitcasSeleccionadas });

      if (result) {
        closeModal();
      }
    }
  };

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (caracterisitcasSeleccionadas.find((elem) => elem === e.target.value)) return;

    setCaracterisitcasSeleccionadas([...caracterisitcasSeleccionadas, e.target.value]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={handleCloseModal}>
      <div className="bg-white rounded-lg shadow-lg w-4xl min-h-[80vh] p-8 text-black flex-col flex dark:bg-slate-800 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between border-b border-gray-300 mb-2 pb-2">
          <h2 className="text-3xl font-bold  text-left">{habitacionSeleccionado ? 'Modificar Habitacion' : 'Agregar Habitacion'}</h2>
          <CgClose size={35} onClick={handleCloseModal} className="hover:bg-gray-300 rounded-lg p-2 cursor-pointer" />
        </div>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium mb-1 text-black dark:text-white">
              Nombre
            </label>
            <input type="text" id="nombre" name="nombre" value={nombre} onChange={onInputChange} className="w-full border rounded-md px-3 py-2" placeholder="Ej: Nombre" />
            {error && nombre === '' && <p className="text-red-500">El nombre es obligatorio</p>}
          </div>

          <div>
            <label htmlFor="capacidad" className="block text-sm font-medium mb-1">
              Capacidad
            </label>
            <input type="number" id="capacidad" name="capacidad" value={capacidad} onChange={onInputChange} className="w-full border rounded-md px-3 py-2" placeholder="Capacidad" min={1} />
            {error && capacidad === 0 && <p className="text-red-500">La capacidad debe ser mayor a 0</p>}
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium mb-1">
              Tipo
            </label>
            <select id="tipo" name="tipo" value={tipo} onChange={onInputChange} className="w-full border rounded-md px-3 py-2">
              <option value="individual">Individual</option>
              <option value="doble">Doble</option>
              <option value="triple">Triple</option>
              <option value="cuadruple">Cuadruple</option>
              <option value="casa">Casa</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
              Descripcion
            </label>
            <textarea
              name="descripcion"
              id="decripcion"
              className="w-full border rounded-md px-3 py-2 dark:bg-slate-800 dark:text-white"
              value={descripcion}
              onChange={onInputChange}
              placeholder="Ej: Descripcion"
            >
              {descripcion}
            </textarea>
          </div>

          <div>
            <label htmlFor="caracteristicas" className="block text-sm font-medium mb-1">
              Características de la Habitación
            </label>
            <select onChange={handleCaracteristicasChange} name="caracteristicas" id="caracteristicas" className="w-full border rounded-md px-3 py-2">
              <option value="">--- Seleccionar una opción ---</option>
              {caracteristicas?.map((elem) => (
                <option value={elem.id} key={elem.id}>
                  {elem.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {caracterisitcasSeleccionadas.map((elemId) => (
              <div key={elemId} className="inline-flex text-sm bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded-full items-center gap-1">
                <span>{caracteristicas?.find((caracteristica) => caracteristica.id === elemId)?.nombre}</span>
                <CgClose
                  size={15}
                  className="cursor-pointer text-gray-500 hover:text-gray-800"
                  onClick={() => setCaracterisitcasSeleccionadas(caracterisitcasSeleccionadas.filter((id) => id !== elemId))}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-auto">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-green-300 cursor-pointer transition dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            {!habitacionSeleccionado && (
              <button type="submit" disabled={isPendingAgregar} className="px-4 py-2 bg-blue-700 text-white rounded hover:opacity-80 cursor-pointer transition">
                {isPendingAgregar ? 'Guardando...' : 'Guardar'}
              </button>
            )}

            {habitacionSeleccionado && (
              <button type="submit" disabled={isPendingModificar} className="px-4 py-2 bg-blue-700 text-white rounded hover:opacity-80 cursor-pointer transition">
                {isPendingModificar ? 'Modificando...' : 'Modificar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalHabitacion;
