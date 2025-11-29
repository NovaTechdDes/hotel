import { useClientes } from '../../../hooks';
import { Loading } from '../../ui/Loading';
import ClienteCard from './ClienteCard';

const ListaClientes = () => {
  const { data: clientes, isLoading } = useClientes();

  if (isLoading) {
    return <Loading text="Cargando Clientes..." />;
  }

  return (
    <div className="border border-gray-300 shadow-2xl rounded-lg h-[80vh] mx-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-lg ">
        {clientes?.map((elem) => (
          <ClienteCard key={elem.id} cliente={elem} />
        ))}
      </div>
    </div>
  );
};

export default ListaClientes;
