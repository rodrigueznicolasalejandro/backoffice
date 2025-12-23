import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrices } from '../../hooks/usePrices';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';

export function PriceListPage() {
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

  // Agrupar precios por idPricingProducto y ordenar por dateFrom
  const groupedPrices = React.useMemo(() => {
    const groups: Record<string, typeof prices> = {};
    prices.forEach(price => {
      if (!groups[price.idPricingProducto]) {
        groups[price.idPricingProducto] = [];
      }
      groups[price.idPricingProducto].push(price);
    });

    // Ordenar cada grupo por dateFrom
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (!a.dateFrom) return 1;
        if (!b.dateFrom) return -1;
        return new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime();
      });
    });

    return groups;
  }, [prices]);

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
        {Object.entries(groupedPrices).map(([productId, groupPrices]) => (
          <div key={productId} className="mb-6 last:mb-0">
            <div className="bg-blue-50 px-4 py-2 border-b border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800">
                Producto: {productId}
              </h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cuota Inf</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cuota Sup</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo Plazo</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Días</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo Precio</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Arancel</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio ARS</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio USD</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Desde</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hasta</th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupPrices.map((price) => (
                  <tr key={price.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm text-gray-600">{price.nombre}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.rangoCuotaInferior ?? '-'}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.rangoCuotaSuperior ?? '-'}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.tipoPlazo}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.diasPlazo}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.tipoPrecio}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.valorArancel ?? '-'}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.valorPrecioFijoARS ?? '-'}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.valorPrecioFijoUSD ?? '-'}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.dateFrom ? new Date(price.dateFrom).toLocaleDateString() : '-'}</td>
                    <td className="px-3 py-3 text-sm text-gray-600">{price.dateTo ? new Date(price.dateTo).toLocaleDateString() : '-'}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => navigate(`/bo/prices/edit/${price.id}`)}
                          className="px-2 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded text-xs cursor-pointer transition-all hover:bg-gray-200 flex items-center gap-1"
                        >
                          <MdEdit className="w-3 h-3" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteClick(price.id, price.nombre)}
                          className="px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded text-xs cursor-pointer transition-all hover:bg-red-100 flex items-center gap-1"
                        >
                          <MdDelete className="w-3 h-3" />
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
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
