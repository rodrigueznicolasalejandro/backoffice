import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global-font.css';
import { paths } from '@ui/routes/paths';
import { Products } from '@ui/pages/products';

export default function Root() {
  return (
    <BrowserRouter basename={paths.BASENAME}>
      <Routes>
        <Route path={paths.PRODUCTS} element={<Products />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
