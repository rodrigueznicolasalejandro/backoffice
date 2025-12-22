# Guía de Contribución

## 🎯 Flujo de Trabajo

1. **Crear branch** desde `main` o `develop`
2. **Desarrollar** la funcionalidad
3. **Probar** localmente
4. **Crear Pull Request**
5. **Code Review**
6. **Merge** a rama principal

## 📝 Estándares de Código

### Naming Conventions

#### Componentes React
```typescript
// PascalCase para componentes
export const UserProfile: React.FC = () => { ... }

// camelCase para hooks
export const useAuth = () => { ... }

// PascalCase para interfaces/types
interface UserData { ... }
type ProductStatus = 'active' | 'inactive';
```

#### Archivos
```
ComponentName.tsx       # Componentes
useSomething.ts         # Hooks
serviceApi.ts          # Servicios
types.ts               # Tipos compartidos
constants.ts           # Constantes
```

### Estructura de Componentes

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SomeIcon } from 'react-icons/md';

// 1. Interfaces/Types
interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

// 2. Componente
export const ComponentName: React.FC<Props> = ({ title, onSubmit }) => {
  // 3. Hooks
  const navigate = useNavigate();
  const [state, setState] = useState();

  // 4. Effects
  useEffect(() => {
    // ...
  }, []);

  // 5. Handlers
  const handleClick = () => {
    // ...
  };

  // 6. Render
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
};
```

### Tailwind CSS

**✅ Hacer:**
```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Click
  </button>
</div>
```

**❌ Evitar:**
```tsx
<div style={{ display: 'flex', padding: '24px' }}>
  <button style={{ background: 'blue' }}>Click</button>
</div>
```

### TypeScript

**✅ Tipar todo:**
```typescript
// Interfaces para props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Types para data
type Product = {
  id: number;
  name: string;
  price: number;
};

// Generics en funciones
function createList<T>(items: T[]): T[] {
  return items;
}
```

**❌ Evitar `any`:**
```typescript
// ❌ Mal
const data: any = fetchData();

// ✅ Bien
interface ApiResponse {
  data: Product[];
  total: number;
}
const data: ApiResponse = fetchData();
```

## 🏗️ Arquitectura de Microfrontend

### Hexagonal Architecture

```
src/
├── domain/                    # Lógica de negocio pura
│   ├── entities/
│   │   └── Product.ts        # interface Product { ... }
│   └── repositories/
│       └── ProductRepository.ts  # interface ProductRepository { ... }
│
├── application/               # Casos de uso
│   ├── GetAllProducts.ts
│   ├── CreateProduct.ts
│   └── UpdateProduct.ts
│
├── infrastructure/            # Implementaciones concretas
│   ├── config/
│   │   └── httpClient.ts     # Cliente HTTP
│   └── repositories/
│       └── ProductApiRepository.ts  # implements ProductRepository
│
└── ui/                        # Presentación
    ├── components/
    ├── hooks/
    └── pages/
```

### Ejemplo de Caso de Uso

```typescript
// domain/repositories/ProductRepository.ts
export interface ProductRepository {
  getAll(): Promise<Product[]>;
  create(data: ProductCreate): Promise<Product>;
}

// application/GetAllProducts.ts
export class GetAllProductsUseCase {
  constructor(private repository: ProductRepository) {}
  
  async execute(): Promise<Product[]> {
    return await this.repository.getAll();
  }
}

// infrastructure/repositories/ProductApiRepository.ts
export class ProductApiRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await httpClient.get<Product[]>('/products');
    return response.data;
  }
}

// ui/hooks/useProducts.ts
export const useProducts = () => {
  const repository = new ProductApiRepository();
  const getAllUseCase = new GetAllProductsUseCase(repository);
  
  const fetchProducts = async () => {
    return await getAllUseCase.execute();
  };
  
  return { fetchProducts };
};
```

## 🎨 Estándares UI/UX

### Colores Consistentes

```typescript
// Usar clases de Tailwind
bg-blue-600     // Primary actions
bg-green-600    // Success
bg-red-600      // Danger
bg-gray-100     // Backgrounds
bg-white        // Cards
```

### Espaciado

```typescript
p-4    // Padding pequeño
p-6    // Padding medio
p-8    // Padding grande
gap-2  // Gap pequeño
gap-4  // Gap medio
gap-6  // Gap grande
```

### Botones

```typescript
// Primary
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Guardar
</button>

// Secondary
<button className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded hover:bg-gray-200">
  Cancelar
</button>

// Danger
<button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
  Eliminar
</button>
```

### Iconos

Usar **react-icons/md** (Material Design):

```typescript
import { MdEdit, MdDelete, MdAdd, MdSave } from 'react-icons/md';

<MdAdd className="w-5 h-5" />
```

## 🧪 Testing

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard name="Test Product" />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';

describe('useProducts', () => {
  it('fetches products', async () => {
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => {
      expect(result.current.products).toHaveLength(5);
    });
  });
});
```

## 📋 Git Commit Messages

### Formato

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, dependencias, etc.

### Ejemplos

```bash
git commit -m "feat(mcc): agregar formulario de creación de MCC"
git commit -m "fix(login): corregir validación de token JWT"
git commit -m "docs(readme): actualizar instrucciones de instalación"
git commit -m "refactor(product): aplicar arquitectura hexagonal"
git commit -m "style(menu): migrar estilos a Tailwind CSS"
git commit -m "test(mcc): agregar tests unitarios para MccForm"
```

## 🔍 Code Review Checklist

### General
- [ ] El código compila sin errores
- [ ] No hay warnings de TypeScript
- [ ] Tests pasan correctamente
- [ ] Código sigue convenciones del proyecto

### Funcionalidad
- [ ] Implementa correctamente el requerimiento
- [ ] Maneja casos edge correctamente
- [ ] Validaciones apropiadas en formularios
- [ ] Mensajes de error claros para el usuario

### Código
- [ ] Nombres descriptivos y claros
- [ ] Funciones pequeñas y enfocadas
- [ ] No hay código duplicado
- [ ] Comentarios solo donde sea necesario

### UI/UX
- [ ] Interfaz responsive
- [ ] Loading states implementados
- [ ] Error states implementados
- [ ] Consistente con diseño existente

### Performance
- [ ] No hay re-renders innecesarios
- [ ] Uso apropiado de useCallback/useMemo
- [ ] Imágenes optimizadas
- [ ] Bundle size razonable

## 🚀 Despliegue

### Pre-Deploy Checklist

- [ ] Todos los tests pasan
- [ ] Build de producción exitoso
- [ ] Variables de entorno configuradas
- [ ] README actualizado
- [ ] CHANGELOG actualizado

### Build Commands

```bash
# Build individual
cd mfe/mf-backoffice-XXX
npm run build

# Verificar bundle size
npm run analyze
```

## 📚 Recursos

- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Single-SPA Guide](https://single-spa.js.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
