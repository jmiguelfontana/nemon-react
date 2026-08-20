import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { Database, Activity, Euro, RefreshCw, ChevronLeft, ChevronRight, Filter, Calendar } from 'lucide-react';
import { getConsumptions, getPrices } from '../services/api';
export default function DataTable() {
    const [activeTab, setActiveTab] = useState('consumptions');
    const [consumptions, setConsumptions] = useState([]);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startDateFilter, setStartDateFilter] = useState('2025-03-01');
    const [endDateFilter, setEndDateFilter] = useState('2025-03-31');
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === 'consumptions') {
                const data = await getConsumptions(startDateFilter, endDateFilter);
                setConsumptions(data);
            }
            else {
                const data = await getPrices(startDateFilter, endDateFilter);
                setPrices(data);
            }
        }
        catch (err) {
            setError('No se pudieron cargar los datos desde la API REST backend.');
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setCurrentPage(1);
        fetchData();
    }, [activeTab]);
    function resetFilter() {
        setStartDateFilter('2025-03-01');
        setEndDateFilter('2025-03-31');
        setCurrentPage(1);
        // fetchData will be called by another effect or directly but since activeTab didn't change
        // we need to call it directly after state updates, though setState is async. 
        // It's better to trigger it explicitly but with updated values.
        setTimeout(fetchData, 0);
    }
    const activeData = useMemo(() => {
        return activeTab === 'consumptions' ? consumptions : prices;
    }, [activeTab, consumptions, prices]);
    const totalPages = Math.ceil(activeData.length / itemsPerPage) || 1;
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return activeData.slice(start, start + itemsPerPage);
    }, [activeData, currentPage, itemsPerPage]);
    function getHeatmapClass(value, type) {
        if (value === null || value === undefined)
            return 'text-slate-600 bg-slate-950/40';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (type === 'consumptions') {
            if (num > 1.5)
                return 'text-amber-300 font-bold bg-amber-400/10 border-amber-400/20';
            if (num > 0.8)
                return 'text-sky-300 bg-sky-500/10';
            return 'text-slate-300';
        }
        else {
            if (num > 0.09)
                return 'text-amber-300 font-bold bg-amber-400/15';
            if (num > 0.06)
                return 'text-cyan-300 bg-cyan-400/10';
            return 'text-slate-300';
        }
    }
    function formatDate(dateStr) {
        if (!dateStr)
            return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    }
    const hoursArray = Array.from({ length: 25 }, (_, i) => i + 1);
    return (_jsxs("div", { className: "glass-card p-6 sm:p-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2.5 rounded-xl bg-slate-800 text-sky-400 border border-slate-700", children: _jsx(Database, { className: "w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold text-slate-100", children: "Registros Horarios de Base de Datos" }), _jsx("p", { className: "text-xs text-slate-400", children: "Consulta los datos almacenados de consumos (kWh) y precios OMIE (\u20AC/kWh)" })] })] }), _jsxs("div", { className: "flex items-center p-1 bg-slate-950/90 rounded-xl border border-slate-800 self-start md:self-auto", children: [_jsxs("button", { onClick: () => setActiveTab('consumptions'), className: `flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${activeTab === 'consumptions' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`, children: [_jsx(Activity, { className: "w-4 h-4" }), _jsx("span", { children: "Consumos (kWh)" })] }), _jsxs("button", { onClick: () => setActiveTab('prices'), className: `flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${activeTab === 'prices' ? 'bg-cyan-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'}`, children: [_jsx(Euro, { className: "w-4 h-4" }), _jsx("span", { children: "Precios OMIE (\u20AC/kWh)" })] })] })] }), _jsxs("div", { className: "mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-300", children: [_jsx(Filter, { className: "w-3.5 h-3.5 text-sky-400" }), _jsx("span", { children: "Filtrar rango:" })] }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "w-3.5 h-3.5 text-white absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" }), _jsx("input", { value: startDateFilter, onChange: (e) => setStartDateFilter(e.target.value), type: "date", className: "pl-8 pr-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 outline-none [color-scheme:dark]" })] }), _jsx("span", { className: "text-xs text-slate-500", children: "hasta" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "w-3.5 h-3.5 text-white absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" }), _jsx("input", { value: endDateFilter, onChange: (e) => setEndDateFilter(e.target.value), type: "date", className: "pl-8 pr-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 outline-none [color-scheme:dark]" })] }), _jsx("button", { onClick: resetFilter, className: "px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-xs font-semibold border border-sky-500/30 transition-all", children: "Reset" })] }), _jsxs("button", { onClick: fetchData, className: "flex items-center space-x-1.5 text-xs text-slate-400 hover:text-sky-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-all ml-auto", children: [_jsx(RefreshCw, { className: `w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}` }), _jsx("span", { children: "Actualizar" })] })] }), loading ? (_jsx("div", { className: "py-12 text-center", children: _jsxs("div", { className: "inline-flex items-center space-x-3 text-sky-400", children: [_jsx(RefreshCw, { className: "w-6 h-6 animate-spin" }), _jsx("span", { className: "text-sm font-semibold", children: "Cargando registros desde la API..." })] }) })) : error ? (_jsx("div", { className: "p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center", children: error })) : activeData.length === 0 ? (_jsx("div", { className: "py-12 text-center text-slate-400 text-xs", children: "No se encontraron registros en la base de datos para el rango seleccionado." })) : (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-800/80 shadow-inner", children: _jsxs("table", { className: "w-full text-xs text-left", children: [_jsx("thead", { className: "bg-slate-950 text-slate-300 font-semibold border-b border-slate-800 uppercase tracking-wider sticky top-0", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-4 min-w-[110px] bg-slate-950 border-r border-slate-800", children: "Fecha" }), hoursArray.map(h => (_jsxs("th", { className: "py-3 px-2 text-center min-w-[55px]", children: ["h", h] }, h)))] }) }), _jsx("tbody", { className: "divide-y divide-slate-800/50 bg-slate-900/40 font-mono", children: paginatedData.map(row => (_jsxs("tr", { className: "hover:bg-slate-800/40 transition-colors", children: [_jsx("td", { className: "py-2.5 px-4 font-semibold text-slate-200 bg-slate-950/80 border-r border-slate-800", children: formatDate(row.date) }), hoursArray.map(h => {
                                                const val = row[`h${h}`];
                                                return (_jsx("td", { className: `py-2.5 px-2 text-center transition-all ${getHeatmapClass(val, activeTab)}`, children: val !== null && val !== undefined ? val : '-' }, h));
                                            })] }, row.id))) })] }) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-400 pt-2", children: [_jsxs("span", { children: ["Mostrando p\u00E1gina ", currentPage, " de ", totalPages, " (", activeData.length, " registros totales)"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { onClick: () => setCurrentPage(p => Math.max(1, p - 1)), disabled: currentPage === 1, className: "p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all", children: _jsx(ChevronLeft, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setCurrentPage(p => Math.min(totalPages, p + 1)), disabled: currentPage >= totalPages, className: "p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all", children: _jsx(ChevronRight, { className: "w-4 h-4" }) })] })] })] }))] }));
}
