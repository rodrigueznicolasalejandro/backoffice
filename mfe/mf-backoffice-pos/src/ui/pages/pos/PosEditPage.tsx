import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PosForm from '../../components/PosForm';
import { PosApiRepository } from '../../../infraestructure/PosApiRepository';
import { UpdatePosUseCase } from '../../../application/UpdatePosUseCase';
import { GetPosByIdUseCase } from '../../../application/GetPosByIdUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new PosApiRepository();

export function PosEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pos, setPos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchPos = async () => {
      if (!id) return;
      try {
        const getUseCase = new GetPosByIdUseCase(repository);
        const data = await getUseCase.execute(id);
        setPos(data);
      } catch (error) {
        console.error('Error al cargar POS:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPos();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const updateUseCase = new UpdatePosUseCase(repository);
      await updateUseCase.execute(id, data);
      navigate('/bo/pos');
    } catch (error) {
      console.error('Error al actualizar POS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando...</div></div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/pos')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PosForm
        pos={pos}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/pos')}
        isLoading={isLoading}
        isEditing
      />
    </div>
  );
}
