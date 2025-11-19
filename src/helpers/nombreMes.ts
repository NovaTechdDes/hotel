import { format, setMonth } from "date-fns"
import { es } from "date-fns/locale";

export const nombreMes = (mes: number): string => {
    const date = setMonth(new Date(), mes);
    return format(date, 'MMMM', { locale: es });
};