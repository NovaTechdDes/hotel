import { CgClose } from 'react-icons/cg';
import { useMutateHabitacion } from '../../../hooks/habitacion/useMutateHabitacion';
import type { Habitacion } from '../../../interface/Habitacion';
import { useForm } from '../../../hooks/useForm';
import { useEffect, useState } from 'react';
import { useHabitacionStore } from '../../../store';
import { useCaracteristicas } from '../../../hooks';
import { eliminarCaracteristicaHabitacion } from '../../../actions/habitacion.actions';

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
      await modificarHabitacion({ ...formState, caracteristica_habitacion: caracterisitcasSeleccionadas });
      closeModal();
    } else {
      const result = await agregarHabitacion({ habitacion: formState, listadoCaracteristicas: caracterisitcasSeleccionadas });

      if (result) {
        closeModal();
      }
    }
  };

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (caracterisitcasSeleccionadas.find((elem) => elem === e.target.value) || e.target.value === '') return;

    setCaracterisitcasSeleccionadas([...caracterisitcasSeleccionadas, e.target.value]);
  };

  const handleDeleteCaracteristica = (elemId: string) => {
    if (!habitacionSeleccionado?.id) return;
    setCaracterisitcasSeleccionadas(caracterisitcasSeleccionadas.filter((id) => id !== elemId));
    eliminarCaracteristicaHabitacion(habitacionSeleccionado.id, elemId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1B18]/90 backdrop-blur-sm z-50 animate-in fade-in duration-300 px-4" onClick={handleCloseModal}>
      <div
        className="bg-[#FDFCFB] dark:bg-[#2D2926] shadow-2xl w-full max-w-2xl rounded-sm p-10 border border-[#B59E6B]/20 transition-all duration-500 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-10 overflow-hidden">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{habitacionSeleccionado ? 'Ajustar Suite' : 'Nueva Habitación'}</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Registro de Inventario Premium</p>
          </div>
          <button onClick={handleCloseModal} className="p-2 hover:bg-[#2D2926]/5 dark:hover:bg-white/5 rounded-full transition-colors duration-300 text-[#2D2926]/40 dark:text-[#FDFCFB]/40">
            <CgClose size={24} />
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmitForm}>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="nombre">
              Identificación de la Suite *
            </label>
            <input
              autoFocus
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10"
              placeholder="Ej: Suite Imperial, Hab. 101..."
            />
            {error && nombre === '' && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">El nombre es obligatorio</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="capacidad">
              Capacidad Máxima *
            </label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              value={capacidad}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 font-serif"
              placeholder="Personas"
              min={1}
            />
            {error && capacidad === 0 && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">La capacidad debe ser mayor a 0</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="tipo">
              Categoría de Alojamiento
            </label>
            <select
              id="tipo"
              name="tipo"
              value={tipo}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 cursor-pointer appearance-none uppercase tracking-widest text-[10px] font-bold"
            >
              <option value="individual">Individual</option>
              <option value="doble">Doble</option>
              <option value="triple">Triple</option>
              <option value="cuadruple">Cuadruple</option>
              <option value="casa">Casa</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="descripcion">
              Detalle y Atributos
            </label>
            <textarea
              name="descripcion"
              id="descripcion"
              rows={3}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10 leading-relaxed"
              value={descripcion}
              onChange={onInputChange}
              placeholder="Descripción detallada de la suite..."
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-end border-b border-[#B59E6B]/10 pb-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]" htmlFor="caracteristicas">
                Características Especiales
              </label>
            </div>
            <select
              onChange={handleCaracteristicasChange}
              name="caracteristicas"
              id="caracteristicas"
              className="w-full bg-transparent border border-[#B59E6B]/20 rounded-sm px-4 py-3 text-[10px] uppercase tracking-widest font-bold text-[#2D2926] dark:text-[#FDFCFB] outline-none transition-all cursor-pointer focus:border-[#B59E6B]"
            >
              <option value="" className="bg-[#FDFCFB] dark:bg-[#2D2926]">
                --- Seleccionar Atributo ---
              </option>
              {caracteristicas?.map((elem) => (
                <option className="bg-[#FDFCFB] dark:bg-[#2D2926]" value={elem.id} key={elem.id}>
                  {elem.nombre.toUpperCase()}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-2 pt-2">
              {caracterisitcasSeleccionadas.map((elemId) => (
                <div
                  key={elemId}
                  className="inline-flex text-[9px] uppercase tracking-widest font-bold bg-[#B59E6B]/5 border border-[#B59E6B]/20 text-[#B59E6B] px-3 py-1.5 rounded-sm items-center gap-2 group/tag transition-all hover:bg-[#B59E6B]/10"
                >
                  <span>{caracteristicas?.find((c) => c.id === elemId)?.nombre.toUpperCase()}</span>
                  <CgClose size={12} className="cursor-pointer opacity-40 group-hover/tag:opacity-100 transition-opacity" onClick={() => handleDeleteCaracteristica(elemId)} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end md:col-span-2 pt-8 gap-6 border-t border-[#B59E6B]/10">
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
              className="bg-[#2D2926] dark:bg-[#B59E6B] text-[#FDFCFB] dark:text-[#2D2926] px-12 py-3 rounded-sm text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm"
            >
              {isPendingAgregar || isPendingModificar ? 'Sincronizando...' : habitacionSeleccionado ? 'Confirmar Ajuste' : 'Guardar Suite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalHabitacion;
