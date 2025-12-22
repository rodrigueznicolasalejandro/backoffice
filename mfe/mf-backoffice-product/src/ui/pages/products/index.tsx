import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Text, H } from '@link/styleguide';
import {
  Table,
  TableCol,
  TableHeader,
  TableRow,
  TableContainer,
  TableBody,
} from '@ui/components/Table';
import { ConfirmModal } from '@ui/components/Modal';
import { useProducts } from '@ui/pages/products/hooks/useProducts';
import { Grid } from '@ui/components/Grid';
import { Loader } from '@ui/components/Loader';
import { MainLayout } from '@ui/layout/main';
import { paths } from '@ui/routes/paths';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const columns = [
  'Nombre descriptivo',
  'Marca',
  'Método de pago',
  'Tipo de pago',
  'Moneda',
  'Financiación',
  'Alcance tarjeta',
  'Método captura',
  'Acciones',
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

const TableProducts = ({ products }) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (productId: string, productName: string) => {
    setDeleteModal({ isOpen: true, productId, productName });
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // TODO: Implementar la llamada al servicio de eliminación
      console.log('Eliminando producto:', deleteModal.productId);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular API call
      
      // Aquí deberías llamar al servicio de eliminación y actualizar la lista
      alert(`Producto "${deleteModal.productName}" eliminado exitosamente`);
      
      setDeleteModal({ isOpen: false, productId: null, productName: '' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (productId: string) => {
    navigate(paths.PRODUCTS_EDIT.replace(':id', productId));
  };

  const handleCreateClick = () => {
    navigate(paths.PRODUCTS_CREATE);
  };

  console.log('products', products);
  return (
    <Card>
      <TableContainer>
        <div className="flex justify-between items-center mb-4">
          <TitleDesktop />
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
          >
            <MdAdd className="w-5 h-5" />
            Crear Producto
          </button>
        </div>
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
                    <Text type="sm">{product.brand?.name ?? ''}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.paymentMethod?.name ?? ''}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.paymentType?.name ?? ''}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.currency?.code ?? ''}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.financingType?.name ?? ''}</Text>
                  </TableCol>
                  <TableCol>
                    <Text type="sm">{product.cardScope?.name ?? ''}</Text>
                  </TableCol>
                  <TableCol align="center">
                    <Text type="sm">{product.captureMethod?.name ?? ''}</Text>
                  </TableCol>
                  <TableCol align="center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEditClick(product.id)}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 hover:border-gray-400 flex items-center gap-1"
                        title="Editar producto"
                      >
                        <MdEdit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id, product.name)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded text-xs cursor-pointer transition-all hover:bg-red-100 hover:border-red-300 flex items-center gap-1"
                        title="Eliminar producto"
                      >
                        <MdDelete className="w-4 h-4" />
                        Borrar
                      </button>
                    </div>
                  </TableCol>
                </TableRow>
              ))}
            </TableBody>
          }
          bodyHeight="400px"
          colWidths={['260px', '80px', '150px', '120px', '90px', '150px', '120px', '120px', '200px']}
        />
      </TableContainer>
      
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })}
        onConfirm={handleDeleteConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el producto "${deleteModal.productName}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
      />
    </Card>
  );
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
        <TableProducts products={products} />
      </Grid>
    </MainLayout>
  );
};
