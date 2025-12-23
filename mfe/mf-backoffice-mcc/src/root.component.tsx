import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MccListPage, MccCreatePage, MccEditPage } from './ui/pages/mccs';

export default function Root() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/bo/mccs" element={<MccListPage />} />
        <Route path="/bo/mccs/create" element={<MccCreatePage />} />
        <Route path="/bo/mccs/edit/:id" element={<MccEditPage />} />
        <Route path="*" element={<Navigate to="/bo/mccs" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
