import { test, expect } from '@playwright/test';

test.describe('Flujo E2E - Nemon Energy Calculator', () => {
  test('La página carga correctamente y muestra el estado de la API', async ({ page }) => {
    // Al usar baseURL en playwright.config.ts, '/' nos lleva a localhost o a tu dominio en producción
    await page.goto('/');

    // Comprobamos que el título de la pestaña sea correcto (ajusta según tu index.html)
    await expect(page).toHaveTitle(/Nemon/i);

    // Verificamos que se muestre el header
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verificamos que la API conecte (si la API de producción/local está funcionando, esto debería ponerse en verde)
    // El texto cambiará de "Conectando..." a "API Conectada"
    const apiStatus = page.locator('text=API Conectada');
    // Esperamos a que la petición health check termine y se ponga verde
    await expect(apiStatus).toBeVisible({ timeout: 10000 });
  });

  test('El formulario realiza la petición al calcular y muestra un resultado o un error', async ({ page }) => {
    await page.goto('/');

    // 1. Buscamos el botón por su nombre visible y hacemos clic
    const botonCalcular = page.getByRole('button', { name: /Calcular Precio Indexado/i });
    await expect(botonCalcular).toBeVisible();
    await botonCalcular.click();

    // 2. Al hacer clic, la aplicación hará la petición a la API.
    // Dependiendo de si la base de datos tiene consumos en esas fechas o está vacía, 
    // recibiremos un resultado exitoso o un error 404 de la API.
    // Buscamos cualquiera de los dos elementos en la pantalla.
    
    const resultadoExito = page.getByText('Resultado del Cálculo');
    const mensajeError = page.locator('.bg-rose-500\\/10'); // La caja roja de error de ErrorMessage.tsx

    // 3. Verificamos que aparezca UNO de los dos (pasando el test si el frontend reacciona correctamente)
    await expect(async () => {
      const exito = await resultadoExito.isVisible();
      const error = await mensajeError.isVisible();
      expect(exito || error).toBeTruthy();
    }).toPass({ timeout: 10000 });
  });
});
