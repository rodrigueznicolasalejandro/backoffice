import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceForm from '../../components/PriceForm';
import { PriceApiRepository } from '../../../infraestructure/PriceApiRepository';
import { CreatePriceUseCase } from '../../../application/CreatePriceUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new PriceApiRepository();

export function PriceCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreatePriceUseCase(repository);
      await createUseCase.execute(data);
      navigate('/bo/prices');
    } catch (error) {
      console.error('Error al crear precio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/prices')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PriceForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/prices')} isLoading={isLoading} />
    </div>
  );
}
