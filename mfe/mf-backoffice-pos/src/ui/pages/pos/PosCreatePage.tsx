import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PosForm from '../../components/PosForm';
import { PosApiRepository } from '../../../infraestructure/PosApiRepository';
import { CreatePosUseCase } from '../../../application/CreatePosUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new PosApiRepository();

export function PosCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreatePosUseCase(repository);
      await createUseCase.execute(data);
      navigate('/bo/pos');
    } catch (error) {
      console.error('Error al crear POS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/pos')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PosForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/pos')} isLoading={isLoading} />
    </div>
  );
}
