import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BusinessSize } from '@domain/BusinessSize';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface BusinessSizeFormProps {
  businessSize?: BusinessSize | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

const BusinessSizeForm: React.FC<BusinessSizeFormProps> = ({
  businessSize,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditing = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: businessSize?.name || '',
      isActive: businessSize?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (businessSize) {
      reset({
        name: businessSize.name,
        isActive: businessSize.isActive ?? true,
      });
    }
  }, [businessSize, reset]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar' : 'Crear'} Tamaño de Comercio
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', {
              required: 'El nombre es requerido',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'El nombre no puede exceder los 50 caracteres',
              },
            })}
            id="name"
            type="text"
            placeholder="Ej: INDIVIDUAL, MICRO, SMALL"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            {...register('isActive')}
            id="isActive"
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Activo
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 px-6 py-2 bg-blue-600 text-white rounded-md font-medium transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
                Guardando...
              </span>
            ) : isEditing ? (
              'Actualizar'
            ) : (
              'Crear'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessSizeForm;
