import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MccForm from '../../components/MccForm';
import { MccApiRepository } from '../../../infraestructure/MccApiRepository';
import { UpdateMccUseCase } from '../../../application/UpdateMccUseCase';
import { GetMccByIdUseCase } from '../../../application/GetMccByIdUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new MccApiRepository();

export function MccEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mcc, setMcc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMcc, setLoadingMcc] = useState(true);
  const [error, setError] = useState('');
  const updateUseCase = new UpdateMccUseCase(repository);
  const getMccUseCase = new GetMccByIdUseCase(repository);

  React.useEffect(() => {
    const loadMcc = async () => {
      try {
        const data = await getMccUseCase.execute(Number(id));
        setMcc(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar MCC');
      } finally {
        setLoadingMcc(false);
      }
    };
    loadMcc();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await updateUseCase.execute(Number(id), data);
      navigate('/bo/mccs');
    } catch (err: any) {
      setError(err.message || 'Error al actualizar MCC');
    } finally {
      setLoading(false);
    }
  };

  if (loadingMcc) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

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
        mcc={mcc}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/mccs')}
        isLoading={loading}
        isEditing={true}
      />
    </div>
  );
}
