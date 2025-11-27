import React from 'react';
import { paths } from './paths';

interface RouteType {
  path: string;
  component: React.JSX.Element;
  exact: boolean;
}

const routes: RouteType[] = [
  {
    path: paths.PRODUCTS,
    component: <h1>Listado de Productos</h1>,
    exact: false,
  },
];

export default routes;
