# MF Backoffice Business Size

Microfrontend para gestión de Tamaños de Comercio (Business Sizes)

## Desarrollo

```bash
npm install
npm start
```

El microfrontend se ejecutará en http://localhost:3005

## Arquitectura

- **Domain**: Entidades y repositorios
- **Application**: Casos de uso
- **Infrastructure**: Implementaciones de repositorios y configuración
- **UI**: Componentes React y páginas

## Rutas

- `/bo/business-size` - Lista de tamaños de comercio
- `/bo/business-size/create` - Crear nuevo tamaño
- `/bo/business-size/edit/:id` - Editar tamaño existente

## Tamaños Disponibles

- INDIVIDUAL
- MICRO
- SMALL
- MEDIUM
- LARGE
