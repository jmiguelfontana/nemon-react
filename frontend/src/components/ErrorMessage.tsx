import React from 'react';
import { AlertTriangle, DatabaseBackup, ServerCrash, XCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: {
    status?: number;
    message: string;
    details?: Record<string, string[]>;
  } | null;
  onClose: () => void;
}

export default function ErrorMessage({ error, onClose }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 relative overflow-hidden backdrop-blur-md shadow-lg transition-all">
      <div className="flex items-start space-x-3.5">
        
        {/* Icon based on status */}
        <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
          {error.status === 404 ? (
            <DatabaseBackup className="w-6 h-6" />
          ) : error.status === 500 ? (
            <ServerCrash className="w-6 h-6" />
          ) : (
            <AlertTriangle className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1 pr-6">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              HTTP {error.status || 'Error'}
            </span>
            <h3 className="text-sm font-bold text-slate-100">
              {error.status === 404 ? 'Registros No Encontrados' : error.status === 400 ? 'Solicitud Inválida' : 'Error de Sistema'}
            </h3>
          </div>

          <p className="text-xs text-rose-200 leading-relaxed font-medium">
            {error.message}
          </p>

          {/* Validation Details if present */}
          {error.details && Object.keys(error.details).length > 0 && (
            <div className="mt-3 pt-2 border-t border-rose-500/20 space-y-1">
              {Object.entries(error.details).map(([field, msgs]) => (
                <div key={field} className="text-xs text-rose-300">
                  <span className="font-semibold capitalize">{field}:</span> {msgs.join(', ')}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="text-rose-400 hover:text-slate-100 p-1 rounded-lg hover:bg-rose-500/20 transition-all"
          title="Cerrar aviso"
        >
          <XCircle className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
}
