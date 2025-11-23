import type { TemporadaAlta } from '../../../interface';

interface Props {
  title: string;
  color: string;
  temporadaAlta: TemporadaAlta;
  meses: string[];
}

export const Ocupacion = ({ temporadaAlta, color, title, meses }: Props) => {
  if (!temporadaAlta) return;

  return (
    <div className="border  p-5 border-gray-300 shadow-2xl  bg-orange-500/5 rounded-lg">
      <div className="flex justify-between ">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="text-white text-xs rounded-lg p-1" style={{ backgroundColor: color }}>
          {meses.map((elem) => elem.slice(0, 3) + ', ')}
        </p>
      </div>

      <div className="flex gap-5 flex-col my-5">
        <div className="flex justify-between">
          <p className="text-gray-500">Total de Rervas</p>
          <span className="font-bold text-2xl">{temporadaAlta.total_reservas}</span>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Dias Ocupados</p>
          <span className="font-bold text-2xl">{temporadaAlta.total_dias_ocupados}</span>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500">Porcentaje de Ocupacion</p>
          <span style={{ color: color }} className="font-bold text-2xl">
            {temporadaAlta.porcentaje_ocupacion.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
