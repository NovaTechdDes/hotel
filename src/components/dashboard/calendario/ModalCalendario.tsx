import { CgClose } from 'react-icons/cg';
import { useClientes, useHabitaciones } from '../../../hooks';
import { useForm } from '../../../hooks/useForm';
import type { Reserva } from '../../../interface/Reserva';
import { useEffect, useState } from 'react';
import { usePrecio } from '../../../hooks/precio/usePrecio';
import { useReservaStore } from '../../../store/reserva.store';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useMutateReserva } from '../../../hooks/reserva/useMutateReserva';
import { calcularPrecios } from '../../../helpers/calcularPrecio';
import { BiCalendar } from 'react-icons/bi';

const initialState: Reserva = {
  cant_personas: 0,
  checkin: new Date().toISOString().slice(0, 10),
  checkout: new Date().toISOString().slice(0, 10),
  habitacionid: '',
  importe: 0,
  idcliente: null,
  color: '#0c0e31',
  observaciones: '',
  cliente_telefono: '',
  cliente_dni: '',
  cliente_nombre: '',
  mostrar: true,
};

export const ModalCalendario = () => {
  const { closeModal, reservaSeleccionado, fechaSeleccionada, habitacionSeleccionada } = useReservaStore();
  const { idcliente, color, importe, cliente_dni, cliente_telefono, cliente_nombre, habitacionid, checkin, observaciones, checkout, cant_personas, onInputChange, onResetForm, formState } = useForm(
    reservaSeleccionado ?? initialState
  );
  const { addReserva, putReserva } = useMutateReserva();
  const [error, setError] = useState<boolean>(false);

  const { data: habitaciones } = useHabitaciones();
  const { data: precio } = usePrecio();
  const { data: clientes } = useClientes();

  const [listaCliente, setListaCliente] = useState<boolean>(false);
  const { mutateAsync: agregarReserva, isPending: isPendigAgregar } = addReserva;
  const { mutateAsync: modificarReserva, isPending: isPendigModificar } = putReserva;

  useEffect(() => {
    const h = habitaciones?.find((habitacion) => habitacion.id === habitacionid);
    if (!h) return;

    onInputChange({
      target: {
        name: 'cant_personas',
        value: h.capacidad.toFixed(2),
      },
    });
    if (!importe) {
      onInputChange({
        target: {
          name: 'importe',
          value: precio ? calcularPrecios(precio, h.capacidad) : 0,
        },
      });
    }
  }, [habitacionid, habitaciones, precio]);

  useEffect(() => {
    if (reservaSeleccionado) {
      onInputChange({ target: { name: 'checkin', value: reservaSeleccionado.checkin ?? '' } });
      onInputChange({ target: { name: 'checkout', value: reservaSeleccionado.checkout ?? '' } });
    } else {
      onInputChange({ target: { name: 'checkin', value: fechaSeleccionada ?? '' } });
      onInputChange({ target: { name: 'checkout', value: fechaSeleccionada ?? '' } });
    }
  }, [fechaSeleccionada, reservaSeleccionado]);

  useEffect(() => {
    if (habitacionSeleccionada) {
      onInputChange({ target: { name: 'habitacionid', value: habitacionSeleccionada } });
    }
  }, [habitacionSeleccionada]);

  const handleCloseModal = () => {
    onResetForm();
    closeModal();
  };

  const handleCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange({
      target: {
        name: 'cliente_nombre',
        value: e.target.value,
      },
    });

    onInputChange({
      target: {
        name: 'idcliente',
        value: '',
      },
    });
  };

  const handleNombre = (e: React.MouseEvent<HTMLLIElement>) => {
    const { nombre, dni, telefono } = clientes?.find((elem) => elem.id === (e.currentTarget as HTMLLIElement).id) ?? { nombre: '', dni: '', telefono: '' };

    onInputChange({
      target: {
        name: 'idcliente',
        value: (e.currentTarget as HTMLLIElement).id,
      },
    });
    onInputChange({
      target: {
        name: 'cliente_nombre',
        value: nombre,
      },
    });
    onInputChange({
      target: {
        name: 'cliente_dni',
        value: dni,
      },
    });
    onInputChange({
      target: {
        name: 'cliente_telefono',
        value: telefono,
      },
    });

    setListaCliente(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (checkout <= checkin) return setError(true);
    if (cliente_nombre === '') return setError(true);

    if (reservaSeleccionado) {
      const ok = await modificarReserva(formState);

      if (ok) {
        closeModal();
      }
    } else {
      const ok = await agregarReserva(formState);

      if (ok) {
        closeModal();
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="bg-white border border-gray-500 rounded-lg shadow-lg w-4xl h-min-[80vh] p-8 text-black">
        <div>
          <div className="flex justify-between">
            <h3 className="font-semibold text-xl">{reservaSeleccionado ? 'Modificar Reserva' : 'Nueva Reserva'}</h3>
            <CgClose size={30} className="cursor-pointer hover:bg-gray-300 rounded-lg p-1" onClick={handleCloseModal} />
          </div>
          <p className="text-gray-500">Complete los datos para crear una reserva</p>
        </div>

        <form className="mt-2 grid grid-cols-2 gap-4 flex-1 overflow-auto mx-2 px-2">
          <div className="col-span-2">
            <label className="text-lg font-semibold" htmlFor="nombre">
              Nombre del Cliente
            </label>
            <button
              type="button"
              onClick={() => setListaCliente(!listaCliente)}
              className="w-full border border-gray-500  border-gray-500-gray-300 mb-1 rounded-md px-3 ý-2 flex justify-between items-center"
            >
              {idcliente ? clientes?.find((elem) => elem.id === idcliente)?.nombre : cliente_nombre !== '' ? cliente_nombre : 'Seleccionar un cliente'}
              {listaCliente ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </button>
            {listaCliente && (
              <div className="relative mt-1">
                <input
                  type="text"
                  name="cliente_nombre"
                  value={cliente_nombre}
                  onChange={handleCliente}
                  className="w-full border border-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Buscar Cliente..."
                  id="nombre"
                />
                <ul className="absolute z-10 w-full bg-white shadow-lg rounded-b-md max-h-60 overflow-y-auto border border-gray-500 mt-1 py-1">
                  {clientes?.map(
                    (elem) =>
                      elem.nombre.toUpperCase().startsWith(cliente_nombre.toUpperCase()) && (
                        <li key={elem.id} onClick={handleNombre} id={elem.id} className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors border-b border-gray-200 last:border-b-0">
                          {elem.nombre} - {elem.domicilio} - {elem.telefono}
                        </li>
                      )
                  )}
                </ul>
              </div>
            )}
            {error && cliente_nombre === '' && <p className="text-red-500">Debe seleccionar un cliente</p>}
          </div>

          <div>
            <label htmlFor="cliente_dni">DNI</label>
            <input className="w-full border border-gray-500 rounded-md px-3 py-2" placeholder="00000000" type="text" name="cliente_dni" id="cliente_dni" onChange={onInputChange} value={cliente_dni} />
          </div>

          <div>
            <label htmlFor="cliente_telefono">Telefono</label>
            <input
              className="w-full border border-gray-500 rounded-md px-3 py-2"
              placeholder="00000000"
              type="text"
              name="cliente_telefono"
              id="cliente_telefono"
              onChange={onInputChange}
              value={cliente_telefono}
            />
          </div>

          <div className="col-span-2">
            <label className="text-lg font-semibold" htmlFor="habitacionid">
              Habitacion
            </label>

            <input
              disabled
              className="border w-full p-2 rounded-md capitalize bg-gray-300"
              id={habitacionSeleccionada ?? ''}
              name="habitacionid"
              value={habitaciones?.find((elem) => elem.id === habitacionSeleccionada)?.tipo}
            />
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="cant_personas">
              Cantidad de Personas
            </label>
            <input
              onChange={onInputChange}
              value={cant_personas}
              type="text"
              name="cant_personas"
              className="w-full border border-gray-500 rounded-md px-3 py-2"
              id="cant_personas"
              placeholder="2.00"
            />
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="importe">
              Importe Por noche
            </label>
            <input onChange={onInputChange} value={importe} type="number" name="importe" className="w-full border border-gray-500 rounded-md px-3 py-2" id="importe" placeholder="0.00" />
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="checkin">
              Check In
            </label>
            <div className="relative">
              <input onChange={onInputChange} value={checkin.slice(0, 10)} type="date" name="checkin" className="w-full border border-gray-500 text-black rounded-md px-3 py-2" id="checkin" />
              <BiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="checkout">
              Check Out
            </label>
            <div className="relative">
              <input
                onChange={onInputChange}
                value={checkout.slice(0, 10)}
                type="date"
                min={checkin}
                name="checkout"
                className="w-full border border-gray-500 text-black rounded-md px-3 py-2"
                id="checkout"
              />
              <BiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
            </div>
            {error && <p className="text-red-500">La fecha de checkout debe ser mayor a la de checkin</p>}
          </div>

          <div>
            <label className="font-semibold text-lg" htmlFor="color">
              Color Reserva
            </label>
            <input type="color" name="color" value={color} onChange={onInputChange} id="color" className="w-full border border-gray-500 rounded-md " />
          </div>

          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Vista Previa
            </label>
            <div
              style={{ backgroundColor: color ?? '#000' }} //Dinamicamente sino no toma el color
              className="border rounded-lg p-2 text-center text-white"
            >
              {idcliente ? clientes?.find((elem) => elem.id === idcliente)?.nombre : cliente_nombre !== '' ? cliente_nombre : 'Seleccionar un cliente'}
            </div>
          </div>

          <div>
            <label htmlFor="observaciones">Observaciones</label>
            <textarea name="observaciones" id="observaciones" value={observaciones} onChange={onInputChange} cols={10} rows={2} className="w-full border border-gray-5300 rounded-md px-3 py-2">
              {observaciones}
            </textarea>
          </div>

          <div className="flex items-center justify-end mt-4 gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-green-300 cursor-pointer transition" onClick={handleCloseModal}>
              Cancelar
            </button>

            {!reservaSeleccionado ? (
              <button disabled={isPendigAgregar} type="submit" className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-300 cursor-pointer transition" onClick={handleSubmit}>
                {isPendigAgregar ? 'Guardando...' : 'Guardar'}
              </button>
            ) : (
              <button disabled={isPendigModificar} type="submit" className="px-4 py-2 bg-blue-400 rounded hover:bg-blue-300 cursor-pointer transition" onClick={handleSubmit}>
                {isPendigModificar ? 'Modificando   ...' : 'Modificar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
