import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PriceListPage, PriceCreatePage, PriceEditPage } from './ui/pages/prices';

export default function Root(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bo/prices" element={<PriceListPage />} />
        <Route path="/bo/prices/create" element={<PriceCreatePage />} />
        <Route path="/bo/prices/edit/:id" element={<PriceEditPage />} />
        <Route path="*" element={<Navigate to="/bo/prices" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
