import React, { useState } from 'react';
import { 
  Search, 
  Radio, 
  MessageSquare, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ExternalLink,
  Target,
  BarChart3,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Layers,
  MapPin,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { FunnelPeriod } from '../types';

interface UnifiedCampaignControlBarProps {
  selectedMetaCampaignId?: string;
  onSelectMetaCampaign?: (id: string) => void;
  selectedMetaWaCampaignId?: string;
  onSelectMetaWaCampaign?: (id: string) => void;
  selectedGoogleCampaignId?: string;
  onSelectGoogleCampaign?: (id: string) => void;
  selectedStackCampaignId?: string;
  onSelectStackCampaign?: (id: string) => void;
  metaCampaigns?: any[];
  googleCampaigns?: any[];
  stackCampaigns?: any[];
  className?: string;
}

export const UnifiedCampaignControlBar: React.FC<UnifiedCampaignControlBarProps> = ({
  selectedMetaCampaignId = 'all',
  onSelectMetaCampaign,
  selectedMetaWaCampaignId = 'all',
  onSelectMetaWaCampaign,
  selectedGoogleCampaignId = 'all',
  onSelectGoogleCampaign,
  selectedStackCampaignId = 'all',
  onSelectStackCampaign,
  metaCampaigns = [],
  googleCampaigns = [],
  stackCampaigns = [],
  className = ''
}) => {
  // Internal state if callbacks not passed
  const [internalMetaId, setInternalMetaId] = useState<string>(selectedMetaCampaignId);
  const [internalMetaWaId, setInternalMetaWaId] = useState<string>(selectedMetaWaCampaignId);
  const [internalGoogleId, setInternalGoogleId] = useState<string>(selectedGoogleCampaignId);
  const [internalStackId, setInternalStackId] = useState<string>(selectedStackCampaignId);

  // Active state
  const activeMetaId = onSelectMetaCampaign ? selectedMetaCampaignId : internalMetaId;
  const activeMetaWaId = onSelectMetaWaCampaign ? selectedMetaWaCampaignId : internalMetaWaId;
  const activeGoogleId = onSelectGoogleCampaign ? selectedGoogleCampaignId : internalGoogleId;
  const activeStackId = onSelectStackCampaign ? selectedStackCampaignId : internalStackId;

  // Expandable panel states
  const [expandedSection, setExpandedSection] = useState<'none' | 'meta_forms' | 'meta_wa' | 'google' | 'stack' | 'all'>('none');

  // Aggregate variables for dynamic data
  const totalGoogleConversions = googleCampaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
  const totalMetaForms = metaCampaigns.reduce((sum, c) => sum + (c.formulariosCompletados || 0), 0);
  const totalMetaWa = metaCampaigns.reduce((sum, c) => sum + (c.conversacionesIniciadas || 0), 0);
  const totalStackLeads = stackCampaigns.reduce((sum, c) => sum + (c.leadsReported || 0), 0);
  
  const handleMetaChange = (id: string) => {
    if (onSelectMetaCampaign) onSelectMetaCampaign(id);
    else setInternalMetaId(id);
  };

  const handleMetaWaChange = (id: string) => {
    if (onSelectMetaWaCampaign) onSelectMetaWaCampaign(id);
    else setInternalMetaWaId(id);
  };

  const handleGoogleChange = (id: string) => {
    if (onSelectGoogleCampaign) onSelectGoogleCampaign(id);
    else setInternalGoogleId(id);
  };

  const handleStackChange = (id: string) => {
    if (onSelectStackCampaign) onSelectStackCampaign(id);
    else setInternalStackId(id);
  };

  const handleResetAll = () => {
    handleMetaChange('all');
    handleMetaWaChange('all');
    handleGoogleChange('all');
    handleStackChange('all');
  };

  // Selected Campaign Objects
  const metaFormsCampaigns = metaCampaigns.filter(c => 
    c.objective === 'OUTCOME_LEADS' || 
    c.name.toLowerCase().includes('lead') || 
    (c.formulariosCompletados && c.formulariosCompletados > 0)
  );

  const metaWaCampaigns = metaCampaigns.filter(c => 
    c.objective === 'MESSAGES' || 
    c.name.toLowerCase().includes('wa') || 
    c.name.toLowerCase().includes('whatsapp') ||
    (c.conversacionesIniciadas && c.conversacionesIniciadas > 0)
  );

  const selectedMetaForms = activeMetaId === 'all' 
    ? undefined 
    : metaFormsCampaigns.find(c => c.id === activeMetaId || c.campaignId === activeMetaId);

  const selectedMetaWa = activeMetaWaId === 'all'
    ? undefined
    : metaWaCampaigns.find(c => c.id === activeMetaWaId || c.campaignId === activeMetaWaId);

  const selectedGoogle = activeGoogleId === 'all'
    ? undefined
    : googleCampaigns.find(c => c.id === activeGoogleId || c.campaignId === activeGoogleId);

  const selectedStack = activeStackId === 'all'
    ? undefined
    : stackCampaigns.find(c => c.id === activeStackId || c.campaignId === activeStackId);

  const hasAnyFilter = activeMetaId !== 'all' || activeMetaWaId !== 'all' || activeGoogleId !== 'all' || activeStackId !== 'all';

  // Metrics for 1. Meta Forms
  const metaFormsMetrics = selectedMetaForms ? {
    leads: selectedMetaForms.formulariosCompletados,
    cpl: selectedMetaForms.costoPorLeadReportado > 0 ? selectedMetaForms.costoPorLeadReportado : (selectedMetaForms.spend / Math.max(1, selectedMetaForms.formulariosCompletados)),
    spend: selectedMetaForms.spend,
    clicks: selectedMetaForms.clicks,
    ctr: selectedMetaForms.ctr
  } : {
    leads: totalMetaForms,
    cpl: metaFormsCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0) / Math.max(1, totalMetaForms),
    spend: metaFormsCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0),
    clicks: metaFormsCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    ctr: 0 // Simplificado para total
  };

  // Metrics for 2. Meta WhatsApp Conversations
  const metaWaMetrics = selectedMetaWa ? {
    conversations: selectedMetaWa.conversacionesIniciadas,
    cpc: selectedMetaWa.costoPorConversacionIniciada > 0 ? selectedMetaWa.costoPorConversacionIniciada : (selectedMetaWa.spend / Math.max(1, selectedMetaWa.conversacionesIniciadas)),
    spend: selectedMetaWa.spend,
    clicks: selectedMetaWa.clicks,
    messagesRate: ((selectedMetaWa.conversacionesIniciadas / Math.max(1, selectedMetaWa.clicks)) * 100)
  } : {
    conversations: totalMetaWa,
    cpc: metaWaCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0) / Math.max(1, totalMetaWa),
    spend: metaWaCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0),
    clicks: metaWaCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    messagesRate: 0
  };

  // Metrics for 3. Google Ads
  const googleMetrics = selectedGoogle ? {
    conversions: selectedGoogle.conversions,
    costPerConv: selectedGoogle.costPerConversion,
    spend: selectedGoogle.spend,
    clicks: selectedGoogle.clicks,
    ctr: selectedGoogle.ctr,
    cpc: selectedGoogle.cpc
  } : {
    conversions: totalGoogleConversions,
    costPerConv: googleCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0) / Math.max(1, totalGoogleConversions),
    spend: googleCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0),
    clicks: googleCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    ctr: 0,
    cpc: 0
  };

  // Metrics for 4. StackAdapt DSP
  const stackMetrics = selectedStack ? {
    leads: selectedStack.leadsReported,
    cpl: selectedStack.cpl,
    spend: selectedStack.spend,
    clicks: selectedStack.clicks,
    ctr: selectedStack.ctr,
    cpc: selectedStack.cpc
  } : {
    leads: totalStackLeads,
    cpl: stackCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0) / Math.max(1, totalStackLeads),
    spend: stackCampaigns.reduce((sum, c) => sum + (c.spend || 0), 0),
    clicks: stackCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
    ctr: 0,
    cpc: 0
  };

  return (
    <div className={`bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all duration-200 ${className}`}>
      {/* Top Banner: Real-Time Multi-Channel Controller Header */}
      <div className="p-3 sm:p-3.5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <Layers className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-xs sm:text-sm">Control de Campañas en Tiempo Real</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                4 Canales Conectados
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Modifica cualquiera de los 4 canales simultáneamente para recalcular resultados en vivo.
            </p>
          </div>
        </div>

        {/* Global Reset & Accordion Master Button */}
        <div className="flex items-center gap-2">
          {hasAnyFilter && (
            <button
              onClick={handleResetAll}
              className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ver Totales de Cuentas</span>
            </button>
          )}

          <button
            onClick={() => setExpandedSection(expandedSection === 'all' ? 'none' : 'all')}
            className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            {expandedSection === 'all' ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ocultar Detalles de Anuncios</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ver Anuncios y Rendimiento Completo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          THE 4 SIMULTANEOUS DROPDOWN CONTROLS (VISIBLE SIDE-BY-SIDE IN A 4-COL GRID)
         ========================================================================= */}
      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50/50">
        
        {/* ==================== 1. META ADS (FORMULARIOS / LEADS) ==================== */}
        <div className={`bg-white rounded-xl p-3 border transition-all flex flex-col justify-between shadow-xs ${
          activeMetaId !== 'all' ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-slate-200 hover:border-blue-300'
        }`}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText className="w-3 h-3" />
                </div>
                <span className="font-bold text-slate-900 text-xs">1. Meta Formularios</span>
              </div>
              <span className="text-[9px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                Lead Ads
              </span>
            </div>

            {/* Dropdown 1 */}
            <div className="relative mb-2.5">
              <select
                id="select-meta-forms"
                value={activeMetaId}
                onChange={(e) => handleMetaChange(e.target.value)}
                className="w-full appearance-none bg-white hover:bg-slate-50 border border-slate-300 hover:border-blue-500 text-slate-900 text-xs font-medium rounded-lg px-2.5 py-2 pr-7 transition-colors cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">
                  Todos los Formularios — ({totalMetaForms} leads)
                </option>
                {metaFormsCampaigns.map(c => (
                  <option key={c.id || c.campaignId} value={c.id || c.campaignId}>
                    {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.formulariosCompletados} leads)
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Quick Real-Time Metrics Strip - Featuring Total Cost */}
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 grid grid-cols-3 gap-1.5 text-center">
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Costo Total</div>
              <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                ${metaFormsMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Leads Totales</div>
              <div className="text-sm font-bold text-blue-600 font-mono">{metaFormsMetrics.leads}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Clics (CTR)</div>
              <div className="text-xs font-medium text-slate-700 font-mono mt-0.5">
                {metaFormsMetrics.clicks.toLocaleString()} ({metaFormsMetrics.ctr}%)
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 2. META ADS (CONVERSACIONES WHATSAPP) ==================== */}
        <div className={`bg-white rounded-xl p-3 border transition-all flex flex-col justify-between shadow-xs ${
          activeMetaWaId !== 'all' ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-slate-200 hover:border-emerald-300'
        }`}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-3 h-3" />
                </div>
                <span className="font-bold text-slate-900 text-xs">2. Meta Conversaciones</span>
              </div>
              <span className="text-[9px] font-mono bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200 font-semibold">
                WhatsApp
              </span>
            </div>

            {/* Dropdown 2 */}
            <div className="relative mb-2.5">
              <select
                id="select-meta-wa"
                value={activeMetaWaId}
                onChange={(e) => handleMetaWaChange(e.target.value)}
                className="w-full appearance-none bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-500 text-slate-900 text-xs font-medium rounded-lg px-2.5 py-2 pr-7 transition-colors cursor-pointer focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">
                  Todas las Conversaciones — ({totalMetaWa} chats)
                </option>
                {metaWaCampaigns.map(c => (
                  <option key={c.id || c.campaignId} value={c.id || c.campaignId}>
                    {c.name} — Costo Total: ${c.spend.toLocaleString('es-MX', { minimumFractionDigits: 2 })} ({c.conversacionesIniciadas} chats)
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Quick Real-Time Metrics Strip - Featuring Total Cost */}
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 grid grid-cols-3 gap-1.5 text-center">
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Costo Total</div>
              <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                ${metaWaMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Chats WA</div>
              <div className="text-sm font-bold text-emerald-600 font-mono">{metaWaMetrics.conversations}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Clics WA</div>
              <div className="text-xs font-medium text-slate-700 font-mono mt-0.5">
                {metaWaMetrics.clicks.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 3. GOOGLE ADS (SEARCH / DISPLAY / YOUTUBE) ==================== */}
        <div className={`bg-white rounded-xl p-3 border transition-all flex flex-col justify-between shadow-xs ${
          activeGoogleId !== 'all' ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-slate-200 hover:border-blue-300'
        }`}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Search className="w-3 h-3" />
                </div>
                <span className="font-bold text-slate-900 text-xs">3. Google Ads</span>
              </div>
              <span className="text-[9px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 font-semibold">
                ID: 453-930
              </span>
            </div>

            {/* Dropdown 3 */}
            <div className="relative mb-2.5">
              <select
                id="select-google-ads"
                value={activeGoogleId}
                onChange={(e) => handleGoogleChange(e.target.value)}
                className="w-full appearance-none bg-white hover:bg-slate-50 border border-slate-300 hover:border-blue-500 text-slate-900 text-xs font-medium rounded-lg px-2.5 py-2 pr-7 transition-colors cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">Todo Google Ads</option>
                {googleCampaigns.map(c => (
                  <option key={c.id || c.campaignId} value={c.id || c.campaignId}>
                    {c.name} ({c.status})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Quick Real-Time Metrics Strip - Featuring Total Cost */}
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 grid grid-cols-3 gap-1.5 text-center">
            <div>
              <div className="text-[9px] text-slate-500 font-semibold" title="Inversión publicitaria total">Costo Total</div>
              <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                ${googleMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold" title="Clientes potenciales / Conversiones registradas">Conversiones</div>
              <div className="text-sm font-bold text-blue-600 font-mono">{googleMetrics.conversions}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold" title="Clics totales y CTR">Clics (CTR)</div>
              <div className="text-xs font-medium text-slate-700 font-mono mt-0.5">
                {googleMetrics.clicks.toLocaleString()} ({googleMetrics.ctr}%)
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 4. STACKADAPT DSP (PROGRAMÁTICA / GEOFENCING) ==================== */}
        <div className={`bg-white rounded-xl p-3 border transition-all flex flex-col justify-between shadow-xs ${
          activeStackId !== 'all' ? 'border-amber-500 ring-1 ring-amber-500/30' : 'border-slate-200 hover:border-amber-300'
        }`}>
          <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Radio className="w-3 h-3" />
                </div>
                <span className="font-bold text-slate-900 text-xs">4. StackAdapt DSP</span>
              </div>
              <span className="text-[9px] font-mono bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded border border-amber-200 font-semibold">
                Account: 268858
              </span>
            </div>

            {/* Dropdown 4 */}
            <div className="relative mb-2.5">
              <select
                id="select-stackadapt-dsp"
                value={activeStackId}
                onChange={(e) => handleStackChange(e.target.value)}
                className="w-full appearance-none bg-white hover:bg-slate-50 border border-slate-300 hover:border-amber-500 text-slate-900 text-xs font-medium rounded-lg px-2.5 py-2 pr-7 transition-colors cursor-pointer focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">Todo DSP Programático</option>
                {stackCampaigns.map(c => (
                  <option key={c.id || c.campaignId} value={c.id || c.campaignId}>
                    {c.name} ({c.status || 'Active'})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Quick Real-Time Metrics Strip - Featuring Total Cost */}
          <div className="bg-slate-50 rounded-lg p-2 border border-slate-200 grid grid-cols-3 gap-1.5 text-center">
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Costo Total</div>
              <div className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                ${stackMetrics.spend.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Leads DSP</div>
              <div className="text-sm font-bold text-amber-600 font-mono">{stackMetrics.leads}</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 font-semibold">Clics (CTR)</div>
              <div className="text-xs font-medium text-slate-700 font-mono mt-0.5">
                {stackMetrics.clicks.toLocaleString()} ({stackMetrics.ctr}%)
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          FULL AUDIT ACCORDION: REAL AD CREATIVES & CAMPAIGN DATA TABLES
         ========================================================================= */}
      {expandedSection === 'all' && (
        <div className="p-4 bg-slate-50/70 border-t border-slate-200 space-y-4">
          
          {/* Active Google Ads Anuncios Reales & Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  Google Ads (453-930-3033) — {selectedGoogle ? selectedGoogle.name : 'Desglose Global de Campañas'}
                </h4>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
                {selectedGoogle ? `${selectedGoogle.conversions} Conversiones` : `${totalGoogleConversions} Conversiones Totales`}
              </span>
            </div>

            {selectedGoogle && selectedGoogle.ads && selectedGoogle.ads.length > 0 && (
              <div className="mt-3 space-y-2">
                {selectedGoogle.ads.map(ad => (
                  <div key={ad.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-[11px] font-mono text-blue-600 flex items-center gap-1">
                      <span>{ad.finalUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1">{ad.headline}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{ad.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active StackAdapt DSP Geofencing Strategy */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-slate-900">
                  StackAdapt Programmatic DSP (268858) — {selectedStack ? selectedStack.name : 'Geocercas y Retargeting'}
                </h4>
              </div>
              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono font-bold border border-amber-200">
                {selectedStack ? `${selectedStack.leadsReported} Leads` : `${totalStackLeads} Leads Totales`}
              </span>
            </div>
            {selectedStack && (
              <div className="mt-2.5 text-xs text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Segmentación: <strong className="text-slate-900">{selectedStack.targetingStrategy}</strong></span>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
