import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@ui/providers/productService';
import ProductForm from '../../components/ProductForm';
import { IoChevronBack } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

export default function ProductCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCreateProduct = async (productData: any) => {
    try {
      setLoading(true);
      setError('');
      console.log('Sending product data:', productData);
      const response = await createProduct(productData);
      console.log('Response:', response);
      if (response.success) {
        navigate('/products', {
          state: { successMessage: 'Producto creado exitosamente' },
        });
      } else {
        setError(response.error || 'Error al crear el producto');
      }
    } catch (err: any) {
      console.error('Error creando producto:', err);
      const errorMessage = err.message || 'Error al crear el producto';
      // Intentar extraer detalles del error si es una respuesta del backend
      if (errorMessage.includes('Datos de producto inválidos')) {
        setError(`Validación fallida: ${errorMessage}`);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Volver a productos
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <MdError className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <ProductForm
          product={null}
          onSubmit={handleCreateProduct}
          onCancel={handleCancel}
          isLoading={loading}
          isEditing={false}
        />
      </div>
    </div>
  );
}
