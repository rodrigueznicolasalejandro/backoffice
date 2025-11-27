import { Card, H, Text, Divider } from '@link/styleguide';

const TitleMobile = () => {
  return (
    <H
      type="xl"
      variant="primary"
      weight="bold"
      modifier="regular"
      align="center"
    >
      Productos
    </H>
  );
};

const TextProduct = ({ label, value }) => {
  return (
    <p style={{ margin: '5px 0' }}>
      <strong>{label}: </strong>
      <Text variant="neutral" weight="regular">
        {value}
      </Text>
    </p>
  );
};

const HeaderCard = ({ title }) => {
  return (
    <Card margin={{ bottom: '100' }}>
      <H type="md" variant="primary" weight="bold" modifier="regular">
        {title}
      </H>
    </Card>
  );
};

const BodyCard = ({ children }) => {
  return <Card margin={{ top: '100' }}>{children}</Card>;
};

export const ListProducts = ({ products }) => {
  return (
    <>
      <TitleMobile />
      {products.map((product) => (
        <Card
          key={product.id}
          variant="natural"
          modifier="container"
          border_radius_amount="6"
          display="flex"
          padding="16px"
          margin={{
            left: '200',
            right: '200',
          }}
          flex_direction="column"
          justify_content="space-between"
        >
          <HeaderCard title={product.name} />
          <Divider />
          <BodyCard>
            <TextProduct label="Marca Tarjeta" value={product.brand.name} />
            <TextProduct
              label="Método de pago"
              value={product.paymentMethod?.name}
            />
            <TextProduct
              label="Tipo de pago"
              value={product.paymentType?.name}
            />
            <TextProduct label="Moneda" value={product.currency?.code} />
            <TextProduct
              label="Financiación"
              value={product.financingType?.name}
            />
            <TextProduct
              label="Alcance tarjeta"
              value={product.cardScope?.name}
            />
            <TextProduct
              label="Método captura"
              value={product.captureMethod?.name}
            />
          </BodyCard>
        </Card>
      ))}
    </>
  );
};
