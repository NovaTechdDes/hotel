import React from 'react'
import { ReporteMensual } from '../../components/dashboard/reporte/ReporteMensual'

export const Reporte = () => {
    return (
        <div className='text-black p-10'>
            <div>
                <h2 className='text-3xl font-semibold text-black'>Reportes</h2>
                <p className='text-gray-500 mt-2'>Analisis de ingresos y estadisticas de ocupacion de hotel</p>
            </div>

            <div className='bg-white p-3 rounded-lg mt-5'>
                <ReporteMensual />
            </div>


        </div>
    )
}
