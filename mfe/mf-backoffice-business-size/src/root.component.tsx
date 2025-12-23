import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BusinessSizeListPage, BusinessSizeCreatePage, BusinessSizeEditPage } from './ui/pages/business-size';

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/bo/business-size" element={<BusinessSizeListPage />} />
        <Route path="/bo/business-size/create" element={<BusinessSizeCreatePage />} />
        <Route path="/bo/business-size/edit/:id" element={<BusinessSizeEditPage />} />
        <Route path="*" element={<Navigate to="/bo/business-size" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
