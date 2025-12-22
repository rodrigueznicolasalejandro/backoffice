import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ProductFormProps {
  product?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditing: boolean;
}

interface FormInputs {
  code: string;
  brand_id: string;
  brand_name: string;
  payment_method_id: string;
  payment_method_name: string;
  payment_type_id: string;
  payment_type_name: string;
  currency_id: string;
  currency_code: string;
  financing_type_id: string;
  financing_type_name: string;
  card_scope_id: string;
  card_scope_name: string;
  capture_method_id: string;
  capture_method_name: string;
}

export default function ProductForm({ product, onSubmit, onCancel, isLoading, isEditing }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      code: product?.code || '',
      brand_id: product?.brand?.id || '',
      brand_name: product?.brand?.name || '',
      payment_method_id: product?.payment_method?.id || '',
      payment_method_name: product?.payment_method?.name || '',
      payment_type_id: product?.payment_type?.id || '',
      payment_type_name: product?.payment_type?.name || '',
      currency_id: product?.currency?.id || '',
      currency_code: product?.currency?.code || '',
      financing_type_id: product?.financing_type?.id || '',
      financing_type_name: product?.financing_type?.name || '',
      card_scope_id: product?.card_scope?.id || '',
      card_scope_name: product?.card_scope?.name || '',
      capture_method_id: product?.capture_method?.id || '',
      capture_method_name: product?.capture_method?.name || '',
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        code: product.code || '',
        brand_id: product.brand?.id || '',
        brand_name: product.brand?.name || '',
        payment_method_id: product.payment_method?.id || '',
        payment_method_name: product.payment_method?.name || '',
        payment_type_id: product.payment_type?.id || '',
        payment_type_name: product.payment_type?.name || '',
        currency_id: product.currency?.id || '',
        currency_code: product.currency?.code || '',
        financing_type_id: product.financing_type?.id || '',
        financing_type_name: product.financing_type?.name || '',
        card_scope_id: product.card_scope?.id || '',
        card_scope_name: product.card_scope?.name || '',
        capture_method_id: product.capture_method?.id || '',
        capture_method_name: product.capture_method?.name || '',
      });
    }
  }, [product, reset]);

  const onSubmitForm = (data: FormInputs) => {
    // Transformar los datos al formato esperado por el backend
    const productData = {
      code: data.code,
      brand: {
        id: parseInt(data.brand_id) || null,
        name: data.brand_name
      },
      payment_method: {
        id: parseInt(data.payment_method_id) || null,
        name: data.payment_method_name
      },
      payment_type: {
        id: parseInt(data.payment_type_id) || null,
        name: data.payment_type_name
      },
      currency: {
        id: parseInt(data.currency_id) || null,
        code: data.currency_code
      },
      financing_type: {
        id: parseInt(data.financing_type_id) || null,
        name: data.financing_type_name || null
      },
      card_scope: {
        id: parseInt(data.card_scope_id) || null,
        name: data.card_scope_name
      },
      capture_method: {
        id: parseInt(data.capture_method_id) || null,
        name: data.capture_method_name
      }
    };

    onSubmit(productData);
  };

  const inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";
  const inputErrorClassName = "w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";
  const errorClassName = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
      </h2>

      {/* Nombre Descriptivo */}
      <div>
        <label htmlFor="code" className={labelClassName}>
          Nombre Descriptivo <span className="text-red-500">*</span>
        </label>
        <input
          id="code"
          type="text"
          {...register('code', {
            required: 'El nombre descriptivo es requerido',
            minLength: {
              value: 3,
              message: 'El nombre debe tener al menos 3 caracteres'
            },
            maxLength: {
              value: 200,
              message: 'El nombre no debe exceder 200 caracteres'
            }
          })}
          className={errors.code ? inputErrorClassName : inputClassName}
          placeholder="Ej: Visa Débito Contado ARS Nacional POS"
          disabled={isLoading}
        />
        {errors.code && <p className={errorClassName}>{errors.code.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marca Tarjeta */}
        <div>
          <label htmlFor="brand_name" className={labelClassName}>
            Marca Tarjeta <span className="text-red-500">*</span>
          </label>
          <select
            id="brand_name"
            {...register('brand_name', {
              required: 'La marca es requerida'
            })}
            className={errors.brand_name ? inputErrorClassName : inputClassName}
            disabled={isLoading}
          >
            <option value="">Seleccionar marca</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="Cabal">Cabal</option>
          </select>
          {errors.brand_name && <p className={errorClassName}>{errors.brand_name.message}</p>}
        </div>

        {/* Medio de Pago */}
        <div>
          <label htmlFor="payment_method_name" className={labelClassName}>
            Medio de Pago <span className="text-red-500">*</span>
          </label>
          <select
            id="payment_method_name"
            {...register('payment_method_name', {
              required: 'El medio de pago es requerido'
            })}
            className={errors.payment_method_name ? inputErrorClassName : inputClassName}
            disabled={isLoading}
          >
            <option value="">Seleccionar medio</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Prepago">Prepago</option>
          </select>
          {errors.payment_method_name && <p className={errorClassName}>{errors.payment_method_name.message}</p>}
        </div>

        {/* Tipo de Pago */}
        <div>
          <label htmlFor="payment_type_name" className={labelClassName}>
            Tipo de Pago <span className="text-red-500">*</span>
          </label>
          <select
            id="payment_type_name"
            {...register('payment_type_name', {
              required: 'El tipo de pago es requerido'
            })}
            className={errors.payment_type_name ? inputErrorClassName : inputClassName}
            disabled={isLoading}
          >
            <option value="">Seleccionar tipo</option>
            <option value="Contado">Contado</option>
            <option value="Cuotas">Cuotas</option>
          </select>
          {errors.payment_type_name && <p className={errorClassName}>{errors.payment_type_name.message}</p>}
        </div>

        {/* Moneda */}
        <div>
          <label htmlFor="currency_code" className={labelClassName}>
            Moneda <span className="text-red-500">*</span>
          </label>
          <select
            id="currency_code"
            {...register('currency_code', {
              required: 'La moneda es requerida'
            })}
            className={errors.currency_code ? inputErrorClassName : inputClassName}
            disabled={isLoading}
          >
            <option value="">Seleccionar moneda</option>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </select>
          {errors.currency_code && <p className={errorClassName}>{errors.currency_code.message}</p>}
        </div>

        {/* Tipo Financiación Cuotas */}
        <div>
          <label htmlFor="financing_type_name" className={labelClassName}>
            Tipo Financiación Cuotas
          </label>
          <select
            id="financing_type_name"
            {...register('financing_type_name')}
            className={inputClassName}
            disabled={isLoading}
          >
            <option value="">Sin financiación</option>
            <option value="Emisor">Emisor</option>
            <option value="Comercio">Comercio</option>
            <option value="Adquirente">Adquirente</option>
            <option value="Gobierno">Gobierno</option>
          </select>
        </div>

        {/* Alcance Tarjeta */}
        <div>
          <label htmlFor="card_scope_name" className={labelClassName}>
            Alcance Tarjeta <span className="text-red-500">*</span>
          </label>
          <select
            id="card_scope_name"
            {...register('card_scope_name', {
              required: 'El alcance de tarjeta es requerido'
            })}
            className={errors.card_scope_name ? inputErrorClassName : inputClassName}
            disabled={isLoading}
          >
            <option value="">Seleccionar alcance</option>
            <option value="Nacional">Nacional</option>
            <option value="Internacional">Internacional</option>
          </select>
          {errors.card_scope_name && <p className={errorClassName}>{errors.card_scope_name.message}</p>}
        </div>

        {/* Método de Captura */}
        <div className="md:col-span-2">
          <label htmlFor="capture_method_name" className={labelClassName}>
            Método de Captura <span className="text-red-500">*</span>
          </label>
          <select
            id="capture_method_name"
            {...register('capture_method_name', {
              required: 'El método de captura es requerido'
            })}
            className={errors.capture_method_name ? inputErrorClassName : inputClassName}
            disabled={isLoading}
          >
            <option value="">Seleccionar método</option>
            <option value="POS">POS</option>
            <option value="Tap To Phone">Tap To Phone</option>
            <option value="Link de Pago">Link de Pago</option>
            <option value="API">API</option>
            <option value="Form Captura (Checkout)">Form Captura (Checkout)</option>
            <option value="Click To Pay">Click To Pay</option>
            <option value="QR Tarjeta">QR Tarjeta</option>
            <option value="Card On File">Card On File</option>
          </select>
          {errors.capture_method_name && <p className={errorClassName}>{errors.capture_method_name.message}</p>}
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
            isEditing ? 'Actualizar Producto' : 'Crear Producto'
          )}
        </button>
      </div>
    </form>
  );
}
