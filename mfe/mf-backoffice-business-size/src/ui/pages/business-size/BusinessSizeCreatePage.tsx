import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessSizeForm from '../../components/BusinessSizeForm';
import { BusinessSizeApiRepository } from '../../../infraestructure/BusinessSizeApiRepository';
import { CreateBusinessSizeUseCase } from '../../../application/useCases/CreateBusinessSizeUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new BusinessSizeApiRepository();

export function BusinessSizeCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const createUseCase = new CreateBusinessSizeUseCase(repository);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await createUseCase.execute(data);
      navigate('/bo/business-size');
    } catch (err: any) {
      setError(err.message || 'Error al crear tamaño de comercio');
    } finally {
      setLoading(false);
    }
  };

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
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/business-size')}
        isLoading={loading}
        isEditing={false}
      />
    </div>
  );
}
