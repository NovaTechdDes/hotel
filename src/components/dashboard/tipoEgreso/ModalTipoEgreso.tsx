import { CgClose } from 'react-icons/cg';
import { useTipoEgresoStore } from '../../../store';
import { useMutateTipoEgreso } from '../../../hooks/tipoEgreso/useMutateTipoEgreso';
import { useForm } from '../../../hooks/useForm';

import { useState } from 'react';
import type { TipoEgreso } from '../../../interface/TipoEgreso';

const initialState: TipoEgreso = {
  descripcion: '',
};

export const ModalTipoEgreso = () => {
  const { tipoEgresoSeleccionado, closeModal } = useTipoEgresoStore();
  const { descripcion, formState, onResetForm, onInputChange } = useForm(tipoEgresoSeleccionado ?? initialState);
  const [error, setError] = useState<boolean>(false);

  const { addTipoEgreso, putTipoEgreso } = useMutateTipoEgreso();
  const { isPending: isPendingAgregar, mutateAsync: agregarTipo } = addTipoEgreso;
  const { isPending: isPendingModificar, mutateAsync: modificarTipo } = putTipoEgreso;

  const handleCloseModal = () => {
    onResetForm();
    closeModal();
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (descripcion === '') return setError(true);

    if (tipoEgresoSeleccionado) {
      const result = await modificarTipo(formState);
      if (result) {
        console.log(result);
        closeModal();
      }
    } else {
      const result = await agregarTipo(formState);
      if (result) {
        console.log(result);
        closeModal();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white rounded-lg shadow-lg w-xl h-[30vh] p-8 text-black flex flex-col">
        <div className="flex justify-between border-b border-gray-300 mb-2 pb-2">
          <h2 className="text-3xl font-bold  text-left">{tipoEgresoSeleccionado ? 'Modificar Tipo de Egreso' : 'Agregar Tipo de Egreso'}</h2>
          <CgClose size={35} onClick={handleCloseModal} className="hover:bg-gray-300 rounded-lg p-2 cursor-pointer" />
        </div>
        <form className="flex flex-col gap-4 flex-1 min-h-0" onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
              Descripcion
            </label>
            <input
              autoFocus
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
              id="descripcion"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Ej: Mantenimiento"
            />
            {error && descripcion === '' && <p className="text-red-500">La descripcion es obligatoria</p>}
          </div>

          <div className="flex justify-end mt-auto gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-red-300 cursor-pointer transition" onClick={handleCloseModal}>
              Cancelar
            </button>
            {!tipoEgresoSeleccionado && (
              <button type="submit" disabled={isPendingAgregar} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 cursor-pointer transition">
                {isPendingAgregar ? 'Guardando...' : 'Guardar'}
              </button>
            )}

            {tipoEgresoSeleccionado && (
              <button type="submit" disabled={isPendingModificar} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 cursor-pointer transition">
                {isPendingModificar ? 'Modificando...' : 'Modificar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
