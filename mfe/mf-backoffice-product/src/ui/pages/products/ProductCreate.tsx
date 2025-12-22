import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@ui/providers/productService';
import ProductForm from '../../components/ProductForm';
import { IoChevronBack } from 'react-icons/io5';

export default function ProductCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleCreateProduct = async (productData: any) => {
    try {
      setLoading(true);
      setError('');
      const response = await createProduct(productData);
      if (response.success) {
        navigate('/products');
      } else {
        setError(response.error || 'Error al crear el producto');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear el producto';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <div className="p-6">
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <ProductForm
        product={null}
        onSubmit={handleCreateProduct}
        onCancel={handleCancel}
        isLoading={loading}
        isEditing={false}
      />
    </div>
  );
}
