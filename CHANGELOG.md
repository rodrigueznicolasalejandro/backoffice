# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-12-22

### ✨ Agregado

#### Infraestructura
- Configuración inicial de Single-SPA con microfrontends
- Root container con orquestación de microfrontends
- Import maps para desarrollo y local
- Layout responsive con menú lateral y header
- Sistema de autenticación con JWT

#### Microfrontends
- **mf-backoffice-login**: Autenticación de usuarios (puerto 8088)
- **mf-backoffice-header**: Header con usuario y logout (puerto 8087)
- **mf-backoffice-menu**: Menú de navegación lateral (puerto 8086)
- **mf-backoffice-bundle**: Gestión de paquetes (puerto 3001)
- **mf-backoffice-product**: CRUD de productos (puerto 3003)
- **mf-backoffice-mcc**: CRUD de MCCs con arquitectura hexagonal (puerto 3004)

#### BFF
- Endpoints CRUD para productos
- Endpoints CRUD para MCCs con 196 registros iniciales
- Middleware de autenticación JWT
- Validación de datos en endpoints

#### Tecnologías
- React 18.2.0 con TypeScript 5.1.0
- Tailwind CSS 3.4.17 en todos los microfrontends
- React Hook Form 7.69.0 para formularios
- React Router DOM 6.30.2 para enrutamiento
- react-icons 5.5.0 (Material Design)
- Webpack 5 con postcss-loader

#### UI/UX
- Diseño consistente con Tailwind CSS
- Iconos Material Design en menú de navegación
- Formularios con validación en tiempo real
- Modales de confirmación para acciones destructivas
- Loading states en operaciones asíncronas
- Scroll del navegador visible en toda la aplicación

#### Documentación
- README.md completo con instrucciones
- CONTRIBUTING.md con estándares de código
- Scripts de instalación y inicio automatizados
- Configuración de .gitignore

### 🔄 Modificado

#### Menu
- Migración completa a Tailwind CSS (eliminado @link/styleguide)
- Componente MenuList personalizado para renderizar react-icons
- Estructura de menú actualizada: Productos, Servicios, Pricing, MCCs, Tamaños comercio, Paquetes

#### Header
- Agregado display de username desde localStorage
- Botón de cerrar sesión funcional
- Migración a Tailwind CSS

#### Layout
- Cambio de `overflow: hidden` a `overflow: visible` para mostrar scroll del navegador

### 🐛 Corregido

- Iconos del menú no se renderizaban con @link/styleguide/Collapsible
- Estilos de Tailwind no se aplicaban por falta de postcss-loader
- Scroll del navegador oculto en containers
- TypeScript error en header por falta de lib DOM
- Referencias de imports en MccApiRepository

### 🏗️ Arquitectura

#### Hexagonal (Clean Architecture)
- Implementada en mf-backoffice-product y mf-backoffice-mcc
- Separación en capas: domain, application, infrastructure, ui
- Repositorios con interfaces para fácil testing
- Casos de uso independientes y reutilizables

#### Configuración Webpack
- Patrón de inyección de postcss-loader consistente
- Path aliases para imports limpios (@domain, @application, @infrastructure, @ui)
- HMR (Hot Module Replacement) configurado

### 📦 Dependencias

#### Principales
- single-spa: ^6.0.0
- react: ^18.2.0
- react-dom: ^18.2.0
- typescript: ^5.1.0
- tailwindcss: ^3.4.17
- react-hook-form: ^7.69.0
- react-router-dom: ^6.30.2
- react-icons: ^5.5.0

#### DevDependencies
- webpack: ^5.89.0
- webpack-dev-server: ^5.1.0
- postcss: ^8.4.49
- postcss-loader: ^8.1.1
- autoprefixer: ^10.4.20

### 🔒 Seguridad

- Autenticación JWT con validación de expiración
- Protección de rutas basada en autenticación
- Middleware de autenticación en BFF
- Tokens almacenados en localStorage

### 📋 Notas

- Puerto 3000 reservado para BFF
- Puertos 3001-3004, 8086-8088, 9000 para microfrontends
- Todos los microfrontends requieren BFF corriendo
- React 18 y React-DOM compartidos via CDN

---

## [Unreleased]

### 🚧 En Desarrollo
- Microfrontend de Servicios
- Microfrontend de Pricing
- Microfrontend de Tamaños de Comercio
- Tests unitarios e integración
- Documentación de APIs
- CI/CD pipeline

### 💡 Por Implementar
- Dark mode
- Internacionalización (i18n)
- Notificaciones toast
- Paginación en tablas
- Filtros y búsqueda avanzada
- Export a Excel/PDF
- Logs de auditoría
- Roles y permisos
