# Variables de Entorno

Este proyecto no utiliza archivos `.env` actualmente, pero aquí está la documentación para configuraciones futuras.

## 🔧 Configuración por Microfrontend

### mf-backoffice-login (puerto 8088)
```env
# No requiere variables de entorno actualmente
```

### mf-backoffice-header (puerto 8087)
```env
# No requiere variables de entorno actualmente
```

### mf-backoffice-menu (puerto 8086)
```env
# No requiere variables de entorno actualmente
```

### mf-backoffice-bundle (puerto 3001)
```env
# No requiere variables de entorno actualmente
```

### mf-backoffice-product (puerto 3003)
```env
# API_URL se configura en src/infrastructure/config/httpClient.ts
# Valor por defecto: http://localhost:3000/api/v1
```

### mf-backoffice-mcc (puerto 3004)
```env
# API_URL se configura en src/infrastructure/config/httpClient.ts
# Valor por defecto: http://localhost:3000/api/v1
```

### backoffice-root-container (puerto 9000)
```env
# Configuración en config/local/importmap.json
```

## 🌍 Configuración de URLs

Las URLs de los servicios se configuran en diferentes lugares:

### Import Maps (Root Container)

**Desarrollo:** `backoffice-root-container/config/dev/importmap.json`
```json
{
  "imports": {
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@6.0.3/...",
    "react": "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm",
    "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm"
  }
}
```

**Local:** `backoffice-root-container/config/local/importmap.json`
```json
{
  "imports": {
    "@link/backoffice-login": "//localhost:8088/link-backoffice-login.js",
    "@link/backoffice-bundle": "//localhost:3001/link-backoffice-bundle.js",
    "@link/backoffice-product": "//localhost:3003/link-backoffice-product.js",
    "@link/backoffice-mcc": "//localhost:3004/link-backoffice-mcc.js",
    "@link/backoffice-header": "//localhost:8087/link-backoffice-header.js",
    "@link/backoffice-menu": "//localhost:8086/link-backoffice-menu.js"
  }
}
```

### API URLs (Microfrontends)

Configuradas en `src/infrastructure/config/httpClient.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000/api/v1';
```

## 📝 Crear archivos .env (Futuro)

Si necesitas agregar variables de entorno:

### 1. Crear archivo .env en la raíz del microfrontend

```bash
cd mfe/mf-backoffice-XXX
touch .env
```

### 2. Agregar variables

```env
# .env
NODE_ENV=development
API_URL=http://localhost:3000/api/v1
ENABLE_LOGGING=true
```

### 3. Crear .env.example (versión sin datos sensibles)

```env
# .env.example
NODE_ENV=development
API_URL=http://localhost:3000/api/v1
ENABLE_LOGGING=true
```

### 4. Agregar .env al .gitignore

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

### 5. Configurar webpack para usar variables

En `webpack.config.js`:

```javascript
const webpack = require('webpack');
const dotenv = require('dotenv');

// Cargar variables de entorno
const env = dotenv.config().parsed;

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    // ... config
  });

  return merge(defaultConfig, {
    plugins: [
      // Inyectar variables de entorno
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)
      })
    ]
  });
};
```

### 6. Instalar dotenv

```bash
npm install --save-dev dotenv
```

### 7. Usar en el código

```typescript
const apiUrl = process.env.API_URL || 'http://localhost:3000/api/v1';
const enableLogging = process.env.ENABLE_LOGGING === 'true';
```

## 🔒 Seguridad

### ⚠️ NUNCA subir al repositorio:

- `.env` con credenciales reales
- Tokens de autenticación
- API keys
- Secretos de JWT
- Contraseñas de bases de datos

### ✅ SIEMPRE:

- Usar `.env.example` como plantilla
- Agregar `.env` al `.gitignore`
- Documentar variables necesarias
- Rotar credenciales comprometidas

## 🌐 Entornos

### Desarrollo (Local)
```env
NODE_ENV=development
API_URL=http://localhost:3000/api/v1
DEBUG=true
```

### Staging
```env
NODE_ENV=staging
API_URL=https://api-staging.ejemplo.com/api/v1
DEBUG=true
```

### Producción
```env
NODE_ENV=production
API_URL=https://api.ejemplo.com/api/v1
DEBUG=false
```

## 🔑 Variables Comunes

### JWT
```env
JWT_SECRET=tu_secreto_super_seguro_aqui
JWT_EXPIRATION=24h
```

### Base de Datos
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=backoffice
DB_USER=admin
DB_PASSWORD=password
```

### APIs Externas
```env
EXTERNAL_API_KEY=tu_api_key_aqui
EXTERNAL_API_URL=https://api.externa.com
```

### Feature Flags
```env
FEATURE_DARK_MODE=true
FEATURE_ANALYTICS=false
FEATURE_NOTIFICATIONS=true
```

## 📚 Recursos

- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [Webpack Environment Variables](https://webpack.js.org/guides/environment-variables/)
- [12 Factor App - Config](https://12factor.net/config)
