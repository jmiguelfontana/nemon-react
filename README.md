# NEMON - Prueba Técnica de Indexado de Energía

Solución web completa compuesta por una **API REST en PHP 8.4.4 / Laravel** y un **Frontend SPA en React 18, TypeScript y Tailwind CSS** para gestionar y calcular precios indexados de energía según la especificación técnica de **NEMON**.

---

## 🌍 Demo en Producción (Live)

El proyecto se encuentra desplegado de forma automatizada y puedes probarlo en vivo aquí:
- 🎨 **Plataforma Web**: [https://nemon.robbytherobot.tech](https://nemon.robbytherobot.tech)
- 📖 **Documentación API (Swagger)**: [https://nemon.robbytherobot.tech/api/documentation](https://nemon.robbytherobot.tech/api/documentation)

---

## 🏗️ Arquitectura del Sistema

```
nemon/
├── backend/            # API REST en PHP 8.4.4 + Laravel + Eloquent ORM + Swagger
│   ├── app/            # Controladores, Servicios, Modelos Eloquent y Form Requests
│   ├── database/       # Migraciones y Seeders con datos de prueba (Marzo 2025)
│   ├── tests/          # Tests automatizados (PHPUnit)
│   ├── AGENTS.md       # Especificaciones técnicas del Backend
│   └── README.md       # Guía de instalación y uso del Backend
├── frontend/           # SPA en React 18 + TypeScript + Vite + Tailwind CSS
│   ├── src/            # Componentes React, Tipos TS y Cliente API Axios
│   ├── AGENTS.md       # Especificaciones técnicas y guía estética del Frontend
│   └── README.md       # Guía de instalación y uso del Frontend
├── AGENTS.md           # Guía general de especificaciones del repositorio
└── README.md           # Presentación general de la prueba técnica
```

### 📂 Documentación de Módulos (Enlaces Directos)

- ⚙️ **Módulo Backend**: [backend/README.md](backend/README.md) | Especificaciones: [backend/AGENTS.md](backend/AGENTS.md)
- 🎨 **Módulo Frontend**: [frontend/README.md](frontend/README.md) | Especificaciones: [frontend/AGENTS.md](frontend/AGENTS.md)
- 📋 **Especificación General**: [AGENTS.md](AGENTS.md)

---

## 🧠 Decisiones Técnicas Destacadas

Al existir libertad tecnológica en las bases de la prueba, se ha optado por una **Arquitectura Desacoplada (API REST + SPA)** para maximizar la escalabilidad y aplicar separación de responsabilidades (*Separation of Concerns*). Las tecnologías elegidas y su justificación son:

1. **Backend (Laravel 11 + PHP 8.4)**: Framework robusto que fomenta buenas prácticas, inyección de dependencias y código limpio.
2. **ORM (Eloquent)**: Utilizado para la capa de persistencia con MySQL, garantizando una protección nativa contra inyecciones SQL en lugar de usar consultas crudas.
3. **Cálculo Matemático (`nxp/math-executor`)**: Se delegó el parseo de la fórmula del cliente a esta librería léxica, **prohibiendo** explícitamente el uso de `eval()` para evitar vulnerabilidades de *Remote Code Execution* (RCE).
4. **Frontend (React 18 + TypeScript)**: Proporciona tipado estricto y control total sobre el estado reactivo, evitando errores en tiempo de ejecución al manipular los datos de consumos.
5. **Documentación como Contrato (Swagger/OpenAPI)**: Se ha integrado Swagger en el backend para autogenerar una interfaz interactiva de la API, sirviendo como contrato estricto de datos.
6. **Infraestructura (Docker + Nginx)**: Todo el proyecto está orquestado mediante contenedores para asegurar la *paridad entre desarrollo y producción*, utilizando Nginx como proxy inverso para aislar la API de forma segura.

---

## 🐳 Inicio Rápido con Docker Compose (Recomendado)

Para desplegar la solución completa (Base de datos MySQL, API Backend Laravel y Frontend SPA React 18) en un solo comando:

```bash
docker compose up --build
```

- 🎨 **Frontend SPA**: `http://localhost:5173`
- ⚙️ **Backend API REST**: `http://localhost:8000`
- 📖 **Swagger UI**: `http://localhost:8000/api/documentation`

---

## 🔄 Integración y Despliegue Continuo (CI/CD con GitHub Actions)

El proyecto cuenta con un flujo automatizado de CI/CD configurado en [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml):

- **Cada `git push` a `main`**:
  1. Ejecuta automáticamente los tests de Laravel en PHP 8.4 con MySQL.
  2. Construye los contenedores Docker y despliega automáticamente vía SSH en el servidor de producción (VPS en OVHcloud).
  3. El tráfico está securizado y protegido mediante el WAF de Cloudflare, con un proxy inverso gestionado por Nginx.

---

## ⚡ Inicio Rápido Manual (Sin Docker)

### 1. Levantando el Backend (API REST)
*(Ver guía detallada en [backend/README.md](backend/README.md))*
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan l5-swagger:generate
php artisan serve
```
> La API REST quedará disponible en `http://localhost:8000`.  
> Documentación Swagger UI disponible en `http://localhost:8000/api/documentation`.

### 2. Levantando el Frontend (React SPA)
*(Ver guía detallada en [frontend/README.md](frontend/README.md))*
```bash
cd frontend
npm install
npm run dev
```
> La interfaz web quedará disponible en `http://localhost:5173`.

---

## 📊 Especificación de Negocio y Fórmula

El cálculo del precio indexado se realiza evaluando la fórmula configurada por el usuario (ej. `([OMIE_MD] * 0.6) + 0.88`) para cada día y hora del periodo solicitado:

$$\text{Precio Indexado} = \frac{\sum (\text{Resultado}(\text{Fórmula}) \times \text{Consumo Hora})}{\sum \text{Consumo Hora}}$$

- **Evaluación Segura (Prevención RCE)**: Se prohíbe el uso de la función nativa `eval()` de PHP para prevenir vulnerabilidades de ejecución de código remoto. La evaluación se realiza a través de un analizador léxico especializado (**`nxp/math-executor`**) que procesa matemáticamente la fórmula tras inyectar el precio horario OMIE.
- **Tratamiento Horario (`h1` - `h25`)**: Manejo adecuado de horas pico/valle y cambio de horario DST.
