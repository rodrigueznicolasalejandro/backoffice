import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface MccFormProps {
  mcc?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditing: boolean;
}

interface FormInputs {
  code: string;
  description: string;
  allows_tips: boolean;
  allows_cashback: boolean;
  allows_incremental_authorization: boolean;
}

export default function MccForm({ mcc, onSubmit, onCancel, isLoading, isEditing }: MccFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      code: mcc?.code || '',
      description: mcc?.description || '',
      allows_tips: mcc?.allows_tips || false,
      allows_cashback: mcc?.allows_cashback || false,
      allows_incremental_authorization: mcc?.allows_incremental_authorization || false,
    },
  });

  useEffect(() => {
    if (mcc) {
      reset({
        code: mcc.code || '',
        description: mcc.description || '',
        allows_tips: mcc.allows_tips || false,
        allows_cashback: mcc.allows_cashback || false,
        allows_incremental_authorization: mcc.allows_incremental_authorization || false,
      });
    }
  }, [mcc, reset]);

  const onSubmitForm = (data: FormInputs) => {
    const mccData = {
      code: data.code,
      description: data.description,
      allows_tips: data.allows_tips,
      allows_cashback: data.allows_cashback,
      allows_incremental_authorization: data.allows_incremental_authorization,
    };

    onSubmit(mccData);
  };

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";
  const inputErrorClassName = "w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const errorClassName = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar MCC' : 'Crear Nuevo MCC'}
      </h2>

      {/* Código MCC */}
      <div>
        <label htmlFor="code" className={labelClassName}>
          Código MCC <span className="text-red-500">*</span>
        </label>
        <input
          id="code"
          type="text"
          {...register('code', {
            required: 'El código MCC es requerido',
            pattern: {
              value: /^\d{1,4}$/,
              message: 'El código debe tener entre 1 y 4 dígitos'
            }
          })}
          className={errors.code ? inputErrorClassName : inputClassName}
          placeholder="Ej: 5411"
          disabled={isLoading}
          maxLength={4}
        />
        {errors.code && <p className={errorClassName}>{errors.code.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className={labelClassName}>
          Descripción <span className="text-red-500">*</span>
        </label>
        <input
          id="description"
          type="text"
          {...register('description', {
            required: 'La descripción es requerida',
            minLength: {
              value: 3,
              message: 'La descripción debe tener al menos 3 caracteres'
            }
          })}
          className={errors.description ? inputErrorClassName : inputClassName}
          placeholder="Ej: Supermercados y tiendas de alimentos"
          disabled={isLoading}
        />
        {errors.description && <p className={errorClassName}>{errors.description.message}</p>}
      </div>

      {/* Checkboxes */}
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            id="allows_tips"
            type="checkbox"
            {...register('allows_tips')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <label htmlFor="allows_tips" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Permite propinas
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="allows_cashback"
            type="checkbox"
            {...register('allows_cashback')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <label htmlFor="allows_cashback" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Permite cashback
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="allows_incremental_authorization"
            type="checkbox"
            {...register('allows_incremental_authorization')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <label htmlFor="allows_incremental_authorization" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Permite autorización incremental
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
              {isEditing ? 'Actualizando...' : 'Creando...'}
            </span>
          ) : (
            isEditing ? 'Actualizar MCC' : 'Crear MCC'
          )}
        </button>
      </div>
    </form>
  );
}
