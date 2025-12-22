# Guía de Configuración del Repositorio Git

## Primera vez - Inicializar repositorio

Si aún no tienes un repositorio git, ejecuta:

```bash
cd backoffice
git init
git add .
git commit -m "feat: configuración inicial del backoffice con microfrontends"
```

## Conectar con repositorio remoto

### GitHub

```bash
# Crear repositorio en GitHub primero, luego:
git remote add origin https://github.com/TU_USUARIO/backoffice.git
git branch -M main
git push -u origin main
```

### GitLab

```bash
git remote add origin https://gitlab.com/TU_USUARIO/backoffice.git
git branch -M main
git push -u origin main
```

### Bitbucket

```bash
git remote add origin https://bitbucket.org/TU_USUARIO/backoffice.git
git branch -M main
git push -u origin main
```

## Estructura de Branches

```
main
  └── develop
      ├── feature/nombre-funcionalidad
      ├── fix/nombre-bug
      └── refactor/nombre-refactor
```

## Comandos útiles

### Ver estado
```bash
git status
```

### Agregar archivos
```bash
# Agregar todos
git add .

# Agregar específicos
git add src/components/NewComponent.tsx
```

### Commit
```bash
git commit -m "feat(mcc): agregar CRUD de MCCs"
```

### Push
```bash
# Primera vez
git push -u origin nombre-branch

# Siguientes veces
git push
```

### Pull
```bash
git pull origin main
```

### Crear branch
```bash
git checkout -b feature/nueva-funcionalidad
```

### Cambiar branch
```bash
git checkout main
```

### Merge
```bash
git checkout main
git merge feature/nueva-funcionalidad
```

## Archivos ignorados (.gitignore)

Los siguientes archivos/carpetas NO se subirán al repositorio:

- `node_modules/` - Dependencias (se instalan con npm install)
- `dist/`, `build/` - Archivos compilados
- `.env*` - Variables de entorno sensibles
- `*.log` - Archivos de logs
- `.cache/` - Cache temporal
- `*.zip` - Archivos comprimidos

## Configuración de usuario Git

```bash
# Configurar nombre y email (una sola vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"

# Verificar configuración
git config --list
```

## Protección de datos sensibles

### ⚠️ NUNCA subir:

- Tokens de autenticación
- Contraseñas
- API keys
- Archivos .env con credenciales
- Datos de producción

### ✅ Usar .env.example:

Crear archivo `.env.example` con estructura sin valores reales:

```env
# .env.example
JWT_SECRET=your_jwt_secret_here
API_URL=http://localhost:3000
```

## Git LFS (Large File Storage)

Si tienes archivos grandes (>100MB):

```bash
# Instalar Git LFS
git lfs install

# Rastrear archivos grandes
git lfs track "*.zip"
git lfs track "*.mp4"

# Commit del .gitattributes
git add .gitattributes
git commit -m "chore: configurar Git LFS"
```

## Resolver conflictos

```bash
# Si hay conflictos al hacer pull
git pull origin main

# Git mostrará archivos con conflictos
# Editar archivos, buscar marcadores:
# <<<<<<< HEAD
# tu código
# =======
# código remoto
# >>>>>>> branch-name

# Después de resolver:
git add archivo-resuelto.ts
git commit -m "fix: resolver conflictos de merge"
git push
```

## Revertir cambios

```bash
# Descartar cambios no commiteados
git restore archivo.ts

# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartar cambios)
git reset --hard HEAD~1

# Revertir commit específico
git revert <commit-hash>
```

## Tags y Releases

```bash
# Crear tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Subir tag
git push origin v1.0.0

# Subir todos los tags
git push --tags

# Listar tags
git tag
```

## GitHub Actions (CI/CD)

Crear archivo `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
      working-directory: ./mfe/mf-backoffice-mcc
    
    - name: Run tests
      run: npm test
      working-directory: ./mfe/mf-backoffice-mcc
    
    - name: Build
      run: npm run build
      working-directory: ./mfe/mf-backoffice-mcc
```

## Recursos

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
