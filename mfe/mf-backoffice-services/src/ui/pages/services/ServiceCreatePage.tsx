import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/ServiceForm';
import { ServiceApiRepository } from '../../../infraestructure/ServiceApiRepository';
import { CreateServiceUseCase } from '../../../application/useCases/CreateServiceUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new ServiceApiRepository();

export function ServiceCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreateServiceUseCase(repository);
      await createUseCase.execute(data);
      navigate('/bo/services');
    } catch (error) {
      console.error('Error al crear servicio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/services')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <ServiceForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/services')} isLoading={isLoading} />
    </div>
  );
}
