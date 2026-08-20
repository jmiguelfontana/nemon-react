import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import CalculatorForm from './components/CalculatorForm';
import ResultCard from './components/ResultCard';
import ErrorMessage from './components/ErrorMessage';
import DataTable from './components/DataTable';
import { calculateEnergy } from './services/api';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';
export default function App() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    async function handleCalculate(payload) {
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await calculateEnergy(payload);
            setResult(res);
        }
        catch (err) {
            if (err.response) {
                setError({
                    status: err.response.status,
                    message: err.response.data?.error || err.response.data?.message || 'Error en la solicitud.',
                    details: err.response.data?.details,
                });
            }
            else if (err.request) {
                setError({
                    status: 0,
                    message: 'No se pudo establecer conexión con el servidor backend. Asegúrate de que la API esté disponible.',
                });
            }
            else {
                setError({
                    message: err.message || 'Ocurrió un error inesperado al procesar la solicitud.',
                });
            }
        }
        finally {
            setLoading(false);
        }
    }
    function clearError() {
        setError(null);
    }
    function clearResultAndError() {
        setResult(null);
        setError(null);
    }
    return (_jsxs("div", { className: "min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950", children: [_jsx("div", { className: "fixed top-0 left-1/4 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[140px] pointer-events-none -z-10" }), _jsx("div", { className: "fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" }), _jsx(HeaderNav, {}), _jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10", children: [_jsxs("section", { className: "text-center max-w-3xl mx-auto space-y-3", children: [_jsxs("div", { className: "inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold", children: [_jsx(Zap, { className: "w-3.5 h-3.5 text-cyan-400" }), _jsx("span", { children: "Plataforma Energ\u00E9tica de Indexaci\u00F3n OMIE" })] }), _jsx("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent", children: "C\u00E1lculo Inteligente de Precio Indexado" }), _jsx("p", { className: "text-sm sm:text-base text-slate-400 font-normal leading-relaxed", children: "Simula y eval\u00FAa f\u00F3rmulas personalizadas sobre los consumos y precios horarios del mercado mayorista el\u00E9ctrico OMIE_MD." })] }), _jsxs("section", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [_jsxs("div", { className: "lg:col-span-7 space-y-6", children: [_jsx(CalculatorForm, { loading: loading, onSubmit: handleCalculate, onClear: clearResultAndError }), _jsx(ErrorMessage, { error: error, onClose: clearError })] }), _jsx("div", { className: "lg:col-span-5", children: result ? (_jsx(ResultCard, { result: result })) : (
                                /* Placeholder when no result yet */
                                _jsxs("div", { className: "glass-card p-8 text-center border-dashed border-slate-800/80 flex flex-col items-center justify-center min-h-[380px] space-y-4", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500", children: _jsx(Sparkles, { className: "w-8 h-8 text-sky-500/50" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-slate-200", children: "Esperando Par\u00E1metros" }), _jsx("p", { className: "text-xs text-slate-400 max-w-xs mx-auto mt-1", children: "Ingresa el rango de fechas y la f\u00F3rmula arriba para ver el precio indexado y acumulados en tiempo real." })] })] })) })] }), _jsx("section", { children: _jsx(DataTable, {}) })] }), _jsx("footer", { className: "border-t border-slate-900 py-8 mt-16 bg-slate-950/60 text-xs text-slate-500 text-center", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4", children: [_jsx("p", { children: "\u00A9 2025 NEMON Energy Tech. Prueba T\u00E9cnica de C\u00E1lculo Indexado." }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "inline-flex items-center space-x-1 text-slate-400", children: [_jsx(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }), _jsx("span", { children: "PHP 8.4.4 / Laravel API" })] }), _jsx("span", { className: "text-slate-600", children: "\u2022" }), _jsx("span", { className: "text-slate-400", children: "React 18 + TypeScript" })] })] }) })] }));
}
