import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "Todas" },
          { value: "no-discount", label: "Sin descuento" },
          { value: "with-discount", label: "Con descuento" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Orden por nombre (A-Z)" },
          { value: "name-desc", label: "Orden por nombre (Z-A)" },
          { value: "regularPrice-asc", label: "Orden por precio (menores primero)" },
          { value: "regularPrice-desc", label: "Orden por precio (mayores primero)" },
          { value: "maxCapacity-asc", label: "Orden por capacidad (menores primero)" },
          { value: "maxCapacity-desc", label: "Orden por capacidad (mayores primero)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
