import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  GeneralReportData,
  DEFAULT_GENERAL_REPORT,
  TopAdCreative,
  MediaOnGenteBien,
  UnitEconomicsItem
} from '../data/generalReportData';
import { ThankYouSurveyFlowVisualizer } from './ThankYouSurveyFlowVisualizer';
import { FunnelPeriod, FunnelRow } from '../types';
import {
  Printer,
  Edit3,
  RotateCcw,
  Sparkles,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Globe,
  ExternalLink,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
  Target,
  Zap,
  ArrowUpRight,
  BarChart2,
  X,
  Users,
  Cloud,
  Check,
  Share2,
  GitBranch
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { UnifiedCampaignControlBar } from './UnifiedCampaignControlBar';
import { META_CAMPAIGNS_DATA, META_ACCOUNT_INFO, MetaCampaignDetail } from '../data/metaAdsData';
import { GOOGLE_ADS_CAMPAIGNS_DATA, GOOGLE_ADS_ACCOUNT_INFO, GoogleAdsCampaignDetail } from '../data/googleAdsData';
import { STACKADAPT_CAMPAIGNS_DATA, STACKADAPT_ACCOUNT_INFO, StackAdaptCampaignDetail } from '../data/stackAdaptData';

interface GeneralReportPdfViewProps {
  onBackToApp?: () => void;
  periods?: FunnelPeriod[];
  activePeriodId?: string;
}

export const GeneralReportPdfView: React.FC<GeneralReportPdfViewProps> = ({
  onBackToApp,
  periods,
  activePeriodId
}) => {
  const [selectedMetaCampaignId, setSelectedMetaCampaignId] = useState<string>('all');
  const [selectedMetaWaCampaignId, setSelectedMetaWaCampaignId] = useState<string>('all');
  const [selectedGoogleCampaignId, setSelectedGoogleCampaignId] = useState<string>('all');
  const [selectedStackCampaignId, setSelectedStackCampaignId] = useState<string>('all');
  // Selected period for dynamic real leads synchronization
  const [selectedPeriod, setSelectedPeriod] = useState<FunnelPeriod | null>(() => {
    if (periods && periods.length > 0) {
      if (activePeriodId) {
        return periods.find(p => p.id === activePeriodId) || periods[0];
      }
      return periods[0];
    }
    return null;
  });

  useEffect(() => {
    if (periods && periods.length > 0) {
      if (activePeriodId) {
        const found = periods.find(p => p.id === activePeriodId);
        if (found) setSelectedPeriod(found);
      }
    }
  }, [periods, activePeriodId]);

  const [reportData, setReportData] = useState<GeneralReportData>(() => {
    const saved = localStorage.getItem('epika_general_report_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_GENERAL_REPORT, ...parsed };
      } catch (e) {
        console.error('Error loading saved report data:', e);
      }
    }
    return DEFAULT_GENERAL_REPORT;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Hoy, ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFlowExpanded, setIsFlowExpanded] = useState<boolean>(true);
  const flowSectionRef = useRef<HTMLDivElement>(null);

  // Fetch shared state from server on mount & poll for real-time multi-user edits
  useEffect(() => {
    let isMounted = true;

    const fetchSharedData = async () => {
      try {
        const res = await fetch('/api/general-report');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setReportData(prev => ({
              ...DEFAULT_GENERAL_REPORT,
              ...prev,
              ...json.data
            }));
            if (json.updatedAt) {
              setLastSyncTime(new Date(json.updatedAt).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
            }
            setSyncStatus('synced');
          }
        }
      } catch (err) {
        if (isMounted) setSyncStatus('offline');
      }
    };

    fetchSharedData();

    // Auto-sync polling every 7 seconds so edits by any team member appear immediately for everyone
    const interval = setInterval(fetchSharedData, 7000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveGlobalReport = async (newData: GeneralReportData) => {
    setReportData(newData);
    localStorage.setItem('epika_general_report_v4', JSON.stringify(newData));
    setSyncStatus('syncing');

    try {
      const res = await fetch('/api/general-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': 'admin@epika.mx'
        },
        body: JSON.stringify(newData)
      });

      if (res.ok) {
        setSyncStatus('synced');
        setLastSyncTime('Hoy, ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
        showToast('✓ ¡Reporte guardado y sincronizado para TODOS los usuarios en tiempo real!');
      } else {
        showToast('✓ Guardado localmente (servidor no disponible)');
      }
    } catch (err) {
      console.warn('Error al guardar en el servidor:', err);
      showToast('✓ Guardado localmente');
    }

    setIsEditModalOpen(false);
  };

  const handleResetToDefault = async () => {
    if (window.confirm('¿Deseas restaurar todos los datos del reporte a los valores reales predeterminados para TODOS los usuarios?')) {
      setReportData(DEFAULT_GENERAL_REPORT);
      localStorage.removeItem('epika_general_report_v4');
      try {
        await fetch('/api/general-report/reset', { method: 'POST' });
        showToast('✓ Reporte restaurado a valores iniciales para todos');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const scrollToFlow = () => {
    setIsFlowExpanded(true);
    setTimeout(() => {
      flowSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Synchronize unit economics and KPIs from actual real registered leads in period
  const effectiveData = useMemo(() => {
    if (!selectedPeriod) return reportData;

    const rows = selectedPeriod.rows;
    const totalInversion = rows.reduce((sum, r) => sum + (r.inversion || 0), 0);
    const totalLeadsBrutos = rows.reduce((sum, r) => sum + (r.leadsTotales || 0), 0);
    const totalLeadsReales = rows.reduce((sum, r) => sum + (r.leadsDatosReales || 0), 0);
    const totalCitas = rows.reduce((sum, r) => sum + (r.visitas || 0), 0);
    const totalLeadsVivos = rows.reduce((sum, r) => sum + (r.leadsVivos || 0), 0);
    const totalApartados = rows.reduce((sum, r) => sum + (r.ofertas || 0), 0);
    const totalVentas = rows.reduce((sum, r) => sum + (r.ventas || 0), 0);

    const calculatedUnitEconomics: UnitEconomicsItem[] = rows.map(r => {
      const cplBruto = r.leadsTotales > 0 ? Math.round((r.inversion || 0) / r.leadsTotales) : 0;
      const cplReal = r.leadsDatosReales > 0 ? Math.round((r.inversion || 0) / r.leadsDatosReales) : 0;
      const costoCita = r.visitas > 0 ? Math.round((r.inversion || 0) / r.visitas) : 0;

      return {
        canal: r.detonador,
        inversion: r.inversion || 0,
        leadsBrutos: r.leadsTotales || 0,
        cplBruto: cplBruto,
        leadsReales: r.leadsDatosReales || 0,
        cplReal: cplReal,
        citas: r.visitas || 0,
        costoCita: costoCita,
        ventas: r.ventas || 0,
        cacEstimado: r.ventas > 0 ? `$${Math.round((r.inversion || 0) / r.ventas).toLocaleString('es-MX')}` : '$-',
        notaAislamiento: r.detonador.toLowerCase().includes('web') ? 'Formularios y tráfico directo epika.mx exclusivo' : undefined
      };
    });

    // Add Total Row
    const cplBrutoTotal = totalLeadsBrutos > 0 ? Math.round(totalInversion / totalLeadsBrutos) : 0;
    const cplRealTotal = totalLeadsReales > 0 ? Math.round(totalInversion / totalLeadsReales) : 0;
    const costoCitaTotal = totalCitas > 0 ? Math.round(totalInversion / totalCitas) : 0;

    calculatedUnitEconomics.push({
      canal: 'TOTAL PROYECTO',
      inversion: totalInversion,
      leadsBrutos: totalLeadsBrutos,
      cplBruto: cplBrutoTotal,
      leadsReales: totalLeadsReales,
      cplReal: cplRealTotal,
      citas: totalCitas,
      costoCita: costoCitaTotal,
      ventas: totalVentas,
      cacEstimado: totalVentas > 0 ? `$${Math.round(totalInversion / totalVentas).toLocaleString('es-MX')}` : '$-'
    });

    // Calculate lead breakdown cards
    const webRow = rows.find(r => r.detonador.toLowerCase().includes('web') || r.tipoDetonador === 'web_form');
    const fbRow = rows.find(r => r.detonador.toLowerCase().includes('facebook'));
    const igRow = rows.find(r => r.detonador.toLowerCase().includes('instagram'));
    const googleRow = rows.find(r => r.detonador.toLowerCase().includes('google'));
    const stackRow = rows.find(r => r.detonador.toLowerCase().includes('stackadapt'));
    const popRow = rows.find(r => r.detonador.toLowerCase().includes('señalizacion') || r.detonador.toLowerCase().includes('punto de venta'));

    const metaTotalCount = (fbRow?.leadsTotales || 0) + (igRow?.leadsTotales || 0);
    const googleStackCount = (googleRow?.leadsTotales || 0) + (stackRow?.leadsTotales || 0);

    // Selected Meta Forms campaign calculations
    const selectedMetaForms: MetaCampaignDetail | undefined = 
      selectedMetaCampaignId === 'all' 
        ? undefined 
        : META_CAMPAIGNS_DATA.find(c => c.id === selectedMetaCampaignId || c.campaignId === selectedMetaCampaignId);

    // Selected Meta WhatsApp campaign calculations
    const selectedMetaWa: MetaCampaignDetail | undefined = 
      selectedMetaWaCampaignId === 'all' 
        ? undefined 
        : META_CAMPAIGNS_DATA.find(c => c.id === selectedMetaWaCampaignId || c.campaignId === selectedMetaWaCampaignId);

    // Selected Google Ads campaign calculations
    const selectedGoogle: GoogleAdsCampaignDetail | undefined =
      selectedGoogleCampaignId === 'all'
        ? undefined
        : GOOGLE_ADS_CAMPAIGNS_DATA.find(c => c.id === selectedGoogleCampaignId || c.campaignId === selectedGoogleCampaignId);

    // Selected StackAdapt campaign calculations
    const selectedStack: StackAdaptCampaignDetail | undefined =
      selectedStackCampaignId === 'all'
        ? undefined
        : STACKADAPT_CAMPAIGNS_DATA.find(c => c.id === selectedStackCampaignId || c.campaignId === selectedStackCampaignId);

    const metaFormsCount = selectedMetaForms 
      ? selectedMetaForms.formulariosCompletados 
      : (META_ACCOUNT_INFO.totalFormulariosCompletados || metaTotalCount || 118);

    const metaFormsCost = selectedMetaForms 
      ? (selectedMetaForms.formulariosCompletados > 0 ? `$${selectedMetaForms.costoPorLeadReportado.toFixed(0)} / lead` : '$0 / lead')
      : `$${META_ACCOUNT_INFO.costoPromedioPorLead.toFixed(0)} / lead`;

    const metaFormsSublabel = selectedMetaForms 
      ? (selectedMetaForms.formulariosCompletados > 0 ? `Instant Forms [${selectedMetaForms.name}]` : 'Campaña WhatsApp')
      : 'Meta Lead Ads';

    const metaConversationsCount = selectedMetaWa 
      ? selectedMetaWa.conversacionesIniciadas 
      : (META_ACCOUNT_INFO.totalConversacionesIniciadas || 125);

    const metaConversationsCost = selectedMetaWa 
      ? (selectedMetaWa.costoPorConversacionIniciada > 0 ? `$${selectedMetaWa.costoPorConversacionIniciada.toFixed(1)} / c` : '$0.0 / c')
      : `$97.1 / c`;

    const metaConversationsLabel = selectedMetaWa 
      ? `Conversaciones Meta [${selectedMetaWa.name}]`
      : 'Conversaciones Meta [Campaña WhatsApp]';

    const metaConversationsSublabel = selectedMetaWa 
      ? `Iniciadas en Campaña | ${metaConversationsCost}`
      : 'Conversaciones WhatsApp | $97.1 / c';

    // Google & StackAdapt dynamic metrics
    const dynamicGoogleConv = selectedGoogle ? selectedGoogle.conversions : GOOGLE_ADS_ACCOUNT_INFO.totalConversions;
    const dynamicStackLeads = selectedStack ? selectedStack.leadsReported : STACKADAPT_ACCOUNT_INFO.totalLeadsReported;
    const dynamicGoogleStackCount = dynamicGoogleConv + dynamicStackLeads;

    const dynamicGoogleStackLabel = selectedGoogle
      ? `Google [${selectedGoogle.name}]`
      : (selectedStack ? `StackAdapt DSP [${selectedStack.name}]` : 'Google & StackAdapt [Search / DSP]');

    const dynamicGoogleStackCost = selectedGoogle
      ? `$${selectedGoogle.costPerConversion.toFixed(0)} / conv.`
      : (selectedStack ? `$${selectedStack.cpl.toFixed(0)} / lead` : '$493 / lead');

    const dynamicGoogleStackSublabel = selectedGoogle
      ? `${selectedGoogle.typeLabel.split(' ')[0]} | $${selectedGoogle.costPerConversion.toFixed(0)}/conv.`
      : (selectedStack ? `${selectedStack.channelTypeLabel.split(' ')[0]} | $${selectedStack.cpl.toFixed(0)}/lead` : 'Search + DSP');

    return {
      ...reportData,
      periodRangeLabel: selectedPeriod.periodLabel || reportData.periodRangeLabel,
      kpis: {
        leadsReales: totalLeadsReales || reportData.kpis.leadsReales,
        citas: totalCitas || reportData.kpis.citas,
        leadsVivos: totalLeadsVivos || reportData.kpis.leadsVivos,
        apartados: totalApartados || reportData.kpis.apartados,
        ventas: totalVentas || reportData.kpis.ventas
      },
      unitEconomics: calculatedUnitEconomics.length > 1 ? calculatedUnitEconomics : reportData.unitEconomics,
      leadsDetonadoresActuales: [
        {
          label: 'Formularios Meta [FB / IG]',
          sublabel: metaFormsSublabel,
          count: metaFormsCount,
          costoUnitario: metaFormsCost,
          color: '#1877F2'
        },
        {
          label: metaConversationsLabel,
          sublabel: metaConversationsSublabel,
          count: metaConversationsCount,
          costoUnitario: metaConversationsCost,
          color: '#25D366'
        },
        {
          label: 'Web Epika.mx [/gracias]',
          sublabel: 'Formularios Epika.mx',
          count: webRow?.leadsTotales || 17,
          costoUnitario: '$226 / lead',
          color: '#D4F634'
        },
        {
          label: dynamicGoogleStackLabel,
          sublabel: dynamicGoogleStackSublabel,
          count: dynamicGoogleStackCount || 16,
          costoUnitario: dynamicGoogleStackCost,
          color: '#4285F4'
        },
        {
          label: 'Punto de Venta [Showroom]',
          sublabel: 'Señalización & Walk-ins',
          count: popRow?.leadsTotales || 6,
          costoUnitario: '$250 / lead',
          color: '#EC4899'
        }
      ]
    };
  }, [selectedPeriod, reportData, selectedMetaCampaignId, selectedMetaWaCampaignId, selectedGoogleCampaignId, selectedStackCampaignId]);

  const handlePrint = () => {
    window.print();
  };

  const handleSyncRealData = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      setLastSyncTime('Hoy, ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  const handleOpenExternalUrl = (url?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-black font-sans print:bg-white print:p-0 print:m-0 pb-16">
      
      {/* ========================================================================= */}
      {/* FLOATING ACTION BAR (HIDDEN IN PRINT)                                    */}
      {/* ========================================================================= */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 px-4 py-2.5 print:hidden shadow-xs">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            {onBackToApp && (
              <button
                type="button"
                onClick={onBackToApp}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-bold transition-all border border-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>← Volver al Dashboard</span>
              </button>
            )}
            
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                REPORTE DESCARGABLE PDF OFICIAL (EPIKA CHAPULTEPEC)
              </span>
              <span className="bg-[#D4F634] text-black border border-black px-2 py-0.5 rounded text-[10px] font-mono font-black flex items-center gap-1 shadow-xs">
                <Users className="w-3 h-3" />
                SINCRONIZADO PARA TODOS LOS USUARIOS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {periods && periods.length > 0 && (
              <select
                value={selectedPeriod?.id}
                onChange={(e) => {
                  const p = periods.find(item => item.id === e.target.value);
                  if (p) setSelectedPeriod(p);
                }}
                className="bg-white text-slate-800 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-slate-900"
              >
                {periods.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.periodLabel}
                  </option>
                ))}
              </select>
            )}

            <button
              type="button"
              onClick={scrollToFlow}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Ver flujo visual de procedencia para el formulario de /gracias"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Flujo /gracias</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Editar parámetros y sincronizar con todos los usuarios"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-700" />
              <span>Editar para Todos</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-200 font-medium transition-all flex items-center gap-1 cursor-pointer"
              title="Restaurar valores predeterminados para todos"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restaurar</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black border border-black font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-black" />
              <span>Descargar / Imprimir PDF</span>
            </button>
          </div>

        </div>
      </div>

      {/* Global Sync Notification Banner (Toast) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#D4F634] border-2 border-[#D4F634] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#D4F634]" />
          <span className="text-xs font-bold text-white">{toastMessage}</span>
        </div>
      )}

      {/* Sync Status Banner */}
      <div className="max-w-[1240px] mx-auto px-4 mt-3 mb-1 print:hidden flex items-center justify-between text-[11px] text-gray-600 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg py-1.5 px-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-gray-800">
            Persistencia Global en Servidor Activa:
          </span>
          <span>Cualquier cambio guardado se actualiza en tiempo real para todos los administradores.</span>
        </div>
        <span className="font-mono text-gray-500">
          Última sinc: {lastSyncTime}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* EXACT 1:1 PDF CANVAS CONTAINER                                           */}
      {/* Matches the user attached screenshot layout pixel for pixel              */}
      {/* ========================================================================= */}
      <div 
        id="reporte-pdf-content"
        className="max-w-[1240px] mx-auto bg-white p-6 sm:p-10 my-4 sm:my-6 rounded-xl shadow-2xl border border-gray-300 print:border-none print:shadow-none print:m-0 print:p-4 print:max-w-full"
      >
        
        {/* ===================================================================== */}
        {/* 1. TOP HEADER: "Periodo del x al z"                                   */}
        {/* ===================================================================== */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight font-sans">
            {effectiveData.periodRangeLabel?.startsWith('Periodo') ? effectiveData.periodRangeLabel : `Periodo ${effectiveData.periodRangeLabel}`}
          </h1>
        </div>

        {/* ===================================================================== */}
        {/* 2. TOP 5 KPI SUMMARY CARDS (Lime header pill + large black number)    */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-6">
          
          {/* Card 1: Leads reales */}
          <div className="border-2 border-black rounded-lg p-2.5 sm:p-3 flex flex-col items-center justify-between bg-white shadow-xs">
            <div className="w-full text-center bg-[#D8F637] border border-black/10 py-1 px-2 rounded-md mb-2">
              <span className="text-[11px] sm:text-xs font-bold text-black font-sans tracking-tight">
                Leads reales
              </span>
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-sans my-1 tracking-tight">
              {effectiveData.kpis.leadsReales}
            </span>
          </div>

          {/* Card 2: Citas */}
          <div className="border-2 border-black rounded-lg p-2.5 sm:p-3 flex flex-col items-center justify-between bg-white shadow-xs">
            <div className="w-full text-center bg-[#D8F637] border border-black/10 py-1 px-2 rounded-md mb-2">
              <span className="text-[11px] sm:text-xs font-bold text-black font-sans tracking-tight">
                Citas
              </span>
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-sans my-1 tracking-tight">
              {effectiveData.kpis.citas}
            </span>
          </div>

          {/* Card 3: Leads Vivos */}
          <div className="border-2 border-black rounded-lg p-2.5 sm:p-3 flex flex-col items-center justify-between bg-white shadow-xs">
            <div className="w-full text-center bg-[#D8F637] border border-black/10 py-1 px-2 rounded-md mb-2">
              <span className="text-[11px] sm:text-xs font-bold text-black font-sans tracking-tight">
                Leads Vivos
              </span>
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-sans my-1 tracking-tight">
              {effectiveData.kpis.leadsVivos}
            </span>
          </div>

          {/* Card 4: Apartados */}
          <div className="border-2 border-black rounded-lg p-2.5 sm:p-3 flex flex-col items-center justify-between bg-white shadow-xs">
            <div className="w-full text-center bg-[#D8F637] border border-black/10 py-1 px-2 rounded-md mb-2">
              <span className="text-[11px] sm:text-xs font-bold text-black font-sans tracking-tight">
                Apartados
              </span>
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-sans my-1 tracking-tight">
              {effectiveData.kpis.apartados}
            </span>
          </div>

          {/* Card 5: Ventas */}
          <div className="border-2 border-black rounded-lg p-2.5 sm:p-3 flex flex-col items-center justify-between bg-white shadow-xs">
            <div className="w-full text-center bg-[#D8F637] border border-black/10 py-1 px-2 rounded-md mb-2">
              <span className="text-[11px] sm:text-xs font-bold text-black font-sans tracking-tight">
                Ventas
              </span>
            </div>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-sans my-1 tracking-tight">
              {effectiveData.kpis.ventas}
            </span>
          </div>

        </div>

        {/* ===================================================================== */}
        {/* 3. TABLA INTEGRAL DE UNIT ECONOMICS POR CANAL (EPIKA CHAPULTEPEC)     */}
        {/* ===================================================================== */}
        <section className="mb-6">
          <div className="bg-[#0A0A0A] text-white rounded-md overflow-hidden border border-black shadow-md">
            
            {/* Table Header Banner */}
            <div className="px-4 py-2.5 border-b border-gray-800">
              <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-sans">
                TABLA INTEGRAL DE UNIT ECONOMICS POR CANAL (EPIKA CHAPULTEPEC)
              </h3>
              <p className="text-[10px] text-gray-400 font-sans">
                Comparativa directa de costos por lead bruto vs real, costo por cita y CAC resultante
              </p>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10.5px] border-collapse">
                <thead>
                  <tr className="bg-[#141414] text-gray-300 font-bold border-b border-gray-800 text-[9.5px] uppercase tracking-wider">
                    <th className="py-2 px-3">MEDIO / DETONADOR</th>
                    <th className="py-2 px-3 text-right">INVERSIÓN</th>
                    <th className="py-2 px-3 text-right">LEADS BRUTOS</th>
                    <th className="py-2 px-3 text-right">CPL BRUTO</th>
                    <th className="py-2 px-3 text-right text-[#A3E635]">LEADS REALES</th>
                    <th className="py-2 px-3 text-right text-[#A3E635]">CPL REAL</th>
                    <th className="py-2 px-3 text-right">CITAS</th>
                    <th className="py-2 px-3 text-right">COSTO CITA</th>
                    <th className="py-2 px-3 text-right">VENTAS</th>
                    <th className="py-2 px-3 text-right">CAC ESTIMADO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80 font-mono text-[10.5px]">
                  {effectiveData.unitEconomics.map((item, idx) => {
                    const isTotal = item.canal.includes('TOTAL');
                    return (
                      <tr 
                        key={idx} 
                        className={isTotal ? 'bg-[#181818] font-black text-white border-t-2 border-gray-700' : 'hover:bg-gray-900/50 text-gray-200'}
                      >
                        <td className="py-2 px-3 font-sans font-medium text-white">
                          {item.canal}
                        </td>
                        <td className="py-2 px-3 text-right">
                          ${item.inversion.toLocaleString('es-MX')}
                        </td>
                        <td className="py-2 px-3 text-right text-gray-300">
                          {item.leadsBrutos}
                        </td>
                        <td className="py-2 px-3 text-right text-gray-400">
                          ${item.cplBruto.toLocaleString('es-MX')}
                        </td>
                        <td className="py-2 px-3 text-right font-black text-[#A3E635]">
                          {item.leadsReales}
                        </td>
                        <td className="py-2 px-3 text-right font-black text-[#A3E635]">
                          ${item.cplReal.toLocaleString('es-MX')}
                        </td>
                        <td className="py-2 px-3 text-right text-white font-bold">
                          {item.citas}
                        </td>
                        <td className="py-2 px-3 text-right text-gray-300">
                          ${item.costoCita.toLocaleString('es-MX')}
                        </td>
                        <td className="py-2 px-3 text-right text-white">
                          {item.ventas}
                        </td>
                        <td className="py-2 px-3 text-right text-gray-400">
                          {item.cacEstimado}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ===================================================================== */}
        {/* 4. ¿CUÁNTOS LEADS LLEVAMOS AL DÍA DE HOY EN EL PERIODO?               */}
        {/* ===================================================================== */}
        <section className="mb-6">
          
          {/* Header Bar */}
          <div className="bg-[#0A0A0A] text-white p-3 rounded-t-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-x border-t border-black">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#D4F634] rounded flex items-center justify-center text-black font-black text-[10px]">
                ■
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-sans">
                  ¿CUÁNTOS LEADS LLEVAMOS AL DÍA DE HOY EN EL PERIODO?
                </h3>
                <p className="text-[9.5px] text-gray-400">
                  Desglose por formularios de Meta, mensajes de WhatsApp, formularios web y conversiones de Epika.mx
                </p>
              </div>
            </div>

            <span className="bg-[#D8F637] text-black font-black text-[10px] sm:text-xs px-3 py-1 rounded-md uppercase font-sans tracking-tight">
              Total Leads Reportados: {effectiveData.leadsDetonadoresActuales.reduce((s, d) => s + d.count, 0)}
            </span>
          </div>

          {/* Selector Multi-Plataforma de Campañas (Meta Ads, Google Ads, StackAdapt DSP) */}
          <div className="bg-[#121212] p-3 border-x border-black print:hidden">
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

          {/* 5 Dark Boxes Grid */}
          <div className="bg-[#121212] p-3 rounded-b-md border-x border-b border-black grid grid-cols-2 sm:grid-cols-5 gap-3">
            {effectiveData.leadsDetonadoresActuales.map((item, idx) => {
              const isWebThankYou = idx === 2 || item.label.includes('gracias') || item.label.toLowerCase().includes('web');

              return (
                <div
                  key={idx}
                  className={`border rounded-md p-3 flex flex-col justify-between transition-all ${
                    isWebThankYou
                      ? 'bg-[#18230D] border-[#D4F634] shadow-md ring-1 ring-[#D4F634]/50'
                      : 'bg-[#1A1A1A] border-gray-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-bold font-sans leading-tight ${isWebThankYou ? 'text-[#D4F634]' : 'text-gray-200'}`}>
                        {item.label}
                      </span>
                      <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isWebThankYou ? 'bg-[#D4F634] text-black font-bold' : 'bg-gray-800 text-gray-400'}`}>
                        {idx === 0 ? 'FB / IG' : idx === 1 ? 'WA' : idx === 2 ? '/gracias' : idx === 3 ? 'Search/DSP' : 'Showroom'}
                      </span>
                    </div>
                    <p className="text-[8.5px] text-gray-400 leading-snug">
                      {item.sublabel}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-800">
                    <div className="flex items-baseline justify-between">
                      <span className={`text-2xl sm:text-3xl font-black font-mono ${isWebThankYou ? 'text-[#D4F634]' : 'text-white'}`}>
                        {item.count}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono">
                        {item.costoUnitario}
                      </span>
                    </div>

                    {/* Action button for /gracias */}
                    {isWebThankYou && (
                      <button
                        type="button"
                        onClick={scrollToFlow}
                        className="mt-2 w-full py-1 px-1.5 bg-[#D4F634] hover:bg-[#C2E426] text-black font-black text-[9px] rounded flex items-center justify-center gap-1 transition-colors print:hidden cursor-pointer"
                      >
                        <GitBranch className="w-2.5 h-2.5" />
                        <span>Ver Flujo de Procedencia ({item.count})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* ===================================================================== */}
        {/* 4.1 FLUJO VISUAL DE PROCEDENCIA DE ENCUESTAS /GRACIAS                 */}
        {/* ===================================================================== */}
        <section ref={flowSectionRef} id="flujo-gracias-section" className="mb-6">
          <ThankYouSurveyFlowVisualizer
            sources={effectiveData.webMetrics.thankYouSources}
            surveyFlow={effectiveData.webMetrics.surveyFlow}
            surveyLogs={effectiveData.webMetrics.surveyLogs}
            totalThankYouViews={effectiveData.leadsDetonadoresActuales.find(d => d.label.includes('gracias'))?.count || 17}
            isCompactForPdf={false}
          />
        </section>

        {/* ===================================================================== */}
        {/* 5. MEDIOS QUE LOGRAN MÁS LEADS CALIFICADOS, CITAS Y VENTAS            */}
        {/* ===================================================================== */}
        <section className="mb-6">
          
          {/* Header Bar */}
          <div className="bg-[#0A0A0A] text-white p-3 rounded-t-md border-x border-t border-black">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#D4F634] rounded flex items-center justify-center text-black font-black text-[10px]">
                ★
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-sans">
                  MEDIOS QUE LOGRAN MÁS LEADS CALIFICADOS, CITAS Y VENTAS
                </h3>
                <p className="text-[9.5px] text-gray-400">
                  Líderes de rendimiento por cada fase crítica de conversión en Epika Chapultepec
                </p>
              </div>
            </div>
          </div>

          {/* 3 Dark Boxes */}
          <div className="bg-[#121212] p-3 rounded-b-md border-x border-b border-black grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* 1) Mayor Volumen de Datos Reales */}
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-[#D8F637] font-black uppercase tracking-wider block mb-1">
                  MAYOR VOLUMEN DE DATOS REALES
                </span>
                <h4 className="text-sm font-black text-white uppercase font-sans">
                  {effectiveData.canalHighlights.volumen.canal}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-800 flex items-baseline justify-between font-mono">
                <div>
                  <span className="text-xl font-black text-[#D8F637]">{effectiveData.canalHighlights.volumen.leadsReales}</span>
                  <span className="text-[10px] text-gray-400 ml-1 font-sans">Leads reales</span>
                </div>
                <span className="text-xs text-gray-300 font-bold">
                  CPL Real: {effectiveData.canalHighlights.volumen.cplReal}
                </span>
              </div>
            </div>

            {/* 2) Mayor Generador de Citas */}
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-[#D8F637] font-black uppercase tracking-wider block mb-1">
                  MAYOR GENERADOR DE CITAS
                </span>
                <h4 className="text-sm font-black text-white uppercase font-sans">
                  {effectiveData.canalHighlights.citas.canal}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-800 flex items-baseline justify-between font-mono">
                <div>
                  <span className="text-xl font-black text-[#D8F637]">{effectiveData.canalHighlights.citas.citas}</span>
                  <span className="text-[10px] text-gray-400 ml-1 font-sans">citas showroom</span>
                </div>
                <span className="text-xs text-gray-300 font-bold">
                  Tasa asistencia: {effectiveData.canalHighlights.citas.asistencia}
                </span>
              </div>
            </div>

            {/* 3) Mayor Cierre de Ventas */}
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3.5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-[#D8F637] font-black uppercase tracking-wider block mb-1">
                  MAYOR CIERRE DE VENTAS
                </span>
                <h4 className="text-sm font-black text-white uppercase font-sans">
                  {effectiveData.canalHighlights.ventas.canal}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-800 flex items-baseline justify-between font-mono">
                <div>
                  <span className="text-xl font-black text-[#D8F637]">{effectiveData.canalHighlights.ventas.ventas}</span>
                  <span className="text-[10px] text-gray-400 ml-1 font-sans">Unidad(es)</span>
                </div>
                <span className="text-[9.5px] text-gray-400 italic">
                  Mayor prospecto y madurez de compra en Guadalajara
                </span>
              </div>
            </div>

          </div>

        </section>

        {/* ===================================================================== */}
        {/* 6. 4 TREND LINE CHARTS GRID (2X2)                                     */}
        {/* Leads meta | Leads google | Leads Stack Adapt | Formularios web       */}
        {/* ===================================================================== */}
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Chart 1: Leads meta formulario y mensajes */}
            <div className="bg-white border-2 border-gray-300 rounded-md p-3.5 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-black font-sans">
                  Leads meta formulario y mensajes
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#D8F637] text-black font-black text-[10px] px-3 py-0.5 rounded-sm uppercase tracking-wider">
                  LEADS DE META
                </span>
                <div className="flex items-center gap-3 text-[9.5px] font-bold text-gray-700">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#D8F637] border border-black inline-block"></span> Torre 1
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-black inline-block"></span> Torre 2
                  </span>
                </div>
              </div>

              {/* Line Chart SVG */}
              <div className="h-32 w-full pt-2 pb-1">
                <svg viewBox="0 0 320 95" className="w-full h-full overflow-visible">
                  <line x1="0" y1="15" x2="320" y2="15" stroke="#E5E7EB" />
                  <line x1="0" y1="45" x2="320" y2="45" stroke="#E5E7EB" />
                  <line x1="0" y1="75" x2="320" y2="75" stroke="#E5E7EB" />

                  {/* Torre 1 Polyline */}
                  <polyline fill="none" stroke="#D8F637" strokeWidth="2.5" points="20,12 70,22 125,48 180,38 235,22 295,39" />
                  <circle cx="20" cy="12" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="20" y="6" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">261</text>
                  <circle cx="70" cy="22" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="70" y="16" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">204</text>
                  <circle cx="125" cy="48" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="125" y="42" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">129</text>
                  <circle cx="180" cy="38" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="180" y="32" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">156</text>
                  <circle cx="235" cy="22" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="235" y="16" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">206</text>
                  <circle cx="295" cy="39" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="295" y="33" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">151</text>

                  {/* Torre 2 Polyline */}
                  <polyline fill="none" stroke="#111" strokeWidth="2" points="20,48 70,68 125,52 180,52 235,78 295,74" />
                  <circle cx="20" cy="48" r="3" fill="#111" />
                  <text x="20" y="44" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">105</text>
                  <circle cx="70" cy="68" r="3" fill="#111" />
                  <text x="70" y="64" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">49</text>
                  <circle cx="125" cy="52" r="3" fill="#111" />
                  <text x="125" y="48" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">97</text>
                  <circle cx="180" cy="52" r="3" fill="#111" />
                  <text x="180" y="48" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">97</text>
                  <circle cx="235" cy="78" r="3" fill="#111" />
                  <text x="235" y="74" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">21</text>
                  <circle cx="295" cy="74" r="3" fill="#111" />
                  <text x="295" y="70" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">32</text>
                </svg>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-6 text-center border-t border-gray-200 pt-1.5 text-[9px] font-sans">
                <div><span className="text-gray-500 block">ene</span><span className="font-bold text-black font-mono">$419</span></div>
                <div><span className="text-gray-500 block">feb</span><span className="font-bold text-black font-mono">$512</span></div>
                <div><span className="text-gray-500 block">mar</span><span className="font-bold text-black font-mono">$516</span></div>
                <div><span className="text-gray-500 block">abr</span><span className="font-bold text-black font-mono">$505.03</span></div>
                <div><span className="text-gray-500 block">may</span><span className="font-bold text-black font-mono">$324.5</span></div>
                <div><span className="text-gray-500 block">jun</span><span className="font-bold text-black font-mono">$467</span></div>
              </div>
              <div className="text-center text-[8.5px] text-gray-500 mt-1">
                Costo promedio por lead.
              </div>
            </div>

            {/* Chart 2: Leads google */}
            <div className="bg-white border-2 border-gray-300 rounded-md p-3.5 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-black font-sans">
                  Leads google
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#D8F637] text-black font-black text-[10px] px-3 py-0.5 rounded-sm uppercase tracking-wider">
                  LEADS DE GOOGLE
                </span>
                <span className="text-[9.5px] font-bold text-black flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D8F637] border border-black inline-block"></span> Google
                </span>
              </div>

              {/* Line Chart SVG */}
              <div className="h-32 w-full pt-2 pb-1">
                <svg viewBox="0 0 320 95" className="w-full h-full overflow-visible">
                  <line x1="0" y1="15" x2="320" y2="15" stroke="#E5E7EB" />
                  <line x1="0" y1="45" x2="320" y2="45" stroke="#E5E7EB" />
                  <line x1="0" y1="75" x2="320" y2="75" stroke="#E5E7EB" />

                  <polyline fill="none" stroke="#D8F637" strokeWidth="2.5" points="20,48 70,82 125,68 180,80 235,48 295,15" />
                  <circle cx="20" cy="48" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="20" y="42" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">116</text>
                  <circle cx="70" cy="82" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="70" y="76" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">15</text>
                  <circle cx="125" cy="68" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="125" y="62" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">59</text>
                  <circle cx="180" cy="80" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="180" y="74" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">20</text>
                  <circle cx="235" cy="48" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="235" y="42" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">116</text>
                  <circle cx="295" cy="15" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="295" y="9" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">198</text>
                </svg>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-6 text-center border-t border-gray-200 pt-1.5 text-[9px] font-sans">
                <div><span className="text-gray-500 block">ene</span><span className="font-bold text-black font-mono">$428</span></div>
                <div><span className="text-gray-500 block">feb</span><span className="font-bold text-black font-mono">$508</span></div>
                <div><span className="text-gray-500 block">mar</span><span className="font-bold text-black font-mono">$441</span></div>
                <div><span className="text-gray-500 block">abr</span><span className="font-bold text-black font-mono">$501</span></div>
                <div><span className="text-gray-500 block">may</span><span className="font-bold text-black font-mono">$603</span></div>
                <div><span className="text-gray-500 block">jun</span><span className="font-bold text-black font-mono">$334.35</span></div>
              </div>
              <div className="text-center text-[8.5px] text-gray-500 mt-1">
                Costo promedio por lead.
              </div>
            </div>

            {/* Chart 3: Leads Stack Adapt */}
            <div className="bg-white border-2 border-gray-300 rounded-md p-3.5 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-black font-sans">
                  Leads Stack Adapt
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#D8F637] text-black font-black text-[10px] px-3 py-0.5 rounded-sm uppercase tracking-wider">
                  LEADS DE META
                </span>
                <div className="flex items-center gap-3 text-[9.5px] font-bold text-gray-700">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#D8F637] border border-black inline-block"></span> Torre 1
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-black inline-block"></span> Torre 2
                  </span>
                </div>
              </div>

              {/* Line Chart SVG */}
              <div className="h-32 w-full pt-2 pb-1">
                <svg viewBox="0 0 320 95" className="w-full h-full overflow-visible">
                  <line x1="0" y1="15" x2="320" y2="15" stroke="#E5E7EB" />
                  <line x1="0" y1="45" x2="320" y2="45" stroke="#E5E7EB" />
                  <line x1="0" y1="75" x2="320" y2="75" stroke="#E5E7EB" />

                  {/* Torre 1 Polyline */}
                  <polyline fill="none" stroke="#D8F637" strokeWidth="2.5" points="20,15 70,24 125,48 180,38 235,22 295,39" />
                  <circle cx="20" cy="15" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="20" y="9" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">201</text>
                  <circle cx="70" cy="24" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="70" y="18" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">204</text>
                  <circle cx="125" cy="48" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="125" y="42" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">129</text>
                  <circle cx="180" cy="38" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="180" y="32" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">156</text>
                  <circle cx="235" cy="22" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="235" y="16" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">206</text>
                  <circle cx="295" cy="39" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="295" y="33" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">151</text>

                  {/* Torre 2 Polyline */}
                  <polyline fill="none" stroke="#111" strokeWidth="2" points="20,48 70,68 125,52 180,52 235,78 295,74" />
                  <circle cx="20" cy="48" r="3" fill="#111" />
                  <text x="20" y="44" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">105</text>
                  <circle cx="70" cy="68" r="3" fill="#111" />
                  <text x="70" y="64" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">49</text>
                  <circle cx="125" cy="52" r="3" fill="#111" />
                  <text x="125" y="48" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">97</text>
                  <circle cx="180" cy="52" r="3" fill="#111" />
                  <text x="180" y="48" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">97</text>
                  <circle cx="235" cy="78" r="3" fill="#111" />
                  <text x="235" y="74" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">21</text>
                  <circle cx="295" cy="74" r="3" fill="#111" />
                  <text x="295" y="70" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">32</text>
                </svg>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-6 text-center border-t border-gray-200 pt-1.5 text-[9px] font-sans">
                <div><span className="text-gray-500 block">ene</span><span className="font-bold text-black font-mono">$419</span></div>
                <div><span className="text-gray-500 block">feb</span><span className="font-bold text-black font-mono">$512</span></div>
                <div><span className="text-gray-500 block">mar</span><span className="font-bold text-black font-mono">$516</span></div>
                <div><span className="text-gray-500 block">abr</span><span className="font-bold text-black font-mono">$505.03</span></div>
                <div><span className="text-gray-500 block">may</span><span className="font-bold text-black font-mono">$324.5</span></div>
                <div><span className="text-gray-500 block">jun</span><span className="font-bold text-black font-mono">$467</span></div>
              </div>
            </div>

            {/* Chart 4: Formularios web (Google, Stack, otro medio) */}
            <div className="bg-white border-2 border-gray-300 rounded-md p-3.5 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-black font-sans">
                  Formularios web (Google, Stack, otro medio)
                </span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#D8F637] text-black font-black text-[10px] px-3 py-0.5 rounded-sm uppercase tracking-wider">
                  LEADS DE GOOGLE
                </span>
                <span className="text-[9.5px] font-bold text-black flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D8F637] border border-black inline-block"></span> Google
                </span>
              </div>

              {/* Line Chart SVG */}
              <div className="h-32 w-full pt-2 pb-1">
                <svg viewBox="0 0 320 95" className="w-full h-full overflow-visible">
                  <line x1="0" y1="15" x2="320" y2="15" stroke="#E5E7EB" />
                  <line x1="0" y1="45" x2="320" y2="45" stroke="#E5E7EB" />
                  <line x1="0" y1="75" x2="320" y2="75" stroke="#E5E7EB" />

                  <polyline fill="none" stroke="#D8F637" strokeWidth="2.5" points="20,48 70,82 125,68 180,80 235,48 295,15" />
                  <circle cx="20" cy="48" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="20" y="42" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">116</text>
                  <circle cx="70" cy="82" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="70" y="76" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">15</text>
                  <circle cx="125" cy="68" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="125" y="62" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">59</text>
                  <circle cx="180" cy="80" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="180" y="74" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">20</text>
                  <circle cx="235" cy="48" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="235" y="42" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">116</text>
                  <circle cx="295" cy="15" r="3" fill="#D8F637" stroke="#000" strokeWidth="0.8" />
                  <text x="295" y="9" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#111">198</text>
                </svg>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-6 text-center border-t border-gray-200 pt-1.5 text-[9px] font-sans">
                <div><span className="text-gray-500 block">ene</span><span className="font-bold text-black font-mono">$428</span></div>
                <div><span className="text-gray-500 block">feb</span><span className="font-bold text-black font-mono">$508</span></div>
                <div><span className="text-gray-500 block">mar</span><span className="font-bold text-black font-mono">$441</span></div>
                <div><span className="text-gray-500 block">abr</span><span className="font-bold text-black font-mono">$501</span></div>
                <div><span className="text-gray-500 block">may</span><span className="font-bold text-black font-mono">$603</span></div>
                <div><span className="text-gray-500 block">jun</span><span className="font-bold text-black font-mono">$334.35</span></div>
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================================== */}
        {/* 7. CHART TITLE (BAR CHART) & TABLA HISTÓRICA                          */}
        {/* ===================================================================== */}
        <section className="mb-6">
          <div className="bg-white border-2 border-gray-300 rounded-md p-4 shadow-xs">
            
            <div className="text-center mb-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
                Chart Title
              </h4>
            </div>

            {/* Custom Bar Cluster Chart */}
            <div className="h-44 w-full mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={effectiveData.historicalMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 'bold' }} stroke="#666" />
                  <YAxis tick={{ fontSize: 9 }} stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', color: '#fff', borderRadius: '6px', border: '1px solid #333', fontSize: '11px' }}
                  />
                  <Bar dataKey="inversion" fill="#2563EB" name="Inversión" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="leadsReales" fill="#EA580C" name="Leads Reales" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="citas" fill="#6B7280" name="Citas" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="ventas" fill="#EAB308" name="Ventas" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-center text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-black font-bold border-b border-gray-300">
                    <th className="py-1.5 px-2 text-left font-sans"></th>
                    {effectiveData.historicalMonthly.map((h) => (
                      <th key={h.month} className="py-1.5 px-2 font-sans font-bold">{h.month}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-mono text-[10px]">
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">Inversión en pauta</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month}>{h.inversion}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">Leads reales</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month} className="font-bold text-black">{h.leadsReales}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">Citas</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month}>{h.citas}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">Ventas</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month}>{h.ventas}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">CPL</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month}>{(h.inversion / h.leadsReales).toFixed(5)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">CPV</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month}>{h.ventas > 0 ? (h.inversion / h.ventas).toFixed(3) : ''}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-left font-bold text-gray-900 font-sans">ROAS</td>
                    {effectiveData.historicalMonthly.map((h) => (
                      <td key={h.month}></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ===================================================================== */}
        {/* 8. COMPORTAMIENTO WEB (EPIKA.MX / GOOGLE ANALYTICS)                   */}
        {/* ===================================================================== */}
        <section className="mb-6">
          
          {/* Header Bar */}
          <div className="bg-[#0A0A0A] text-white p-3 rounded-t-md flex items-center justify-between border-x border-t border-black">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#D4F634] rounded flex items-center justify-center text-black font-black text-[10px]">
                ■
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-sans">
                  COMPORTAMIENTO WEB (EPIKA.MX / GOOGLE ANALYTICS)
                </h3>
                <p className="text-[9.5px] text-gray-400">
                  Tasa de rebote, tiempo en sitio, tráfico calificado (&gt;20 segundos) y eventos logrados
                </p>
              </div>
            </div>

            <a
              href="https://epika.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gray-300 hover:text-white font-sans flex items-center gap-1"
            >
              <span>Ver Detalle Web Analytics</span>
              <span>→</span>
            </a>
          </div>

          {/* 4 Dark Metric Cards */}
          <div className="bg-[#121212] p-3 border-x border-black grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3 text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">TASA DE REBOTE</span>
              <span className="text-2xl font-black text-white font-mono my-0.5 block">
                {effectiveData.webMetrics.bounceRate}%
              </span>
              <span className="text-[8.5px] text-[#A3E635] font-semibold">✓ Controlada (&lt;45%)</span>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3 text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">TIEMPO PROMEDIO</span>
              <span className="text-2xl font-black text-white font-mono my-0.5 block">
                {effectiveData.webMetrics.avgTimeSeconds} <span className="text-xs font-normal text-gray-400">seg</span>
              </span>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3 text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">TRÁFICO CALIFICADO</span>
              <span className="text-2xl font-black text-[#A3E635] font-mono my-0.5 block">
                {effectiveData.webMetrics.qualifiedTrafficPercent}%
              </span>
              <span className="text-[8.5px] text-gray-400">Visitas duraron &gt; 20s: 840</span>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-md p-3 text-left">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">TIEMPO NO REBOTADOS</span>
              <span className="text-2xl font-black text-white font-mono my-0.5 block">
                {effectiveData.webMetrics.qualifiedAvgTimeSeconds} <span className="text-xs font-normal text-gray-400">seg</span>
              </span>
            </div>

          </div>

          {/* Eventos Logrados Strip */}
          <div className="bg-[#0A0A0A] p-3 rounded-b-md border-x border-b border-black">
            <h5 className="text-[9.5px] font-black text-gray-300 uppercase tracking-wider mb-2 font-sans">
              EVENTOS LOGRADOS EN EPIKA.MX (CONVERSIONES CLAVE)
            </h5>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-left">
              
              <div className="bg-[#141414] border border-gray-800 rounded p-2">
                <span className="text-[8.5px] text-gray-400 block uppercase">CLIC A WHATSAPP</span>
                <span className="text-lg font-black text-white font-mono">{effectiveData.webMetrics.events.whatsappClicks}</span>
              </div>

              <div className="bg-[#141414] border border-gray-800 rounded p-2">
                <span className="text-[8.5px] text-gray-400 block uppercase">CLIC A TELÉFONO</span>
                <span className="text-lg font-black text-white font-mono">{effectiveData.webMetrics.events.phoneClicks}</span>
              </div>

              <div className="bg-[#141414] border border-gray-800 rounded p-2">
                <span className="text-[8.5px] text-gray-400 block uppercase">LLENADO FORMULARIOS</span>
                <span className="text-lg font-black text-white font-mono">{effectiveData.webMetrics.events.formSubmits}</span>
              </div>

              <div className="bg-[#141414] border border-gray-800 rounded p-2">
                <span className="text-[8.5px] text-gray-400 block uppercase">LLEGADA A /GRACIAS</span>
                <span className="text-lg font-black text-white font-mono">{effectiveData.webMetrics.events.thankYouPageViews}</span>
              </div>

              <div className="bg-[#141414] border border-gray-800 rounded p-2">
                <span className="text-[8.5px] text-gray-400 block uppercase">DESCARGA BROCHURE</span>
                <span className="text-lg font-black text-white font-mono">{effectiveData.webMetrics.events.brochureDownloads}</span>
              </div>

            </div>
          </div>

        </section>

        {/* ===================================================================== */}
        {/* 9. ADS CON MEJORES RESULTADOS • TOP LEADS                            */}
        {/* ===================================================================== */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-[#D4F634] rounded flex items-center justify-center text-black font-black text-[9px]">
                ■
              </div>
              <span className="bg-[#D8F637] text-black font-black text-xs px-3.5 py-0.5 rounded uppercase tracking-wider font-sans">
                ADS CON MEJORES RESULTADOS • TOP LEADS
              </span>
            </div>
            <span className="text-[9.5px] text-gray-500 italic">
              Haz clic en cualquier anuncio para ir directo al Lead / Campaña
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {effectiveData.topAds.map((ad) => (
              <div 
                key={ad.id}
                onClick={(e) => handleOpenExternalUrl(ad.leadUrl || 'https://epika.mx/', e)}
                className="bg-[#0F172A] text-white rounded-lg overflow-hidden border-2 border-gray-700 hover:border-[#D4F634] shadow-md flex flex-col justify-between cursor-pointer transition-all duration-200 group"
              >
                <div className="p-3 bg-gradient-to-b from-[#1E293B] to-[#0F172A] min-h-[120px] flex flex-col justify-between">
                  <div>
                    <span className="bg-[#D8F637] text-black text-[8.5px] font-black px-2 py-0.5 rounded uppercase inline-block mb-2 font-sans">
                      {ad.priceTag}
                    </span>
                    <h5 className="text-xs font-black text-white uppercase font-sans leading-tight group-hover:text-[#D4F634] transition-colors">
                      {ad.headline}
                    </h5>
                    <p className="text-[8.5px] text-gray-300 leading-snug mt-0.5">
                      {ad.subheadline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[8px] text-gray-400 border-t border-gray-800 pt-1.5 mt-2">
                    <span className="bg-gray-800 text-gray-300 px-1.5 py-0.2 rounded">
                      {ad.tag}
                    </span>
                    <span className="font-mono text-[7.5px]">
                      {ad.platform}
                    </span>
                  </div>
                </div>

                <div className="bg-black text-[#D8F637] text-center font-black text-[11px] py-1.5 tracking-wider border-t border-gray-800 flex items-center justify-center gap-1 group-hover:bg-[#D8F637] group-hover:text-black transition-colors font-sans">
                  <span>{ad.leads} LEADS</span>
                  <span>↗</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 10. PRÓXIMOS PASOS                                                    */}
        {/* ===================================================================== */}
        <section className="mb-2">
          <div className="flex justify-center mb-3">
            <span className="bg-[#D8F637] text-black font-black text-xs px-6 py-1 rounded-full uppercase tracking-wider font-sans">
              PRÓXIMOS PASOS
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans max-w-2xl mx-auto mb-4">
            {effectiveData.proximosPasos.map((paso, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-[#8DB600] mt-1.5 shrink-0"></span>
                <p className="font-bold text-[#111111] leading-snug text-xs">
                  {paso}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center print:hidden">
            <button
              type="button"
              onClick={() => handleOpenExternalUrl('https://epika.mx/#contacto')}
              className="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium border border-gray-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Abrir Lead / Campaña de "ENTREGA 2026" (17 Leads)</span>
            </button>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDITAR DATOS DEL REPORTE                                           */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 uppercase font-sans">
                    Editar Parámetros del Reporte Oficial
                  </h3>
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-mono">
                    <span>🌍 Sincronización en vivo:</span>
                    <span>Los cambios se reflejarán instantáneamente para TODOS los usuarios</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              
              {/* Period Label */}
              <div>
                <label className="block text-slate-600 mb-1 font-bold">Etiqueta de Periodo (Cabecera Principal)</label>
                <input
                  type="text"
                  value={reportData.periodRangeLabel}
                  onChange={(e) => setReportData({ ...reportData, periodRangeLabel: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 font-mono focus:border-slate-900 focus:bg-white focus:outline-none"
                  placeholder="Ej: Periodo del 13 al 19 de Enero"
                />
              </div>

              {/* 5 KPIs Principales */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-bold text-slate-900 mb-2 uppercase text-[11px] flex items-center gap-1.5">
                  <span>1. 5 KPIs Principales</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <div>
                    <label className="block text-slate-500 text-[10px] font-semibold">Leads Reales</label>
                    <input
                      type="number"
                      value={reportData.kpis.leadsReales}
                      onChange={(e) => setReportData({
                        ...reportData,
                        kpis: { ...reportData.kpis, leadsReales: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono focus:border-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] font-semibold">Citas</label>
                    <input
                      type="number"
                      value={reportData.kpis.citas}
                      onChange={(e) => setReportData({
                        ...reportData,
                        kpis: { ...reportData.kpis, citas: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono focus:border-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] font-semibold">Leads Vivos</label>
                    <input
                      type="number"
                      value={reportData.kpis.leadsVivos}
                      onChange={(e) => setReportData({
                        ...reportData,
                        kpis: { ...reportData.kpis, leadsVivos: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono focus:border-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] font-semibold">Apartados</label>
                    <input
                      type="number"
                      value={reportData.kpis.apartados}
                      onChange={(e) => setReportData({
                        ...reportData,
                        kpis: { ...reportData.kpis, apartados: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono focus:border-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] font-semibold">Ventas</label>
                    <input
                      type="number"
                      value={reportData.kpis.ventas}
                      onChange={(e) => setReportData({
                        ...reportData,
                        kpis: { ...reportData.kpis, ventas: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 font-mono focus:border-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Leads Detonadores */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-bold text-slate-900 mb-2 uppercase text-[11px] flex items-center gap-1.5">
                  <span>2. Leads por Canal Detonador</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {reportData.leadsDetonadoresActuales.map((det, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 shadow-xs">
                      <label className="block text-slate-800 font-bold text-[10.5px] truncate mb-1">
                        {det.label}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={det.count}
                          onChange={(e) => {
                            const newCount = parseInt(e.target.value) || 0;
                            const updated = [...reportData.leadsDetonadoresActuales];
                            updated[idx] = { ...updated[idx], count: newCount };
                            setReportData({ ...reportData, leadsDetonadoresActuales: updated });
                          }}
                          className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 font-mono text-xs focus:border-slate-900 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={det.costoUnitario || ''}
                          onChange={(e) => {
                            const updated = [...reportData.leadsDetonadoresActuales];
                            updated[idx] = { ...updated[idx], costoUnitario: e.target.value };
                            setReportData({ ...reportData, leadsDetonadoresActuales: updated });
                          }}
                          placeholder="Costo unitario"
                          className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 font-mono text-[10px] focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedencia de Encuestas /gracias */}
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-bold text-slate-900 mb-2 uppercase text-[11px] flex items-center gap-1.5">
                  <span>3. Procedencia de Encuestas en Formulario /gracias (17 Totales)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(reportData.webMetrics.surveyFlow || []).map((flow, fIdx) => (
                    <div key={flow.id} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-800 block truncate mb-1">
                        {flow.sourceName}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={flow.count}
                          onChange={(e) => {
                            const newCount = parseInt(e.target.value) || 0;
                            const newFlow = [...(reportData.webMetrics.surveyFlow || [])];
                            newFlow[fIdx] = { ...newFlow[fIdx], count: newCount };
                            setReportData({
                              ...reportData,
                              webMetrics: {
                                ...reportData.webMetrics,
                                surveyFlow: newFlow
                              }
                            });
                          }}
                          className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 font-mono text-xs focus:border-slate-900 focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-500 font-mono">encuestas</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 pt-4 mt-6">
              <span className="text-[11px] text-slate-500">
                Al guardar, los datos se registrarán en la base central y se distribuirán a todas las sesiones.
              </span>
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveGlobalReport(reportData)}
                  className="px-5 py-2 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black border border-black font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Guardar y Sincronizar para Todos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
