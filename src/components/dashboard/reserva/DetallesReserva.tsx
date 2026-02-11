import { useEffect, useState } from 'react';

import { calcularDias, reordenarFecha } from '../../../helpers/formatearFecha';
import { useReservaStore } from '../../../store/reserva.store';
import { useMutateReserva } from '../../../hooks/reserva/useMutateReserva';
import PDF from '../../ui/PDF';
import { verificarRol } from '../../../actions/auth.actions';

import { HiOutlinePencil } from 'react-icons/hi2';
import { MdContentCopy, MdDeleteOutline } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';
import { FiPrinter } from 'react-icons/fi';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import { subirPDFReserva } from '../../../actions/reserva.actions';
import { IoCheckmarkDone } from 'react-icons/io5';

export const DetallesReserva = () => {
  const { reservaSeleccionado, closeDetalle, openModal } = useReservaStore();

  const { id, checkin, checkout, importe, observaciones, habitacion, cliente } = reservaSeleccionado!;
  const { removeReserva, putReserva } = useMutateReserva();

  const [rol, setRol] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const { mutateAsync, isPending } = removeReserva;
  const { mutateAsync: mutateAsyncPut } = putReserva;

  const handleLink = async () => {
    const blob = await pdf(<PDF reserva={reservaSeleccionado!} />).toBlob();
    const { ok, msg } = await subirPDFReserva(blob, id);
    if (!ok) return;
    setUrl(msg);
    await navigator.clipboard.writeText(msg);
  };

  const handleDelete = async () => {
    const { isConfirmed, isDismissed, dismiss } = await Swal.fire({
      title: '¿Retirar Estancia?',
      text: `Se eliminará la reserva de "${(nombreHuesped || 'HUÉSPED SIN NOMBRE').toUpperCase()}".`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Transitorio',
      denyButtonText: 'Mantener',
      reverseButtons: true,
      background: '#FDFCFB',
      color: '#2D2926',
      confirmButtonColor: '#B91C1C',
      cancelButtonColor: '#0EA5E9',
    });

    if (isDismissed && dismiss === 'cancel') {
      mutateAsyncPut({ id, telo: true });
      closeDetalle();
    }

    if (isConfirmed && id) {
      await mutateAsync(id);
      closeDetalle();
    }
  };

  const handleUpdate = () => {
    if (!reservaSeleccionado) return;
    closeDetalle();
    openModal(reservaSeleccionado);
  };

  const handleCancel = () => {
    closeDetalle();
  };

  const buscarRolUser = async () => {
    const rol = await verificarRol();
    setRol(rol);
  };

  useEffect(() => {
    buscarRolUser();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setUrl('');
    }, 3000);
  }, [url]);

  const nombreHuesped = cliente?.nombre || reservaSeleccionado?.cliente_nombre;
  const dias = calcularDias(checkin, checkout);
  const total = importe * dias;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1E1B18]/90 backdrop-blur-sm z-50 animate-in fade-in duration-300 px-4" onClick={handleCancel}>
      <div
        className="bg-[#FDFCFB] dark:bg-[#2D2926] shadow-2xl w-full max-w-2xl rounded-sm p-10 border border-[#B59E6B]/20 transition-all duration-500 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">Ficha de Reserva</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold">Documentación de Hospedaje</p>
          </div>

          <div className="flex gap-4 items-center">
            {url === '' ? (
              <button onClick={handleLink} className="p-2.5 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors" title="Copiar Enlace Digital">
                <MdContentCopy size={20} />
              </button>
            ) : (
              <div className="p-2.5 text-green-500 animate-in zoom-in duration-300">
                <IoCheckmarkDone size={20} />
              </div>
            )}

            <PDFDownloadLink document={<PDF reserva={reservaSeleccionado!} />} fileName={`Reserva-${nombreHuesped}`}>
              {({ loading }) => (
                <button className="p-2.5 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors disabled:opacity-30" disabled={loading} title="Imprimir Comprobante">
                  {loading ? <div className="w-5 h-5 border-2 border-[#B59E6B] border-t-transparent animate-spin rounded-full" /> : <FiPrinter size={20} />}
                </button>
              )}
            </PDFDownloadLink>

            <button onClick={handleCancel} className="p-2.5 text-[#2D2926]/40 dark:text-[#FDFCFB]/40 hover:text-[#B59E6B] transition-colors">
              <CgClose size={22} />
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Cabecera de la Ficha */}
          <div className="bg-[#B59E6B]/5 border border-[#B59E6B]/10 p-6 rounded-sm flex gap-6 items-center">
            <div className="w-16 h-16 rounded-sm text-[#FDFCFB] flex items-center justify-center font-serif text-2xl shadow-lg shrink-0" style={{ backgroundColor: '#2D2926' }}>
              {nombreHuesped?.[0].toUpperCase()}
            </div>
            <div className="space-y-1">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#B59E6B] font-bold leading-none mb-1">Identificación del Huésped</p>
              <h4 className="text-xl font-serif text-[#2D2926] dark:text-[#FDFCFB] capitalize tracking-wide">{nombreHuesped}</h4>
              <p className="text-[10px] items-center text-[#2D2926]/40 dark:text-[#FDFCFB]/30 uppercase tracking-widest font-bold">
                Residencia {habitacion?.nombre} <span className="mx-2 opacity-30 text-xs">•</span> {habitacion?.tipo}
              </p>
            </div>
          </div>

          {/* Cronograma de Estancia */}
          <div className="grid grid-cols-2 gap-12 bg-white/50 dark:bg-white/5 p-6 border border-[#B59E6B]/5">
            <div className="space-y-2">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B59E6B]">Check-In (Ingreso)</p>
              <p className="text-lg font-serif text-[#2D2926] dark:text-[#FDFCFB]">{reordenarFecha(checkin)}</p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B59E6B]">Check-Out (Egreso)</p>
              <p className="text-lg font-serif text-[#2D2926] dark:text-[#FDFCFB]">{reordenarFecha(checkout)}</p>
            </div>
          </div>

          {/* Valor de la Estancia */}
          <div className="flex justify-between items-end border-b border-[#B59E6B]/10 pb-6 mb-2">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#2D2926]/40 dark:text-[#FDFCFB]/30">Pago del Servicio</p>
              <p className="text-xs text-[#2D2926]/60 dark:text-[#FDFCFB]/50 font-medium">
                {dias} Noches × <span className="font-serif italic">${importe}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#B59E6B] leading-none mb-1">Monto Total</p>
              <p className="text-3xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-tight">
                <span className="text-base mr-1">$</span>
                {total.toLocaleString('es-AR')}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#B59E6B]">Observaciones de la Reserva</p>
            <p className="text-sm text-[#2D2926]/70 dark:text-[#FDFCFB]/60 leading-relaxed italic">{observaciones || 'No se registran requerimientos especiales para esta reserva.'}</p>
          </div>

          <div className="flex gap-6 pt-10 mt-10 border-t border-[#B59E6B]/10">
            <button
              onClick={handleUpdate}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold text-[#B59E6B] hover:text-[#2D2926] dark:hover:text-[#FDFCFB] border border-[#B59E6B]/20 py-4 rounded-sm hover:bg-[#B59E6B]/5 transition-all"
            >
              <HiOutlinePencil size={18} />
              Ajustar Reserva
            </button>
            {rol === 'admin' && (
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest font-bold text-red-400/60 hover:text-red-500 border border-red-500/10 py-4 rounded-sm hover:bg-red-500/5 transition-all"
              >
                {isPending ? <div className="w-4 h-4 border-2 border-red-400 border-t-transparent animate-spin rounded-full" /> : <MdDeleteOutline size={18} />}
                Retirar Reserva
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
