import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './global-font.css';
import PaquetesPage from './ui/pages/paquetes';
import { paths } from '@ui/routes/paths';

export default function Root() {
  return (
    <BrowserRouter basename={paths.BASENAME}>
      <Routes>
        <Route path={paths.PAQUETES} element={<Outlet />}>
          <Route path={paths.PAQUETES_NEW} element={<PaquetesPage />} />
          <Route
            path={paths.PAQUETES_LIST}
            element={<h1>Listado de Paquetes</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
