import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  MousePointer, 
  DollarSign, 
  Eye, 
  Sparkles, 
  ExternalLink,
  Target,
  BarChart3,
  Video,
  LayoutGrid
} from 'lucide-react';

interface GoogleAdsCampaignDropdownProps {
  selectedCampaignId?: string;
  onSelectCampaign?: (campaignId: string) => void;
  defaultExpanded?: boolean;
  showDetailedView?: boolean;
}

export const GoogleAdsCampaignDropdown: React.FC<GoogleAdsCampaignDropdownProps> = ({
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

  const selectedCampaign: GoogleAdsCampaignDetail | undefined = 
    activeSelectedId === 'all' 
      ? undefined 
      : googleCampaigns.find(c => c.id === activeSelectedId || c.campaignId === activeSelectedId);

  const allCampaignsTotals = {
    spend: (googleCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0)),
    impressions: (googleCampaigns.reduce((sum, c) => sum + (c.impressions || 0), 0)),
    clicks: (googleCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0)),
    ctr: (googleCampaigns.reduce((sum, c) => sum + (c.ctr || 0), 0) / (googleCampaigns.length || 1)),
    cpc: (googleCampaigns.reduce((sum, c) => sum + (c.cpc || 0), 0) / (googleCampaigns.length || 1)),
    conversions: (googleCampaigns.reduce((sum, c) => sum + (c.conversions || 0), 0)),
    costPerConversion: (googleCampaigns.reduce((sum, c) => sum + (c.costPerConversion || 0), 0) / (googleCampaigns.length || 1)),
    conversionRate: (googleCampaigns.reduce((sum, c) => sum + (c.conversionRate || 0), 0) / (googleCampaigns.length || 1))
  };

  const currentMetrics = selectedCampaign ? {
    spend: selectedCampaign.spend,
    impressions: selectedCampaign.impressions,
    clicks: selectedCampaign.clicks,
    ctr: selectedCampaign.ctr,
    cpc: selectedCampaign.cpc,
    conversions: selectedCampaign.conversions,
    costPerConversion: selectedCampaign.costPerConversion,
    conversionRate: selectedCampaign.conversionRate
  } : allCampaignsTotals;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
      {/* Header & Campaign Selector Bar */}
      <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 flex items-center justify-center text-[#4285F4]">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">Google Ads Manager</span>
              <span className="text-[10px] bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/30 px-1.5 py-0.2 rounded font-mono font-bold">
                ID: {''}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {''} ({''}) • {''}
            </p>
          </div>
        </div>

        {/* Campaign Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="google-campaign-select" className="text-[11px] font-semibold text-slate-600 whitespace-nowrap">
            Campaña:
          </label>
          <div className="relative min-w-[260px] sm:min-w-[360px]">
            <select
              id="google-campaign-select"
              value={activeSelectedId}
              onChange={(e) => handleCampaignChange(e.target.value)}
              className="w-full appearance-none bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#4285F4] text-slate-900 text-xs font-medium rounded-lg px-3 py-2 pr-8 transition-colors cursor-pointer focus:outline-none focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4]"
            >
              <option value="all">
                Todas las campañas — Costo Total: ${(googleCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0)).toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({(googleCampaigns.reduce((sum, c) => sum + (c.conversions || 0), 0))} conversiones)
              </option>
              <optgroup label="Campañas Activas (Habilitadas)">
                {googleCampaigns.filter(c => c.status === 'ACTIVE').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.conversions} conv.)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Campañas Pausadas / Históricas">
                {googleCampaigns.filter(c => c.status !== 'ACTIVE').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.conversions > 0 ? `${c.conversions} conv.` : 'Pausada'})
                  </option>
                ))}
              </optgroup>
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

      {/* Summary KPI Strip - Styled faithfully to Google Ads Dashboard */}
      <div className="p-3.5 sm:p-4 bg-slate-100/60 grid grid-cols-2 md:grid-cols-4 gap-2.5 border-b border-slate-200">
        {/* 1. Clics (Google Ads Blue Card) */}
        <div className="bg-[#1A73E8] rounded-xl p-3.5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/90">Clics</span>
            <MousePointer className="w-3.5 h-3.5 text-white/80" />
          </div>
          <div className="my-1.5">
            <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
              {currentMetrics.clicks >= 1000 ? `${(currentMetrics.clicks / 1000).toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mil` : currentMetrics.clicks.toLocaleString()}
            </div>
          </div>
          <div className="text-[11px] text-white/80 font-medium">
            {currentMetrics.clicks.toLocaleString()} clics totales
          </div>
        </div>

        {/* 2. Conversiones (Google Ads Red Card) */}
        <div className="bg-[#D93025] rounded-xl p-3.5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/90">Conversiones</span>
            <Target className="w-3.5 h-3.5 text-white/80" />
          </div>
          <div className="my-1.5">
            <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
              {currentMetrics.conversions.toFixed(2).replace('.', ',')}
            </div>
          </div>
          <div className="text-[11px] text-white/80 font-medium">
            Costo/conv: ${currentMetrics.costPerConversion.toFixed(2)} MXN
          </div>
        </div>

        {/* 3. Coste (Google Ads Amber/Orange Card) */}
        <div className="bg-[#E37400] rounded-xl p-3.5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/90">Coste</span>
            <DollarSign className="w-3.5 h-3.5 text-white/80" />
          </div>
          <div className="my-1.5">
            <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
              {currentMetrics.spend >= 1000 ? `${(currentMetrics.spend / 1000).toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mil $` : `$${currentMetrics.spend.toLocaleString('es-MX')}`}
            </div>
          </div>
          <div className="text-[11px] text-white/80 font-medium">
            ${currentMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN total
          </div>
        </div>

        {/* 4. CTR (Google Ads Green Card) */}
        <div className="bg-[#1E8E3E] rounded-xl p-3.5 text-white shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/90">CTR</span>
            <BarChart3 className="w-3.5 h-3.5 text-white/80" />
          </div>
          <div className="my-1.5">
            <div className="text-2xl sm:text-3xl font-black tracking-tight font-mono">
              {currentMetrics.ctr.toFixed(2).replace('.', ',')} %
            </div>
          </div>
          <div className="text-[11px] text-white/80 font-medium">
            CPC prom: ${currentMetrics.cpc.toFixed(2)} MXN
          </div>
        </div>
      </div>

      {/* Detailed View Accordion */}
      {isExpanded && showDetailedView && (
        <div className="p-3.5 sm:p-5 bg-white space-y-4">
          {/* Active Campaign Detail Banner if single selected */}
          {selectedCampaign && (
            <div className="bg-slate-50 border border-[#4285F4]/30 rounded-xl p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#4285F4] bg-[#4285F4]/10 px-2 py-0.5 rounded border border-[#4285F4]/30">
                      {selectedCampaign.typeLabel}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      selectedCampaign.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {selectedCampaign.statusLabel}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1.5">{selectedCampaign.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Grupo de anuncios: {selectedCampaign.adGroupName}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Presupuesto</div>
                  <div className="text-sm font-bold text-[#4285F4] font-mono">{selectedCampaign.budget}</div>
                </div>
              </div>

              {/* Anuncios Reales Adaptables de Búsqueda / Display */}
              {selectedCampaign.ads && selectedCampaign.ads.length > 0 && (
                <div className="mt-3.5">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
                    Anuncio Real Configurado en Google Ads
                  </div>
                  <div className="space-y-2">
                    {selectedCampaign.ads.map((ad) => (
                      <div key={ad.id} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="text-[11px] font-mono text-[#4285F4] flex items-center gap-1">
                              <span>{ad.finalUrl}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                            <h5 className="text-xs font-semibold text-slate-900 leading-snug">{ad.headline}</h5>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{ad.description}</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-right shrink-0">
                            <div className="text-[10px] text-slate-500">Conversiones</div>
                            <div className="text-xs font-bold text-[#4285F4] font-mono">{ad.conversions} conv.</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">${ad.costPerConversion.toFixed(0)}/conv.</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Master Table of All Google Ads Campaigns */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Campaña Google Ads</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Conversiones</th>
                  <th className="py-2.5 px-3 text-right">Coste/Conv.</th>
                  <th className="py-2.5 px-3 text-right">Clics</th>
                  <th className="py-2.5 px-3 text-right">CTR</th>
                  <th className="py-2.5 px-3 text-right">Coste Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {googleCampaigns.map((camp) => {
                  const isSelected = activeSelectedId === camp.id;
                  return (
                    <tr 
                      key={camp.id}
                      onClick={() => handleCampaignChange(camp.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#4285F4]/5 border-l-2 border-[#4285F4]' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate max-w-[200px] sm:max-w-[280px]">{camp.name}</span>
                          {camp.status === 'ACTIVE' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] font-sans text-slate-500">{camp.typeLabel.split(' ')[0]}</td>
                      <td className="py-2.5 px-3 text-[10px] font-sans">
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          camp.status === 'ACTIVE' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {camp.status === 'ACTIVE' ? 'Habilitado' : 'Pausado'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#4285F4] font-bold">{camp.conversions}</td>
                      <td className="py-2.5 px-3 text-right text-slate-900">${camp.costPerConversion.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{camp.clicks.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-slate-600">{camp.ctr.toFixed(2)}%</td>
                      <td className="py-2.5 px-3 text-right text-slate-900 font-bold">${camp.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  );
                })}
                {/* Total Row */}
                <tr className="bg-slate-100 font-extrabold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-2.5 px-3 font-sans text-slate-900">TOTAL CUENTA (453-930-3033)</td>
                  <td className="py-2.5 px-3 font-sans text-[10px] text-slate-500">Multicanal</td>
                  <td className="py-2.5 px-3 font-sans text-[10px] text-slate-500">—</td>
                  <td className="py-2.5 px-3 text-right text-[#4285F4] font-bold">89 conversiones</td>
                  <td className="py-2.5 px-3 text-right text-[#4285F4] font-bold">$591.25</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">6,386</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">2.02%</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-mono">$52,621.15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};


