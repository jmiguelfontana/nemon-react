import axios from 'axios';
// Forzamos la base URL a '/api' para que el tráfico SIEMPRE pase por los proxies
// (Vite en desarrollo y Nginx en producción), evitando problemas de CORS o resolución de localhost.
const API_BASE_URL = '/api';
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
/**
 * Llama al endpoint POST /api/calculate
 */
export async function calculateEnergy(data) {
    const response = await apiClient.post('calculate', data);
    return response.data;
}
/**
 * Llama al endpoint GET /api/consumptions
 */
export async function getConsumptions(startDate, endDate) {
    const params = {};
    if (startDate)
        params.start_date = startDate;
    if (endDate)
        params.end_date = endDate;
    const response = await apiClient.get('consumptions', { params });
    return response.data;
}
/**
 * Llama al endpoint GET /api/prices
 */
export async function getPrices(startDate, endDate) {
    const params = {};
    if (startDate)
        params.start_date = startDate;
    if (endDate)
        params.end_date = endDate;
    const response = await apiClient.get('prices', { params });
    return response.data;
}
/**
 * Verifica la salud de la API
 */
export async function checkApiHealth() {
    try {
        await apiClient.get('consumptions', {
            params: { start_date: '2025-01-01', end_date: '2025-01-01', limit: 1 }
        });
        return true;
    }
    catch (error) {
        // Si da un error de validación (422) significa que el backend está vivo y contestando.
        if (error.response && error.response.status === 422) {
            return true;
        }
        return false;
    }
}
