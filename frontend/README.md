# Frontend SPA - Cálculo de Precio Indexado de Energía (NEMON)

Aplicación Single Page Application (SPA) desarrollada en **React 18**, **TypeScript** y **Tailwind CSS**, consumiendo la API REST del backend para el cálculo y visualización de precios indexados de energía.

---

## 🌍 Entorno de Producción

- **Plataforma Web (Live)**: [https://nemon.robbytherobot.tech](https://nemon.robbytherobot.tech)

---

## 🚀 Requisitos del Sistema

- **Node.js**: `v18.0.0` o superior
- **Gestor de Paquetes**: `npm` o `pnpm`

---

## 🛠️ Instalación y Configuración

1. **Ingresar al directorio frontend**:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar el archivo de entorno (`.env`)**:
   ```bash
   cp .env.example .env
   ```
   Ajusta la URL base del backend en `.env`:
   ```env
   VITE_API_BASE_URL=/api
   ```

4. **Iniciar el servidor de desarrollo (Vite)**:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`.

5. **Compilar para Producción**:
   ```bash
   npm run build
   ```

---

## 🧪 Testing

El proyecto utiliza un enfoque bimodal para garantizar la calidad del código, separando el entorno local de las pruebas reales de integración:

1. **Tests Unitarios (Vitest + React Testing Library)**
   Simulan la API y prueban la lógica de los componentes de forma aislada. No requieren servidor backend.
   ```bash
   npm run test:unit
   ```

2. **Tests End-to-End (Playwright)**
   Lanzan un navegador real y prueban el flujo completo (E2E), como el rellenado del formulario y validación del cálculo contra la API. Permite separar el entorno mediante comandos:
   - **Probar contra entorno Local** (`localhost:5173`):
     ```bash
     npm run test:e2e
     ```
   - **Probar contra Producción** (`nemon.robbytherobot.tech`):
     ```bash
     npm run test:e2e:prod
     ```

---

## 🎨 Estética "Dark Electric Tech"

La interfaz cuenta con una línea gráfica profesional diseñada para el sector energético:
- Tema oscuro responsivo con paleta Slate / Cían Eléctrico (`sky-500`, `cyan-400`).
- Tarjetas con efecto **Glassmorphism** y animaciones fluidas.
- Formulario de cálculo dinámico con plantillas rápidas de fórmulas.
- Paginación y filtrado automático por rango de fechas (con formato local `dd/mm/yyyy`) y botón de Reset.
- Despliegue en producción servido por Nginx, que actúa como Reverse Proxy para las peticiones a la API.
