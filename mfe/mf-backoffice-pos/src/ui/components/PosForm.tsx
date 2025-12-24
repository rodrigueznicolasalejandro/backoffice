import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Pos } from '@domain/entities/Pos';

interface PosFormProps {
  pos?: Pos | null;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  isEditing?: boolean;
}

const PosForm: React.FC<PosFormProps> = ({
  pos,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditing = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
      marca: '',
      modelo: '',
      nombre: '',
    },
  });

  useEffect(() => {
    if (pos) {
      setValue('id', pos.id);
      setValue('marca', pos.marca);
      setValue('modelo', pos.modelo);
      setValue('nombre', pos.nombre);
    }
  }, [pos, setValue]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar POS' : 'Crear POS'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ID - Only for creation */}
        {!isEditing && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID POS <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register('id', {
                required: 'El ID es requerido',
                pattern: {
                  value: /^POS\d{3}$/,
                  message: 'El ID debe tener el formato POS### (ej: POS001)',
                },
              })}
              placeholder="POS001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.id && (
              <span className="text-red-600 text-sm">{errors.id.message}</span>
            )}
          </div>
        )}

        {/* Marca */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marca <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            {...register('marca', { required: 'La marca es requerida' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.marca && (
            <span className="text-red-600 text-sm">{errors.marca.message}</span>
          )}
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modelo <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            {...register('modelo', { required: 'El modelo es requerido' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.modelo && (
            <span className="text-red-600 text-sm">{errors.modelo.message}</span>
          )}
        </div>

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

export default PosForm;
