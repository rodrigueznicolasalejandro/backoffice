import { useState, useEffect } from 'react';
import { Service } from '@domain/Service';
import { ServiceApiRepository } from '@infraestructure/ServiceApiRepository';
import { GetAllServicesUseCase } from '@application/useCases/GetAllServicesUseCase';
import { DeleteServiceUseCase } from '@application/useCases/DeleteServiceUseCase';

const repository = new ServiceApiRepository();

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const getAllUseCase = new GetAllServicesUseCase(repository);
      const data = await getAllUseCase.execute();
      setServices(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      const deleteUseCase = new DeleteServiceUseCase(repository);
      await deleteUseCase.execute(id);
      await fetchServices();
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el servicio');
      return false;
    }
  };

  const refetch = fetchServices;

  return { services, loading, error, deleteService, refetch };
}
