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
import { COLORES_RESERVA } from '../../../helpers/colores';

const initialState: Reserva = {
  cant_personas: 0,
  checkin: new Date().toISOString().slice(0, 10),
  checkout: new Date().toISOString().slice(0, 10),
  habitacionid: '',
  importe: 0,
  idcliente: null,
  color: '#1E40AF',
  observaciones: '',
  cliente_telefono: '',
  cliente_dni: '',
  cliente_nombre: '',
  mostrar: true,
};

export const ModalCalendario = () => {
  const { closeModal, reservaSeleccionado, fechaSeleccionada, habitacionSeleccionada } = useReservaStore();
  const { idcliente, color, importe, cliente_dni, cliente_nombre, habitacionid, checkin, observaciones, checkout, cant_personas, onInputChange, onResetForm, formState } = useForm(
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
        value: h.capacidad.toString(),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitacionid, habitaciones, precio, importe]);

  useEffect(() => {
    if (reservaSeleccionado) {
      onInputChange({ target: { name: 'checkin', value: reservaSeleccionado.checkin ?? '' } });
      onInputChange({ target: { name: 'checkout', value: reservaSeleccionado.checkout ?? '' } });
    } else {
      onInputChange({ target: { name: 'checkin', value: fechaSeleccionada ?? '' } });
      onInputChange({ target: { name: 'checkout', value: fechaSeleccionada ?? '' } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaSeleccionada, reservaSeleccionado]);

  useEffect(() => {
    if (reservaSeleccionado?.habitacionid) {
      onInputChange({ target: { name: 'habitacionid', value: reservaSeleccionado.habitacionid } });
    } else if (habitacionSeleccionada) {
      onInputChange({ target: { name: 'habitacionid', value: habitacionSeleccionada } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitacionSeleccionada, reservaSeleccionado]);

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
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1B18]/90 backdrop-blur-sm z-50 animate-in fade-in duration-300 px-4" onClick={handleCloseModal}>
      <div
        className="bg-[#FDFCFB] dark:bg-[#2D2926] shadow-2xl w-full max-w-4xl rounded-sm p-10 border border-[#B59E6B]/20 transition-all duration-500 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-10 overflow-hidden">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{reservaSeleccionado ? 'Ajustar Reserva' : 'Nueva Conserjería'}</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Documentación de Estancia Premium</p>
          </div>
          <button onClick={handleCloseModal} className="p-2 hover:bg-[#2D2926]/5 dark:hover:bg-white/5 rounded-full transition-colors duration-300 text-[#2D2926]/40 dark:text-[#FDFCFB]/40">
            <CgClose size={24} />
          </button>
        </div>

        <form className="space-y-12" onSubmit={handleSubmit}>
          {/* SECCIÓN: IDENTIDAD DEL HUÉSPED */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#B59E6B]/10 pb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]">I. Perfil del Huésped</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2" htmlFor="nombre">
                  Nombre Completo o Razón Social
                </label>
                <div className="relative group/search">
                  <button
                    type="button"
                    onClick={() => setListaCliente(!listaCliente)}
                    className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] flex justify-between items-center transition-all duration-300 focus:border-[#B59E6B] outline-none"
                  >
                    <span className="truncate">{idcliente ? clientes?.find((elem) => elem.id === idcliente)?.nombre : cliente_nombre !== '' ? cliente_nombre : 'Seleccionar o buscar huésped...'}</span>
                    {listaCliente ? <TiArrowSortedUp size={18} className="text-[#B59E6B]" /> : <TiArrowSortedDown size={18} className="text-[#B59E6B]" />}
                  </button>

                  {listaCliente && (
                    <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1E1B18] shadow-2xl border border-[#B59E6B]/10 rounded-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="p-3 bg-[#B59E6B]/5 border-b border-[#B59E6B]/10">
                        <input
                          type="text"
                          name="cliente_nombre"
                          autoFocus
                          value={cliente_nombre}
                          onChange={handleCliente}
                          className="w-full bg-transparent text-sm text-[#2D2926] dark:text-[#FDFCFB] outline-none font-medium placeholder:text-[#2D2926]/20"
                          placeholder="Escriba para filtrar..."
                        />
                      </div>
                      <ul className="max-h-52 overflow-y-auto custom-scrollbar">
                        {clientes
                          ?.filter((c) => c.nombre.toUpperCase().includes(cliente_nombre.toUpperCase()))
                          .map((elem) => (
                            <li
                              key={elem.id}
                              onClick={handleNombre}
                              id={elem.id}
                              className="px-4 py-3 hover:bg-[#B59E6B]/5 cursor-pointer transition-colors border-b border-[#B59E6B]/5 last:border-0 text-xs text-[#2D2926]/70 dark:text-[#FDFCFB]/70"
                            >
                              <p className="font-bold uppercase tracking-widest mb-0.5">{elem.nombre}</p>
                              <p className="text-[10px] opacity-60">
                                {elem.dni} • {elem.telefono}
                              </p>
                            </li>
                          ))}
                        {clientes?.filter((c) => c.nombre.toUpperCase().includes(cliente_nombre.toUpperCase())).length === 0 && (
                          <li className="px-4 py-8 text-center text-[#B59E6B] text-[10px] uppercase font-bold tracking-widest italic">No se encontraron perfiles coincidentes</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                {error && cliente_nombre === '' && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-2">Identificación requerida</p>}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 lg:col-span-1">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2" htmlFor="cliente_dni">
                    Documento
                  </label>
                  <input
                    className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all duration-300"
                    placeholder="00.000.000"
                    type="text"
                    name="cliente_dni"
                    id="cliente_dni"
                    onChange={onInputChange}
                    value={cliente_dni}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: DETALLES DE ESTANCIA */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#B59E6B]/10 pb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]">II. Cronograma y Residencia</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2">Ingreso (Check-In)</label>
                <div className="relative">
                  <input
                    onChange={onInputChange}
                    value={checkin.slice(0, 10)}
                    type="date"
                    name="checkin"
                    className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all duration-300"
                  />
                  <BiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B59E6B] pointer-events-none" size={18} />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2">Egreso (Check-Out)</label>
                <div className="relative">
                  <input
                    onChange={onInputChange}
                    value={checkout.slice(0, 10)}
                    type="date"
                    min={checkin}
                    name="checkout"
                    className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all duration-300"
                  />
                  <BiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B59E6B] pointer-events-none" size={18} />
                </div>
                {error && checkout <= checkin && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-2">Intervalo de fecha inválido</p>}
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2">Suite Asignada</label>
                <input
                  disabled
                  className="w-full bg-[#B59E6B]/5 border border-[#B59E6B]/10 rounded-sm px-4 py-3 text-[#B59E6B] font-serif uppercase tracking-widest text-sm opacity-80"
                  value={habitaciones?.find((elem) => elem.id === habitacionid)?.nombre ?? 'No seleccionada'}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2">Ocupantes</label>
                <input
                  onChange={onInputChange}
                  value={cant_personas}
                  type="number"
                  name="cant_personas"
                  className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all duration-300 font-serif"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2">Tarifa Diaria ($)</label>
                <input
                  onChange={onInputChange}
                  value={importe}
                  type="number"
                  name="importe"
                  className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 font-serif text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN: PREFERENCIAS Y VISUAL */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-[#B59E6B]/10 pb-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]">III. Personalización y Notas</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-4">Color De la reserva</label>
                <div className="flex flex-wrap gap-3 p-4 bg-[#B59E6B]/5 rounded-sm border border-[#B59E6B]/10">
                  {COLORES_RESERVA.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => onInputChange({ target: { name: 'color', value: c } })}
                      className={`
                                    w-8 h-8 rounded-full border-2 transition-all duration-300 active:scale-90
                                    ${color === c ? 'border-[#B59E6B] scale-110 shadow-lg ring-2 ring-[#B59E6B]/20' : 'border-transparent opacity-60 hover:opacity-100'}
                                `}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30 block mb-2" htmlFor="observaciones">
                  Observaciones de la Reserva
                </label>
                <textarea
                  name="observaciones"
                  id="observaciones"
                  value={observaciones}
                  onChange={onInputChange}
                  rows={3}
                  className="w-full bg-[#FDFCFB] dark:bg-[#1E1B18] border border-[#F5F0E1] dark:border-white/10 rounded-sm px-4 py-3 text-[#2D2926] dark:text-[#FDFCFB] focus:border-[#B59E6B] outline-none transition-all duration-300 placeholder:text-[#2D2926]/20 text-sm leading-relaxed"
                  placeholder="Observaciones de conserjería, requerimientos especiales..."
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center gap-8 pt-12 border-t border-[#B59E6B]/10">
            <button
              type="button"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2D2926]/30 dark:text-[#FDFCFB]/30 hover:text-[#2D2926] dark:hover:text-[#FDFCFB] transition-colors duration-300"
              onClick={handleCloseModal}
            >
              Anular Gestión
            </button>

            <button
              type="submit"
              disabled={isPendigAgregar || isPendigModificar}
              className="w-full sm:w-auto bg-[#2D2926] dark:bg-[#B59E6B] text-[#FDFCFB] dark:text-[#2D2926] px-16 py-4 rounded-sm text-xs uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              {isPendigAgregar || isPendigModificar ? 'Sincronizando...' : reservaSeleccionado ? 'Confirmar Ajustes' : 'Protocolar Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
