import { useBreakpoint } from '@ui/hooks/useBreakpoint';
import { ListProducts } from './mobile';
import { TableProducts } from './desktop';
import { useProducts } from '@ui/pages/products/hooks/useProducts';
import { Grid } from '@ui/components/Grid';
import { Loader } from '@ui/components/Loader';
import { MainLayout } from '@ui/layout/main';

const ViewProducts = ({ products }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (isMobile || isTablet) return <ListProducts products={products} />;
  return <TableProducts products={products} />;
};

export const Products = () => {
  const { products, loading, error } = useProducts();
  console.log('Products Page Rendered', { products, loading, error });

  if (loading) {
    return (
      <Grid cols={1}>
        <Loader />
      </Grid>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Grid cols={1}>
          <h1>Ups!</h1>
        </Grid>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Grid cols={1}>
        <ViewProducts products={products} />
      </Grid>
    </MainLayout>
  );
};
