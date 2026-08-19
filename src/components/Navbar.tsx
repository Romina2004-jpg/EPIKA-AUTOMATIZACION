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

interface NavbarProps {
  periods: FunnelPeriod[];
  selectedPeriodId: string;
  onSelectPeriod: (periodId: string) => void;
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
    <header className="bg-[#0D0D0D] border-b border-[#262626] text-[#E5E7EB] sticky top-0 z-40 shadow-2xl backdrop-blur-md">
      {/* Top Bar with Brand, Period Selector & Global Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3.5 gap-3">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="h-10 px-2.5 rounded-lg bg-[#D4F634] text-black flex items-center justify-center font-black text-lg tracking-wider shadow-lg shadow-[#D4F634]/15 border border-black">
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-5 bg-black rounded-xs"></span>
                  <span className="w-1 h-5 bg-black rounded-xs mr-1"></span>
                  <span className="font-sans font-black text-sm">ÉPIKA</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase flex items-center gap-2 font-sans">
                    EPIKA CHAPULTEPEC
                    <span className="text-xs font-bold text-[#D4F634] bg-[#D4F634]/10 px-1.5 py-0.5 rounded border border-[#D4F634]/20">
                      INTELLIGENCE
                    </span>
                  </h1>
                </div>
                <p className="text-[11px] text-[#A3A3A3]">
                  Marketing Intelligence & Funnel Analytics | Sierra Providencia
                </p>
              </div>
            </div>

            {/* Quick Mobile Sync Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <button 
                onClick={onSyncAll}
                disabled={isSyncing}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white border border-[#262626] transition-colors"
                title="Sincronizar APIs"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-[#D4F634]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Period Selector & Platform Status */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            
            {/* Period Selector dropdown */}
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] rounded-lg px-2.5 py-1.5 shadow-inner">
              <Calendar className="w-3.5 h-3.5 text-[#D4F634]" />
              <select
                id="period-select"
                aria-label="Seleccionar periodo de análisis"
                value={selectedPeriodId}
                onChange={(e) => {
                  if (e.target.value === '__new__') {
                    onOpenNewPeriodModal();
                  } else {
                    onSelectPeriod(e.target.value);
                  }
                }}
                className="bg-transparent text-xs font-semibold text-[#E5E7EB] focus:outline-none cursor-pointer pr-2"
              >
                <optgroup label="Periodos Disponibles" className="bg-[#121212] text-[#E5E7EB]">
                  {periods.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#121212] text-[#E5E7EB]">
                      {p.periodLabel}
                    </option>
                  ))}
                </optgroup>
                <option value="__new__" className="bg-[#121212] text-[#D4F634] font-bold">
                  + Agregar Nuevo Periodo...
                </option>
              </select>
              <button
                onClick={onOpenNewPeriodModal}
                className="p-1 hover:bg-[#262626] rounded text-[#737373] hover:text-[#D4F634] transition-colors"
                title="Crear nuevo periodo"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live Auto-sync Indicator Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#262626] text-xs text-[#737373]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4F634] animate-pulse"></span>
                Auto-sync: <span className="text-[#D4F634] font-semibold">Live</span>
              </span>
              <span className="text-[#333]">•</span>
              <span className="text-[#A3A3A3] text-[11px]">Meta / Google / StackAdapt</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                id="btn-sync-apis"
                onClick={onSyncAll}
                disabled={isSyncing}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#E5E7EB] border border-[#262626] hover:border-[#D4F634]/40 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                title="Sincronizar datos de Meta Ads, Google Ads y StackAdapt"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#D4F634]' : 'text-[#737373]'}`} />
                <span className="hidden sm:inline">{isSyncing ? 'Sincronizando...' : 'Sincronizar'}</span>
              </button>

              <button
                id="btn-open-ai-advisor"
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black shadow-lg shadow-[#D4F634]/20 transition-all active:scale-95 border border-black cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Director AI</span>
              </button>

              <button
                id="btn-open-credentials"
                onClick={onOpenCredentialsModal}
                className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#737373] hover:text-white border border-[#262626] transition-colors"
                title="Configuración de APIs y Tokens"
              >
                <Key className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex space-x-1.5 border-t border-[#262626] pt-2 pb-1.5 overflow-x-auto scrollbar-none">
          <button
            id="tab-overview"
            onClick={() => onSelectTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#D4F634] text-black border border-[#D4F634] shadow-md shadow-[#D4F634]/20'
                : 'text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Dashboard Ejecutivo (7 Preguntas)
          </button>

          <button
            id="tab-commercial-funnel"
            onClick={() => onSelectTab('funnel')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'funnel'
                ? 'bg-[#D4F634] text-black border border-[#D4F634] shadow-md shadow-[#D4F634]/20'
                : 'text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            Plantilla Embudo Comercial (Llenado Manual)
          </button>

          <button
            id="tab-web-analytics"
            onClick={() => onSelectTab('web')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'web'
                ? 'bg-[#D4F634] text-black border border-[#D4F634] shadow-md shadow-[#D4F634]/20'
                : 'text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Comportamiento Web (Epika.mx)
          </button>

          <button
            id="tab-channel-rankings"
            onClick={() => onSelectTab('cac')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'cac'
                ? 'bg-[#D4F634] text-black border border-[#D4F634] shadow-md shadow-[#D4F634]/20'
                : 'text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Rendimiento de Medios & CAC
          </button>

          <button
            id="tab-general-report"
            onClick={() => onSelectTab('report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-black transition-all whitespace-nowrap ${
              activeTab === 'report'
                ? 'bg-[#D4F634] text-black border border-[#D4F634] shadow-lg shadow-[#D4F634]/30 ring-2 ring-[#D4F634]/40'
                : 'text-[#D4F634] hover:text-black hover:bg-[#D4F634] border border-[#D4F634]/40'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Reporte General (PDF Oficial)
          </button>
        </nav>

      </div>
    </header>
  );
};
