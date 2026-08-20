import React from 'react';
import { Euro, Activity, CheckCircle2, Award } from 'lucide-react';
import type { CalculateResponse } from '../types/energy';

interface ResultCardProps {
  result: CalculateResponse;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="glass-card electric-border-glow p-6 sm:p-8 relative overflow-hidden transition-all duration-500">
      {/* Ambient Energy Glow Background */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-sky-500/20 text-cyan-400 border border-cyan-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Resultado del Cálculo</h2>
            <p className="text-xs text-slate-400">Precio ponderado y acumulados del periodo</p>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Cálculo Exitoso</span>
        </span>
      </div>

      {/* Main Metric: Precio Indexado */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(14,165,233,0.1)] text-center relative overflow-hidden">
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block mb-1">
          Precio Indexado Calculado
        </span>

        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent glowing-text-cyan">
            {result.price_indexed.toFixed(4)}
          </span>
          <span className="text-xl font-bold text-slate-300">€/kWh</span>
        </div>

        <p className="text-xs text-slate-400 mt-2">
          Resultado ponderado según fórmula y consumo horario
        </p>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Total Importes */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Euro className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400 block">Total Importes Acumulados</span>
            <span className="text-xl font-extrabold text-slate-100">
              {result.total_importes.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
          </div>
        </div>

        {/* Total Consumos */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-400 block">Total Consumo Energético</span>
            <span className="text-xl font-extrabold text-slate-100">
              {result.total_consumos.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} kWh
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
