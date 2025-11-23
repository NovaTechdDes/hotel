import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";

//Utilizamos las funciones de la libreria, lo que hacemos es traer todos los dias desde el inicio del mes hasta el final.
//El valor de start es un new Date() completo
export const traerDiasDelMes = (day: Date) => {
    const days = eachDayOfInterval({
        start: startOfMonth(day),
        end: endOfMonth(day)
    });

    return days
};