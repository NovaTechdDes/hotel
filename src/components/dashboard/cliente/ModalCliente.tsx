import { CgClose } from 'react-icons/cg';
import { useForm } from '../../../hooks/useForm';
import type { Cliente } from '../../../interface/Cliente';
import { useState } from 'react';
import { useMutateCliente } from '../../../hooks/clientes/useMutateCliente';
import { useClienteStore } from '../../../store/cliente.store';

const initialState: Cliente = {
  nombre: '',
  dni: '',
  localidad: '',
  telefono: '',
  domicilio: '',
};

export const ModalCliente = () => {
  const { closeModal, clienteSeleccionado } = useClienteStore();
  const { addCliente, putCliente } = useMutateCliente();
  const { isPending: isPendingAgregar, mutateAsync: agregarCliente } = addCliente;
  const { isPending: isPendingModificar, mutateAsync: modificarCliente } = putCliente;

  const { nombre, dni, localidad, telefono, domicilio, onInputChange, onResetForm, formState } = useForm(clienteSeleccionado ?? initialState);
  const [error, setErrror] = useState<boolean>(false);

  const handleCloseModal = () => {
    //TODO de Resetar el form
    onResetForm();
    closeModal();
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nombre === '') return setErrror(true);
    if (dni === '') return setErrror(true);

    if (clienteSeleccionado) {
      const result = await modificarCliente(formState);

      if (result) {
        closeModal();
      }
    } else {
      const result = await agregarCliente(formState);
      if (result) {
        console.log(result);
        closeModal();
      }
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
            <h2 className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{clienteSeleccionado ? 'Ajustar Perfil' : 'Nuevo Huésped'}</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Registro de Conserjería Premium</p>
          </div>
          <button onClick={handleCloseModal} className="p-2 hover:bg-[#2D2926]/5 dark:hover:bg-white/5 rounded-full transition-colors duration-300 text-[#2D2926]/40 dark:text-[#FDFCFB]/40">
            <CgClose size={24} />
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmitForm}>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="nombre">
              Nombre y Apellido *
            </label>
            <input
              autoFocus
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 dark:placeholder:text-[#FDFCFB]/10"
              placeholder="Identificación del Huésped..."
            />
            {error && nombre === '' && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">El nombre es obligatorio</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="dni">
              Documento (DNI/Pasaporte) *
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={dni}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300"
              placeholder="Número de Identidad"
            />
            {dni === '' && error && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">El DNI es obligatorio</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="telefono">
              Teléfono Móvil
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300"
              placeholder="Ej: +54 9..."
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="domicilio">
              Dirección de Residencia
            </label>
            <input
              type="text"
              id="domicilio"
              name="domicilio"
              value={domicilio}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300"
              placeholder="Calle, Número, Piso/Depto..."
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30" htmlFor="localidad">
              Ciudad / Localidad
            </label>
            <input
              type="text"
              id="localidad"
              name="localidad"
              value={localidad}
              onChange={onInputChange}
              className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] focus:ring-1 focus:ring-[#B59E6B] outline-none transition-all duration-300"
              placeholder="Ciudad de Procedencia"
            />
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
              {isPendingAgregar || isPendingModificar ? 'Sincronizando...' : clienteSeleccionado ? 'Confirmar Ajuste' : 'Guardar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
