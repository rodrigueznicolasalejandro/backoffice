import { useState, useEffect } from 'react';
import { BusinessSize } from '@domain/BusinessSize';
import { BusinessSizeApiRepository } from '@infraestructure/BusinessSizeApiRepository';
import { GetAllBusinessSizesUseCase } from '@application/useCases/GetAllBusinessSizesUseCase';
import { DeleteBusinessSizeUseCase } from '@application/useCases/DeleteBusinessSizeUseCase';

const repository = new BusinessSizeApiRepository();

export const useBusinessSizes = () => {
  const [businessSizes, setBusinessSizes] = useState<BusinessSize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessSizes = async () => {
    try {
      setLoading(true);
      const getAllUseCase = new GetAllBusinessSizesUseCase(repository);
      const data = await getAllUseCase.execute();
      setBusinessSizes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar tamaños de comercio');
    } finally {
      setLoading(false);
    }
  };

  const deleteBusinessSize = async (id: number): Promise<boolean> => {
    try {
      const deleteUseCase = new DeleteBusinessSizeUseCase(repository);
      await deleteUseCase.execute(id);
      await fetchBusinessSizes();
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al eliminar tamaño de comercio');
      return false;
    }
  };

  useEffect(() => {
    fetchBusinessSizes();
  }, []);

  return {
    businessSizes,
    loading,
    error,
    deleteBusinessSize,
    refetch: fetchBusinessSizes
  };
};
