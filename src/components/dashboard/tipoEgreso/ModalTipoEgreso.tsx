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
        closeModal();
      }
    } else {
      const result = await agregarTipo(formState);
      if (result) {
        closeModal();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1B18]/90 backdrop-blur-sm z-50 animate-in fade-in duration-300 px-4">
      <div className="bg-[#FDFCFB] dark:bg-[#2D2926] shadow-2xl w-full max-w-xl rounded-sm p-10 border border-[#B59E6B]/20 transition-all duration-500">
        <div className="flex justify-between items-start mb-10 overflow-hidden">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{tipoEgresoSeleccionado ? 'Modificar Registro' : 'Nuevo Registro'}</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B59E6B] font-bold">Tipo de Egreso</p>
          </div>
          <button onClick={handleCloseModal} className="p-2 hover:bg-[#2D2926]/5 dark:hover:bg-white/5 rounded-full transition-colors duration-300 text-[#2D2926]/40 dark:text-[#FDFCFB]/40">
            <CgClose size={24} />
          </button>
        </div>

        <form className="space-y-8" onSubmit={handleSubmitForm}>
          <div className="space-y-2">
            <label htmlFor="descripcion" className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30">
              Descripción de la Categoría
            </label>
            <input
              autoFocus
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
              id="descripcion"
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10"
              placeholder="Ej: Servicios Públicos, Mantenimiento..."
            />
            {error && descripcion === '' && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">La descripción es obligatoria</p>}
          </div>

          <div className="flex justify-end pt-6 gap-6 border-t border-[#B59E6B]/10">
            <button
              type="button"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2926]/30 dark:text-[#FDFCFB]/30 hover:text-[#2D2926] dark:hover:text-[#FDFCFB] transition-colors duration-300"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPendingAgregar || isPendingModificar}
              className="bg-[#2D2926] dark:bg-[#B59E6B] text-[#FDFCFB] dark:text-[#2D2926] px-10 py-3 rounded-sm text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm"
            >
              {isPendingAgregar || isPendingModificar ? 'Procesando...' : tipoEgresoSeleccionado ? 'Confirmar Cambios' : 'Guardar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
