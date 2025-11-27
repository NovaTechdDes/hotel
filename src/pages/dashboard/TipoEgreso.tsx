import { HeaderMain, ListaTipoEgresos, ModalTipoEgreso } from '../../components';
import { useTipoEgresoStore } from '../../store';

const TipoEgreso = () => {
  const { openModal, isModalOpen } = useTipoEgresoStore();

  return (
    <main>
      <HeaderMain botonText="Agregar Tipo" title="Tipo Egreso" openModal={openModal} />

      <ListaTipoEgresos />

      {isModalOpen && <ModalTipoEgreso />}
    </main>
  );
};

export default TipoEgreso;
