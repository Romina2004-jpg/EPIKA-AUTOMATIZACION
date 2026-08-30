import React, { useState } from 'react';
import { 
  Radio, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  MousePointer, 
  DollarSign, 
  Eye, 
  Sparkles, 
  Target, 
  MapPin,
  TrendingUp
} from 'lucide-react';
import { STACKADAPT_ACCOUNT_INFO, STACKADAPT_CAMPAIGNS_DATA, StackAdaptCampaignDetail } from '../data/stackAdaptData';

interface StackAdaptCampaignDropdownProps {
  selectedCampaignId?: string;
  onSelectCampaign?: (campaignId: string) => void;
  defaultExpanded?: boolean;
  showDetailedView?: boolean;
}

export const StackAdaptCampaignDropdown: React.FC<StackAdaptCampaignDropdownProps> = ({
  selectedCampaignId = 'all',
  onSelectCampaign,
  defaultExpanded = false,
  showDetailedView = true
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string>(selectedCampaignId);
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  const activeSelectedId = onSelectCampaign ? selectedCampaignId : internalSelectedId;

  const handleCampaignChange = (campaignId: string) => {
    if (onSelectCampaign) {
      onSelectCampaign(campaignId);
    } else {
      setInternalSelectedId(campaignId);
    }
  };

  const selectedCampaign: StackAdaptCampaignDetail | undefined = 
    activeSelectedId === 'all' 
      ? undefined 
      : STACKADAPT_CAMPAIGNS_DATA.find(c => c.id === activeSelectedId || c.campaignId === activeSelectedId);

  const allCampaignsTotals = {
    spend: STACKADAPT_ACCOUNT_INFO.totalSpend,
    impressions: STACKADAPT_ACCOUNT_INFO.totalImpressions,
    clicks: STACKADAPT_ACCOUNT_INFO.totalClicks,
    ctr: STACKADAPT_ACCOUNT_INFO.avgCtr,
    cpc: STACKADAPT_ACCOUNT_INFO.avgCpc,
    cpm: STACKADAPT_ACCOUNT_INFO.avgCpm,
    leadsReported: STACKADAPT_ACCOUNT_INFO.totalLeadsReported,
    cpl: STACKADAPT_ACCOUNT_INFO.avgCpl
  };

  const currentMetrics = selectedCampaign ? {
    spend: selectedCampaign.spend,
    impressions: selectedCampaign.impressions,
    clicks: selectedCampaign.clicks,
    ctr: selectedCampaign.ctr,
    cpc: selectedCampaign.cpc,
    cpm: selectedCampaign.cpm,
    leadsReported: selectedCampaign.leadsReported,
    cpl: selectedCampaign.cpl
  } : allCampaignsTotals;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
      {/* Header & Campaign Selector Bar */}
      <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">StackAdapt DSP Programmatic</span>
              <span className="text-[10px] bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/30 px-1.5 py-0.2 rounded font-mono font-bold">
                Account: {STACKADAPT_ACCOUNT_INFO.accountId}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {STACKADAPT_ACCOUNT_INFO.accountName} • Geofencing & Audiencias AAA • {STACKADAPT_ACCOUNT_INFO.periodLabel}
            </p>
          </div>
        </div>

        {/* Campaign Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="stackadapt-campaign-select" className="text-[11px] font-semibold text-slate-600 whitespace-nowrap">
            Campaña DSP:
          </label>
          <div className="relative min-w-[260px] sm:min-w-[360px]">
            <select
              id="stackadapt-campaign-select"
              value={activeSelectedId}
              onChange={(e) => handleCampaignChange(e.target.value)}
              className="w-full appearance-none bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#FF6B00] text-slate-900 text-xs font-medium rounded-lg px-3 py-2 pr-8 transition-colors cursor-pointer focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
            >
              <option value="all">
                Todas las campañas DSP — Costo Total: ${STACKADAPT_ACCOUNT_INFO.totalSpend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({STACKADAPT_ACCOUNT_INFO.totalLeadsReported} leads)
              </option>
              {STACKADAPT_CAMPAIGNS_DATA.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.leadsReported} leads)
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            title={isExpanded ? 'Ocultar desglose detallado' : 'Mostrar desglose detallado'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="p-3.5 sm:p-4 bg-slate-100/60 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 border-b border-slate-200">
        {/* Inversión Total */}
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Inversión DSP</span>
            <DollarSign className="w-3 h-3 text-[#FF6B00]" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            ${currentMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">MXN invertidos</div>
        </div>

        {/* Leads Generados (Conversiones) */}
        <div className="bg-white rounded-lg p-2.5 border border-[#FF6B00]/40 bg-[#FF6B00]/5">
          <div className="text-[10px] text-[#FF6B00] font-bold flex items-center justify-between">
            <span>Leads / Contactos</span>
            <Target className="w-3.5 h-3.5 text-[#FF6B00]" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {currentMetrics.leadsReported}
          </div>
          <div className="text-[10px] text-[#FF6B00]/90 mt-0.5">Contactos DSP</div>
        </div>

        {/* Costo Por Lead (CPL) */}
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>CPL Promedio</span>
            <Sparkles className="w-3 h-3 text-[#FF6B00]" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            ${currentMetrics.cpl.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Por lead cualificado</div>
        </div>

        {/* Clics Generados */}
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Clics DSP</span>
            <MousePointer className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {currentMetrics.clicks.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Tráfico programático</div>
        </div>

        {/* CTR & CPC */}
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>CTR / CPC</span>
            <TrendingUp className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {currentMetrics.ctr.toFixed(2)}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">CPC: ${currentMetrics.cpc.toFixed(2)} MXN</div>
        </div>

        {/* Impresiones & CPM */}
        <div className="bg-white rounded-lg p-2.5 border border-slate-200">
          <div className="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Impresiones / CPM</span>
            <Eye className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
            {currentMetrics.impressions.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">CPM: ${currentMetrics.cpm.toFixed(2)} MXN</div>
        </div>
      </div>

      {/* Detailed View Accordion */}
      {isExpanded && showDetailedView && (
        <div className="p-3.5 sm:p-5 bg-white space-y-4">
          {/* Active Campaign Detail Banner if single selected */}
          {selectedCampaign && (
            <div className="bg-slate-50 border border-[#FF6B00]/30 rounded-xl p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2 py-0.5 rounded border border-[#FF6B00]/30">
                      {selectedCampaign.channelTypeLabel}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {selectedCampaign.statusLabel}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1.5">{selectedCampaign.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    <span>{selectedCampaign.targetingStrategy}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Presupuesto</div>
                  <div className="text-sm font-bold text-[#FF6B00] font-mono">{selectedCampaign.budget}</div>
                </div>
              </div>
            </div>
          )}

          {/* Master Table of All StackAdapt DSP Campaigns */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Campaña Programática DSP</th>
                  <th className="py-2.5 px-3">Estrategia / Tipo</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Leads</th>
                  <th className="py-2.5 px-3 text-right">CPL</th>
                  <th className="py-2.5 px-3 text-right">Clics</th>
                  <th className="py-2.5 px-3 text-right">CTR</th>
                  <th className="py-2.5 px-3 text-right">Inversión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {STACKADAPT_CAMPAIGNS_DATA.map((camp) => {
                  const isSelected = activeSelectedId === camp.id;
                  return (
                    <tr 
                      key={camp.id}
                      onClick={() => handleCampaignChange(camp.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#FF6B00]/5 border-l-2 border-[#FF6B00]' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[200px] sm:max-w-[280px]">{camp.name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] font-sans text-slate-500">{camp.channelType}</td>
                      <td className="py-2.5 px-3 text-[10px] font-sans">
                        <span className="px-1.5 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700">
                          {camp.statusLabel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#FF6B00] font-bold">{camp.leadsReported}</td>
                      <td className="py-2.5 px-3 text-right text-slate-900">${camp.cpl.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{camp.clicks.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{camp.ctr.toFixed(2)}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-900 font-bold">${camp.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  );
                })}
                {/* Total Row */}
                <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-2.5 px-3 font-sans text-[#FF6B00]">TOTAL DSP (Account 268858)</td>
                  <td className="py-2.5 px-3 font-sans text-[10px] text-slate-500">Geofencing + Native</td>
                  <td className="py-2.5 px-3 font-sans text-[10px] text-slate-500">Activas</td>
                  <td className="py-2.5 px-3 text-right text-[#FF6B00] font-bold">72 leads</td>
                  <td className="py-2.5 px-3 text-right text-[#FF6B00] font-bold">$420.97</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">2,230</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">0.66%</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-mono">$30,310.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
