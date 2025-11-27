import { Card, Text, H } from '@link/styleguide';
import {
  Table,
  TableCol,
  TableHeader,
  TableRow,
  TableContainer,
  TableBody,
} from '@ui/components/Table';

const columns = [
  'Nombre descriptivo',
  'Marca',
  'Método de pago',
  'Tipo de pago',
  'Moneda',
  'Financiación',
  'Alcance tarjeta',
  'Método captura',
];

const TitleDesktop = () => {
  return (
    <H
      type="xl"
      variant="neutral"
      weight="bold"
      modifier="regular"
      align="left"
    >
      Productos
    </H>
  );
};
export const TableProducts = ({ products }) => {
  return (
    <Card>
      <TableContainer>
        <TitleDesktop />
        <Table
          cantColumns={columns.length}
          header={<TableHeader header={columns} />}
          body={
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCol>
                    <Text type="sm">{product.name}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.brand?.name}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.paymentMethod?.name}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.paymentType?.name}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.currency?.code}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">
                      {product.financingType?.name ?? 'COMERCIO'}
                    </Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.cardScope?.name}</Text>
                  </TableCol>
                  <TableCol align="center">
                    <Text type="sm">{product.captureMethod?.name}</Text>
                  </TableCol>
                </TableRow>
              ))}
            </TableBody>
          }
          bodyHeight="400px"
          colWidths={['260px', '80px', '150px', '120px', '90px', '150px']}
        />
      </TableContainer>
    </Card>
  );
};
