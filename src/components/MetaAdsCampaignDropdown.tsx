import React, { useState } from 'react';
import { 
  META_CAMPAIGNS_DATA, 
  META_ACCOUNT_INFO, 
  META_INSTANT_FORMS,
  MetaCampaignDetail 
} from '../data/metaAdsData';
import { 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ClipboardList,
  Download,
  CheckCircle2,
  Database,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

interface MetaAdsCampaignDropdownProps {
  selectedCampaignId?: string;
  onSelectCampaign?: (campaignId: string) => void;
  className?: string;
  defaultExpanded?: boolean;
  showDetailedView?: boolean;
  compactBadge?: boolean;
}

export const MetaAdsCampaignDropdown: React.FC<MetaAdsCampaignDropdownProps> = ({
  selectedCampaignId: externalSelectedId,
  onSelectCampaign,
  className = '',
  defaultExpanded = false,
  showDetailedView = true
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [activeMetaTab, setActiveMetaTab] = useState<'campaigns' | 'forms'>('forms');

  const activeSelectedId = externalSelectedId !== undefined ? externalSelectedId : internalSelectedId;

  const handleCampaignChange = (campaignId: string) => {
    setInternalSelectedId(campaignId);
    if (onSelectCampaign) {
      onSelectCampaign(campaignId);
    }
  };

  const selectedCampaign: MetaCampaignDetail | undefined = 
    activeSelectedId === 'all' 
      ? undefined 
      : META_CAMPAIGNS_DATA.find(c => c.id === activeSelectedId || c.campaignId === activeSelectedId);

  // Totals for "Todas las Campañas" (Matching exact account data from Meta Ads Manager)
  const allCampaignsTotals = {
    spend: META_ACCOUNT_INFO.totalSpendPeriod || 63354.09,
    impressions: META_ACCOUNT_INFO.totalImpressions || 262700,
    reach: META_ACCOUNT_INFO.totalReach || 74404,
    clicks: 5430,
    ctr: 2.07,
    cpc: 11.67,
    leadsReported: 233, // 93 Formularios + 140 Conversaciones WhatsApp
    formulariosCompletados: META_ACCOUNT_INFO.totalFormulariosCompletados || 93,
    conversacionesIniciadas: META_ACCOUNT_INFO.totalConversacionesIniciadas || 140,
    cpl: 271.91
  };

  const currentMetrics = selectedCampaign ? {
    spend: selectedCampaign.spend,
    impressions: selectedCampaign.impressions,
    reach: selectedCampaign.reach,
    clicks: selectedCampaign.clicks,
    ctr: selectedCampaign.ctr,
    cpc: selectedCampaign.cpc,
    leadsReported: selectedCampaign.leadsReported,
    formulariosCompletados: selectedCampaign.formulariosCompletados,
    conversacionesIniciadas: selectedCampaign.conversacionesIniciadas,
    cpl: selectedCampaign.costoPorLeadReportado
  } : allCampaignsTotals;

  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-all ${className}`}>
      
      {/* Top Header & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-tight font-sans">
                Meta Ads Manager
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30">
                {META_ACCOUNT_INFO.accountName}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                (ID: {META_ACCOUNT_INFO.adAccountId})
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Desglose y filtro oficial por campaña ({META_ACCOUNT_INFO.dateRange})
            </p>
          </div>
        </div>

        {/* Campaign Dropdown Select without emojis */}
        <div className="flex items-center gap-2">
          <label htmlFor="meta-campaign-select" className="text-[11px] font-semibold text-slate-600 whitespace-nowrap">
            Campaña:
          </label>
          <div className="relative min-w-[260px] sm:min-w-[360px]">
            <select
              id="meta-campaign-select"
              value={activeSelectedId}
              onChange={(e) => handleCampaignChange(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 hover:border-emerald-500 text-slate-900 text-xs font-medium rounded-lg px-3 py-2 pr-8 transition-colors cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">
                Todas las campañas — Costo Total: $58,945.35 MXN (233 resultados)
              </option>
              <optgroup label="Campañas Activas (Agosto 2026)">
                {META_CAMPAIGNS_DATA.filter(c => c.status === 'ACTIVE').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.leadsReported} resultados)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Campañas Desactivadas / Históricas">
                {META_CAMPAIGNS_DATA.filter(c => c.status !== 'ACTIVE').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.leadsReported > 0 ? `${c.leadsReported} leads` : 'Sin gasto en ago'})
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Selected Campaign KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 mt-3">
        
        {/* Metric 1: Resultados / Leads */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Resultados (Leads)</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-emerald-600 font-mono">
              {currentMetrics.leadsReported}
            </span>
            <span className="text-[10px] text-slate-500">
              {selectedCampaign?.objective === 'MESSAGES' ? 'conversaciones' : 'formularios'}
            </span>
          </div>
        </div>

        {/* Metric 2: Costo por Resultado */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Costo / Resultado</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 font-mono">
              {currentMetrics.cpl > 0 ? `$${currentMetrics.cpl.toFixed(2)}` : '—'}
            </span>
            <span className="text-[10px] text-slate-500">MXN</span>
          </div>
        </div>

        {/* Metric 3: Importe Gastado */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Importe Gastado</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-emerald-600 font-mono">
              ${currentMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-slate-500">MXN</span>
          </div>
        </div>

        {/* Metric 4: Impresiones */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Impresiones</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 font-mono">
              {currentMetrics.impressions > 0 ? currentMetrics.impressions.toLocaleString('es-MX') : '0'}
            </span>
            <span className="text-[10px] text-slate-500">views</span>
          </div>
        </div>

        {/* Metric 5: Alcance Único */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Alcance Único</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 font-mono">
              {currentMetrics.reach > 0 ? currentMetrics.reach.toLocaleString('es-MX') : '0'}
            </span>
            <span className="text-[10px] text-slate-500">personas</span>
          </div>
        </div>

        {/* Metric 6: Clics / CTR */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 flex flex-col justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Clics & CTR</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 font-mono">
              {currentMetrics.clicks > 0 ? currentMetrics.clicks.toLocaleString('es-MX') : '0'}
            </span>
            <span className="text-[10px] text-emerald-600 font-mono font-bold">
              {currentMetrics.ctr > 0 ? `${currentMetrics.ctr.toFixed(2)}%` : '0%'}
            </span>
          </div>
        </div>

      </div>

      {/* Campaign Details Info Banner */}
      {selectedCampaign && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${selectedCampaign.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            <span className="font-bold text-slate-900">{selectedCampaign.name}</span>
            <span className="text-slate-500">| Objetivo: <strong className="text-slate-800">{selectedCampaign.objectiveLabel}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span>Presupuesto: <strong className="text-slate-900">{selectedCampaign.budgetType === 'LIFETIME' ? `$${selectedCampaign.budgetAmount.toLocaleString('es-MX')} Total` : `$${selectedCampaign.budgetAmount.toLocaleString('es-MX')} Diario`}</strong></span>
            <span>Periodo: <strong className="text-emerald-700">{selectedCampaign.startDate} al {selectedCampaign.endDate || 'Activo'}</strong></span>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs: Formularios vs Campañas */}
      <div className="mt-3 flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveMetaTab('forms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMetaTab === 'forms'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5 text-[#D4F634]" />
            <span>Formularios de anuncios ({META_INSTANT_FORMS.length})</span>
            <span className="ml-1 px-1.5 py-0.2 bg-[#D4F634] text-black text-[10px] font-black rounded-full font-mono">
              466 leads
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMetaTab('campaigns')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMetaTab === 'campaigns'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#1877F2]" />
            <span>Campañas & Conjuntos</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <span>Total en Formularios: <strong className="text-slate-900 font-black">466 Clientes Potenciales</strong></span>
        </div>
      </div>

      {/* VIEW A: FORMULARIOS DE ANUNCIOS PARA CLIENTES POTENCIALES (EXACTO A META) */}
      {activeMetaTab === 'forms' && (
        <div className="mt-3 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                Formularios de anuncios para clientes potenciales
              </h4>
              <p className="text-[11px] text-slate-500">
                Administra los formularios y conecta tu software de CRM para los anuncios para clientes potenciales.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-600">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Buscar</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filtros: 1</span>
              </div>
              <button
                type="button"
                className="bg-[#1877F2] text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-[#166fe5] shadow-xs"
              >
                Crear formulario
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="bg-slate-100/80 text-[10.5px] text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3 w-8 text-center">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#1877F2]" />
                  </th>
                  <th className="py-2.5 px-3">Nombre</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Fecha de creación</th>
                  <th className="py-2.5 px-3 text-right">Número de clientes...</th>
                  <th className="py-2.5 px-3">Uso compartido</th>
                  <th className="py-2.5 px-3 text-center">Clientes potenciales</th>
                  <th className="py-2.5 px-3 text-center">Promocionar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-sans">
                {META_INSTANT_FORMS.map((form) => (
                  <tr key={form.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="checkbox" 
                        defaultChecked={form.id === 'form-ago-2026'} 
                        className="rounded border-slate-300 text-[#1877F2]" 
                      />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{form.name}</span>
                        {form.id === 'form-ago-2026' && (
                          <span className="px-1.5 py-0.2 bg-[#D4F634] text-black font-black text-[9px] rounded font-mono">
                            ACTIVO EN CAMPAÑA
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-slate-700 font-medium">{form.status}</span>
                    </td>
                    <td className="py-2 px-3 text-slate-500 font-mono text-[10px]">
                      {form.creationDate}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold">
                      <div className="flex flex-col items-end">
                        <span className={`text-xs ${form.leadsCount > 0 ? 'text-emerald-700 font-black' : 'text-slate-500'}`}>
                          {form.leadsCount}
                        </span>
                        <span className="text-[9px] text-slate-400 font-normal">
                          {form.caducadosCount} caducados
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-slate-600 text-[10.5px]">
                      {form.sharing}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-semibold border border-slate-300 transition-colors"
                      >
                        Descargar
                      </button>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        type="button"
                        className="px-2.5 py-1 rounded bg-[#1877F2] hover:bg-[#166fe5] text-white text-[10.5px] font-semibold transition-colors shadow-xs"
                      >
                        Promocionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW B: CAMPAÑAS DE ANUNCIOS */}
      {activeMetaTab === 'campaigns' && (
        <div className="mt-3">
          {/* Expandable Ads & AdSets Breakdown Toggle */}
          {showDetailedView && (
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isExpanded 
                  ? 'Ocultar desglose detallado de Anuncios y Conjuntos' 
                  : `Ver anuncios activos y desglose de ${selectedCampaign ? selectedCampaign.name : 'todas las campañas'}`}
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              
              <span className="text-[11px] text-slate-500">
                Datos oficiales sincronizados con Meta Ads Manager
              </span>
            </div>
          )}

          {/* Detailed Table When Expanded */}
          {isExpanded && showDetailedView && (
            <div className="mt-3 overflow-x-auto border border-slate-200 rounded-lg bg-white">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="bg-slate-50 text-[10px] text-slate-600 uppercase font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">Campaña / Anuncio</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3">Tipo / Formato</th>
                    <th className="py-2.5 px-3 text-right">Resultados</th>
                    <th className="py-2.5 px-3 text-right">Costo / Lead</th>
                    <th className="py-2.5 px-3 text-right">Impresiones</th>
                    <th className="py-2.5 px-3 text-right">Alcance</th>
                    <th className="py-2.5 px-3 text-right">Gasto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {(selectedCampaign ? [selectedCampaign] : META_CAMPAIGNS_DATA).map((camp) => (
                    <React.Fragment key={camp.id}>
                      {/* Campaign Master Row */}
                      <tr className="bg-slate-50/70 font-bold text-slate-900 hover:bg-slate-100/70">
                        <td className="py-2 px-3 font-sans">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${camp.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            <span className="font-bold text-slate-900">{camp.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-3 font-sans">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${camp.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                            {camp.status === 'ACTIVE' ? 'Activa' : 'Desactivada'}
                          </span>
                        </td>
                        <td className="py-2 px-3 font-sans text-slate-500 text-[10px]">{camp.objectiveLabel}</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-bold">{camp.leadsReported > 0 ? `${camp.leadsReported} leads` : '0'}</td>
                        <td className="py-2 px-3 text-right text-slate-900">{camp.costoPorLeadReportado > 0 ? `$${camp.costoPorLeadReportado.toFixed(2)}` : '—'}</td>
                        <td className="py-2 px-3 text-right text-slate-600">{camp.impressions > 0 ? camp.impressions.toLocaleString('es-MX') : '0'}</td>
                        <td className="py-2 px-3 text-right text-slate-600">{camp.reach > 0 ? camp.reach.toLocaleString('es-MX') : '0'}</td>
                        <td className="py-2 px-3 text-right text-slate-900 font-bold">${camp.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                      </tr>

                      {/* Individual Ads in this Campaign */}
                      {camp.ads && camp.ads.map((ad) => (
                        <tr key={ad.id} className="hover:bg-slate-50 text-slate-700">
                          <td className="py-2 px-3 pl-8 font-sans max-w-[280px] truncate">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">↳</span>
                              <span title={ad.name} className="text-slate-800 text-xs">{ad.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 font-sans">
                            <span className="text-[10px] text-slate-500">{ad.status === 'ACTIVE' ? 'Activo' : 'Pausado'}</span>
                          </td>
                          <td className="py-2 px-3 font-sans text-[10px] text-slate-500">
                            {ad.creative?.format === 'reel_9_16' ? 'Reel (9:16)' : 'Imagen (1:1)'}
                          </td>
                          <td className="py-2 px-3 text-right text-emerald-600 font-bold">{ad.leadsReported} leads</td>
                          <td className="py-2 px-3 text-right text-slate-900">${ad.costoPorResultado.toFixed(2)}</td>
                          <td className="py-2 px-3 text-right text-slate-500">{ad.impressions.toLocaleString('es-MX')}</td>
                          <td className="py-2 px-3 text-right text-slate-500">{ad.reach.toLocaleString('es-MX')}</td>
                          <td className="py-2 px-3 text-right text-slate-900">${ad.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* Total Row */}
                  <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                    <td className="py-2.5 px-3 font-sans text-slate-900">TOTAL CUENTA (EPIKA ADS 2)</td>
                    <td className="py-2.5 px-3 font-sans text-[10px] text-slate-500">1-25 Ago 2026</td>
                    <td className="py-2.5 px-3 font-sans text-[10px] text-slate-500">Todas las campañas</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">243 res. (118 leads)</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">$347.36</td>
                    <td className="py-2.5 px-3 text-right text-slate-900">409,130</td>
                    <td className="py-2.5 px-3 text-right text-slate-900">277,160</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-mono">$84,407.88</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
