import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ServiceListPage, ServiceCreatePage, ServiceEditPage } from './ui/pages/services';

export default function Root(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bo/services" element={<ServiceListPage />} />
        <Route path="/bo/services/create" element={<ServiceCreatePage />} />
        <Route path="/bo/services/edit/:id" element={<ServiceEditPage />} />
        <Route path="*" element={<Navigate to="/bo/services" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
