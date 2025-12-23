import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MccForm from '../../components/MccForm';
import { MccApiRepository } from '../../../infraestructure/MccApiRepository';
import { CreateMccUseCase } from '../../../application/useCases/CreateMccUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new MccApiRepository();

export function MccCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const createUseCase = new CreateMccUseCase(repository);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await createUseCase.execute(data);
      navigate('/bo/mccs');
    } catch (err: any) {
      setError(err.message || 'Error al crear MCC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/mccs')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <MccForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/mccs')}
        isLoading={loading}
        isEditing={false}
      />
    </div>
  );
}
