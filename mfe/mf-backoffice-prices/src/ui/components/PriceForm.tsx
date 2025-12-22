import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Price } from '@domain/Price';

interface PriceFormProps {
  price?: Price | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

const PriceForm: React.FC<PriceFormProps> = ({
  price,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditing = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      idPricingProducto: '',
      rangoCuotaInferior: null as number | null,
      rangoCuotaSuperior: null as number | null,
      tipoPlazo: 'Días Hábiles',
      diasPlazo: 0,
      tipoPrecio: 'Precio Fijo',
      valorArancel: null as string | null,
      valorPrecioFijoARS: null as number | null,
      valorPrecioFijoUSD: null as number | null,
      dateFrom: null as string | null,
      dateTo: null as string | null,
      idSubadquirente: 1,
    },
  });

  const tipoPrecio = watch('tipoPrecio');

  useEffect(() => {
    if (price) {
      setValue('nombre', price.nombre);
      setValue('idPricingProducto', price.idPricingProducto);
      setValue('rangoCuotaInferior', price.rangoCuotaInferior);
      setValue('rangoCuotaSuperior', price.rangoCuotaSuperior);
      setValue('tipoPlazo', price.tipoPlazo);
      setValue('diasPlazo', price.diasPlazo);
      setValue('tipoPrecio', price.tipoPrecio);
      setValue('valorArancel', price.valorArancel);
      setValue('valorPrecioFijoARS', price.valorPrecioFijoARS);
      setValue('valorPrecioFijoUSD', price.valorPrecioFijoUSD);
      setValue('dateFrom', price.dateFrom);
      setValue('dateTo', price.dateTo);
      setValue('idSubadquirente', price.idSubadquirente);
    }
  }, [price, setValue]);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Precio' : 'Crear Precio'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register('nombre', { required: 'El nombre es requerido' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nombre && (
              <span className="text-red-600 text-sm">{errors.nombre.message}</span>
            )}
          </div>

          {/* ID Pricing Producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Pricing Producto <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register('idPricingProducto', { required: 'El ID es requerido' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.idPricingProducto && (
              <span className="text-red-600 text-sm">{errors.idPricingProducto.message}</span>
            )}
          </div>

          {/* Rango Cuota Inferior */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango Cuota Inferior
            </label>
            <input
              type="number"
              {...register('rangoCuotaInferior', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rango Cuota Superior */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango Cuota Superior
            </label>
            <input
              type="number"
              {...register('rangoCuotaSuperior', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tipo Plazo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo Plazo <span className="text-red-600">*</span>
            </label>
            <select
              {...register('tipoPlazo', { required: 'El tipo de plazo es requerido' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Días Hábiles">Días Hábiles</option>
              <option value="Días Corridos">Días Corridos</option>
            </select>
            {errors.tipoPlazo && (
              <span className="text-red-600 text-sm">{errors.tipoPlazo.message}</span>
            )}
          </div>

          {/* Días Plazo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Días Plazo <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              {...register('diasPlazo', { 
                required: 'Los días de plazo son requeridos',
                valueAsNumber: true 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.diasPlazo && (
              <span className="text-red-600 text-sm">{errors.diasPlazo.message}</span>
            )}
          </div>

          {/* Tipo Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo Precio <span className="text-red-600">*</span>
            </label>
            <select
              {...register('tipoPrecio', { required: 'El tipo de precio es requerido' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Precio Fijo">Precio Fijo</option>
              <option value="Arancel">Arancel</option>
              <option value="Mixto">Mixto</option>
            </select>
            {errors.tipoPrecio && (
              <span className="text-red-600 text-sm">{errors.tipoPrecio.message}</span>
            )}
          </div>

          {/* ID Subadquirente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID Subadquirente <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              {...register('idSubadquirente', { 
                required: 'El ID subadquirente es requerido',
                valueAsNumber: true 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.idSubadquirente && (
              <span className="text-red-600 text-sm">{errors.idSubadquirente.message}</span>
            )}
          </div>

          {/* Valor Arancel - Solo si tipoPrecio es Arancel o Mixto */}
          {(tipoPrecio === 'Arancel' || tipoPrecio === 'Mixto') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Arancel {tipoPrecio === 'Arancel' && <span className="text-red-600">*</span>}
              </label>
              <input
                type="text"
                {...register('valorArancel', {
                  required: tipoPrecio === 'Arancel' ? 'El valor arancel es requerido' : false,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.valorArancel && (
                <span className="text-red-600 text-sm">{errors.valorArancel.message}</span>
              )}
            </div>
          )}

          {/* Valor Precio Fijo ARS - Solo si tipoPrecio es Precio Fijo o Mixto */}
          {(tipoPrecio === 'Precio Fijo' || tipoPrecio === 'Mixto') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Precio Fijo ARS {tipoPrecio === 'Precio Fijo' && <span className="text-red-600">*</span>}
              </label>
              <input
                type="number"
                step="0.01"
                {...register('valorPrecioFijoARS', {
                  required: tipoPrecio === 'Precio Fijo' ? 'El valor ARS es requerido' : false,
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.valorPrecioFijoARS && (
                <span className="text-red-600 text-sm">{errors.valorPrecioFijoARS.message}</span>
              )}
            </div>
          )}

          {/* Valor Precio Fijo USD - Solo si tipoPrecio es Precio Fijo o Mixto */}
          {(tipoPrecio === 'Precio Fijo' || tipoPrecio === 'Mixto') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Precio Fijo USD {tipoPrecio === 'Precio Fijo' && <span className="text-red-600">*</span>}
              </label>
              <input
                type="number"
                step="0.01"
                {...register('valorPrecioFijoUSD', {
                  required: tipoPrecio === 'Precio Fijo' ? 'El valor USD es requerido' : false,
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.valorPrecioFijoUSD && (
                <span className="text-red-600 text-sm">{errors.valorPrecioFijoUSD.message}</span>
              )}
            </div>
          )}

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Desde
            </label>
            <input
              type="date"
              {...register('dateFrom')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Hasta
            </label>
            <input
              type="date"
              {...register('dateTo')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white border-none rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriceForm;
