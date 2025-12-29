import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useForm } from '../../../hooks/useForm';
import type { Egreso } from '../../../interface/Egreso';
import { useEgresoStore } from '../../../store';
import { useMutateEgreso } from '../../../hooks/egreso/useMutateEgreso';
import { useTipoEgreso } from '../../../hooks/tipoEgreso/useTipoEgreso';
import { BiCalendar } from 'react-icons/bi';

const initialState: Egreso = {
  descripcion: '',
  importe: 0,
  tipoegresoid: '',
};

export const ModalEgreso = () => {
  const { closeModal, egresoSeleccionado } = useEgresoStore();
  const [error, setError] = useState<boolean>(false);
  const { data: tipoEgresos } = useTipoEgreso();
  const { descripcion, importe, creado_en, tipoegresoid, formState, onResetForm, onInputChange } = useForm(egresoSeleccionado ?? initialState);
  const { addEgreso, putEgreso } = useMutateEgreso();
  const { mutateAsync: agregarEgreso, isPending: isPendingAgregar } = addEgreso;
  const { mutateAsync: modificarEgreso, isPending: isPendingModificar } = putEgreso;

  const handleCloseModal = () => {
    onResetForm();
    closeModal();
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (descripcion === '') return setError(true);
    if (importe <= 0) return setError(true);
    if (tipoegresoid === '') return setError(true);

    setError(false);

    if (egresoSeleccionado) {
      await modificarEgreso(formState);
    } else {
      await agregarEgreso(formState);
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white rounded-lg shadow-lg w-xl h-[80vh] p-8 text-black flex flex-col dark:bg-slate-800 dark:text-white">
        <div className="flex justify-between border-b border-gray-300 mb-2 pb-2">
          <h2 className="text-3xl font-bold  text-left">{egresoSeleccionado ? 'Modificar Tipo de Egreso' : 'Agregar Tipo de Egreso'}</h2>
          <CgClose size={35} onClick={handleCloseModal} className="hover:bg-gray-300 rounded-lg p-2 cursor-pointer" />
        </div>
        <form className="grid grid-cols-2 gap-1 flex-1 min-h-0" onSubmit={handleSubmitForm}>
          <div className="col-span-2">
            <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
              Descripcion *
            </label>
            <input
              autoFocus
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
              id="descripcion"
              className="w-full border rounded-md px-3 py-2 dark:text-white"
              placeholder="Descripcion del egreso..."
            />
            {error && descripcion === '' && <p className="text-red-500">La descripcion es obligatoria</p>}
          </div>

          <div>
            <label htmlFor="creado_en" className="block text-sm font-medium mb-1">
              Fecha
            </label>
            <div className="relative">
              <input
                type="date"
                name="creado_en"
                value={creado_en?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
                onChange={onInputChange}
                id="creado_en"
                className="w-full border rounded-md px-3 py-2"
              />
              <BiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none dark:text-gray-200" size={20} />
            </div>
          </div>

          <div>
            <label htmlFor="importe" className="block text-sm font-medium mb-1">
              Importe *
            </label>
            <input type="number" name="importe" value={importe} onChange={onInputChange} id="importe" className="w-full border rounded-md px-3 py-2" placeholder="15000.00" />
            {error && importe <= 0 && <p className="text-red-500">El importe debe ser mayor a 0</p>}
          </div>

          <div className="col-span-2">
            <label htmlFor="tipoegresoid">Tipo de Egreso *</label>
            <select name="tipoegresoid" value={tipoegresoid} onChange={onInputChange} id="tipoegresoid" className="w-full border rounded-md px-3 py-2">
              <option value="">---Seleccionar una opcion---</option>
              {tipoEgresos?.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.descripcion}
                </option>
              ))}
            </select>
            {error && tipoegresoid === '' && <p className="text-red-500">El Tipo de Egreso es obligatorio</p>}
          </div>

          <div className="flex justify-end col-span-2  mt-auto gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-red-300 cursor-pointer transition dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            {!egresoSeleccionado && (
              <button type="submit" disabled={isPendingAgregar} className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 cursor-pointer transition">
                {isPendingAgregar ? 'Guardando...' : 'Guardar'}
              </button>
            )}

            {egresoSeleccionado && (
              <button type="submit" disabled={isPendingModificar} className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 cursor-pointer transition">
                {isPendingModificar ? 'Modificando...' : 'Modificar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
