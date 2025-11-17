import Swal from "sweetalert2";
import type { Habitacion } from "../interface/Habitacion";
import { supabase } from "../lib/supababase";

export const getHabitaciones = async (): Promise<Habitacion[]> => {
    const { data, error } = await supabase.
        from('habitacion')
        .select('*')
        .order('id');

    if (error) await Swal.fire('Error al obtener las habitaciones', error.message, 'error');

    return data as Habitacion[]
};

export const getHabitacionById = async (id: number): Promise<Habitacion | null> => {
    const { data, error } = await supabase
        .from('habitacion')
        .select('*')
        .eq('id', id)
        .single();

    if (error) await Swal.fire('Error al obtener la habitacion', error.message, 'error');

    return data as Habitacion
};

export const postHabitacion = async (habitacion: Omit<Habitacion, 'id' | 'creado_en'>): Promise<boolean> => {
    try {
        const { data, error } = await supabase.from('habitacion').insert(habitacion).select().single();
        if (error) {
            await Swal.fire('Error al cargar la habitacion', error.message, 'error');
            return false
        }
        console.log(data)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateHabitacion = async (updates: Partial<Habitacion>): Promise<boolean> => {
    try {
        const { id, creado_en, ...dataUpdate } = updates;
        const { data, error } = await supabase.from('habitacion').update(dataUpdate).eq('id', id);
        if (error) {
            await Swal.fire('Error al modificar la habitacion', error.message, 'error');
            return false
        }
        console.log(data);
        return true
    } catch (error) {
        console.log(error)
        return false
    }
};

export const deleteHabitacion = async (id: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase.from('habitacion').delete().eq('id', id);
        if (error) {
            await Swal.fire('error al eliminar la habitacion', error.message, 'error');
            return false
        };
        console.log(data);
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}