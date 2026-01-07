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
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={handleCloseModal}>
      <div className="bg-white rounded-lg shadow-lg w-4xl h-[80vh] p-8 text-black flex flex-col dark:bg-slate-800 dark:text-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between border-b border-gray-300 mb-2 pb-2">
          <h2 className="text-3xl font-bold  text-left">Agregar Cliente</h2>
          <CgClose size={35} onClick={handleCloseModal} className="hover:bg-gray-300 rounded-lg p-2 cursor-pointer" />
        </div>
        <form className="grid grid-cols-1 gap-4 flex-1" onSubmit={handleSubmitForm}>
          <div>
            <label className=" text-sm font-medium mb-1" htmlFor="nombre">
              Nombre*
            </label>
            <input type="text" id="nombre" name="nombre" value={nombre} onChange={onInputChange} className="w-full border rounded-md px-3 py-2  dark:text-white" placeholder="Nombre" />
            {error && nombre === '' && <p className="text-red-500">El nombre es obligatorio</p>}
          </div>

          <div>
            <label className=" text-sm font-medium mb-1" htmlFor="dni">
              DNI
            </label>
            <input type="text" id="dni" name="dni" value={dni} onChange={onInputChange} className="w-full border rounded-md px-3 py-2" placeholder="DNI" />
            {dni === '' && error && <p className="text-red-500">El DNI es obligatorio</p>}
          </div>

          <div>
            <label className=" text-sm font-medium mb-1" htmlFor="telefono">
              Teléfono
            </label>
            <input type="text" id="telefono" name="telefono" value={telefono} onChange={onInputChange} className="w-full border rounded-md px-3 py-2" placeholder="Teléfono" />
          </div>

          <div>
            <label className=" text-sm font-medium mb-1" htmlFor="domicilio">
              Domicilio
            </label>
            <input type="text" id="domicilio" name="domicilio" value={domicilio} onChange={onInputChange} className="w-full border rounded-md px-3 py-2" placeholder="Domicilio" />
          </div>

          <div>
            <label className=" text-sm font-medium mb-1" htmlFor="localidad">
              Localidad
            </label>
            <input type="text" id="localidad" name="localidad" value={localidad} onChange={onInputChange} className="w-full border rounded-md px-3 py-2" placeholder="Localidad" />
          </div>

          <div className="flex justify-end gap-2 mt-auto">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-green-300 cursor-pointer transition dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            {!clienteSeleccionado ? (
              <button type="submit" disabled={isPendingAgregar} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition">
                {isPendingAgregar ? 'Guardando...' : 'Guardar'}
              </button>
            ) : (
              <button type="submit" disabled={isPendingModificar} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition">
                {isPendingModificar ? 'Modificando...' : 'Modificar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
