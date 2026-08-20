# ESPECIFICACIONES TÉCNICAS DEL FRONTEND (NEMON - PRECIO INDEXADO DE ENERGÍA)

Este documento define la arquitectura, tipado y la guía de diseño visual (UI/UX) para la aplicación web de NEMON (Compañía Eléctrica).

---

## 🎨 1. GUÍA DE DISEÑO ESTÉTICO (SECTOR ELÉCTRICO / ENERGY TECH)

Como aplicación para una **compañía comercializadora y consultora energética (Nemon)**, la interfaz debe proyectar **innovación, claridad en los datos, tecnología eléctrica y máximo dinamismo visual**.

### 1.1 Paleta de Colores
- **Fondo / Tema Principal**: Slate Oscuro y Navy Profundo (`bg-slate-950` / `bg-slate-900`).
- **Color Primario (Electric Power)**: Azul Eléctrico y Cían Energético (`sky-500`, `cyan-400`, gradientes `bg-gradient-to-r from-sky-500 to-blue-600`).
- **Acentos Energéticos**: 
  - Ámbar/Rayo (`amber-400` / `yellow-400`) para fórmulas e íconos de alto voltaje.
  - Verde Esmeralda Eco (`emerald-400`) para resultados positivos y consumos eficientes.
- **Bordes y Cristales (Glassmorphism)**: Tarjetas translúcidas con desfoque de fondo (`backdrop-blur-md bg-slate-900/70 border border-slate-800/80 hover:border-sky-500/40`).

### 1.2 Tipografía e Íconos
- **Fuente**: *Inter* o *Plus Jakarta Sans* para máxima legibilidad de valores numéricos, kWh y euros (€).
- **Iconografía (Lucide / Heroicons)**: Íconos del sector eléctrico (Rayos ⚡, Gráficos 📊, Calendarios 📅, Fórmulas 🧮, Base de Datos 🗄️).

### 1.3 Micro-animaciones e Interactividad
- Efecto de resplandor (*glowing effect*) alrededor de la tarjeta de **Precio Indexado**.
- Transiciones suaves (`transition-all duration-300`) en hovers de botones y tarjetas.
- Badge pulsante de "Mercado OMIE Activo" en el header.
- Resaltado térmico en la tabla de datos para visualizar horas pico y valle.

---

## 🧩 2. COMPONENTES PRINCIPALES

1. **`HeaderNav.tsx`**:
   - Branding de Nemon Energía con logo, título del sistema y badge de estado de API REST.

2. **`CalculatorForm.tsx`**:
   - Selectores de fecha con rangos rápidos ("Mes Actual", "Últimos 30 días").
   - Campo de fórmula interactivo con chips/botones para insertar rápido el token `[OMIE_MD]`.
   - Botón "Calcular Precio Indexado" con animación de carga / spinner.

3. **`ResultCard.tsx`**:
   - Métricas clave estilo dashboard energético:
     - **Precio Indexado Calculado (€/kWh)** en gran formato con degradado eléctrico.
     - Total Importes Acumulados (€).
     - Total Consumo Energético Acumulado (kWh).

4. **`DataTable.tsx`**:
   - Tabla responsiva con pestañas para **Consumos (kWh)** y **Precios OMIE_MD (€/kWh)**.
   - Paginación y visualización clara de la distribución horaria `h1` a `h25`.

5. **`ErrorMessage.tsx`**:
   - Alertas dinámicas con diseño dark mode para comunicar errores `400 Bad Request`, `404 Not Found` (datos no encontrados) y `500 Internal Server Error`.

---

## 📡 3. TIPADO TYPESCRIPT Y CLIENTE API

### Interfaces (`src/types/energy.ts`)
```typescript
export interface CalculateRequest {
  start_date: string;
  end_date: string;
  formula: string;
}

export interface CalculateResponse {
  price_indexed: number;
  total_importes: number;
  total_consumos: number;
}

export interface ConsumptionRecord {
  id: number;
  date: string;
  [key: string]: number | string | null; // h1 to h25
}

export interface PriceRecord {
  id: number;
  date: string;
  [key: string]: number | string | null; // h1 to h25
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}
```

---

## 📝 4. DOCUMENTACIÓN Y README DE GIT (FRONTEND)

- Mantenimiento estricto del archivo `frontend/README.md`.
- Debe incluir requisitos (`Node.js 18+`), instrucciones de instalación (`npm install`), configuración de variables de entorno (`.env` con `VITE_API_BASE_URL`), comandos de ejecución en desarrollo (`npm run dev`) y compilación para producción (`npm run build`).

---

## 🛠️ 5. REGLAS DE DESARROLLO

- **React 18**: Usar Componentes Funcionales y Hooks (`useState`, `useEffect`).
- **TypeScript Estricto**: Sin `any`.
- **Estilo Eléctrico & Premium**: Mantener la estética visual oscura con acentos cían/azul eléctrico y glassmorphism.
- **Testing Bimodal**: 
  - **Unit Testing**: Vitest y React Testing Library (comando: `npm run test:unit`) con mocks de la API (separación total del backend).
  - **E2E Testing**: Playwright para pruebas de integración reales en los entornos locales y de producción (comandos: `npm run test:e2e` y `npm run test:e2e:prod`).
- **Separación de Entornos (Local vs Prod)**: Asegurar en todo momento que el frontend funcione perfectamente tanto en local (Vite dev server) como en producción (Nginx/Docker), gestionando las variables de entorno (`.env`) y proxies de manera optimizada y sin configuraciones hardcodeadas.
- **README Actualizado**: Mantener `frontend/README.md` alineado con cada cambio o nuevo componente/dependencia agregada.
