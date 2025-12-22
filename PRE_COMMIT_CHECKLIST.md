# ✅ Checklist Pre-Commit

Usa esta checklist antes de hacer tu primer commit al repositorio.

## 📋 Configuración Inicial

- [ ] **.gitignore configurado** - Verificar que ignore node_modules, dist, .env
- [ ] **README.md completo** - Instrucciones claras de instalación y uso
- [ ] **LICENSE agregada** - Actualizar con tu nombre/empresa
- [ ] **package.json actualizado** - Corregir URL del repositorio
- [ ] **Documentación creada** - CONTRIBUTING.md, CHANGELOG.md, etc.

## 🔒 Seguridad

- [ ] **No hay credenciales** - Revisar que no haya tokens, passwords, API keys
- [ ] **No hay .env** - Los archivos .env NO deben subirse
- [ ] **JWT secrets removidos** - No incluir secretos en código
- [ ] **IPs/URLs de producción** - Verificar que solo haya URLs de desarrollo

## 🧹 Limpieza

- [ ] **Sin node_modules** - No deben subirse carpetas de dependencias
- [ ] **Sin archivos de build** - dist/, build/ deben estar en .gitignore
- [ ] **Sin archivos temporales** - *.log, *.tmp, .cache/
- [ ] **Sin archivos personales** - .DS_Store, Thumbs.db, .vscode/ personal
- [ ] **Sin archivos .zip** - mf-backoffice.zip debe eliminarse o ignorarse

## 📝 Código

- [ ] **Sin console.logs** - Limpiar logs de debug innecesarios
- [ ] **Sin comentarios TODO** - Resolver o documentar en issues
- [ ] **Sin código comentado** - Eliminar código viejo comentado
- [ ] **Formateo consistente** - Ejecutar Prettier/ESLint

## 🧪 Testing

- [ ] **Tests pasan** - Ejecutar `npm test` en cada microfrontend
- [ ] **Build exitoso** - Ejecutar `npm run build` sin errores
- [ ] **Sin warnings críticos** - Resolver warnings de TypeScript

## 📦 Dependencias

- [ ] **package-lock.json actualizado** - Commit junto con package.json
- [ ] **Sin dependencias vulnerables** - Ejecutar `npm audit`
- [ ] **Versiones correctas** - Verificar compatibilidad de versiones

## 📖 Documentación

- [ ] **README actualizado** - Reflejar estado actual del proyecto
- [ ] **CHANGELOG iniciado** - Versión 1.0.0 documentada
- [ ] **URLs correctas** - Links a repo, issues, docs funcionan
- [ ] **Ejemplos funcionan** - Código de ejemplo en docs es válido

## 🔧 Configuración Git

- [ ] **Git configurado** - Nombre y email correctos
  ```bash
  git config user.name "Tu Nombre"
  git config user.email "tu@email.com"
  ```
- [ ] **Rama principal** - Decidir si usar `main` o `master`
- [ ] **Remoto agregado** - Configurar origin con URL correcta

## 🚀 Comandos de Verificación

```bash
# 1. Ver archivos que se subirán
git status

# 2. Revisar cambios
git diff

# 3. Verificar vulnerabilidades
npm audit

# 4. Limpiar cache si hay problemas
git rm -r --cached .
git add .

# 5. Ver tamaño del repositorio
git count-objects -vH
```

## 📤 Primer Commit

Una vez completada la checklist:

```bash
# 1. Agregar todos los archivos
git add .

# 2. Verificar qué se agregará
git status

# 3. Commit inicial
git commit -m "feat: configuración inicial del backoffice con microfrontends Single-SPA

- Configuración de 7 microfrontends (login, header, menu, bundle, product, mcc)
- Arquitectura hexagonal en microfrontends de gestión
- Tailwind CSS 3 integrado en todos los MF
- React 18 + TypeScript 5
- Scripts de instalación y inicio automatizados
- Documentación completa (README, CONTRIBUTING, CHANGELOG)
- Sistema de autenticación JWT
- Integración con BFF en puerto 3000"

# 4. Push al remoto
git push -u origin main
```

## 🎯 Post-Commit

Después del primer commit:

- [ ] **Verificar en GitHub/GitLab** - Repo se ve correctamente
- [ ] **Probar clone** - `git clone` funciona
- [ ] **CI/CD** - Configurar GitHub Actions si es necesario
- [ ] **Protección de ramas** - Configurar branch protection rules
- [ ] **Issues/Projects** - Crear issues iniciales
- [ ] **Wiki** - Iniciar documentación adicional

## ⚠️ Errores Comunes

### Archivo muy grande
```bash
# Si agregaste archivo >100MB por error
git rm --cached archivo-grande.zip
echo "archivo-grande.zip" >> .gitignore
git commit -m "fix: remover archivo grande"
```

### Credenciales subidas
```bash
# IMPORTANTE: Rotar credenciales inmediatamente
# Remover del historio es complejo, mejor:
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch ruta/al/archivo" \
  --prune-empty --tag-name-filter cat -- --all
```

### node_modules subido
```bash
git rm -r --cached node_modules
echo "node_modules/" >> .gitignore
git commit -m "fix: remover node_modules del repo"
```

## 📞 Ayuda

Si tienes dudas:
1. Ver [GIT_SETUP.md](GIT_SETUP.md)
2. Consultar [Git Documentation](https://git-scm.com/doc)
3. Usar `git help <comando>`

---

**¡Importante!** Una vez que hagas push, los archivos son públicos (o visibles para el equipo). Asegúrate de revisar TODO antes de subir.
