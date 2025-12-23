import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusinessSizes } from '../../hooks/useBusinessSizes';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';

export function BusinessSizeListPage() {
  const { businessSizes, loading, error, deleteBusinessSize, refetch } = useBusinessSizes();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null as number | null, name: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;
    setIsDeleting(true);
    try {
      const success = await deleteBusinessSize(deleteModal.id);
      if (success) {
        setDeleteModal({ isOpen: false, id: null, name: '' });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando tamaños de comercio...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600"><div className="text-lg">Error: {error}</div></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tamaños de Comercio</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {businessSizes.map((bs) => (
              <tr key={bs.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bs.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{bs.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, name: '' })}
        onConfirm={handleDeleteConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el tamaño "${deleteModal.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
      />
    </div>
  );
}
