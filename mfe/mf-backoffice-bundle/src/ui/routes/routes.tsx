import React from 'react';
import { paths } from './paths';

interface RouteType {
  path: string;
  component: React.JSX.Element;
  exact: boolean;
}

const routes: RouteType[] = [
  {
    path: paths.PAQUETES_NEW,
    component: <h1>Listado de Paquetes</h1>,
    exact: false,
  },
];

export default routes;
