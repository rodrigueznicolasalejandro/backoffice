import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePos } from '../../hooks/usePos';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';

export function PosListPage() {
  const { posList, loading, error, deletePos } = usePos();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, posId: null as string | null, posName: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (posId: string, posName: string) => {
    setDeleteModal({ isOpen: true, posId, posName });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.posId) return;
    setIsDeleting(true);
    try {
      const success = await deletePos(deleteModal.posId);
      if (success) {
        setDeleteModal({ isOpen: false, posId: null, posName: '' });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando POS...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600"><div className="text-lg">Error: {error}</div></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">POS</h1>
        <button
          onClick={() => navigate('/bo/pos/create')}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Crear POS
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posList.map((pos) => (
              <tr key={pos.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pos.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pos.marca}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pos.modelo}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pos.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/bo/pos/edit/${pos.id}`)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                    >
                      <MdEdit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(pos.id, pos.nombre)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded text-xs cursor-pointer transition-all hover:bg-red-100 flex items-center gap-1"
                    >
                      <MdDelete className="w-4 h-4" />
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el POS "${deleteModal.posName}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, posId: null, posName: '' })}
        isLoading={isDeleting}
      />
    </div>
  );
}
