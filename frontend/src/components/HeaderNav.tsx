import React, { useState, useEffect } from 'react';
import { Zap, BookOpen, RefreshCw } from 'lucide-react';
import { checkApiHealth } from '../services/api';

export default function HeaderNav() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  async function verifyStatus() {
    setIsChecking(true);
    const online = await checkApiHealth();
    setIsOnline(online);
    setIsChecking(false);
  }

  useEffect(() => {
    verifyStatus();
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(14,165,233,0.5)]">
            <Zap className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
                NEMON
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Energy Tech
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Calculadora de Precio Indexado OMIE_MD</p>
          </div>
        </div>

        {/* Actions & Status Badges */}
        <div className="flex items-center space-x-4">
          
          {/* Swagger Doc Link */}
          <a 
            href="/api/documentation" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-slate-900 text-slate-300 hover:text-sky-400 border border-slate-800 hover:border-sky-500/30 transition-all"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Swagger API Docs</span>
          </a>

          {/* API Health Badge */}
          <div 
            onClick={verifyStatus}
            className={`flex items-center space-x-2 text-xs font-medium px-3.5 py-1.5 rounded-full bg-slate-900/90 border cursor-pointer transition-all duration-300 ${isOnline ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' : isOnline === false ? 'border-rose-500/30 text-rose-400 bg-rose-500/5' : 'border-slate-800 text-slate-400'}`}
            title="Haz clic para comprobar estado de API REST"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span 
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-emerald-400' : isOnline === false ? 'bg-rose-400' : 'bg-amber-400'}`}
              ></span>
              <span 
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-emerald-400' : isOnline === false ? 'bg-rose-400' : 'bg-amber-400'}`}
              ></span>
            </span>
            
            <span className="font-semibold">
              {isChecking ? 'Comprobando...' : isOnline ? 'API Conectada (PHP 8.4)' : isOnline === false ? 'API Desconectada' : 'Verificando...'}
            </span>

            <RefreshCw className={`w-3.5 h-3.5 ml-1 opacity-70 ${isChecking ? 'animate-spin' : ''}`} />
          </div>

        </div>

      </div>
    </header>
  );
}
