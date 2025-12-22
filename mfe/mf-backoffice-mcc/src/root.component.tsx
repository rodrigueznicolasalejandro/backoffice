import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useMccs } from './ui/hooks/useMccs';
import MccForm from './ui/components/MccForm';
import { MccApiRepository } from './infraestructure/MccApiRepository';
import { CreateMccUseCase } from './application/CreateMccUseCase';
import { UpdateMccUseCase } from './application/UpdateMccUseCase';
import { GetMccByIdUseCase } from './application/GetMccByIdUseCase';
import { MdEdit, MdDelete, MdAdd, MdCheck, MdClose } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { ConfirmModal } from './ui/components/Modal/ConfirmModal';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const repository = new MccApiRepository();

// Página de listado
function MccList() {
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
        <button
          onClick={() => navigate('/bo/mccs/create')}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Crear MCC
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Propinas</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/bo/mccs/edit/${mcc.id}`)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                    >
                      <MdEdit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(mcc.id, mcc.code)}
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

// Página de creación
function MccCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const createUseCase = new CreateMccUseCase(repository);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await createUseCase.execute(data);
      navigate('/bo/mccs');
    } catch (err: any) {
      setError(err.message || 'Error al crear MCC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/mccs')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <MccForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/mccs')}
        isLoading={loading}
        isEditing={false}
      />
    </div>
  );
}

// Página de edición
function MccEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mcc, setMcc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMcc, setLoadingMcc] = useState(true);
  const [error, setError] = useState('');
  const updateUseCase = new UpdateMccUseCase(repository);
  const getMccUseCase = new GetMccByIdUseCase(repository);

  React.useEffect(() => {
    const loadMcc = async () => {
      try {
        const data = await getMccUseCase.execute(Number(id));
        setMcc(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar MCC');
      } finally {
        setLoadingMcc(false);
      }
    };
    loadMcc();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await updateUseCase.execute(Number(id), data);
      navigate('/bo/mccs');
    } catch (err: any) {
      setError(err.message || 'Error al actualizar MCC');
    } finally {
      setLoading(false);
    }
  };

  if (loadingMcc) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/mccs')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <MccForm
        mcc={mcc}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/mccs')}
        isLoading={loading}
        isEditing={true}
      />
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/bo/mccs" element={<MccList />} />
        <Route path="/bo/mccs/create" element={<MccCreate />} />
        <Route path="/bo/mccs/edit/:id" element={<MccEdit />} />
        <Route path="*" element={<Navigate to="/bo/mccs" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
