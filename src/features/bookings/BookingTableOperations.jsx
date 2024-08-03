import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='status'
        options={[
          { value: 'all', label: 'Todos' },
          { value: 'salida-registrada', label: 'Registros de salida' },
          { value: 'entrada-registrada', label: 'Registros de entrada' },
          { value: 'sin-confirmar', label: 'Sin confirmar' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'startDate-desc',
            label: 'Orden por fecha (recientes primero)',
          },
          {
            value: 'startDate-asc',
            label: 'Orden por fecha (antiguos primero)',
          },
          {
            value: 'totalPrice-desc',
            label: 'Orden por monto (mayores primero)',
          },
          {
            value: 'totalPrice-asc',
            label: 'Orden por monto (menores primero)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
