import { useClientes } from '../../../hooks';
import { Loading } from '../../ui/Loading';
import ClienteCard from './ClienteCard';

const ListaClientes = () => {
  const { data: clientes, isLoading } = useClientes();

  if (isLoading) {
    return <Loading text="Cargando Clientes..." />;
  }

  return (
    <div className="bg-white border border-gray-300 shadow-2xl rounded-lg mx-5 h-[80vh] mx-5">
      <table className="w-full text-black">
        <thead className="border border-gray-300 rounded-lg">
          <tr>
            <th className="py-2">Nombre</th>
            <th>Dni</th>
            <th>Telefono</th>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="border border-gray-300 rounded-lg">
          {clientes?.map((elem) => (
            <ClienteCard key={elem.id} cliente={elem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaClientes;
