import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PriceForm from '../../components/PriceForm';
import { PriceApiRepository } from '../../../infraestructure/PriceApiRepository';
import { UpdatePriceUseCase } from '../../../application/UpdatePriceUseCase';
import { GetPriceByIdUseCase } from '../../../application/GetPriceByIdUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new PriceApiRepository();

export function PriceEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [price, setPrice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchPrice = async () => {
      if (!id) return;
      try {
        const getUseCase = new GetPriceByIdUseCase(repository);
        const data = await getUseCase.execute(parseInt(id));
        setPrice(data);
      } catch (error) {
        console.error('Error al cargar precio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const updateUseCase = new UpdatePriceUseCase(repository);
      await updateUseCase.execute(parseInt(id), data);
      navigate('/bo/prices');
    } catch (error) {
      console.error('Error al actualizar precio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando...</div></div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/prices')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PriceForm
        price={price}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/prices')}
        isLoading={isLoading}
        isEditing
      />
    </div>
  );
}
