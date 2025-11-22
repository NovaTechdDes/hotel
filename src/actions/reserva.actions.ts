import Swal, { type SweetAlertResult } from "sweetalert2";
import type { Reserva, TemporadaAlta } from "../interface/Reserva";
import { supabase } from "../lib/supababase";

export const getReservas = async (): Promise<Reserva[]> => {
    const { data, error } = await supabase.from('reserva').select('*, cliente: idcliente(nombre), habitacion: habitacionid(*)').order('checkin', { ascending: false });

    if (error) await Swal.fire('Error al obtener las Reservas', error.message, 'error')
    return data as Reserva[];
};

export const getReservasMonth = async (month: number, anio: number) => {

    const startDate = new Date(anio, month - 1, 1);
    const endDate = new Date(anio, month, 0, 23, 59, 59, 999);

    const { data, error } = await supabase
        .from('reserva')
        .select('*, cliente: idcliente(nombre), habitacion: habitacionid(*)')
        .gte('checkin', startDate.toISOString())
        .lte('checkin', endDate.toISOString());

    if (error) await Swal.fire('Error al obtener las Reservas del mes', error.message, 'error');
    return data as Reserva[];
};

export const getReporteOcupacion = async(anio: number): Promise<TemporadaAlta> => {
    const {data, error} = await supabase.rpc('reporte_ocupacion', {
        anio
    }).single<TemporadaAlta>();

    if(error){
        await Swal.fire('Error al obtener el reporte', error.message, 'error');
        return {
            total_dias_ocupados: 0,
            total_reservas: 0,
            porcentaje_ocupacion: 0
        };
    };

    return data
};

export const postReserva = async (reserva: Omit<Reserva, 'id' | 'creado_en'>): Promise<boolean | SweetAlertResult<any>> => {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            await Swal.fire('Error', 'No se pudo obtener el usuario autenticado', 'error');
            throw new Error('No se pudo obtener el usuario autenticado');
        }


        const reservaWhitUser = { ...reserva, idcliente: reserva.idcliente  || null, usuarioid: user?.id }
        console.log(reservaWhitUser)

        const { data, error } = await supabase.from('reserva').insert(reservaWhitUser).select().single();
        console.log(data)
        if (error) {
            console.log(error)
            return await Swal.fire('Error al cargar la reserva', error.message, 'error')
        };
        return true   
    } catch (error: any) {
        console.log(error);
        return await Swal.fire('Error al cargar la reserva', error.message, 'error');
    }
};

export const updateReserva = async (reserva: Partial<Reserva>): Promise<Reserva | SweetAlertResult<any>> => {

    const { cliente: _cliente, habitacion: _habitacion, ...updates } = reserva;
    console.log({_cliente, _habitacion});

    const { data, error } = await supabase.from('reserva').update(updates).eq('id', reserva.id).select().single();
    if (error) return await Swal.fire('Error al modificar la reserva', error.message, 'error')

    return data;
};

export const deleteReserva = async (id: string): Promise<boolean | SweetAlertResult<any>> => {

    const { data, error } = await supabase.from('reserva').delete().eq('id', id).select().single();

    if (error) return await Swal.fire('Error al eliminar la reserva', error.message, 'error');

    return data;

};

