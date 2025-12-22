# Backoffice - Sistema de Gestión con Microfrontends

Sistema de backoffice desarrollado con arquitectura de microfrontends usando Single-SPA, React 18 y TypeScript.

## 🏗️ Arquitectura

El proyecto está estructurado en:

- **backoffice-root-container**: Aplicación raíz que orquesta todos los microfrontends
- **mfe/**: Carpeta con todos los microfrontends
  - `mf-backoffice-login`: Autenticación de usuarios
  - `mf-backoffice-header`: Header con información de usuario
  - `mf-backoffice-menu`: Menú de navegación lateral
  - `mf-backoffice-bundle`: Gestión de paquetes
  - `mf-backoffice-product`: Gestión de productos
  - `mf-backoffice-mcc`: Gestión de MCCs (Merchant Category Codes)
- **server/**: Servidor mock con datos de prueba

## 🚀 Tecnologías

- **React 18.2.0** - Librería UI
- **TypeScript 5.1.0** - Tipado estático
- **Single-SPA 6.x** - Orquestador de microfrontends
- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **React Hook Form 7.69.0** - Gestión de formularios
- **React Router DOM 6.30.2** - Enrutamiento
- **react-icons 5.5.0** - Iconos (Material Design)
- **Webpack 5** - Bundler

## 📋 Requisitos Previos

- Node.js 16+ y npm
- BFF Backend (puerto 3000)

## 🛠️ Instalación

### 1. Instalar dependencias en todos los proyectos

```bash
# Root Container
cd backoffice-root-container
npm install

# Microfrontends
cd ../mfe/mf-backoffice-login
npm install

cd ../mf-backoffice-header
npm install

cd ../mf-backoffice-menu
npm install

cd ../mf-backoffice-bundle
npm install

cd ../mf-backoffice-product
npm install

cd ../mf-backoffice-mcc
npm install
```

### 2. Iniciar servicios

En terminales separadas, ejecutar:

```bash
# Terminal 1: Root Container (puerto 9000)
cd backoffice-root-container
npm start

# Terminal 2: Login (puerto 8088)
cd mfe/mf-backoffice-login
npm start

# Terminal 3: Header (puerto 8087)
cd mfe/mf-backoffice-header
npm start

# Terminal 4: Menu (puerto 8086)
cd mfe/mf-backoffice-menu
npm start

# Terminal 5: Bundle (puerto 3001)
cd mfe/mf-backoffice-bundle
npm start

# Terminal 6: Product (puerto 3003)
cd mfe/mf-backoffice-product
npm start

# Terminal 7: MCC (puerto 3004)
cd mfe/mf-backoffice-mcc
npm start
```

## 🌐 URLs

- **Root Container**: http://localhost:9000
- **Login**: /auth
- **Dashboard**: /bo/inicio
- **Productos**: /bo/products
- **Paquetes**: /bo/paquetes
- **MCCs**: /bo/mccs

## 📁 Estructura de Carpetas

```
backoffice/
├── backoffice-root-container/     # Aplicación raíz Single-SPA
│   ├── config/
│   │   ├── dev/
│   │   │   └── importmap.json    # Import map para desarrollo
│   │   └── local/
│   │       └── importmap.json    # Import map local
│   ├── public/
│   ├── src/
│   │   ├── index.ejs
│   │   ├── link-root-config.js
│   │   └── microfrontend-layout.html
│   └── webpack.config.js
│
├── mfe/                           # Microfrontends
│   ├── mf-backoffice-login/      # Puerto 8088
│   ├── mf-backoffice-header/     # Puerto 8087
│   ├── mf-backoffice-menu/       # Puerto 8086
│   ├── mf-backoffice-bundle/     # Puerto 3001
│   ├── mf-backoffice-product/    # Puerto 3003
│   └── mf-backoffice-mcc/        # Puerto 3004
│       ├── src/
│       │   ├── domain/           # Entidades y repositorios
│       │   ├── application/      # Casos de uso
│       │   ├── infraestructure/  # Implementaciones
│       │   └── ui/               # Componentes React
│       ├── babel.config.json
│       ├── jest.config.js
│       ├── tsconfig.json
│       ├── webpack.config.js
│       ├── tailwind.config.js
│       └── postcss.config.js
│
└── server/                        # Servidor mock
    ├── docker-compose.yaml
    ├── serverNode.js
    └── mock/
```

## 🔑 Autenticación

El sistema usa JWT almacenado en `localStorage`:
- **Token**: `jwt_token`
- **Usuario**: `user` (objeto JSON con username, etc.)

## 🎨 Estilización

Todos los microfrontends usan **Tailwind CSS 3** con configuración consistente:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Patrón de inyección PostCSS en Webpack:

```javascript
webpackConfig.module.rules[1].use.push({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
});
```

## 🏛️ Arquitectura Hexagonal

Los microfrontends más complejos (product, mcc) siguen arquitectura hexagonal:

```
src/
├── domain/              # Entidades y contratos
│   ├── Entity.ts
│   └── EntityRepository.ts
├── application/         # Casos de uso
│   ├── GetAllUseCase.ts
│   ├── CreateUseCase.ts
│   └── UpdateUseCase.ts
├── infraestructure/     # Implementaciones
│   ├── config/
│   │   └── httpClient.ts
│   └── EntityApiRepository.ts
└── ui/                  # Capa de presentación
    ├── components/
    ├── hooks/
    └── pages/
```

## 🔌 Integración con BFF

Los microfrontends se conectan al BFF en `http://localhost:3000`:

**Endpoints disponibles:**
- `GET /api/v1/products` - Lista de productos
- `POST /api/v1/products` - Crear producto
- `GET /api/v1/mcc` - Lista de MCCs
- `POST /api/v1/mcc` - Crear MCC
- `PUT /api/v1/mcc/:id` - Actualizar MCC
- `DELETE /api/v1/mcc/:id` - Eliminar MCC

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run watch-tests

# Cobertura
npm run coverage
```

## 📦 Build para Producción

```bash
# En cada microfrontend
npm run build

# Analizar bundle
npm run analyze
```

## 🛠️ Desarrollo

### Agregar nuevo microfrontend

1. Crear carpeta en `mfe/`
2. Copiar configuración de un MF existente
3. Actualizar `package.json` con nuevo nombre y puerto
4. Registrar en `backoffice-root-container/config/local/importmap.json`:
```json
"@link/backoffice-nuevo": "//localhost:PUERTO/link-backoffice-nuevo.js"
```
5. Agregar ruta en `microfrontend-layout.html`:
```html
<route path="nuevo">
  <application name="@link/backoffice-nuevo"></application>
</route>
```

### Menú de navegación

Los items del menú se configuran en `mf-backoffice-menu/src/mock/menu.json`:

```json
{
  "id": 1,
  "text": "MCCs",
  "icon_code": "MdCategory",
  "path": "/bo/mccs",
  "name": "mccs"
}
```

Los iconos disponibles son de **react-icons/md** (Material Design).

## 🐛 Troubleshooting

### Puerto en uso
```bash
# Windows
netstat -ano | findstr :PUERTO
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:PUERTO | xargs kill -9
```

### Hot reload no funciona
Verificar que webpack-dev-server tenga configurado `hot: true` y que el navegador no tenga cache agresivo.

### Estilos de Tailwind no se aplican
1. Verificar que `postcss-loader` esté inyectado en webpack
2. Confirmar que `src/index.css` tenga las directivas `@tailwind`
3. Reiniciar el servidor de desarrollo

## 📝 Convenciones

- **Commits**: Usar mensajes descriptivos en español
- **Branches**: `feature/`, `fix/`, `refactor/`
- **Componentes**: PascalCase
- **Archivos**: camelCase para hooks, PascalCase para componentes
- **Estilos**: Usar Tailwind CSS, evitar CSS inline salvo casos específicos

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para guía completa de contribución.

## 📚 Documentación Adicional

- **[QUICK_START.md](QUICK_START.md)** - Guía de inicio rápido con comandos esenciales
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Estándares de código y mejores prácticas
- **[CHANGELOG.md](CHANGELOG.md)** - Historial de cambios y versiones
- **[GIT_SETUP.md](GIT_SETUP.md)** - Configuración de Git y repositorio remoto
- **[ENVIRONMENT.md](ENVIRONMENT.md)** - Configuración de variables de entorno
- **[PRE_COMMIT_CHECKLIST.md](PRE_COMMIT_CHECKLIST.md)** - Checklist antes del primer commit
- **[LICENSE](LICENSE)** - Términos de licencia del proyecto

## 👥 Contribuir

1. Fork el proyecto
2. Crear branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es privado.

## 🔗 Enlaces Útiles

- [Single-SPA Docs](https://single-spa.js.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
