import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceForm from '../../components/PriceForm';
import { PriceApiRepository } from '../../../infraestructure/PriceApiRepository';
import { CreatePriceUseCase } from '../../../application/useCases/CreatePriceUseCase';
import { IoChevronBack } from 'react-icons/io5';

const repository = new PriceApiRepository();

export function PriceCreatePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreatePriceUseCase(repository);
      const { rangosCuotas, rangoCuotaInferior, rangoCuotaSuperior, valorArancel, idPricingProducto, ...baseData } = data;

      // Si hay múltiples rangos, crear un registro por cada rango con el mismo idPricingProducto
      if (rangosCuotas && rangosCuotas.length > 0) {
        // Generar un único idPricingProducto para todos los rangos
        // El BFF lo generará en el primer POST y lo reutilizaremos en los siguientes
        let sharedPricingId: string | null = null;

        for (const rango of rangosCuotas) {
          const priceData = {
            ...baseData,
            rangoCuotaInferior: rango.rangoCuotaInferior,
            rangoCuotaSuperior: rango.rangoCuotaSuperior,
            valorArancel: rango.valorArancel,
            // Si ya tenemos el ID compartido, lo enviamos; sino el BFF lo genera
            ...(sharedPricingId && { idPricingProducto: sharedPricingId })
          };
          const result = await createUseCase.execute(priceData);
          
          // Guardar el idPricingProducto generado en el primer POST para reutilizarlo
          if (!sharedPricingId && result.idPricingProducto) {
            sharedPricingId = result.idPricingProducto;
          }
        }
      } else {
        // Si no hay rangos (modo edición), crear normalmente
        await createUseCase.execute(data);
      }

      navigate('/bo/prices');
    } catch (error) {
      console.error('Error al crear precio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/prices')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PriceForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/prices')} isLoading={isLoading} />
    </div>
  );
}
