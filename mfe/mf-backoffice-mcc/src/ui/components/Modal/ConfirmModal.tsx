import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg max-w-[400px] w-[90%]" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 pb-3 border-b border-gray-200">
          <h2 className="m-0 text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="p-5">
          <p className="m-0 text-gray-600 leading-6">{message}</p>
        </div>
        <div className="flex gap-3 px-5 pb-5 pt-3 justify-end">
          <button
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all border bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all border bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
