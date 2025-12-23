import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMccs } from '../../hooks/useMccs';
import { MdEdit, MdDelete, MdAdd, MdCheck, MdClose } from 'react-icons/md';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';

export function MccListPage() {
  const { mccs, loading, error, deleteMcc, refetch } = useMccs();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, mccId: null as number | null, mccCode: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (mccId: number, mccCode: string) => {
    setDeleteModal({ isOpen: true, mccId, mccCode });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.mccId) return;
    setIsDeleting(true);
    try {
      const success = await deleteMcc(deleteModal.mccId);
      if (success) {
        setDeleteModal({ isOpen: false, mccId: null, mccCode: '' });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando MCCs...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600"><div className="text-lg">Error: {error}</div></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">MCCs</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Propinas</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mccs.map((mcc) => (
              <tr key={mcc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mcc.code}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{mcc.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  {mcc.allows_tips ? (
                    <MdCheck className="inline text-green-600 w-5 h-5" />
                  ) : (
                    <MdClose className="inline text-red-600 w-5 h-5" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, mccId: null, mccCode: '' })}
        onConfirm={handleDeleteConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el MCC "${deleteModal.mccCode}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
      />
    </div>
  );
}
