import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useServices } from './ui/hooks/useServices';
import ServiceForm from './ui/components/ServiceForm';
import { ServiceApiRepository } from './infraestructure/ServiceApiRepository';
import { CreateServiceUseCase } from './application/CreateServiceUseCase';
import { UpdateServiceUseCase } from './application/UpdateServiceUseCase';
import { GetServiceByIdUseCase } from './application/GetServiceByIdUseCase';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { ConfirmModal } from './ui/components/Modal/ConfirmModal';

const repository = new ServiceApiRepository();

function ServiceList() {
  const { services, loading, error, deleteService, refetch } = useServices();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, serviceId: null as string | null, serviceName: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (serviceId: string, serviceName: string) => {
    setDeleteModal({ isOpen: true, serviceId, serviceName });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.serviceId) return;
    setIsDeleting(true);
    try {
      const success = await deleteService(deleteModal.serviceId);
      if (success) {
        setDeleteModal({ isOpen: false, serviceId: null, serviceName: '' });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando Servicios...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600"><div className="text-lg">Error: {error}</div></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Servicios</h1>
        <button
          onClick={() => navigate('/bo/services/create')}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Crear Servicio
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Servicio</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{service.nombreServicio}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/bo/services/edit/${service.id}`)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                    >
                      <MdEdit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(service.id, service.nombreServicio)}
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
        message={`¿Estás seguro de que deseas eliminar el servicio "${deleteModal.serviceName}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, serviceId: null, serviceName: '' })}
        isLoading={isDeleting}
      />
    </div>
  );
}

function ServiceCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreateServiceUseCase(repository);
      await createUseCase.execute(data);
      navigate('/bo/services');
    } catch (error) {
      console.error('Error al crear servicio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/services')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <ServiceForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/services')} isLoading={isLoading} />
    </div>
  );
}

function ServiceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      try {
        const getUseCase = new GetServiceByIdUseCase(repository);
        const data = await getUseCase.execute(id);
        setService(data);
      } catch (error) {
        console.error('Error al cargar servicio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const updateUseCase = new UpdateServiceUseCase(repository);
      await updateUseCase.execute(id, data);
      navigate('/bo/services');
    } catch (error) {
      console.error('Error al actualizar servicio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando...</div></div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/services')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <ServiceForm
        service={service}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/services')}
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
        <Route path="/bo/services" element={<ServiceList />} />
        <Route path="/bo/services/create" element={<ServiceCreate />} />
        <Route path="/bo/services/edit/:id" element={<ServiceEdit />} />
        <Route path="*" element={<Navigate to="/bo/services" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
