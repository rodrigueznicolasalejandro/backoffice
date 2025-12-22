import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global-font.css';
import './index.css';
import { paths } from '@ui/routes/paths';
import { Products } from '@ui/pages/products';
import ProductCreate from '@ui/pages/products/ProductCreate';
import ProductEdit from '@ui/pages/products/ProductEdit';

export default function Root() {
  return (
    <BrowserRouter basename={paths.BASENAME}>
      <Routes>
        <Route path={paths.PRODUCTS} element={<Products />}></Route>
        <Route path={paths.PRODUCTS_CREATE} element={<ProductCreate />}></Route>
        <Route path={paths.PRODUCTS_EDIT} element={<ProductEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
