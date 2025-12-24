import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Price } from '@domain/entities/Price';
import { MdAdd, MdDelete } from 'react-icons/md';

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
  // Estado para múltiples rangos de cuotas (solo en creación)
  const [rangosCuotas, setRangosCuotas] = useState<Array<{
    rangoCuotaInferior: number | null;
    rangoCuotaSuperior: number | null;
    valorArancel: string | null;
  }>>([{ rangoCuotaInferior: null, rangoCuotaSuperior: null, valorArancel: null }]);

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

  // Agregar un nuevo rango
  const agregarRango = () => {
    setRangosCuotas([...rangosCuotas, { rangoCuotaInferior: null, rangoCuotaSuperior: null, valorArancel: null }]);
  };

  // Eliminar un rango
  const eliminarRango = (index: number) => {
    if (rangosCuotas.length > 1) {
      setRangosCuotas(rangosCuotas.filter((_, i) => i !== index));
    }
  };

  // Actualizar valor de un rango
  const actualizarRango = (index: number, campo: string, valor: any) => {
    const nuevosRangos = [...rangosCuotas];
    nuevosRangos[index] = { ...nuevosRangos[index], [campo]: valor };
    setRangosCuotas(nuevosRangos);
  };

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
      // En edición, inicializar con un solo rango
      if (isEditing) {
        setRangosCuotas([{
          rangoCuotaInferior: price.rangoCuotaInferior,
          rangoCuotaSuperior: price.rangoCuotaSuperior,
          valorArancel: price.valorArancel
        }]);
      }
    }
  }, [price, setValue, isEditing]);

  // Función personalizada para manejar el submit
  const handleFormSubmit = async (data: any) => {
    if (!isEditing && (tipoPrecio === 'Arancel' || tipoPrecio === 'Mixto')) {
      // En creación con Arancel o Mixto, excluir campos que solo vienen de los rangos
      const { rangoCuotaInferior, rangoCuotaSuperior, valorArancel, idPricingProducto, ...baseData } = data;
      // Enviar los rangos de cuotas al callback con los datos base
      await onSubmit({ ...baseData, rangosCuotas });
    } else if (isEditing) {
      // En edición, excluir idSubadquirente (lo maneja el backend) e idPricingProducto (no se puede cambiar)
      const { idSubadquirente, idPricingProducto, ...editData } = data;
      await onSubmit(editData);
    } else {
      // Precio Fijo en creación
      await onSubmit(data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Precio' : 'Crear Precio'}
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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

          {/* ID Pricing Producto - Solo en edición y deshabilitado */}
          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Pricing Producto
              </label>
              <input
                type="text"
                {...register('idPricingProducto')}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}
        </div>

        {/* Rangos de Cuotas - Múltiples en creación, único en edición - Solo para Arancel o Mixto */}
        {!isEditing && (tipoPrecio === 'Arancel' || tipoPrecio === 'Mixto') && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Rangos de Cuotas</h3>
              <button
                type="button"
                onClick={agregarRango}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                <MdAdd size={20} />
                Agregar Rango
              </button>
            </div>

            {rangosCuotas.map((rango, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-700">Rango {index + 1}</h4>
                  {rangosCuotas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => eliminarRango(index)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cuota Inferior
                    </label>
                    <input
                      type="number"
                      value={rango.rangoCuotaInferior ?? ''}
                      onChange={(e) => actualizarRango(index, 'rangoCuotaInferior', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cuota Superior
                    </label>
                    <input
                      type="number"
                      value={rango.rangoCuotaSuperior ?? ''}
                      onChange={(e) => actualizarRango(index, 'rangoCuotaSuperior', e.target.value ? parseInt(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor Arancel
                    </label>
                    <input
                      type="text"
                      value={rango.valorArancel ?? ''}
                      onChange={(e) => actualizarRango(index, 'valorArancel', e.target.value || null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Campos de rango tradicionales en modo edición - Solo para Arancel o Mixto */}
        {isEditing && (tipoPrecio === 'Arancel' || tipoPrecio === 'Mixto') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Date To - Oculto en ambos modos */}
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
