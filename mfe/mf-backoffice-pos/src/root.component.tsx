import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PosListPage, PosCreatePage, PosEditPage } from './ui/pages/pos';

export default function Root(props: any) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/bo/pos" element={<PosListPage />} />
        <Route path="/bo/pos/create" element={<PosCreatePage />} />
        <Route path="/bo/pos/edit/:id" element={<PosEditPage />} />
        <Route path="*" element={<Navigate to="/bo/pos" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
