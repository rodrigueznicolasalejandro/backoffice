import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { usePrices } from './ui/hooks/usePrices';
import PriceForm from './ui/components/PriceForm';
import { PriceApiRepository } from './infraestructure/PriceApiRepository';
import { CreatePriceUseCase } from './application/CreatePriceUseCase';
import { UpdatePriceUseCase } from './application/UpdatePriceUseCase';
import { GetPriceByIdUseCase } from './application/GetPriceByIdUseCase';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { IoChevronBack } from 'react-icons/io5';
import { ConfirmModal } from './ui/components/Modal/ConfirmModal';

const repository = new PriceApiRepository();

function PriceList() {
  const { prices, loading, error, deletePrice } = usePrices();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, priceId: null as number | null, priceName: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (priceId: number, priceName: string) => {
    setDeleteModal({ isOpen: true, priceId, priceName });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.priceId) return;
    setIsDeleting(true);
    try {
      const success = await deletePrice(deleteModal.priceId);
      if (success) {
        setDeleteModal({ isOpen: false, priceId: null, priceName: '' });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando Precios...</div></div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600"><div className="text-lg">Error: {error}</div></div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Precios</h1>
        <button
          onClick={() => navigate('/bo/prices/create')}
          className="px-4 py-2 bg-blue-600 text-white border-none rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-blue-700 flex items-center gap-2"
        >
          <MdAdd className="w-5 h-5" />
          Crear Precio
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Producto</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo Plazo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Días</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo Precio</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prices.map((price) => (
              <tr key={price.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{price.id}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{price.nombre}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{price.idPricingProducto}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{price.tipoPlazo}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{price.diasPlazo}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{price.tipoPrecio}</td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/bo/prices/edit/${price.id}`)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                    >
                      <MdEdit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(price.id, price.nombre)}
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
        message={`¿Estás seguro de que deseas eliminar el precio "${deleteModal.priceName}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, priceId: null, priceName: '' })}
        isLoading={isDeleting}
      />
    </div>
  );
}

function PriceCreate() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const createUseCase = new CreatePriceUseCase(repository);
      await createUseCase.execute(data);
      navigate('/bo/prices');
    } catch (error) {
      console.error('Error al crear precio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/prices')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PriceForm onSubmit={handleSubmit} onCancel={() => navigate('/bo/prices')} isLoading={isLoading} />
    </div>
  );
}

function PriceEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [price, setPrice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchPrice = async () => {
      if (!id) return;
      try {
        const getUseCase = new GetPriceByIdUseCase(repository);
        const data = await getUseCase.execute(parseInt(id));
        setPrice(data);
      } catch (error) {
        console.error('Error al cargar precio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const updateUseCase = new UpdatePriceUseCase(repository);
      await updateUseCase.execute(parseInt(id), data);
      navigate('/bo/prices');
    } catch (error) {
      console.error('Error al actualizar precio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="text-lg">Cargando...</div></div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/bo/prices')}
        className="mb-4 flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <IoChevronBack className="w-5 h-5" />
        Volver
      </button>
      <PriceForm
        price={price}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/bo/prices')}
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
        <Route path="/bo/prices" element={<PriceList />} />
        <Route path="/bo/prices/create" element={<PriceCreate />} />
        <Route path="/bo/prices/edit/:id" element={<PriceEdit />} />
        <Route path="*" element={<Navigate to="/bo/prices" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
