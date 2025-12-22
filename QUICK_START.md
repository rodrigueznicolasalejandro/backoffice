# ⚡ Quick Start

## 🚀 Inicio Rápido (Primera vez)

```powershell
# 1. Instalar todas las dependencias
.\install-all.ps1

# 2. Iniciar todos los servicios
.\start-all.ps1

# 3. Abrir navegador en http://localhost:9000
```

## 📦 Instalación Manual

```bash
# Root Container
cd backoffice-root-container && npm install

# Microfrontends
cd mfe/mf-backoffice-login && npm install
cd ../mf-backoffice-header && npm install
cd ../mf-backoffice-menu && npm install
cd ../mf-backoffice-bundle && npm install
cd ../mf-backoffice-product && npm install
cd ../mf-backoffice-mcc && npm install
```

## 🏃 Iniciar Servicios Individualmente

```bash
# Root Container (puerto 9000)
cd backoffice-root-container && npm start

# Login (puerto 8088)
cd mfe/mf-backoffice-login && npm start

# Header (puerto 8087)
cd mfe/mf-backoffice-header && npm start

# Menu (puerto 8086)
cd mfe/mf-backoffice-menu && npm start

# Bundle (puerto 3001)
cd mfe/mf-backoffice-bundle && npm start

# Product (puerto 3003)
cd mfe/mf-backoffice-product && npm start

# MCC (puerto 3004)
cd mfe/mf-backoffice-mcc && npm start
```

## 🌐 URLs Principales

| Servicio | URL |
|----------|-----|
| Root | http://localhost:9000 |
| Login | http://localhost:9000/auth |
| Dashboard | http://localhost:9000/bo/inicio |
| Productos | http://localhost:9000/bo/products |
| Paquetes | http://localhost:9000/bo/paquetes |
| MCCs | http://localhost:9000/bo/mccs |

## 🐛 Troubleshooting

### Puerto en uso

```powershell
# Ver qué proceso usa el puerto
netstat -ano | findstr :PUERTO

# Matar proceso
taskkill /PID <PID> /F
```

### Limpiar y reinstalar

```bash
# En cada microfrontend
rm -rf node_modules package-lock.json
npm install
```

### Cache de Webpack

```bash
rm -rf node_modules/.cache
npm start
```

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests en watch mode
npm run watch-tests

# Cobertura
npm run coverage
```

## 📦 Build Producción

```bash
# Build de un microfrontend
cd mfe/mf-backoffice-XXX
npm run build

# Analizar bundle size
npm run analyze
```

## 🔑 Credenciales de Prueba

```
Usuario: admin
Password: admin123
```

## 📝 Git Commands

```bash
# Ver cambios
git status

# Agregar y commit
git add .
git commit -m "feat: descripción del cambio"

# Push
git push

# Pull
git pull

# Crear branch
git checkout -b feature/nombre-feature
```

## 🔧 Configuración VSCode Recomendada

Extensiones:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- GitLens

## 📞 Contacto/Soporte

- Issues: [GitHub Issues]
- Docs: Ver [README.md](README.md)
- Contribuir: Ver [CONTRIBUTING.md](CONTRIBUTING.md)
