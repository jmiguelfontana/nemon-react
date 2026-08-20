import React, { useState, useEffect, useMemo } from 'react';
import { Database, Activity, Euro, RefreshCw, ChevronLeft, ChevronRight, Filter, Calendar } from 'lucide-react';
import { getConsumptions, getPrices } from '../services/api';
import type { ConsumptionRecord, PriceRecord } from '../types/energy';

export default function DataTable() {
  const [activeTab, setActiveTab] = useState<'consumptions' | 'prices'>('consumptions');
  const [consumptions, setConsumptions] = useState<ConsumptionRecord[]>([]);
  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [startDateFilter, setStartDateFilter] = useState<string>('2025-03-01');
  const [endDateFilter, setEndDateFilter] = useState<string>('2025-03-31');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      if (activeTab === 'consumptions') {
        const data = await getConsumptions(startDateFilter, endDateFilter);
        setConsumptions(data);
      } else {
        const data = await getPrices(startDateFilter, endDateFilter);
        setPrices(data);
      }
    } catch (err: any) {
      setError('No se pudieron cargar los datos desde la API REST backend.');
    } finally {
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

  function getHeatmapClass(value: number | string | null, type: 'consumptions' | 'prices'): string {
    if (value === null || value === undefined) return 'text-slate-600 bg-slate-950/40';
    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (type === 'consumptions') {
      if (num > 1.5) return 'text-amber-300 font-bold bg-amber-400/10 border-amber-400/20';
      if (num > 0.8) return 'text-sky-300 bg-sky-500/10';
      return 'text-slate-300';
    } else {
      if (num > 0.09) return 'text-amber-300 font-bold bg-amber-400/15';
      if (num > 0.06) return 'text-cyan-300 bg-cyan-400/10';
      return 'text-slate-300';
    }
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  }

  const hoursArray = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="glass-card p-6 sm:p-8">
      
      {/* Table Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-800 text-sky-400 border border-slate-700">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Registros Horarios de Base de Datos</h2>
            <p className="text-xs text-slate-400">Consulta los datos almacenados de consumos (kWh) y precios OMIE (€/kWh)</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center p-1 bg-slate-950/90 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('consumptions')}
            className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'consumptions' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Consumos (kWh)</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
              activeTab === 'prices' ? 'bg-cyan-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Euro className="w-4 h-4" />
            <span>Precios OMIE (€/kWh)</span>
          </button>
        </div>

      </div>

      {/* Date Filters Bar */}
      <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-sky-400" />
            <span>Filtrar rango:</span>
          </div>
          <div className="relative">
            <Calendar className="w-3.5 h-3.5 text-white absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              type="date"
              className="pl-8 pr-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 outline-none [color-scheme:dark]"
            />
          </div>
          <span className="text-xs text-slate-500">hasta</span>
          <div className="relative">
            <Calendar className="w-3.5 h-3.5 text-white absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              type="date"
              className="pl-8 pr-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:border-sky-500 outline-none [color-scheme:dark]"
            />
          </div>
          <button
            onClick={resetFilter}
            className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-xs font-semibold border border-sky-500/30 transition-all"
          >
            Reset
          </button>
        </div>

        <button
          onClick={fetchData}
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-sky-300 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-all ml-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar</span>
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-flex items-center space-x-3 text-sky-400">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="text-sm font-semibold">Cargando registros desde la API...</span>
          </div>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
          {error}
        </div>
      ) : activeData.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No se encontraron registros en la base de datos para el rango seleccionado.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border border-slate-800/80 shadow-inner">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800 uppercase tracking-wider sticky top-0">
                <tr>
                  <th className="py-3 px-4 min-w-[110px] bg-slate-950 border-r border-slate-800">Fecha</th>
                  {hoursArray.map(h => (
                    <th key={h} className="py-3 px-2 text-center min-w-[55px]">
                      h{h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-900/40 font-mono">
                {paginatedData.map(row => (
                  <tr 
                    key={row.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Date Column */}
                    <td className="py-2.5 px-4 font-semibold text-slate-200 bg-slate-950/80 border-r border-slate-800">
                      {formatDate(row.date)}
                    </td>
                    {/* Hours h1 to h25 */}
                    {hoursArray.map(h => {
                      const val = row[`h${h}`];
                      return (
                        <td
                          key={h}
                          className={`py-2.5 px-2 text-center transition-all ${getHeatmapClass(val, activeTab)}`}
                        >
                          {val !== null && val !== undefined ? val : '-'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Mostrando página {currentPage} de {totalPages} ({activeData.length} registros totales)</span>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
