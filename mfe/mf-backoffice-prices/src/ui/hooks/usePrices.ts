import { useState, useEffect } from 'react';
import { Price } from '@domain/Price';
import { PriceApiRepository } from '@infraestructure/PriceApiRepository';
import { GetAllPricesUseCase } from '@application/useCases/GetAllPricesUseCase';
import { DeletePriceUseCase } from '@application/useCases/DeletePriceUseCase';

const repository = new PriceApiRepository();

export const usePrices = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new GetAllPricesUseCase(repository);
      const data = await useCase.execute();
      setPrices(data);
    } catch (err) {
      setError('Error al cargar los precios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const deletePrice = async (id: number): Promise<boolean> => {
    try {
      const useCase = new DeletePriceUseCase(repository);
      const success = await useCase.execute(id);
      if (success) {
        setPrices(prices.filter((p) => p.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Error al eliminar precio:', err);
      return false;
    }
  };

  return {
    prices,
    loading,
    error,
    deletePrice,
    refetch: fetchPrices,
  };
};
