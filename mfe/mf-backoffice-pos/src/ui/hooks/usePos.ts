import { useState, useEffect } from 'react';
import { Pos } from '@domain/entities/Pos';
import { PosApiRepository } from '@infrastructure/http/repositories/PosApiRepository';
import { GetAllPosUseCase } from '@application/useCases/GetAllPosUseCase';
import { DeletePosUseCase } from '@application/useCases/DeletePosUseCase';

const repository = new PosApiRepository();

export const usePos = () => {
  const [posList, setPosList] = useState<Pos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPos = async () => {
    setLoading(true);
    setError(null);
    try {
      const useCase = new GetAllPosUseCase(repository);
      const data = await useCase.execute();
      setPosList(data);
    } catch (err) {
      setError('Error al cargar los POS');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPos();
  }, []);

  const deletePos = async (id: string): Promise<boolean> => {
    try {
      const useCase = new DeletePosUseCase(repository);
      const success = await useCase.execute(id);
      if (success) {
        setPosList(posList.filter((p) => p.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Error al eliminar POS:', err);
      return false;
    }
  };

  return {
    posList,
    loading,
    error,
    deletePos,
    refetch: fetchPos,
  };
};
