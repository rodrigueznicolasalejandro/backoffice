import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BusinessSizeForm from '../../components/BusinessSizeForm';
import { BusinessSizeApiRepository } from '../../../infraestructure/BusinessSizeApiRepository';
import { UpdateBusinessSizeUseCase } from '../../../application/useCases/UpdateBusinessSizeUseCase';
import { GetBusinessSizeByIdUseCase } from '../../../application/useCases/GetBusinessSizeByIdUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new BusinessSizeApiRepository();

export function BusinessSizeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [businessSize, setBusinessSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBusinessSize, setLoadingBusinessSize] = useState(true);
  const [error, setError] = useState('');
  const updateUseCase = new UpdateBusinessSizeUseCase(repository);
  const getBusinessSizeUseCase = new GetBusinessSizeByIdUseCase(repository);

  React.useEffect(() => {
    const loadBusinessSize = async () => {
      try {
        const data = await getBusinessSizeUseCase.execute(Number(id));
        setBusinessSize(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar tamaño de comercio');
      } finally {
        setLoadingBusinessSize(false);
      }
    };
    loadBusinessSize();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await updateUseCase.execute(Number(id), data);
      navigate('/bo/business-size');
    } catch (err: any) {
      setError(err.message || 'Error al actualizar tamaño de comercio');
    } finally {
      setLoading(false);
    }
  };

  if (loadingBusinessSize) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/business-size')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <BusinessSizeForm
        businessSize={businessSize}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/business-size')}
        isLoading={loading}
        isEditing={true}
      />
    </div>
  );
}
