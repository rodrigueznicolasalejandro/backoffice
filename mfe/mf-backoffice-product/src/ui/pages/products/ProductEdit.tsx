import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '@ui/providers/productService';
import ProductForm from '../../components/ProductForm';
import { IoChevronBack } from 'react-icons/io5';
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
        navigate('/products');
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center gap-3">
          <AiOutlineLoading3Quarters className="animate-spin h-6 w-6 text-blue-600" />
          <span className="text-gray-600">Cargando producto...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <div className="text-lg">No se encontró el producto</div>
      </div>
    );
  }

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
        product={product}
        onSubmit={handleUpdateProduct}
        onCancel={handleCancel}
        isLoading={loading}
        isEditing={true}
      />
    </div>
  );
}
