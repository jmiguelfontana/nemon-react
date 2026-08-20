# GUÍA GENERAL DEL PROYECTO (NEMON - PRECIO INDEXADO DE ENERGÍA)

Este proyecto está dividido en dos módulos independientes con sus propias especificaciones técnicas y documentación en Git:

1. **Backend (PHP 8.4.4 / Laravel)**: [backend/AGENTS.md](file:///d:/Projects/php/nemon-react/backend/AGENTS.md)
   - API REST en PHP 8.4.4 y Laravel con uso exclusivo de Eloquent ORM.
   - Endpoint `POST /api/calculate` con códigos HTTP 200, 400, 404 y 500.
   - Evaluación matemática segura sin `eval()`.
   - Documentación interactiva Swagger / OpenAPI accesible en `/api/documentation`.
   - Mantenimiento continuo del archivo `backend/README.md`.

2. **Frontend (React 18.2.0 / TypeScript / Tailwind CSS)**: [frontend/AGENTS.md](file:///d:/Projects/php/nemon-react/frontend/AGENTS.md)
   - SPA moderna en React 18.2.0 con TypeScript estricto y Tailwind CSS.
   - Estética visual "Dark Electric Tech" para empresa del sector energético.
   - Visualización de datos por hora y calculadora interactiva.
   - Mantenimiento continuo del archivo `frontend/README.md`.
