# MF Backoffice MCC

Microfrontend para gestión de MCCs (Merchant Category Codes)

## Desarrollo

```bash
npm install
npm start
```

El microfrontend se ejecutará en http://localhost:3004

## Arquitectura

- **Domain**: Entidades y repositorios
- **Application**: Casos de uso
- **Infrastructure**: Implementaciones de repositorios y configuración
- **UI**: Componentes React y páginas

## Rutas

- `/bo/mccs` - Lista de MCCs
- `/bo/mccs/create` - Crear nuevo MCC
- `/bo/mccs/edit/:id` - Editar MCC existente
