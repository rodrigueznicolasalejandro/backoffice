import { useState, useEffect } from 'react';
import { MccApiRepository } from '@infraestructure/MccApiRepository';
import { GetAllMccsUseCase } from '@application/GetAllMccsUseCase';
import { DeleteMccUseCase } from '@application/DeleteMccUseCase';
import { Mcc } from '@domain/Mcc';

const repository = new MccApiRepository();
const getAllMccsUseCase = new GetAllMccsUseCase(repository);
const deleteMccUseCase = new DeleteMccUseCase(repository);

export const useMccs = () => {
  const [mccs, setMccs] = useState<Mcc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMccs = async () => {
    try {
      setLoading(true);
      const data = await getAllMccsUseCase.execute();
      setMccs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar MCCs');
    } finally {
      setLoading(false);
    }
  };

  const deleteMcc = async (id: number) => {
    try {
      await deleteMccUseCase.execute(id);
      setMccs(mccs.filter(m => m.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al eliminar MCC');
      return false;
    }
  };

  useEffect(() => {
    fetchMccs();
  }, []);

  return {
    mccs,
    loading,
    error,
    refetch: fetchMccs,
    deleteMcc,
  };
};
