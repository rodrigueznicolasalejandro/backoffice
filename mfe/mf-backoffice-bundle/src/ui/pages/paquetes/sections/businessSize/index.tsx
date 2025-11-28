import { Dropdown } from '@link/styleguide';
import { Grid } from '@ui/components/Grid';
import { Loader } from '@ui/components/Loader';
import { useGetBusinessSize } from '@ui/pages/paquetes/hooks/useGetbusinessSize';
import { dataDropdownMapper } from './data.mapper';
import { useState } from 'react';
import { MainLayout } from '@ui/layout/main';

export const BusinessSize = () => {
  const { businessSizes, loading, error } = useGetBusinessSize();
  const [selectedSize, setSelectedSize] = useState<number>(1);

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
    <Dropdown
      id="dropdown1"
      items={dataDropdownMapper(businessSizes)}
      label="Selecciona un tamaño de negocio"
      onBlur={() => {}}
      onChange={(value) => setSelectedSize(value)}
      placeholder="Elegí un tamaño de negocio"
      size="md"
      value={selectedSize}
      variant="primary"
    >
      o
    </Dropdown>
  );
};
