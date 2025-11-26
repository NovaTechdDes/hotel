import { calcularDias } from '../../helpers/formatearFecha';
import type { Reserva } from '../../interface';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

interface Props {
  reserva: Reserva;
}

const PDF = ({ reserva }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.title}>Comprobante de Reserva</Text>
          <Text style={styles.subtitle}>Hotel - Sistema de Gestion</Text>
        </View>

        {/* Body */}

        {/* Datos del Huesped */}
        <View>
          <Text style={styles.containerTitle}>Detalles del Huesped</Text>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.text}>{reserva.cliente_nombre}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Habitacion</Text>
              <Text style={styles.text}>
                {reserva.habitacion?.nombre} - {reserva.habitacion?.tipo}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.label}>{reserva.cliente_dni.length > 8 ? 'CUIT' : 'DNI'}</Text>
              <Text style={styles.text}>{reserva.cliente_dni}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Telefono</Text>
              <Text style={styles.text}>{reserva.cliente_telefono}</Text>
            </View>
          </View>
        </View>

        {/* Datos de la Reserva */}
        <View>
          <Text style={styles.containerTitle}>Detalles de la Reserva N° {reserva.nro_reserva}</Text>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.label}>Fecha de Check-in</Text>
              <Text style={styles.text}>{reserva.checkin.slice(0, 10).split('-').reverse().join('/')}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Fecha de Check-out</Text>
              <Text style={styles.text}>{reserva.checkout.slice(0, 10).split('-').reverse().join('/')}</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.label}>Duracion</Text>
              <Text style={styles.text}>{calcularDias(reserva.checkin, reserva.checkout)} Noches</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Importe Total</Text>
              <Text style={styles.text}>{(reserva.importe * calcularDias(reserva.checkin, reserva.checkout)).toFixed(2)}</Text>
            </View>
          </View>

          {reserva.observaciones && (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.label}>Observaciones</Text>
              <Text style={styles.text}>{reserva.observaciones}</Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Este comprobante fue generado automaticamente por el sistema de gestion hotelera</Text>
          <Text style={styles.footerText}>Impreso el: {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDF;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#112233',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },

  subtitle: {
    marginBottom: 10,
    fontSize: 12,
    color: '#112233',
    textAlign: 'center',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  containerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#112233',
  },
  item: {
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'semibold',
    marginRight: 10,
    fontSize: 14,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 12,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#112233',
  },
  footerText: {
    marginTop: 10,
    fontSize: 12,
    color: '#112233',
    textAlign: 'center',
  },
});
