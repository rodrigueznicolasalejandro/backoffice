import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ServiceForm from '../../components/ServiceForm';
import { ServiceApiRepository } from '../../../infrastructure/http/repositories/ServiceApiRepository';
import { UpdateServiceUseCase } from '../../../application/useCases/UpdateServiceUseCase';
import { GetServiceByIdUseCase } from '../../../application/useCases/GetServiceByIdUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new ServiceApiRepository();

export function ServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      try {
        const getUseCase = new GetServiceByIdUseCase(repository);
        const data = await getUseCase.execute(id);
        setService(data);
      } catch (error) {
        console.error('Error al cargar servicio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const updateUseCase = new UpdateServiceUseCase(repository);
      await updateUseCase.execute(id, data);
      navigate('/bo/services');
    } catch (error) {
      console.error('Error al actualizar servicio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando...</div></div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/services')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <ServiceForm
        service={service}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/services')}
        isLoading={isLoading}
        isEditing
      />
    </div>
  );
}
