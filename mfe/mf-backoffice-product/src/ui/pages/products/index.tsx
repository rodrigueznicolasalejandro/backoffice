import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '@ui/components/Modal';
import { Pagination } from '@ui/components/Pagination';
import { useProducts } from '@ui/pages/products/hooks/useProducts';
import { paths } from '@ui/routes/paths';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';

const TableProducts = ({ products, pagination, onPageChange }) => {
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
        <button
          onClick={handleCreateClick}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Crear Producto
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre descriptivo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método de pago</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de pago</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moneda</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financiación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alcance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método captura</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.brand?.name ?? ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.paymentMethod?.name ?? ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.paymentType?.name ?? ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.currency?.code ?? ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.financingType?.name ?? '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.cardScope?.name ?? ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.captureMethod?.name ?? ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(product.id)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                      title="Editar producto"
                    >
                      <MdEdit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id, product.name)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded text-xs cursor-pointer transition-all hover:bg-red-100 flex items-center gap-1"
                      title="Eliminar producto"
                    >
                      <MdDelete className="w-4 h-4" />
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          limit={pagination.limit}
          onPageChange={onPageChange}
        />
      )}
      
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
    </div>
  );
};

export const Products = () => {
  const { products, loading, error, pagination, handlePageChange } = useProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <div className="text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <TableProducts 
      products={products} 
      pagination={pagination}
      onPageChange={handlePageChange}
    />
  );
};
