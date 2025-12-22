import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useBusinessSizes } from './ui/hooks/useBusinessSizes';
import BusinessSizeForm from './ui/components/BusinessSizeForm';
import { BusinessSizeApiRepository } from './infraestructure/BusinessSizeApiRepository';
import { CreateBusinessSizeUseCase } from './application/CreateBusinessSizeUseCase';
import { UpdateBusinessSizeUseCase } from './application/UpdateBusinessSizeUseCase';
import { GetBusinessSizeByIdUseCase } from './application/GetBusinessSizeByIdUseCase';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { ConfirmModal } from './ui/components/Modal/ConfirmModal';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const repository = new BusinessSizeApiRepository();

// Página de listado
function BusinessSizeList() {
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
        <button
          onClick={() => navigate('/bo/business-size/create')}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Crear Tamaño
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {businessSizes.map((bs) => (
              <tr key={bs.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bs.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{bs.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/bo/business-size/edit/${bs.id}`)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                    >
                      <MdEdit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(bs.id, bs.name)}
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

// Página de creación
function BusinessSizeCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const createUseCase = new CreateBusinessSizeUseCase(repository);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await createUseCase.execute(data);
      navigate('/bo/business-size');
    } catch (err: any) {
      setError(err.message || 'Error al crear tamaño de comercio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/business-size')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <BusinessSizeForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/business-size')}
        isLoading={loading}
        isEditing={false}
      />
    </div>
  );
}

// Página de edición
function BusinessSizeEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [businessSize, setBusinessSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingBusinessSize, setLoadingBusinessSize] = useState(true);
  const [error, setError] = useState('');
  const updateUseCase = new UpdateBusinessSizeUseCase(repository);
  const getBusinessSizeUseCase = new GetBusinessSizeByIdUseCase(repository);

  React.useEffect(() => {
    const loadBusinessSize = async () => {
      try {
        const data = await getBusinessSizeUseCase.execute(Number(id));
        setBusinessSize(data);
      } catch (err: any) {
        setError(err.message || 'Error al cargar tamaño de comercio');
      } finally {
        setLoadingBusinessSize(false);
      }
    };
    loadBusinessSize();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await updateUseCase.execute(Number(id), data);
      navigate('/bo/business-size');
    } catch (err: any) {
      setError(err.message || 'Error al actualizar tamaño de comercio');
    } finally {
      setLoading(false);
    }
  };

  if (loadingBusinessSize) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/business-size')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <IoChevronBack /> Volver
      </button>
      {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
      <BusinessSizeForm
        businessSize={businessSize}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/business-size')}
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
        <Route path="/bo/business-size" element={<BusinessSizeList />} />
        <Route path="/bo/business-size/create" element={<BusinessSizeCreate />} />
        <Route path="/bo/business-size/edit/:id" element={<BusinessSizeEdit />} />
        <Route path="*" element={<Navigate to="/bo/business-size" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
