import React, { useState, useRef, FormEvent } from 'react';
import { Calendar, Calculator, Sparkles, Plus, AlertCircle, Play } from 'lucide-react';
import type { CalculateRequest } from '../types/energy';

interface CalculatorFormProps {
  loading: boolean;
  onSubmit: (payload: CalculateRequest) => void;
  onClear: () => void;
}

export default function CalculatorForm({ loading, onSubmit, onClear }: CalculatorFormProps) {
  const [startDate, setStartDate] = useState<string>('2025-03-01');
  const [endDate, setEndDate] = useState<string>('2025-03-31');
  const [formula, setFormula] = useState<string>('([OMIE_MD] * 0.6) + 0.88');
  const [formError, setFormError] = useState<string | null>(null);

  const formulaPresets = [
    '([OMIE_MD] * 0.6) + 0.88',
    '[OMIE_MD] + 0.15',
    '([OMIE_MD] * 1.05) + 0.02',
    '([OMIE_MD] * 0.8) + 0.50',
  ];

  const formulaInputRef = useRef<HTMLInputElement>(null);

  function setPresetRange(start: string, end: string) {
    setStartDate(start);
    setEndDate(end);
    setFormError(null);
  }

  function insertOmieTag() {
    if (!formula.includes('[OMIE_MD]')) {
      const input = formulaInputRef.current;
      if (input && typeof input.selectionStart === 'number') {
        const start = input.selectionStart;
        const end = input.selectionEnd || start;
        const before = formula.substring(0, start);
        const after = formula.substring(end);
        
        const newFormula = `${before}[OMIE_MD]${after}`;
        setFormula(newFormula);
        
        // Update cursor position after React re-renders
        setTimeout(() => {
          const newPos = start + '[OMIE_MD]'.length;
          input.setSelectionRange(newPos, newPos);
          input.focus();
        }, 0);
      } else {
        setFormula(formula ? `${formula} + [OMIE_MD]` : '[OMIE_MD]');
      }
    }
  }

  function applyFormulaPreset(preset: string) {
    setFormula(preset);
    setFormError(null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    onClear();

    if (!startDate || !endDate) {
      setFormError('Por favor selecciona la fecha de inicio y fin.');
      return;
    }

    if (startDate > endDate) {
      setFormError('La fecha de inicio no puede ser posterior a la fecha fin.');
      return;
    }

    if (!formula.includes('[OMIE_MD]')) {
      setFormError('La fórmula debe contener obligatoriamente la etiqueta [OMIE_MD].');
      return;
    }

    onSubmit({
      start_date: startDate,
      end_date: endDate,
      formula: formula.trim(),
    });
  }

  return (
    <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
      {/* Subtle Top Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100">Parámetros de Cálculo</h2>
          <p className="text-xs text-slate-400">Configura el rango de fechas y la fórmula de precio indexado</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Date Pickers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <span>Fecha Inicio:</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-white absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all [color-scheme:dark]"
                required
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1.5">
              <span>Fecha Fin:</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-white absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all [color-scheme:dark]"
                required
              />
            </div>
          </div>
        </div>

        {/* Quick Date Range Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-medium text-slate-400 mr-1">Filtros rápidos:</span>
          <button
            type="button"
            onClick={() => setPresetRange('2025-03-01', '2025-03-31')}
            className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 border border-slate-700/60 transition-all"
          >
            Marzo 2025 (Mes Completo)
          </button>
          <button
            type="button"
            onClick={() => setPresetRange('2025-03-01', '2025-03-15')}
            className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 border border-slate-700/60 transition-all"
          >
            1ª Quincena
          </button>
          <button
            type="button"
            onClick={() => setPresetRange('2025-03-16', '2025-03-31')}
            className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 border border-slate-700/60 transition-all"
          >
            2ª Quincena
          </button>
        </div>

        {/* Formula Input Section */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <span>Fórmula de Cálculo:</span>
            </label>
            
            {/* Insert Tag Button */}
            <button
              type="button"
              onClick={insertOmieTag}
              className="inline-flex items-center space-x-1 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-1 rounded-md border border-amber-400/30 transition-all"
              title="Insertar etiqueta obligatoria OMIE_MD"
            >
              <Plus className="w-3 h-3" />
              <span>[OMIE_MD]</span>
            </button>
          </div>

          <div className="relative">
            <Sparkles className="w-4 h-4 text-white absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              ref={formulaInputRef}
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              type="text"
              placeholder="Ej: ([OMIE_MD] * 0.6) + 0.88"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 text-amber-300 font-mono text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all shadow-inner"
              required
            />
          </div>
        </div>

        {/* Formula Presets */}
        <div>
          <span className="text-xs font-medium text-slate-400 block mb-1.5">Fórmulas prediseñadas:</span>
          <div className="flex flex-wrap gap-2">
            {formulaPresets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyFormulaPreset(p)}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 hover:bg-amber-400/10 hover:text-amber-300 text-slate-300 border border-slate-800 hover:border-amber-400/30 transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Validation Error */}
        {formError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Calculando Precio Indexado...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Calcular Precio Indexado</span>
            </span>
          )}
        </button>

      </form>
    </div>
  );
}
