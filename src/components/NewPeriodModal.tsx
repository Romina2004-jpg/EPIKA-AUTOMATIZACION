import React, { useState } from 'react';
import { FunnelPeriod, PeriodType } from '../types';
import { X, Calendar, Plus, Layers } from 'lucide-react';

interface NewPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePeriod: (period: FunnelPeriod) => void;
  existingPeriods: FunnelPeriod[];
}

export const NewPeriodModal: React.FC<NewPeriodModalProps> = ({
  isOpen,
  onClose,
  onCreatePeriod,
  existingPeriods
}) => {
  const [periodType, setPeriodType] = useState<PeriodType>('monthly');
  const [periodLabel, setPeriodLabel] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [cloneFromId, setCloneFromId] = useState(existingPeriods[0]?.id || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodLabel || !dateRange) return;

    const basePeriod = existingPeriods.find(p => p.id === cloneFromId) || existingPeriods[0];

    const newPeriod: FunnelPeriod = {
      id: `period-${Date.now()}`,
      periodType,
      periodLabel,
      dateRange,
      projectName: 'Epika Chapultepec',
      rows: basePeriod ? JSON.parse(JSON.stringify(basePeriod.rows)) : [],
      webMetrics: basePeriod ? JSON.parse(JSON.stringify(basePeriod.webMetrics)) : {
        totalSessions: 1200,
        bounceRate: 36.5,
        avgTimeSeconds: 46,
        qualifiedTrafficPercent: 59.2,
        qualifiedAvgTimeSeconds: 112,
        qualifiedTrafficVisits: 710,
        events: {
          whatsappClicks: 32,
          phoneClicks: 14,
          formSubmits: 28,
          thankYouPageViews: 24,
          brochureDownloads: 19
        },
        channelTraffic: []
      },
      syncData: {
        meta: { platform: 'meta', isConnected: true, lastSynced: 'Nunca', spend: 0, impressions: 0, clicks: 0, leadsReported: 0 },
        googleAds: { platform: 'google_ads', isConnected: true, lastSynced: 'Nunca', spend: 0, impressions: 0, clicks: 0, leadsReported: 0 },
        stackAdapt: { platform: 'stackadapt', isConnected: true, lastSynced: 'Nunca', spend: 0, impressions: 0, clicks: 0, leadsReported: 0 }
      },
      updatedAt: new Date().toISOString()
    };

    onCreatePeriod(newPeriod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden text-[#E5E7EB]">
        
        {/* Header */}
        <div className="bg-[#0D0D0D] border-b border-[#262626] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4F634] text-black border border-black flex items-center justify-center font-bold text-sm shadow-md">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tight font-sans">
              Nuevo Periodo de Análisis
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white border border-[#262626] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          <div>
            <label className="text-[10px] text-[#A3A3A3] uppercase font-semibold block mb-1">
              Frecuencia / Tipo de Periodo
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['monthly', 'bimonthly', 'yearly'] as PeriodType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setPeriodType(type)}
                  className={`py-2 rounded-lg border font-bold capitalize transition-colors cursor-pointer ${
                    periodType === type
                      ? 'bg-[#D4F634] text-black border-black font-extrabold shadow-sm'
                      : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#262626] hover:text-white'
                  }`}
                >
                  {type === 'monthly' ? 'Mensual' : type === 'bimonthly' ? 'Bimestral' : 'Anual'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-[#A3A3A3] uppercase font-semibold block mb-1">
              Nombre / Etiqueta del Periodo
            </label>
            <input
              type="text"
              required
              placeholder="p. ej. Septiembre 2026 o Del 10 al 16 de Agosto"
              value={periodLabel}
              onChange={(e) => setPeriodLabel(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-1 focus:ring-[#D4F634]"
            />
          </div>

          <div>
            <label className="text-[10px] text-[#A3A3A3] uppercase font-semibold block mb-1">
              Rango de Fechas
            </label>
            <input
              type="text"
              required
              placeholder="p. ej. 1 Sep - 30 Sep 2026"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-1 focus:ring-[#D4F634]"
            />
          </div>

          <div>
            <label className="text-[10px] text-[#A3A3A3] uppercase font-semibold block mb-1">
              Clonar Estructura de Detonadores
            </label>
            <select
              value={cloneFromId}
              onChange={(e) => setCloneFromId(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#D4F634]"
            >
              {existingPeriods.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#121212] text-white">
                  {p.periodLabel}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#262626]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black font-extrabold shadow-lg shadow-[#D4F634]/20 transition-all active:scale-95 cursor-pointer"
            >
              Crear Periodo
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
