import { Grid, GridItem } from '@ui/components/Grid';
import { BusinessSize } from './sections/businessSize';
import { TableMcc } from './sections/mcc';
import { MainLayout } from '@ui/layout/main';

const PaquetesPage = () => {
  return (
    <MainLayout>
      <Grid>
        <GridItem span={3}>
          <BusinessSize />
        </GridItem>
        <GridItem span={12}>
          <TableMcc />
        </GridItem>
      </Grid>
    </MainLayout>
  );
};
export default PaquetesPage;
