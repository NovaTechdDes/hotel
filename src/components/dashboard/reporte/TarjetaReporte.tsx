import { formatearNumero } from '../../../helpers/formatearNumero';

interface Props {
  title: string;
  Icon: React.ElementType;
  colorIcon: string;
  numero: string;
  text: string;
}

export const TarjetaReporte = ({ title, colorIcon, Icon, numero, text }: Props) => {
  return (
    <div className="p-5 flex gap-5 flex-col bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <h2 className="dark:text-white">{title}</h2>
        <Icon size={20} color={colorIcon} />
      </div>

      <div>
        <p className="font-semibold text-2xl dark:text-white">{formatearNumero(numero)}</p>
      </div>

      <div>
        <p className="text-gray-500 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
};
