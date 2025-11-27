import { Card, H } from '@link/styleguide';
import { Grid } from '@ui/components/Grid';
import { Loader } from '@ui/components/Loader';
import {
  Table,
  TableCol,
  TableHeader,
  TableRow,
  TableContainer,
  TableBody,
} from '@ui/components/Table';
import { useGetMcc } from '@ui/pages/paquetes/hooks/useGetMcc';

const columns = ['Codigo', 'Descripción', 'Permite Propina'];

export const TableMcc = () => {
  const { mccs, loading } = useGetMcc();
  if (loading) {
    return (
      <Grid cols={1}>
        <Loader />
      </Grid>
    );
  }

  return (
    <Card width="100%">
      <TableContainer>
        <H
          type="lg"
          variant="neutral"
          weight="bold"
          modifier="regular"
          align="left"
        >
          Códigos MCC
        </H>
        <Table
          cantColumns={columns.length}
          header={<TableHeader header={columns} />}
          body={
            <TableBody>
              {mccs.map((mcc, index) => (
                <TableRow key={index}>
                  <TableCol>{mcc.code}</TableCol>
                  <TableCol>{mcc.description}</TableCol>
                  <TableCol align="end">
                    {mcc.allowsTips ? 'Sí' : 'No'}
                  </TableCol>
                </TableRow>
              ))}
            </TableBody>
          }
          bodyHeight="300px"
          colWidths={['100px', '1fr', '150px']}
        />
      </TableContainer>
    </Card>
  );
};
