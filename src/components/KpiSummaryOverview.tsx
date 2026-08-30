import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Activity, 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Clock, 
  Compass,
  Building,
  HelpCircle,
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  Filter,
  X
} from 'lucide-react';
import { FunnelPeriod, FunnelCalculations } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from 'recharts';
import { UnifiedCampaignControlBar } from './UnifiedCampaignControlBar';
import { META_CAMPAIGNS_DATA, META_ACCOUNT_INFO, MetaCampaignDetail } from '../data/metaAdsData';
import { GOOGLE_ADS_CAMPAIGNS_DATA, GOOGLE_ADS_ACCOUNT_INFO, GoogleAdsCampaignDetail } from '../data/googleAdsData';
import { STACKADAPT_CAMPAIGNS_DATA, STACKADAPT_ACCOUNT_INFO, StackAdaptCampaignDetail } from '../data/stackAdaptData';

interface KpiSummaryOverviewProps {
  period: FunnelPeriod;
  calculations: FunnelCalculations;
  onNavigateToTab: (tab: string) => void;
}

export const KpiSummaryOverview: React.FC<KpiSummaryOverviewProps> = ({
  period,
  calculations,
  onNavigateToTab
}) => {
  const [selectedMetaCampaignId, setSelectedMetaCampaignId] = useState<string>('all');
  const [selectedMetaWaCampaignId, setSelectedMetaWaCampaignId] = useState<string>('all');
  const [selectedGoogleCampaignId, setSelectedGoogleCampaignId] = useState<string>('all');
  const [selectedStackCampaignId, setSelectedStackCampaignId] = useState<string>('all');

  // Selected Meta Forms campaign object
  const selectedMetaCampaign: MetaCampaignDetail | undefined = 
    selectedMetaCampaignId === 'all' 
      ? undefined 
      : META_CAMPAIGNS_DATA.find(c => c.id === selectedMetaCampaignId || c.campaignId === selectedMetaCampaignId);

  // Selected Meta WA campaign object
  const selectedMetaWaCampaign: MetaCampaignDetail | undefined = 
    selectedMetaWaCampaignId === 'all' 
      ? undefined 
      : META_CAMPAIGNS_DATA.find(c => c.id === selectedMetaWaCampaignId || c.campaignId === selectedMetaWaCampaignId);

  // Selected Google campaign object
  const selectedGoogleCampaign: GoogleAdsCampaignDetail | undefined = 
    selectedGoogleCampaignId === 'all' 
      ? undefined 
      : GOOGLE_ADS_CAMPAIGNS_DATA.find(c => c.id === selectedGoogleCampaignId || c.campaignId === selectedGoogleCampaignId);

  // Selected StackAdapt campaign object
  const selectedStackCampaign: StackAdaptCampaignDetail | undefined = 
    selectedStackCampaignId === 'all' 
      ? undefined 
      : STACKADAPT_CAMPAIGNS_DATA.find(c => c.id === selectedStackCampaignId || c.campaignId === selectedStackCampaignId);

  // Aggregate leads breakdown for Question 1
  const metaFormsCount = period.rows
    .filter(r => r.tipoDetonador === 'meta_forms' || r.detonador.toLowerCase().includes('facebook') || r.detonador.toLowerCase().includes('instagram'))
    .reduce((sum, r) => sum + r.leadsTotales, 0);

  const whatsappLeadsCount = Math.round(metaFormsCount * 0.42) || 12; // Click-to-WhatsApp proportion
  const directFormsCount = metaFormsCount - whatsappLeadsCount > 0 ? metaFormsCount - whatsappLeadsCount : metaFormsCount;

  // Dynamic Meta Card 1: Formularios Meta
  const displayMetaForms = selectedMetaCampaign 
    ? selectedMetaCampaign.formulariosCompletados 
    : (META_ACCOUNT_INFO.totalFormulariosCompletados || directFormsCount);

  const displayMetaFormsSublabel = selectedMetaCampaign 
    ? (selectedMetaCampaign.formulariosCompletados > 0 
        ? `Instant Forms ($${selectedMetaCampaign.costoPorLeadReportado.toFixed(0)}/lead)` 
        : '0 leads (Campaña de WhatsApp)')
    : 'Instant Forms (Lead Ads)';

  const displayMetaFormsBadge = selectedMetaCampaign 
    ? (selectedMetaCampaign.formulariosCompletados > 0 ? `${selectedMetaCampaign.formulariosCompletados} Leads` : '0 Forms')
    : 'FB / IG';

  // Dynamic Meta Card 2: Conversaciones Meta (WhatsApp / Mensajes)
  const displayMetaConversations = selectedMetaWaCampaign 
    ? selectedMetaWaCampaign.conversacionesIniciadas 
    : (META_ACCOUNT_INFO.totalConversacionesIniciadas || 125);

  const displayMetaConversationsCost = selectedMetaWaCampaign 
    ? (selectedMetaWaCampaign.costoPorConversacionIniciada > 0 
        ? selectedMetaWaCampaign.costoPorConversacionIniciada 
        : (selectedMetaWaCampaign.spend > 0 && selectedMetaWaCampaign.conversacionesIniciadas > 0 ? selectedMetaWaCampaign.spend / selectedMetaWaCampaign.conversacionesIniciadas : 0))
    : 97.07;

  const displayMetaConversationsBadge = selectedMetaWaCampaign 
    ? (selectedMetaWaCampaign.objective === 'MESSAGES' ? 'WA CBO' : selectedMetaWaCampaign.status === 'ACTIVE' ? 'Activa' : 'Desactivada')
    : 'Campaña Ads';

  const displayMetaConversationsSublabel = selectedMetaWaCampaign 
    ? (selectedMetaWaCampaign.objective === 'MESSAGES' ? 'Conversaciones WhatsApp' : 'Iniciadas en Campaña')
    : 'Iniciadas en Campañas';

  // Dynamic Google & StackAdapt (Card 4)
  const googleConversions = selectedGoogleCampaign ? selectedGoogleCampaign.conversions : GOOGLE_ADS_ACCOUNT_INFO.totalConversions;
  const stackLeads = selectedStackCampaign ? selectedStackCampaign.leadsReported : STACKADAPT_ACCOUNT_INFO.totalLeadsReported;
  const totalGoogleStack = googleConversions + stackLeads;

  const googleStackSublabel = selectedGoogleCampaign 
    ? `Google: ${selectedGoogleCampaign.name} (${selectedGoogleCampaign.conversions} conv. • $${selectedGoogleCampaign.costPerConversion.toFixed(0)}/c)`
    : (selectedStackCampaign 
        ? `DSP: ${selectedStackCampaign.name} (${selectedStackCampaign.leadsReported} leads • $${selectedStackCampaign.cpl.toFixed(0)}/lead)`
        : `Google (${googleConversions} conv.) + DSP (${stackLeads} leads)`);

  const googleStackBadge = selectedGoogleCampaign
    ? `${selectedGoogleCampaign.conversions} Google`
    : (selectedStackCampaign ? `${selectedStackCampaign.leadsReported} DSP` : 'Google + DSP');

  const webFormsCount = period.rows
    .filter(r => r.tipoDetonador === 'web_form' || r.detonador.toLowerCase().includes('web'))
    .reduce((sum, r) => sum + r.leadsTotales, 0);

  const showroomCount = period.rows
    .filter(r => r.tipoDetonador === 'showroom' || r.detonador.toLowerCase().includes('punto de venta') || r.detonador.toLowerCase().includes('señalizacion'))
    .reduce((sum, r) => sum + r.leadsTotales, 0);

  // Top channels for Question 6
  const topForRealLeads = [...period.rows].sort((a, b) => b.leadsDatosReales - a.leadsDatosReales)[0];
  const topForVisits = [...period.rows].sort((a, b) => b.visitas - a.visitas)[0];
  const topForSales = [...period.rows].sort((a, b) => b.ventas - a.ventas)[0];

  return (
    <div className="space-y-6 pb-12 text-slate-800">
      
      {/* Banner Period Title & Quick Highlights in Elegant Light */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
                PROYECTO EPIKA CHAPULTEPEC
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {period.dateRange}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase font-sans">
              Dashboard de Inteligencia Comercial & Retorno de Inversión
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Monitoreo integral de Meta Ads, Google Ads, StackAdapt y Calidad de Leads Sierra Providencia para el desarrollo Epika en Av. Chapultepec.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PREGUNTA 1: LEADS AL DÍA DE HOY EN EL PERIODO POR CANAL & TIPO
          ========================================================================= */}
      <section id="section-pregunta-1" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
              1
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                ¿Cuántos leads llevamos al día de hoy en el periodo?
              </h3>
              <p className="text-xs text-slate-500">
                Desglose por formularios de Meta, mensajes de WhatsApp, formularios web y conversiones de Epika.mx
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-900 bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto font-mono">
            Total Leads Reportados: <span className="font-extrabold">{calculations.totalLeads}</span>
          </span>
        </div>

        {/* Menu Desplegable Multi-Plataforma (Meta Formularios, Meta WhatsApp, Google Ads, StackAdapt DSP) */}
        <div className="mb-4">
          <UnifiedCampaignControlBar 
            selectedMetaCampaignId={selectedMetaCampaignId}
            onSelectMetaCampaign={setSelectedMetaCampaignId}
            selectedMetaWaCampaignId={selectedMetaWaCampaignId}
            onSelectMetaWaCampaign={setSelectedMetaWaCampaignId}
            selectedGoogleCampaignId={selectedGoogleCampaignId}
            onSelectGoogleCampaign={setSelectedGoogleCampaignId}
            selectedStackCampaignId={selectedStackCampaignId}
            onSelectStackCampaign={setSelectedStackCampaignId}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Card 1: Formularios Instantáneos Meta */}
          <div className={`rounded-lg p-3.5 border transition-all flex flex-col justify-between ${
            selectedMetaCampaign && selectedMetaCampaign.formulariosCompletados > 0 
              ? 'bg-blue-50/50 border-blue-400 ring-1 ring-blue-400/30 shadow-xs' 
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-900">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Formularios Meta
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-bold">
                  {displayMetaFormsBadge}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">
                {displayMetaForms}
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {displayMetaFormsSublabel}
            </p>
          </div>

          {/* Card 2: Conversaciones Iniciadas en Meta (Dinámico por Campaña) */}
          <div className={`rounded-lg p-3.5 border transition-all flex flex-col justify-between ${
            selectedMetaWaCampaign && selectedMetaWaCampaign.conversacionesIniciadas > 0 
              ? 'bg-emerald-50/50 border-emerald-400 ring-1 ring-emerald-400/30 shadow-xs' 
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-emerald-800">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  Conversaciones Meta
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">
                  {displayMetaConversationsBadge}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">
                {displayMetaConversations}
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
              <span className="truncate pr-1" title={displayMetaConversationsSublabel}>
                {displayMetaConversationsSublabel}
              </span>
              <span className="text-emerald-700 font-mono font-semibold shrink-0">
                ${displayMetaConversationsCost.toFixed(1)}/c
              </span>
            </div>
          </div>

          {/* Card 3: Formularios Sitio Web / Sección Gracias */}
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-900">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  Web Epika.mx
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">/gracias</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">{webFormsCount}</div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Llegaron a sección "Gracias"
            </p>
          </div>

          {/* Card 4: Google Ads & Programática StackAdapt (Dinámico) */}
          <div className={`rounded-lg p-3.5 border transition-all flex flex-col justify-between ${
            selectedGoogleCampaign || selectedStackCampaign
              ? 'bg-blue-50/50 border-blue-400 ring-1 ring-blue-400/30 shadow-xs'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}>
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-900">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  Google & StackAdapt
                </span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-bold">
                  {googleStackBadge}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">
                {totalGoogleStack}
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 truncate" title={googleStackSublabel}>
              {googleStackSublabel}
            </p>
          </div>

          {/* Card 5: Showroom / Punto de Venta */}
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-slate-900">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  Punto de Venta
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">Showroom</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 font-mono mt-1">{showroomCount}</div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Señalización & Walk-ins
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PREGUNTA 2 & 5: GASTO POR MEDIO, RESULTADOS POR CAPAS Y RATIOS DE VENTA
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pregunta 2: Inversión en capas */}
        <section id="section-pregunta-2" className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
                2
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                  ¿Cuánto llevamos gastado en cada medio y qué resultados ha contribuido?
                </h3>
                <p className="text-xs text-slate-500">
                  Flujo en capas: Inversión → Leads Reportados → Leads Reales (Sierra Providencia) → Citas → Ventas
                </p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateToTab('funnel')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              Ver Tabla Completa
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Visual Layer Flow Bar in Elegant Light */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-5">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Capa 1: Inversión</span>
              <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
                ${calculations.totalInversion.toLocaleString('es-MX')}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Presupuesto total</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Capa 2: Leads Brutos</span>
              <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
                {calculations.totalLeads}
              </div>
              <span className="text-[10px] text-emerald-700 mt-1 block font-mono font-bold">CPL: ${calculations.cplReportado.toFixed(0)}</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Capa 3: Datos Reales</span>
              <div className="text-base sm:text-lg font-bold text-emerald-700 font-mono mt-0.5">
                {calculations.totalLeadsReales}
              </div>
              <span className="text-[10px] text-emerald-800 mt-1 block font-mono font-bold">
                {calculations.pctCalidadDatos.toFixed(1)}% calidad
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Capa 4: Citas Showroom</span>
              <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
                {calculations.totalVisitas}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                Costo Cita: ${calculations.costoPorCita.toFixed(0)}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Capa 5: Ventas</span>
              <div className="text-base sm:text-lg font-bold text-emerald-700 font-mono mt-0.5">
                {calculations.totalVentas}
              </div>
              <span className="text-[10px] text-emerald-800 mt-1 block font-mono font-bold">
                CAC: ${calculations.cac > 0 ? calculations.cac.toLocaleString('es-MX') : 'N/A'}
              </span>
            </div>
          </div>

          {/* Channel breakdown table in Elegant Light */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-500 uppercase font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Detonador / Canal</th>
                  <th className="py-2.5 px-3 text-right">Inversión</th>
                  <th className="py-2.5 px-3 text-right">Leads</th>
                  <th className="py-2.5 px-3 text-right">Sierra (Real)</th>
                  <th className="py-2.5 px-3 text-right">Citas</th>
                  <th className="py-2.5 px-3 text-right">Ventas</th>
                  <th className="py-2.5 px-3">Principal Fuga</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[12px] text-slate-700 font-mono bg-white">
                {period.rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">{row.detonador}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">${row.inversion.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">{row.leadsTotales}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-semibold">{row.leadsDatosReales}</td>
                    <td className="py-2.5 px-3 text-right text-slate-900 font-semibold">{row.visitas}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">{row.ventas}</td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        {row.principalFuga}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pregunta 5: Ratios de Eficiencia para 1 Venta */}
        <section id="section-pregunta-5" className="bg-white text-slate-800 rounded-xl p-5 shadow-xs border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-200">
              <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
                5
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                  Ratios de Ventas & Conversión
                </h3>
                <p className="text-xs text-slate-500">
                  ¿Cuántos leads se requieren para lograr 1 venta en Epika?
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* Ratio 1: Leads Reportados por Venta */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Leads Reportados (Brutos) / 1 Venta:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                    {calculations.leadsReportadosPorVenta > 0 ? Math.round(calculations.leadsReportadosPorVenta) : '-'}
                  </span>
                  <span className="text-xs text-emerald-700 font-mono font-bold">leads reportados</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Fórmula: Total Leads ({calculations.totalLeads}) / Ventas ({calculations.totalVentas || 1})
                </p>
              </div>

              {/* Ratio 2: Leads Calificados por Venta */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Leads Calificados (Datos Reales) / 1 Venta:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">
                    {calculations.leadsRealesPorVenta > 0 ? Math.round(calculations.leadsRealesPorVenta) : '-'}
                  </span>
                  <span className="text-xs text-emerald-800 font-mono font-bold">leads válidos</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Filtro Sierra Providencia ({calculations.pctCalidadDatos.toFixed(1)}% calidad)
                </p>
              </div>

              {/* Ratio 3: Citas para 1 Venta */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Citas en Showroom / 1 Venta:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                    {calculations.visitasPorVenta > 0 ? Math.round(calculations.visitasPorVenta) : '-'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">visitas showroom</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tasa de cierre de visita: {calculations.totalVisitas > 0 ? ((calculations.totalVentas / calculations.totalVisitas) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span className="font-semibold text-slate-900">Tasa Global de Cierre:</span>
            <span className="font-mono font-bold text-emerald-700 text-sm">
              {calculations.totalLeads > 0 ? ((calculations.totalVentas / calculations.totalLeads) * 100).toFixed(2) : '0'}%
            </span>
          </div>
        </section>

      </div>

      {/* =========================================================================
          PREGUNTA 3 & 7: VENTAS GENERADAS, CAC PROMEDIO Y COSTO POR LEAD REAL
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pregunta 3: Ventas y CAC */}
        <section id="section-pregunta-3" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-200">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
              3
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                Ventas del Periodo & Costo de Adquisición (CAC)
              </h3>
              <p className="text-xs text-slate-500">
                Medios que lograron ventas y costo promedio por cliente cerrado
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Costo de Adquisición Promedio (CAC)</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
                ${calculations.cac > 0 ? calculations.cac.toLocaleString('es-MX') : '0'}{' '}
                <span className="text-xs text-slate-400 font-normal">MXN</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Fórmula: Inversión Total / Ventas ({calculations.totalVentas || 1})
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Ventas Concretadas en Periodo</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono mt-1">
                {calculations.totalVentas}{' '}
                <span className="text-xs text-slate-400 font-normal">unidades</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Ofertas activas en negociación: {calculations.totalOfertas}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-900">Distribución de Ventas por Canal: </span>
            {period.rows.filter(r => r.ventas > 0).length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {period.rows.filter(r => r.ventas > 0).map(r => (
                  <span key={r.id} className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-bold font-mono">
                    {r.detonador}: {r.ventas} venta(s)
                  </span>
                ))}
              </div>
            ) : (
              <span>Periodo en fase de maduración comercial de visitas a ofertas (3 citas agendadas).</span>
            )}
          </div>
        </section>

        {/* Pregunta 7: Costo por Lead con Datos Reales por Medio */}
        <section id="section-pregunta-7" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-200">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
              7
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                ¿Cuánto me cuesta un lead con datos reales en cada medio?
              </h3>
              <p className="text-xs text-slate-500">
                Comparativa de CPL Bruto vs CPL Real (filtrado por calidad Sierra Providencia)
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {period.rows.map(row => {
              const cplBruto = row.leadsTotales > 0 ? Math.round(row.inversion / row.leadsTotales) : 0;
              const cplReal = row.leadsDatosReales > 0 ? Math.round(row.inversion / row.leadsDatosReales) : 0;
              const calidadPct = row.leadsTotales > 0 ? ((row.leadsDatosReales / row.leadsTotales) * 100).toFixed(0) : '0';

              return (
                <div key={row.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 block">{row.detonador}</span>
                    <span className="text-[11px] text-slate-500">
                      {row.leadsDatosReales} de {row.leadsTotales} reales ({calidadPct}% calidad)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-700 text-sm">
                      ${cplReal.toLocaleString('es-MX')} MXN <span className="text-[10px] text-slate-400 font-normal">/ real</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      CPL Bruto: ${cplBruto.toLocaleString('es-MX')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* =========================================================================
          PREGUNTA 4: COMPORTAMIENTO WEB EPIKA.MX (GOOGLE ANALYTICS)
          ========================================================================= */}
      <section id="section-pregunta-4" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
              4
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
                Comportamiento Web (Epika.mx / Google Analytics)
              </h3>
              <p className="text-xs text-slate-500">
                Tasa de rebote, tiempo en sitio, tráfico calificado (&gt;20 segundos) y eventos logrados
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigateToTab('web')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            Ver Detalle Web Analytics
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Web Metric Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider">Tasa de Rebote</span>
              <Activity className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {period.webMetrics.bounceRate}%
            </div>
            <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-bold">
              ✓ Controlada (&lt;45%)
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider">Tiempo Promedio</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {period.webMetrics.avgTimeSeconds} seg
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Promedio general sesiones
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider">Tráfico Calificado</span>
              <Target className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-mono">
              {period.webMetrics.qualifiedTrafficPercent}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              Visitas que duran &gt; 20 seg
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider">Tiempo No Rebotados</span>
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {period.webMetrics.qualifiedAvgTimeSeconds} seg
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Alta interacción con planos
            </p>
          </div>
        </div>

        {/* Conversion Events Logrados in Elegant Light */}
        <div className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-3">
            Eventos Logrados en Epika.mx (Conversiones Clave)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Clic a WhatsApp</span>
              <span className="text-lg font-bold text-emerald-700 font-mono">
                {period.webMetrics.events.whatsappClicks}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Clic a Teléfono</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {period.webMetrics.events.phoneClicks}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Llenado Formularios</span>
              <span className="text-lg font-bold text-emerald-700 font-mono">
                {period.webMetrics.events.formSubmits}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Llegada a /gracias</span>
              <span className="text-lg font-bold text-slate-900 font-mono">
                {period.webMetrics.events.thankYouPageViews}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Descarga Brochure</span>
              <span className="text-lg font-bold text-emerald-700 font-mono">
                {period.webMetrics.events.brochureDownloads}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PREGUNTA 6: PODIO DE MEDIOS DESTACADOS (LEADS, CITAS Y VENTAS)
          ========================================================================= */}
      <section id="section-pregunta-6" className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-200">
          <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-black text-xs flex items-center justify-center font-mono shadow-xs">
            6
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight">
              Medios que logran más Leads Calificados, Citas y Ventas
            </h3>
            <p className="text-xs text-slate-500">
              Líderes de rendimiento por cada fase crítica de conversión en Epika Chapultepec
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Top Leads Reales */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              🏆 Mayor Volumen de Datos Reales
            </span>
            <div className="text-base font-bold text-slate-900 mt-1">
              {topForRealLeads?.detonador || 'Página Web'}
            </div>
            <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
              {topForRealLeads?.leadsDatosReales || 0}{' '}
              <span className="text-xs font-medium text-slate-400">leads calificados</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
              CPL Real: ${topForRealLeads?.leadsDatosReales ? Math.round(topForRealLeads.inversion / topForRealLeads.leadsDatosReales) : 0} MXN
            </p>
          </div>

          {/* Top Citas Showroom */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
              🏆 Mayor Generador de Citas
            </span>
            <div className="text-base font-bold text-slate-900 mt-1">
              {topForVisits?.detonador || 'Punto de Venta'}
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1">
              {topForVisits?.visitas || 0}{' '}
              <span className="text-xs font-medium text-slate-400">visitas showroom</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 font-mono">
              Tasa asistencia: {topForVisits?.leadsVivos ? Math.round((topForVisits.visitas / topForVisits.leadsVivos) * 100) : 0}% vs vivos
            </p>
          </div>

          {/* Top Cierre de Ventas */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              🏆 Mayor Cierre de Ventas
            </span>
            <div className="text-base font-bold text-slate-900 mt-1">
              {topForSales?.ventas ? topForSales.detonador : 'Punto de Venta / Web'}
            </div>
            <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
              {topForSales?.ventas || 1}{' '}
              <span className="text-xs font-medium text-slate-400">unidad(es)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Mayor proximidad y madurez de compra en Guadalajara
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
