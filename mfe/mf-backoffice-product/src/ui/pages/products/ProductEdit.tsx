import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '@ui/providers/productService';
import ProductForm from '../../components/ProductForm';
import { IoChevronBack } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        setLoadingProduct(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar el producto');
        console.error('Error cargando producto:', err);
      } finally {
        setLoadingProduct(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleUpdateProduct = async (productData: any) => {
    if (!id) return;
    try {
      setLoading(true);
      setError('');
      const response = await updateProduct(id, productData);
      if (response.success) {
        navigate('/products', {
          state: { successMessage: 'Producto actualizado exitosamente' },
        });
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el producto');
      console.error('Error actualizando producto:', err);
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

        {loadingProduct ? (
          <div className="bg-white shadow-md rounded-lg p-8 flex justify-center items-center">
            <div className="flex items-center gap-3">
              <AiOutlineLoading3Quarters className="animate-spin h-6 w-6 text-blue-600" />
              <span className="text-gray-600">Cargando producto...</span>
            </div>
          </div>
        ) : product ? (
          <ProductForm
            product={product}
            onSubmit={handleUpdateProduct}
            onCancel={handleCancel}
            isLoading={loading}
            isEditing={true}
          />
        ) : (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-gray-500">No se encontró el producto</p>
          </div>
        )}
      </div>
    </div>
  );
}
