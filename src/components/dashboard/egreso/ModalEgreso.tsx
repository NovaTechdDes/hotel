import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { useForm } from '../../../hooks/useForm';
import type { Egreso } from '../../../interface/Egreso';
import { useEgresoStore } from '../../../store';
import { useMutateEgreso } from '../../../hooks/egreso/useMutateEgreso';
import { useTipoEgreso } from '../../../hooks/tipoEgreso/useTipoEgreso';

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
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1B18]/90 backdrop-blur-sm z-50 animate-in fade-in duration-300 px-4" onClick={handleCloseModal}>
      <div
        className="bg-[#FDFCFB] dark:bg-[#2D2926] shadow-2xl w-full max-w-2xl rounded-sm p-10 border border-[#B59E6B]/20 transition-all duration-500 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-10 overflow-hidden">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{egresoSeleccionado ? 'Ajustar Registro' : 'Nuevo Egreso'}</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Registro Contable Operatvo</p>
          </div>
          <button onClick={handleCloseModal} className="p-2 hover:bg-[#2D2926]/5 dark:hover:bg-white/5 rounded-full transition-colors duration-300 text-[#2D2926]/40 dark:text-[#FDFCFB]/40">
            <CgClose size={24} />
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmitForm}>
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="descripcion" className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30">
              Descripción del Gasto *
            </label>
            <input
              autoFocus
              type="text"
              name="descripcion"
              value={descripcion}
              onChange={onInputChange}
              id="descripcion"
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10"
              placeholder="Ej: Pago de Luz Enero, Insumos de Limpieza..."
            />
            {error && descripcion === '' && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">La descripción es obligatoria</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="creado_en" className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30">
              Fecha de Emisión
            </label>
            <div className="relative">
              <input
                type="date"
                name="creado_en"
                value={creado_en?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
                onChange={onInputChange}
                id="creado_en"
                className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="importe" className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30">
              Importe Total *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-serif">$</span>
              <input
                type="number"
                name="importe"
                value={importe}
                onChange={onInputChange}
                id="importe"
                className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm pl-8 pr-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300"
                placeholder="0.00"
              />
            </div>
            {error && importe <= 0 && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">El importe debe ser mayor a 0</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label htmlFor="tipoegresoid" className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30">
              Categoría de Egreso *
            </label>
            <select
              name="tipoegresoid"
              value={tipoegresoid}
              onChange={onInputChange}
              id="tipoegresoid"
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" className="text-[#2D2926] dark:text-[#FDFCFB] bg-[#FDFCFB] dark:bg-[#2D2926]">
                Seleccionar Categoría...
              </option>
              {tipoEgresos?.map((elem) => (
                <option key={elem.id} value={elem.id} className="text-[#2D2926] dark:text-[#FDFCFB] bg-[#FDFCFB] dark:bg-[#2D2926]">
                  {elem.descripcion}
                </option>
              ))}
            </select>
            {error && tipoegresoid === '' && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">La categoría es obligatoria</p>}
          </div>

          <div className="flex justify-end md:col-span-2 pt-8 gap-6 border-t border-[#B59E6B]/10">
            <button
              type="button"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2926]/30 dark:text-[#FDFCFB]/30 hover:text-[#2D2926] dark:hover:text-[#FDFCFB] transition-colors duration-300"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={isPendingAgregar || isPendingModificar}
              className="bg-[#2D2926] dark:bg-[#B59E6B] text-[#FDFCFB] dark:text-[#2D2926] px-12 py-3 rounded-sm text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm"
            >
              {isPendingAgregar || isPendingModificar ? 'Procesando...' : egresoSeleccionado ? 'Confirmar Ajuste' : 'Guardar Registro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
