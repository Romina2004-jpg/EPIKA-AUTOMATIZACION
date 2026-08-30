import React from 'react';
import { 
  Building2, 
  Calendar, 
  RefreshCw, 
  Sparkles, 
  Key, 
  Download, 
  CheckCircle2, 
  Layers, 
  Table as TableIcon, 
  Globe, 
  Award, 
  Plus,
  Activity,
  FileText
} from 'lucide-react';
import { FunnelPeriod } from '../types';
import { DateRangeCalendarPicker } from './DateRangeCalendarPicker';

interface NavbarProps {
  periods: FunnelPeriod[];
  selectedPeriodId: string;
  onSelectPeriod: (periodId: string) => void;
  onCustomDateRangeApply: (newPeriod: FunnelPeriod) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAiModal: () => void;
  onOpenCredentialsModal: () => void;
  onOpenNewPeriodModal: () => void;
  onSyncAll: () => void;
  isSyncing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  periods,
  selectedPeriodId,
  onSelectPeriod,
  onCustomDateRangeApply,
  activeTab,
  onSelectTab,
  onOpenAiModal,
  onOpenCredentialsModal,
  onOpenNewPeriodModal,
  onSyncAll,
  isSyncing
}) => {
  const currentPeriod = periods.find(p => p.id === selectedPeriodId) || periods[0];

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-40 shadow-xs backdrop-blur-md">
      {/* Top Bar with Brand, Period Selector & Global Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3.5 gap-3">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="h-10 px-2.5 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-lg tracking-wider shadow-sm border border-slate-800">
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-5 bg-emerald-400 rounded-xs"></span>
                  <span className="w-1 h-5 bg-emerald-400 rounded-xs mr-1"></span>
                  <span className="font-sans font-black text-sm">ÉPIKA</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase flex items-center gap-2 font-sans">
                    EPIKA CHAPULTEPEC
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      INTELLIGENCE
                    </span>
                  </h1>
                </div>
                <p className="text-[11px] text-slate-500">
                  Marketing Intelligence & Funnel Analytics | Sierra Providencia
                </p>
              </div>
            </div>

            {/* Quick Mobile Sync Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <button 
                onClick={onSyncAll}
                disabled={isSyncing}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
                title="Sincronizar APIs"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Period Selector & Platform Status */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            
            {/* Interactive Calendar Date Range Picker */}
            <DateRangeCalendarPicker
              periods={periods}
              selectedPeriodId={selectedPeriodId}
              onSelectPeriod={onSelectPeriod}
              onCustomDateRangeApply={onCustomDateRangeApply}
            />

            {/* Live Auto-sync Indicator Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Auto-sync: <span className="text-emerald-700 font-bold">Live</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-[11px]">Meta / Google / StackAdapt</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                id="btn-sync-apis"
                onClick={onSyncAll}
                disabled={isSyncing}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 hover:border-slate-300 transition-all shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                title="Sincronizar datos de Meta Ads, Google Ads y StackAdapt"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Sincronizando...' : 'Sincronizar'}</span>
              </button>

              <button
                id="btn-open-ai-advisor"
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all active:scale-95 border border-slate-800 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Director AI</span>
              </button>

              <button
                id="btn-open-credentials"
                onClick={onOpenCredentialsModal}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                title="Configuración de APIs y Tokens"
              >
                <Key className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex space-x-1.5 border-t border-slate-200 pt-2 pb-1.5 overflow-x-auto scrollbar-none">
          <button
            id="tab-overview"
            onClick={() => onSelectTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Dashboard Ejecutivo (7 Preguntas)
          </button>

          <button
            id="tab-commercial-funnel"
            onClick={() => onSelectTab('funnel')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'funnel'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            Plantilla Embudo Comercial (Llenado Manual)
          </button>

          <button
            id="tab-web-analytics"
            onClick={() => onSelectTab('web')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'web'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Comportamiento Web (Epika.mx)
          </button>

          <button
            id="tab-channel-rankings"
            onClick={() => onSelectTab('cac')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cac'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Rendimiento de Medios & CAC
          </button>

          <button
            id="tab-general-report"
            onClick={() => onSelectTab('report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'report'
                ? 'bg-emerald-700 text-white shadow-xs ring-1 ring-emerald-800'
                : 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Reporte General (PDF Oficial)
          </button>

          <button
            id="tab-summarized-report"
            onClick={() => onSelectTab('summarized-report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'summarized-report'
                ? 'bg-[#D4F634] text-black shadow-xs ring-1 ring-black/40 font-black'
                : 'text-slate-900 bg-[#D4F634]/20 hover:bg-[#D4F634]/40 hover:text-black border border-slate-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-black" />
            Reporte Resumido (PDF)
          </button>
        </nav>

      </div>
    </header>
  );
};
