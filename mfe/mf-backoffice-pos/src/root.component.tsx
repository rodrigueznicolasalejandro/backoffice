import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { usePos } from './ui/hooks/usePos';
import PosForm from './ui/components/PosForm';
import { PosApiRepository } from './infraestructure/PosApiRepository';
import { CreatePosUseCase } from './application/CreatePosUseCase';
import { UpdatePosUseCase } from './application/UpdatePosUseCase';
import { GetPosByIdUseCase } from './application/GetPosByIdUseCase';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { ConfirmModal } from './ui/components/Modal/ConfirmModal';

const repository = new PosApiRepository();

function PosList() {
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

function PosCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreatePosUseCase(repository);
      await createUseCase.execute(data);
      navigate('/bo/pos');
    } catch (error) {
      console.error('Error al crear POS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/pos')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PosForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/pos')} isLoading={isLoading} />
    </div>
  );
}

function PosEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pos, setPos] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchPos = async () => {
      if (!id) return;
      try {
        const getUseCase = new GetPosByIdUseCase(repository);
        const data = await getUseCase.execute(id);
        setPos(data);
      } catch (error) {
        console.error('Error al cargar POS:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPos();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const updateUseCase = new UpdatePosUseCase(repository);
      await updateUseCase.execute(id, data);
      navigate('/bo/pos');
    } catch (error) {
      console.error('Error al actualizar POS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando...</div></div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/pos')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PosForm
        pos={pos}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/pos')}
        isLoading={isLoading}
        isEditing
      />
    </div>
  );
}

export default function Root(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bo/pos" element={<PosList />} />
        <Route path="/bo/pos/create" element={<PosCreate />} />
        <Route path="/bo/pos/edit/:id" element={<PosEdit />} />
        <Route path="*" element={<Navigate to="/bo/pos" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
