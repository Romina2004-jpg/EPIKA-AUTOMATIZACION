import React, { useState, useRef } from 'react';
import { 
  Printer, 
  Download, 
  Edit3, 
  RefreshCw, 
  Calendar, 
  Sparkles, 
  Check, 
  TrendingUp, 
  Layers, 
  Megaphone, 
  FileText, 
  Database, 
  Headset, 
  Building2,
  ArrowRight,
  DollarSign,
  Users,
  Eye,
  MousePointerClick,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Instagram,
  Play,
  Heart,
  MessageCircle,
  Share2,
  Maximize2,
  Link as LinkIcon,
  Image as ImageIcon,
  Plus,
  Trash2,
  Globe
} from 'lucide-react';
import { 
  GeneralReportData, 
  DEFAULT_GENERAL_REPORT,
  MediaOnGenteBien,
  MonthlyInvestment,
  MonthlyLeadsMetrics,
  MonthlyVisitas,
  MonthlyVentas 
} from '../data/generalReportData';
import { FunnelPeriod } from '../types';

interface GeneralReportPdfViewProps {
  periods: FunnelPeriod[];
  activePeriodId: string;
}

export const GeneralReportPdfView: React.FC<GeneralReportPdfViewProps> = ({
  periods,
  activePeriodId
}) => {
  const [reportData, setReportData] = useState<GeneralReportData>(() => {
    const saved = localStorage.getItem('epika_general_report_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure default properties and update any legacy dummy URLs to live links
        if (parsed && Array.isArray(parsed.mediosGenteBien)) {
          parsed.mediosGenteBien = parsed.mediosGenteBien.map((item: any, idx: number) => {
            const def = DEFAULT_GENERAL_REPORT.mediosGenteBien[idx] || DEFAULT_GENERAL_REPORT.mediosGenteBien[0];
            const isLegacyDummyUrl = !item.postUrl || 
              item.postUrl.includes('C7Xw1Y2pE4b') || 
              item.postUrl.includes('C8qL8zSpO8k') || 
              item.postUrl === 'https://www.instagram.com/' || 
              item.postUrl === '#';

            return {
              ...def,
              ...item,
              imageUrl: item.imageUrl || def.imageUrl,
              postUrl: isLegacyDummyUrl ? def.postUrl : item.postUrl
            };
          });
        } else {
          parsed.mediosGenteBien = DEFAULT_GENERAL_REPORT.mediosGenteBien;
        }

        // Migrate Top Ads with real lead redirect URLs
        if (parsed && Array.isArray(parsed.topAds)) {
          parsed.topAds = parsed.topAds.map((ad: any, idx: number) => {
            const defAd = DEFAULT_GENERAL_REPORT.topAds[idx] || DEFAULT_GENERAL_REPORT.topAds[0];
            return {
              ...defAd,
              ...ad,
              leadUrl: ad.leadUrl || defAd.leadUrl || 'https://epika.mx/',
              platform: ad.platform || defAd.platform || 'Meta Ads'
            };
          });
        } else {
          parsed.topAds = DEFAULT_GENERAL_REPORT.topAds;
        }
        return { ...DEFAULT_GENERAL_REPORT, ...parsed };
      } catch (e) {
        return DEFAULT_GENERAL_REPORT;
      }
    }
    return DEFAULT_GENERAL_REPORT;
  });

  const [selectedSemester, setSelectedSemester] = useState<string>('ene-jun-2026');
  const [activeFocusMonth, setActiveFocusMonth] = useState<string>(reportData.activeFocusMonth || 'JUNIO');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditingSteps, setIsEditingSteps] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [selectedPostForPreview, setSelectedPostForPreview] = useState<MediaOnGenteBien | null>(null);
  const [editingPostUrlItem, setEditingPostUrlItem] = useState<{ id: string; url: string } | null>(null);
  const [editingLeadAdItem, setEditingLeadAdItem] = useState<{ id: string; url: string; headline: string; leads: number } | null>(null);

  // Bulletproof handler to open real post / profile URLs in a new browser tab
  const handleOpenExternalUrl = (url?: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!url) return;
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }
    try {
      const newWin = window.open(targetUrl, '_blank', 'noopener,noreferrer');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        // Fallback for strict iframe popup policies: dynamically create and click an anchor
        const anchor = document.createElement('a');
        anchor.href = targetUrl;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      }
    } catch {
      window.open(targetUrl, '_blank');
    }
  };

  // Print / PDF Export Handler
  const handlePrint = () => {
    window.print();
  };

  // Save report data changes locally
  const handleSaveReport = (newData: GeneralReportData) => {
    setReportData(newData);
    localStorage.setItem('epika_general_report_data', JSON.stringify(newData));
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
  };

  // Calculate totals for investments table
  const totalMediosOff = reportData.investments.reduce((acc, r) => acc + r.mediosOffTorre2, 0);
  const totalProduccion = reportData.investments.reduce((acc, r) => acc + r.produccionMateriales, 0);
  const totalMetaTorre1 = reportData.investments.reduce((acc, r) => acc + r.metaTorre1, 0);
  const totalMetaTorre2 = reportData.investments.reduce((acc, r) => acc + r.metaTorre2, 0);
  const totalWebGoogle = reportData.investments.reduce((acc, r) => acc + r.webGoogle, 0);
  const totalIguala = reportData.investments.reduce((acc, r) => acc + r.igualaServicios, 0);

  const monthlyTotals = reportData.investments.map(m => 
    m.mediosOffTorre2 + m.produccionMateriales + m.metaTorre1 + m.metaTorre2 + m.webGoogle + m.igualaServicios
  );
  const grandTotal = totalMediosOff + totalProduccion + totalMetaTorre1 + totalMetaTorre2 + totalWebGoogle + totalIguala;

  // Active month metrics for Leads and Cost Breakdown
  const focusMonthLeads = reportData.leadsMetrics.find(
    m => m.month.toLowerCase() === activeFocusMonth.toLowerCase() || 
         (activeFocusMonth.toLowerCase() === 'junio' && m.month.toLowerCase() === 'jun')
  ) || reportData.leadsMetrics[reportData.leadsMetrics.length - 1];

  const focusMonthInvest = reportData.investments.find(
    m => m.month.toLowerCase() === activeFocusMonth.toLowerCase() || 
         (activeFocusMonth.toLowerCase() === 'junio' && m.monthKey === 'jun')
  ) || reportData.investments[reportData.investments.length - 1];

  const totalLeadsPeriodoJunio = focusMonthLeads 
    ? (focusMonthLeads.leadsMetaTorre1 + focusMonthLeads.leadsMetaTorre2 + focusMonthLeads.leadsGoogle)
    : 381;

  // Format currency helper
  const formatCurrency = (val: number, decimals = 2) => {
    if (!val && val !== 0) return '$0.00';
    return '$' + val.toLocaleString('es-MX', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Interactive Control Header (Hidden when printing) */}
      <div className="print:hidden bg-[#121212] border border-[#262626] rounded-xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D4F634] animate-pulse"></span>
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              Reporte General Ejecutivo
              <span className="text-xs px-2 py-0.5 rounded font-mono font-semibold bg-[#D4F634]/20 text-[#D4F634] border border-[#D4F634]/30">
                PDF OFICIAL
              </span>
            </h2>
          </div>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Visualización idéntica al formato PDF ejecutivo de Épika Chapultepec. Se actualiza mes con mes y está optimizado para exportar a PDF o impresión en alta calidad.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          
          {/* Selector de Mes de Enfoque */}
          <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] rounded-lg px-2.5 py-1.5 text-xs text-[#E5E7EB]">
            <Calendar className="w-3.5 h-3.5 text-[#D4F634]" />
            <span className="text-[#737373] text-[11px]">Mes Foco:</span>
            <select
              value={activeFocusMonth}
              onChange={(e) => setActiveFocusMonth(e.target.value)}
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer pr-1"
            >
              {reportData.investments.map((inv) => (
                <option key={inv.month} value={inv.month.toUpperCase()} className="bg-[#121212] text-white">
                  {inv.month.toUpperCase()} 2026
                </option>
              ))}
            </select>
          </div>

          {/* Edit Data Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white text-xs font-semibold border border-[#333] transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#D4F634]" />
            <span>Editar Datos del Reporte</span>
          </button>

          {/* Export / Print PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black text-xs font-bold transition-all shadow-lg shadow-[#D4F634]/20 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>Generar / Imprimir PDF</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccessNotice && (
        <div className="print:hidden bg-[#D4F634]/15 border border-[#D4F634]/40 text-[#D4F634] px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          Datos del Reporte General guardados y sincronizados correctamente.
        </div>
      )}

      {/* ========================================================================= */}
      {/* PDF DOCUMENT CONTAINER (EXACT 1:1 REPLICA OF THE IMAGE & OCR)            */}
      {/* ========================================================================= */}
      <div 
        id="pdf-report-canvas"
        className="bg-[#FAFAFA] text-[#111111] font-sans rounded-xl p-5 sm:p-8 lg:p-10 shadow-2xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:m-0 print:rounded-none print:w-full print:max-w-none transition-all"
        style={{ color: '#111111' }}
      >
        
        {/* TOP HEADER */}
        <header className="flex items-center justify-between border-b-2 border-[#111111] pb-5 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] uppercase font-sans">
              {reportData.title}
            </h1>
            <p className="text-sm sm:text-base font-bold text-[#444444] tracking-wider uppercase mt-0.5">
              {reportData.periodRangeLabel}
            </p>
          </div>

          {/* Iconic ÉPIKA Brand Badge */}
          <div className="flex items-center gap-2.5 bg-[#D4F634] px-4 py-2.5 rounded-md border border-black shadow-sm">
            <div className="flex items-center gap-1 font-black text-2xl tracking-tighter text-black">
              <span className="w-1.5 h-7 bg-black rounded-xs inline-block"></span>
              <span className="w-1.5 h-7 bg-black rounded-xs inline-block"></span>
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-xl font-black tracking-wider text-black font-sans">
                ÉPIKA
              </span>
              <span className="text-[9px] font-bold tracking-[0.22em] text-black uppercase">
                CHAPULTEPEC
              </span>
            </div>
          </div>
        </header>

        {/* ===================================================================== */}
        {/* SECTION 1: INVERSIONES                                               */}
        {/* ===================================================================== */}
        <section className="mb-7">
          <div className="flex justify-center mb-3">
            <span className="bg-[#D4F634] text-black font-black text-xs sm:text-sm px-6 py-1 rounded-full uppercase tracking-wider border border-black/20 shadow-xs">
              INVERSIONES
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] sm:text-xs border-collapse bg-[#0D0D0D] text-white rounded-lg overflow-hidden shadow-md">
              <thead>
                <tr className="border-b border-[#262626] text-[#A3A3A3] text-[10px] sm:text-[11px]">
                  <th className="py-2.5 px-3 font-semibold text-left">Concepto</th>
                  {reportData.investments.map(inv => (
                    <th key={inv.month} className="py-2.5 px-2 text-right font-semibold">{inv.month}</th>
                  ))}
                  <th className="py-2.5 px-3 text-right font-black text-[#D4F634] bg-[#161616]">TOTAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F] font-mono text-[10.5px] sm:text-[11px]">
                
                {/* Row 1: Medios Off */}
                <tr className="hover:bg-[#161616]/60 transition-colors">
                  <td className="py-2 px-3 font-sans text-white text-[11px]">
                    Medios Off: Torre 2
                  </td>
                  {reportData.investments.map(inv => (
                    <td key={inv.month} className="py-2 px-2 text-right">
                      {formatCurrency(inv.mediosOffTorre2)}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-right font-bold text-white bg-[#141414]">
                    $ {totalMediosOff.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Row 2: Producción */}
                <tr className="hover:bg-[#161616]/60 transition-colors">
                  <td className="py-2 px-3 font-sans text-white text-[11px]">
                    Producción de materiales de campaña
                  </td>
                  {reportData.investments.map(inv => (
                    <td key={inv.month} className="py-2 px-2 text-right text-[#A3A3A3]">
                      {inv.produccionMateriales > 0 ? formatCurrency(inv.produccionMateriales) : '-'}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-right font-bold text-white bg-[#141414]">
                    $ {totalProduccion.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Row 3: Meta / Torre 1 */}
                <tr className="hover:bg-[#161616]/60 transition-colors">
                  <td className="py-2 px-3 font-sans text-white text-[11px]">
                    Meta / Torre 1
                  </td>
                  {reportData.investments.map(inv => (
                    <td key={inv.month} className="py-2 px-2 text-right">
                      {formatCurrency(inv.metaTorre1)}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-right font-bold text-white bg-[#141414]">
                    $ {totalMetaTorre1.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Row 4: Meta / Torre 2 */}
                <tr className="hover:bg-[#161616]/60 transition-colors">
                  <td className="py-2 px-3 font-sans text-white text-[11px]">
                    Meta / Torre 2
                  </td>
                  {reportData.investments.map(inv => (
                    <td key={inv.month} className="py-2 px-2 text-right">
                      {formatCurrency(inv.metaTorre2)}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-right font-bold text-white bg-[#141414]">
                    $ {totalMetaTorre2.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Row 5: Web / Google */}
                <tr className="hover:bg-[#161616]/60 transition-colors">
                  <td className="py-2 px-3 font-sans text-white text-[11px]">
                    Web / Google
                  </td>
                  {reportData.investments.map(inv => (
                    <td key={inv.month} className="py-2 px-2 text-right">
                      {formatCurrency(inv.webGoogle)}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-right font-bold text-white bg-[#141414]">
                    $ {totalWebGoogle.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Row 6: Iguala */}
                <tr className="hover:bg-[#161616]/60 transition-colors">
                  <td className="py-2 px-3 font-sans text-white text-[11px]">
                    Iguala de servicios digitales
                  </td>
                  {reportData.investments.map(inv => (
                    <td key={inv.month} className="py-2 px-2 text-right">
                      {formatCurrency(inv.igualaServicios, 0)}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-right font-bold text-white bg-[#141414]">
                    $ {totalIguala.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* Grand Total Row */}
                <tr className="bg-[#D4F634] text-black font-bold text-[11px] sm:text-xs">
                  <td className="py-2.5 px-3 font-black uppercase font-sans">
                    TOTAL
                  </td>
                  {monthlyTotals.map((tot, idx) => (
                    <td key={idx} className="py-2.5 px-2 text-right font-mono font-bold">
                      {formatCurrency(tot)}
                    </td>
                  ))}
                  <td className="py-2.5 px-3 text-right font-mono font-black text-black bg-[#C2E426]">
                    $ {grandTotal.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* SECTION 2: DIGITAL                                                   */}
        {/* ===================================================================== */}
        <section className="mb-7">
          <div className="flex justify-center mb-4">
            <span className="bg-[#D4F634] text-black font-black text-xs sm:text-sm px-8 py-1 rounded-full uppercase tracking-wider border border-black/20 shadow-xs">
              DIGITAL
            </span>
          </div>

          {/* 1. JOURNEY DIGITAL FLOWCHART */}
          <div className="bg-white border border-gray-300 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
            <h3 className="text-xs sm:text-sm font-black text-center text-[#111111] uppercase tracking-wider mb-4 font-sans">
              JOURNEY DIGITAL
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-1 items-center">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-black text-[#D4F634] flex items-center justify-center mb-1.5 shadow-sm">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-black leading-tight">RRSS + Web</span>
                <span className="text-[9.5px] text-gray-600 mt-1 leading-snug">
                  Campañas de prospección de leads
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-gray-400">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-black text-[#D4F634] flex items-center justify-center mb-1.5 shadow-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-black leading-tight">Formulario</span>
                <span className="text-[9.5px] text-gray-600 mt-1 leading-snug">
                  Filtro de leads
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-gray-400">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-black text-[#D4F634] flex items-center justify-center mb-1.5 shadow-sm">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-black leading-tight">CRM</span>
                <span className="text-[9.5px] text-gray-600 mt-1 leading-snug">
                  Llegan leads al CRM para su contacto
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-gray-400">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-black text-[#D4F634] flex items-center justify-center mb-1.5 shadow-sm">
                  <Headset className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-black leading-tight">Equipo Comercial</span>
                <span className="text-[9.5px] text-gray-600 mt-1 leading-snug">
                  Comercial contacta y da seguimiento a leads
                </span>
              </div>

              {/* Arrow */}
              <div className="hidden sm:flex justify-center text-gray-400">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center p-2 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-9 h-9 rounded-full bg-black text-[#D4F634] flex items-center justify-center mb-1.5 shadow-sm">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-black text-black leading-tight">Showroom</span>
                <span className="text-[9.5px] text-gray-600 mt-1 leading-snug">
                  Se les invita al showroom para cierre
                </span>
              </div>

            </div>
          </div>

          {/* 2. LEADS DE META vs LEADS DE GOOGLE CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            
            {/* LEADS DE META */}
            <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#D4F634] text-black font-black text-[11px] px-4 py-0.5 rounded-full uppercase tracking-wider">
                  LEADS DE META
                </span>
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="flex items-center gap-1 text-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9DC618] inline-block"></span> Torre 1
                  </span>
                  <span className="flex items-center gap-1 text-black">
                    <span className="w-2.5 h-2.5 rounded-full bg-black inline-block"></span> Torre 2
                  </span>
                </div>
              </div>

              {/* Custom SVG Line Chart for Meta */}
              <div className="h-36 w-full pt-3 pb-1">
                <svg viewBox="0 0 320 110" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#F0F0F0" strokeDasharray="2" />
                  <line x1="0" y1="60" x2="320" y2="60" stroke="#F0F0F0" strokeDasharray="2" />
                  <line x1="0" y1="95" x2="320" y2="95" stroke="#F0F0F0" />

                  {/* Torre 1 Line (Green/Lime) */}
                  <polyline
                    fill="none"
                    stroke="#8DB600"
                    strokeWidth="2.5"
                    points="20,10 70,25 125,55 180,45 235,24 295,46"
                  />
                  {/* Torre 1 Points */}
                  <circle cx="20" cy="10" r="3.5" fill="#8DB600" />
                  <text x="20" y="5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">261</text>

                  <circle cx="70" cy="25" r="3.5" fill="#8DB600" />
                  <text x="70" y="20" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">204</text>

                  <circle cx="125" cy="55" r="3.5" fill="#8DB600" />
                  <text x="125" y="50" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">129</text>

                  <circle cx="180" cy="45" r="3.5" fill="#8DB600" />
                  <text x="180" y="40" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">156</text>

                  <circle cx="235" cy="24" r="3.5" fill="#8DB600" />
                  <text x="235" y="19" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">206</text>

                  <circle cx="295" cy="46" r="3.5" fill="#8DB600" />
                  <text x="295" y="41" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">151</text>

                  {/* Torre 2 Line (Black) */}
                  <polyline
                    fill="none"
                    stroke="#111111"
                    strokeWidth="2.5"
                    points="20,65 70,85 125,68 180,68 235,92 295,88"
                  />
                  {/* Torre 2 Points */}
                  <circle cx="20" cy="65" r="3.5" fill="#111" />
                  <text x="20" y="60" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">105</text>

                  <circle cx="70" cy="85" r="3.5" fill="#111" />
                  <text x="70" y="80" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">49</text>

                  <circle cx="125" cy="68" r="3.5" fill="#111" />
                  <text x="125" y="63" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">97</text>

                  <circle cx="180" cy="68" r="3.5" fill="#111" />
                  <text x="180" y="63" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">97</text>

                  <circle cx="235" cy="92" r="3.5" fill="#111" />
                  <text x="235" y="87" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">21</text>

                  <circle cx="295" cy="88" r="3.5" fill="#111" />
                  <text x="295" y="83" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#111">32</text>
                </svg>
              </div>

              {/* Month Labels & Costo por lead */}
              <div className="grid grid-cols-6 text-center border-t border-gray-200 pt-2 text-[10px]">
                {reportData.leadsMetrics.map((m) => (
                  <div key={m.month} className="flex flex-col">
                    <span className="font-bold text-gray-700">{m.month.toLowerCase()}</span>
                    <span className="font-mono text-black font-semibold text-[9.5px]">${m.costoLeadMeta}</span>
                  </div>
                ))}
              </div>
              <div className="text-center text-[9px] text-gray-500 mt-1 font-medium">
                Costo promedio por lead.
              </div>
            </div>

            {/* LEADS DE GOOGLE */}
            <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="bg-[#D4F634] text-black font-black text-[11px] px-4 py-0.5 rounded-full uppercase tracking-wider">
                  LEADS DE GOOGLE
                </span>
                <span className="text-[10px] font-bold text-black flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4F634] border border-black inline-block"></span> Google
                </span>
              </div>

              {/* Custom SVG Line Chart for Google */}
              <div className="h-36 w-full pt-3 pb-1">
                <svg viewBox="0 0 320 110" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="#F0F0F0" strokeDasharray="2" />
                  <line x1="0" y1="60" x2="320" y2="60" stroke="#F0F0F0" strokeDasharray="2" />
                  <line x1="0" y1="95" x2="320" y2="95" stroke="#F0F0F0" />

                  {/* Google Line (Lime/Yellow) */}
                  <polyline
                    fill="none"
                    stroke="#D4F634"
                    strokeWidth="3"
                    points="20,55 70,95 125,78 180,93 235,55 295,20"
                  />
                  {/* Google Points */}
                  <circle cx="20" cy="55" r="4" fill="#D4F634" stroke="#000" strokeWidth="1" />
                  <text x="20" y="48" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#111">116</text>

                  <circle cx="70" cy="95" r="4" fill="#D4F634" stroke="#000" strokeWidth="1" />
                  <text x="70" y="88" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#111">15</text>

                  <circle cx="125" cy="78" r="4" fill="#D4F634" stroke="#000" strokeWidth="1" />
                  <text x="125" y="71" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#111">59</text>

                  <circle cx="180" cy="93" r="4" fill="#D4F634" stroke="#000" strokeWidth="1" />
                  <text x="180" y="86" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#111">20</text>

                  <circle cx="235" cy="55" r="4" fill="#D4F634" stroke="#000" strokeWidth="1" />
                  <text x="235" y="48" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#111">116</text>

                  <circle cx="295" cy="20" r="4" fill="#D4F634" stroke="#000" strokeWidth="1" />
                  <text x="295" y="13" fontSize="8.5" fontWeight="bold" textAnchor="middle" fill="#111">198</text>
                </svg>
              </div>

              {/* Month Labels & Costo por lead */}
              <div className="grid grid-cols-6 text-center border-t border-gray-200 pt-2 text-[10px]">
                {reportData.leadsMetrics.map((m) => (
                  <div key={m.month} className="flex flex-col">
                    <span className="font-bold text-gray-700">{m.month.toLowerCase()}</span>
                    <span className="font-mono text-black font-semibold text-[9.5px]">${m.costoLeadGoogle}</span>
                  </div>
                ))}
              </div>
              <div className="text-center text-[9px] text-gray-500 mt-1 font-medium">
                Costo promedio por lead.
              </div>
            </div>

          </div>

          {/* 3. TOTAL LEADS, COSTO POR LEAD & VISITAS RECIBIDAS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 items-stretch">
            
            {/* Total Leads Periodo (3 Cols) */}
            <div className="lg:col-span-3 bg-white border border-gray-300 rounded-xl p-4 flex flex-col justify-between items-center text-center shadow-xs">
              <span className="bg-[#D4F634] text-black font-black text-[10px] sm:text-[11px] px-3 py-1 rounded-full uppercase tracking-tight text-center leading-tight">
                LEADS TOTALES DEL PERIODO DE {activeFocusMonth}
              </span>
              <div className="my-3">
                <span className="text-5xl sm:text-6xl font-black text-black font-sans tracking-tight">
                  {totalLeadsPeriodoJunio}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-medium">
                Suma consolidada Meta & Google
              </span>
            </div>

            {/* Costo por Lead del Periodo (4 Cols) */}
            <div className="lg:col-span-4 bg-white border border-gray-300 rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div className="text-center mb-2">
                <span className="bg-[#D4F634] text-black font-black text-[10px] sm:text-[11px] px-3 py-1 rounded-full uppercase tracking-tight">
                  COSTO POR LEAD DEL PERIODO DE {activeFocusMonth}
                </span>
              </div>

              {/* 3 Pillars for Meta Torre 1, Meta Torre 2, Google */}
              <div className="grid grid-cols-3 gap-2 text-center my-2">
                
                {/* Meta Torre 1 */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-gray-700 leading-tight mb-1">Meta / Torre 1</span>
                  <div className="w-full bg-[#D4F634] text-black font-black py-4 rounded-md text-sm sm:text-base font-mono shadow-xs">
                    $435
                  </div>
                  <span className="text-[9px] font-mono text-gray-700 mt-1.5 font-bold">
                    $65,569.76
                  </span>
                  <span className="text-[8px] text-gray-500 leading-none">Presupuesto gastado</span>
                </div>

                {/* Meta Torre 2 */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-gray-700 leading-tight mb-1">Meta / Torre 2</span>
                  <div className="w-full bg-black text-white font-black py-4 rounded-md text-sm sm:text-base font-mono shadow-xs">
                    $607
                  </div>
                  <span className="text-[9px] font-mono text-gray-700 mt-1.5 font-bold">
                    $29,416.09
                  </span>
                  <span className="text-[8px] text-gray-500 leading-none">Presupuesto gastado</span>
                </div>

                {/* Google */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-gray-700 leading-tight mb-1">Google</span>
                  <div className="w-full bg-[#E5E7EB] text-black font-black py-4 rounded-md text-sm sm:text-base font-mono shadow-xs border border-gray-300">
                    $334
                  </div>
                  <span className="text-[9px] font-mono text-gray-700 mt-1.5 font-bold">
                    $70,006.10
                  </span>
                  <span className="text-[8px] text-gray-500 leading-none">Presupuesto gastado</span>
                </div>

              </div>
            </div>

            {/* Visitas Recibidas (5 Cols) */}
            <div className="lg:col-span-5 bg-white border border-gray-300 rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-1 mb-2">
                <span className="bg-[#D4F634] text-black font-black text-[10px] sm:text-[11px] px-3 py-0.5 rounded-full uppercase tracking-tight">
                  VISITAS RECIBIDAS
                </span>
                <span className="text-[9.5px] font-black text-black bg-[#E2F752] px-2 py-0.5 rounded">
                  PROMEDIO MENSUAL: 15-20
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-center text-[10px] border-collapse">
                  <thead>
                    <tr className="bg-[#D4F634] text-black font-black border-b border-black">
                      <th className="py-1 px-1 text-left font-sans">Canal</th>
                      <th className="py-1 px-1">Ene</th>
                      <th className="py-1 px-1">Feb</th>
                      <th className="py-1 px-1">Mar</th>
                      <th className="py-1 px-1">Abr</th>
                      <th className="py-1 px-1">Mayo</th>
                      <th className="py-1 px-1">Junio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-mono text-[10px]">
                    <tr>
                      <td className="py-1 px-1 text-left font-bold text-gray-800 font-sans">FB</td>
                      <td>3</td><td>1</td><td>4</td><td>1</td><td>4</td><td>2</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-1 text-left font-bold text-gray-800 font-sans">IG</td>
                      <td>3</td><td>9</td><td>3</td><td>5</td><td>0</td><td>4</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-1 text-left font-bold text-gray-800 font-sans">WEB</td>
                      <td>0</td><td>0</td><td>4</td><td>2</td><td>2</td><td>3</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-1 text-left font-bold text-gray-800 font-sans">POP</td>
                      <td>15</td><td>9</td><td>6</td><td>8</td><td>12</td><td>3</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold text-black border-t border-gray-300">
                      <td className="py-1 px-1 text-left font-sans">TOTAL</td>
                      <td>21</td><td>19</td><td>17</td><td>16</td><td>18</td><td>12</td>
                    </tr>
                    <tr className="text-[9px] font-semibold text-gray-700">
                      <td className="py-1 px-1 text-left font-sans">% visita / lead</td>
                      <td>4.35%</td><td>7.08%</td><td>5.96%</td><td>5.86%</td><td>5.25%</td><td>3.15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-[8.5px] text-gray-500 text-center mt-1">
                Se presenta el % de visitas vs leads totales captados en el mes.
              </div>
            </div>

          </div>

          {/* 4. ADS CON MEJORES RESULTADOS (LOS MEJORES LEADS) */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#D4F634] text-black font-black text-xs px-6 py-0.5 rounded-full uppercase tracking-wider border border-black/20 shadow-xs flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-black" />
                  ADS CON MEJORES RESULTADOS • TOP LEADS
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-semibold italic print:hidden">
                ⚡ Haz clic en cualquier anuncio para ir directo al Lead / Campaña
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {reportData.topAds.map((ad) => (
                <div 
                  key={ad.id} 
                  onClick={(e) => handleOpenExternalUrl(ad.leadUrl || 'https://epika.mx/', e)}
                  className="bg-[#111827] text-white rounded-xl overflow-hidden shadow-md flex flex-col justify-between border border-gray-700 hover:border-[#D4F634] hover:shadow-lg hover:shadow-[#D4F634]/10 transition-all duration-300 group cursor-pointer relative"
                  title={`Abrir Lead / Campaña de "${ad.headline}" (${ad.leads} Leads)`}
                >
                  <div className="p-3 bg-gradient-to-b from-gray-900 to-[#111827] flex flex-col justify-between min-h-[145px] relative">
                    <div className="flex justify-between items-start">
                      <span className="bg-[#D4F634] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase shadow-2xs">
                        {ad.priceTag}
                      </span>
                      
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingLeadAdItem({
                              id: ad.id,
                              url: ad.leadUrl || 'https://epika.mx/',
                              headline: ad.headline,
                              leads: ad.leads
                            });
                          }}
                          className="p-1 rounded text-gray-400 hover:text-[#D4F634] hover:bg-gray-800 transition-colors print:hidden"
                          title="Editar enlace directo de este Lead"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <span className="text-[8px] font-mono text-gray-400">ÉPIKA</span>
                      </div>
                    </div>

                    <div className="my-2">
                      <h4 className="text-xs font-black text-white leading-tight uppercase font-sans group-hover:text-[#D4F634] transition-colors flex items-center justify-between gap-1">
                        <span>{ad.headline}</span>
                        <ExternalLink className="w-3 h-3 text-[#D4F634] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </h4>
                      <p className="text-[9px] text-gray-300 leading-snug mt-0.5 line-clamp-2">
                        {ad.subheadline}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[8.5px] border-t border-gray-800 pt-1.5 text-[#D4F634]">
                      <span className="font-bold flex items-center gap-1">
                        <span>{ad.tag}</span>
                      </span>
                      <span className="font-mono text-gray-400 text-[8px]">
                        {ad.platform || 'Lead Real'}
                      </span>
                    </div>
                  </div>

                  {/* Leads Tag Banner with Direct Lead Action */}
                  <div className="bg-black text-[#D4F634] text-center font-black text-xs py-1.5 tracking-wider border-t border-gray-800 flex items-center justify-center gap-1.5 group-hover:bg-[#D4F634] group-hover:text-black transition-colors">
                    <span>{ad.leads} LEADS</span>
                    <ExternalLink className="w-3 h-3 text-current" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. ACUMULADO DE VENTAS DEL PERIODO & ROAS ESTIMADO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 items-stretch">
            
            {/* Sales Table (8 Cols) */}
            <div className="lg:col-span-8 bg-white border border-gray-300 rounded-xl p-4 shadow-xs flex flex-col justify-between">
              <div className="flex justify-center mb-3">
                <span className="bg-[#D4F634] text-black font-black text-[11px] px-5 py-0.5 rounded-full uppercase tracking-tight">
                  ACUMULADO DE VENTAS DEL PERIODO
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center text-[10.5px] border-collapse">
                  <thead>
                    <tr className="bg-[#111111] text-white font-bold border-b border-black">
                      <th className="py-1.5 px-2 text-left text-[10px]">2025 - 2026</th>
                      <th className="py-1.5 px-1.5">ENERO</th>
                      <th className="py-1.5 px-1.5">FEBRERO</th>
                      <th className="py-1.5 px-1.5">MARZO</th>
                      <th className="py-1.5 px-1.5">ABRIL</th>
                      <th className="py-1.5 px-1.5">MAYO</th>
                      <th className="py-1.5 px-1.5">JUNIO</th>
                      <th className="py-1.5 px-2 bg-[#D4F634] text-black font-black">OBJETIVO MENSUAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-mono text-[10.5px]">
                    <tr>
                      <td className="py-1.5 px-2 text-left font-bold text-gray-800 font-sans">Publicidad</td>
                      <td>1</td><td>4</td><td>0</td><td>0</td><td>0</td><td>0</td>
                      <td className="font-bold text-black bg-[#F5FBE6]">3</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 text-left font-bold text-gray-800 font-sans">POP</td>
                      <td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td>
                      <td className="text-gray-400 bg-[#F5FBE6]">-</td>
                    </tr>
                    <tr className="bg-gray-100 font-bold text-black">
                      <td className="py-1.5 px-2 text-left font-sans">ROAS</td>
                      <td className="text-green-700">9.93</td>
                      <td className="text-green-700">42.22</td>
                      <td className="text-green-700">12.40</td>
                      <td>0</td><td>0</td><td>0</td>
                      <td className="font-black text-black bg-[#D4F634]">50</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-2 text-[9px] text-gray-600 flex flex-col sm:flex-row justify-between gap-1 font-medium">
                <span>*INGRESO POR VENTA ESTIMADO ES DE 4 MDP</span>
                <span className="italic">TOMANDO COMO BASE PRECIO DE VENTA 3,200,000 POR INMUEBLE</span>
              </div>
            </div>

            {/* ROAS Estimated Circle Card (4 Cols) */}
            <div className="lg:col-span-4 bg-black text-white border border-gray-800 rounded-xl p-4 flex flex-col justify-between items-center text-center shadow-md">
              <div className="w-full">
                <span className="text-xs font-black text-white uppercase tracking-wider block">
                  ROAS ESTIMADO {activeFocusMonth} 2026:
                </span>
              </div>

              {/* Big circle ROAS */}
              <div className="w-20 h-20 rounded-full border-4 border-[#D4F634] flex items-center justify-center my-2 shadow-lg shadow-[#D4F634]/10">
                <span className="text-4xl font-black text-[#D4F634] font-sans">
                  0
                </span>
              </div>

              <span className="text-[10px] text-gray-300 uppercase tracking-tight font-semibold">
                POR CADA PESO INVERTIDO RETORNARON 0
              </span>
            </div>

          </div>

        </section>

        {/* ===================================================================== */}
        {/* SECTION 3: MEDIOS ON GENTE BIEN JALISCO & REDES SOCIALES              */}
        {/* ===================================================================== */}
        <section className="mb-7">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4F634] text-black font-black text-xs sm:text-sm px-6 py-1 rounded-full uppercase tracking-wider border border-black/20 shadow-xs flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-black" />
                MEDIOS ON - GENTE BIEN JALISCO & RRSS
              </span>
            </div>

            {/* Direct Official Channels Navigation Bar */}
            <div className="flex items-center gap-1.5 print:hidden">
              <button
                type="button"
                onClick={(e) => handleOpenExternalUrl('https://www.instagram.com/gentebien.jalisco/', e)}
                className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white text-[10.5px] font-bold flex items-center gap-1 shadow-xs hover:opacity-90 transition-all cursor-pointer"
                title="Abrir Instagram Oficial de Gente Bien Jalisco"
              >
                <Instagram className="w-3 h-3 text-white" />
                <span>@gentebien.jalisco</span>
                <ExternalLink className="w-2.5 h-2.5 text-white/80" />
              </button>

              <button
                type="button"
                onClick={(e) => handleOpenExternalUrl('https://www.facebook.com/EpikaChapultepec/', e)}
                className="px-2.5 py-1 rounded-full bg-[#1877F2] text-white text-[10.5px] font-bold flex items-center gap-1 shadow-xs hover:bg-[#166fe5] transition-all cursor-pointer"
                title="Abrir Facebook Oficial de Épika Chapultepec"
              >
                <Share2 className="w-3 h-3 text-white" />
                <span>Facebook Épika</span>
                <ExternalLink className="w-2.5 h-2.5 text-white/80" />
              </button>

              <button
                type="button"
                onClick={(e) => handleOpenExternalUrl('https://epika.mx/', e)}
                className="px-2.5 py-1 rounded-full bg-black text-[#D4F634] text-[10.5px] font-bold flex items-center gap-1 border border-black/30 shadow-xs hover:bg-gray-900 transition-all cursor-pointer"
                title="Abrir Portal Web Oficial epika.mx"
              >
                <Globe className="w-3 h-3 text-[#D4F634]" />
                <span>epika.mx</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#D4F634]/80" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportData.mediosGenteBien.map((medio, idx) => (
              <div 
                key={medio.id || idx} 
                className="bg-white border border-gray-300 rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:border-gray-400 group relative"
              >
                {/* Header with Type & Handle */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    {/* Channel Avatar */}
                    <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 shadow-xs shrink-0">
                      <div className="w-full h-full rounded-full bg-black text-[#D4F634] flex items-center justify-center font-black text-[10px] uppercase">
                        {medio.accountHandle?.includes('epika') || medio.accountHandle?.includes('Epika') ? 'EP' : 'GB'}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-black font-sans leading-none">
                          {medio.accountHandle || '@gentebien.jalisco'}
                        </span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#1D9BF0] text-white flex items-center justify-center text-[8px] font-bold" title="Cuenta Oficial Verificada">
                          ✓
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {medio.publishDate || 'Épika Chapultepec • Publicidad'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase flex items-center gap-1 border ${
                      medio.tipo === 'REEL' 
                        ? 'bg-purple-100 text-purple-800 border-purple-300' 
                        : medio.tipo === 'PORTAL WEB'
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      {medio.tipo === 'REEL' ? (
                        <Play className="w-2.5 h-2.5 fill-purple-800" />
                      ) : medio.tipo === 'PORTAL WEB' ? (
                        <Globe className="w-2.5 h-2.5" />
                      ) : (
                        <ImageIcon className="w-2.5 h-2.5" />
                      )}
                      {medio.tipo}
                    </span>
                  </div>
                </div>

                {/* Caption / Content summary */}
                <div className="my-3 text-xs">
                  <h4 className="font-black text-black uppercase text-[11.5px] leading-tight mb-1 font-sans">
                    {medio.previewTitle}
                  </h4>
                  <p className="text-gray-600 text-[10.5px] leading-snug line-clamp-2">
                    {medio.caption || 'Departamentos de lujo en preventa exclusiva. Una propuesta arquitectónica que redefine el corazón cultural de Guadalajara. #EpikaChapultepec #GenteBienJalisco'}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="bg-[#F8F9FA] border border-gray-200 rounded-xl p-3 space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between items-center border-b border-gray-200/80 pb-1">
                    <span className="text-gray-600 font-semibold text-[11px]">Alcance de Cuentas:</span>
                    <span className="font-mono font-bold text-black text-[11px]">{medio.alcance.toLocaleString('es-MX')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-200/80 pb-1">
                    <span className="text-gray-600 font-semibold text-[11px]">Impresiones Totales:</span>
                    <span className="font-mono font-bold text-black text-[11px]">{medio.impresiones.toLocaleString('es-MX')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-200/80 pb-1">
                    <span className="text-gray-600 font-semibold text-[11px]">Interacciones Registradas:</span>
                    <span className="font-mono font-bold text-black text-[11px]">{medio.interacciones}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-gray-900 font-black text-xs uppercase">Inversión Asignada:</span>
                    <span className="font-mono font-black text-[#85A900] text-sm">${medio.inversion.toLocaleString('es-MX')}</span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                    <span className="flex items-center gap-1 text-red-500 font-bold">
                      <Heart className="w-3.5 h-3.5 fill-red-500" />
                      <span className="font-mono">{medio.likes || medio.interacciones * 15}</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span className="font-mono">{medio.comments || medio.interacciones}</span>
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="font-mono">{medio.shares || Math.round(medio.alcance * 0.03)}</span>
                    </span>
                  </div>

                  {/* Direct Publication Link Button */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleOpenExternalUrl(medio.postUrl, e)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-900 hover:bg-black text-[#D4F634] text-[10.5px] font-extrabold transition-all border border-gray-800 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                      title={`Abrir publicación original de ${medio.previewTitle}`}
                    >
                      {medio.postUrl?.includes('instagram') ? (
                        <Instagram className="w-3 h-3 text-[#E1306C]" />
                      ) : medio.postUrl?.includes('facebook') ? (
                        <Share2 className="w-3 h-3 text-[#1877F2]" />
                      ) : (
                        <Globe className="w-3 h-3 text-[#D4F634]" />
                      )}
                      <span>Ver Publicación</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#D4F634]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingPostUrlItem({ id: medio.id, url: medio.postUrl || '' })}
                      className="p-1 rounded text-gray-400 hover:text-black hover:bg-gray-100 transition-colors print:hidden cursor-pointer"
                      title="Editar enlace directo de esta publicación"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================== */}
        {/* SECTION 4: PRÓXIMOS PASOS                                            */}
        {/* ===================================================================== */}
        <section className="mb-7">
          <div className="flex justify-center mb-3">
            <span className="bg-[#D4F634] text-black font-black text-xs sm:text-sm px-6 py-1 rounded-full uppercase tracking-wider border border-black/20 shadow-xs">
              PRÓXIMOS PASOS
            </span>
          </div>

          <div className="bg-white border border-gray-300 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8DB600] mt-1.5 shrink-0"></span>
                  <p className="font-bold text-[#111111] leading-snug">
                    Análisis y optimizaciones de las nuevas creatividades con costos y promociones.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8DB600] mt-1.5 shrink-0"></span>
                  <p className="font-bold text-[#111111] leading-snug">
                    Optimización de inversión y eficiencia de costos.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#8DB600] mt-1.5 shrink-0"></span>
                  <p className="font-bold text-[#111111] leading-snug">
                    Publicaciones impresas y RRSS en Club Social y Gente Bien.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* SECTION 5: FINANCIERO (PROYECCIÓN PRÓXIMO MES)                       */}
        {/* ===================================================================== */}
        <section className="mb-4">
          <div className="flex justify-center mb-3">
            <span className="bg-[#D4F634] text-black font-black text-xs sm:text-sm px-6 py-1 rounded-full uppercase tracking-wider border border-black/20 shadow-xs">
              FINANCIERO
            </span>
          </div>

          <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-[#111111] text-[#D4F634] font-black text-center py-1.5 text-xs uppercase tracking-widest">
              {reportData.financieroProximoMes.targetMonth}
            </div>

            <div className="divide-y divide-gray-200 text-xs font-mono p-3 space-y-2">
              {reportData.financieroProximoMes.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pt-2">
                  <span className="font-sans font-bold text-gray-800 text-[11.5px]">{item.concepto}</span>
                  <span className="font-bold text-black">${item.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t-2 border-black font-bold text-xs">
                <span className="font-sans font-black text-black uppercase">PRESUPUESTO ESTIMADO TOTAL</span>
                <span className="font-black text-[#85A900]">
                  ${reportData.financieroProximoMes.items.reduce((s, i) => s + i.monto, 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDITAR DATOS DEL REPORTE GENERAL                                  */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#141414] border border-[#262626] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl text-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#262626] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#D4F634]" />
                <h3 className="text-base font-bold text-white uppercase">
                  Editar Datos del Reporte General
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A3A3A3] mb-1 font-semibold">Rango de Periodo (Texto Cabecera)</label>
                <input
                  type="text"
                  value={reportData.periodRangeLabel}
                  onChange={(e) => setReportData({ ...reportData, periodRangeLabel: e.target.value })}
                  className="w-full bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A3A3A3] mb-1 font-semibold">Mes de Enfoque Activo</label>
                <input
                  type="text"
                  value={reportData.activeFocusMonth}
                  onChange={(e) => setReportData({ ...reportData, activeFocusMonth: e.target.value })}
                  className="w-full bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>

              {/* SECTION: MEDIOS ON (POSTS & REELS DE REDES SOCIALES) */}
              <div className="border-t border-[#262626] pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-[#D4F634] uppercase text-[11px] flex items-center gap-1.5">
                      <Instagram className="w-4 h-4 text-[#D4F634]" />
                      Medios ON - Publicaciones & Enlaces Directos
                    </h4>
                    <p className="text-[10.5px] text-[#888] mt-0.5">
                      Configura la imagen proyectada, el link directo a Instagram / RRSS y las métricas de cada post.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newPost: MediaOnGenteBien = {
                        id: `gb-post-${Date.now()}`,
                        tipo: 'POST',
                        previewTitle: 'Nueva Publicación Editorial',
                        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                        postUrl: 'https://www.instagram.com/p/C7Xw1Y2pE4b/',
                        caption: 'Épika Chapultepec: Exclusividad y estilo de vida en Guadalajara.',
                        accountHandle: '@gentebienjalisco',
                        publishDate: `${new Date().toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })}, 2026`,
                        alcance: 1500,
                        impresiones: 3000,
                        interacciones: 25,
                        inversion: 12000,
                        likes: 350,
                        comments: 20,
                        shares: 40
                      };
                      setReportData({
                        ...reportData,
                        mediosGenteBien: [...reportData.mediosGenteBien, newPost]
                      });
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#D4F634] text-[11px] font-bold border border-[#333] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Post</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {reportData.mediosGenteBien.map((medio, idx) => (
                    <div key={medio.id || idx} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl p-3.5 space-y-3">
                      <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#D4F634] text-black font-black text-[10px] px-2 py-0.5 rounded uppercase">
                            #{idx + 1} {medio.tipo}
                          </span>
                          <span className="font-bold text-white text-xs">{medio.previewTitle}</span>
                        </div>

                        {reportData.mediosGenteBien.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = reportData.mediosGenteBien.filter((_, i) => i !== idx);
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-950/40 text-xs flex items-center gap-1 cursor-pointer"
                            title="Eliminar publicación"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[#A3A3A3] text-[10.5px] mb-1 font-semibold">
                            Título / Encabezado del Post
                          </label>
                          <input
                            type="text"
                            value={medio.previewTitle}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].previewTitle = e.target.value;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1.5 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[#A3A3A3] text-[10.5px] mb-1 font-semibold">
                            Formato (POST / REEL / STORY)
                          </label>
                          <select
                            value={medio.tipo}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].tipo = e.target.value;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1.5 text-white font-bold cursor-pointer"
                          >
                            <option value="POST">POST (Editorial / Foto)</option>
                            <option value="REEL">REEL (Video / Recorrido)</option>
                            <option value="STORY">STORY (Highlight / Historia)</option>
                          </select>
                        </div>
                      </div>

                      {/* Image URL & Direct Link URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#A3A3A3] text-[10.5px] mb-1 font-semibold flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-[#D4F634]" />
                            URL de la Imagen Proyectada
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={medio.imageUrl || ''}
                              placeholder="https://images.unsplash.com/..."
                              onChange={(e) => {
                                const updated = [...reportData.mediosGenteBien];
                                updated[idx].imageUrl = e.target.value;
                                setReportData({ ...reportData, mediosGenteBien: updated });
                              }}
                              className="flex-1 bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1.5 text-white text-[11px] font-mono"
                            />
                            {medio.imageUrl && (
                              <img
                                src={medio.imageUrl}
                                alt="Thumb"
                                className="w-9 h-9 rounded object-cover border border-[#444] shrink-0"
                              />
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#A3A3A3] text-[10.5px] mb-1 font-semibold flex items-center gap-1">
                            <LinkIcon className="w-3 h-3 text-[#D4F634]" />
                            Link Directo de la Publicación (Instagram / RRSS)
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={medio.postUrl || ''}
                              placeholder="https://www.instagram.com/p/..."
                              onChange={(e) => {
                                const updated = [...reportData.mediosGenteBien];
                                updated[idx].postUrl = e.target.value;
                                setReportData({ ...reportData, mediosGenteBien: updated });
                              }}
                              className="flex-1 bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1.5 text-[#D4F634] text-[11px] font-mono"
                            />
                            {medio.postUrl && (
                              <a
                                href={medio.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-[#D4F634] border border-[#444] shrink-0 cursor-pointer"
                                title="Abrir en pestaña nueva para verificar"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Caption & Account Handle */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[#A3A3A3] text-[10.5px] mb-1 font-semibold">
                            Texto / Copy del Post
                          </label>
                          <textarea
                            rows={2}
                            value={medio.caption || ''}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].caption = e.target.value;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1 text-white text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#A3A3A3] text-[10.5px] mb-1 font-semibold">
                            Cuenta / Handle
                          </label>
                          <input
                            type="text"
                            value={medio.accountHandle || '@gentebienjalisco'}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].accountHandle = e.target.value;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded-lg px-2.5 py-1.5 text-white text-[11px]"
                          />
                        </div>
                      </div>

                      {/* Metrics: Alcance, Impresiones, Interacciones, Inversion */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[#262626]">
                        <div>
                          <label className="block text-[#888] text-[10px]">Alcance</label>
                          <input
                            type="number"
                            value={medio.alcance}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].alcance = parseInt(e.target.value) || 0;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded px-2 py-1 text-white font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#888] text-[10px]">Impresiones</label>
                          <input
                            type="number"
                            value={medio.impresiones}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].impresiones = parseInt(e.target.value) || 0;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded px-2 py-1 text-white font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#888] text-[10px]">Interacciones</label>
                          <input
                            type="number"
                            value={medio.interacciones}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].interacciones = parseInt(e.target.value) || 0;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded px-2 py-1 text-white font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#888] text-[10px]">Inversión ($)</label>
                          <input
                            type="number"
                            value={medio.inversion}
                            onChange={(e) => {
                              const updated = [...reportData.mediosGenteBien];
                              updated[idx].inversion = parseFloat(e.target.value) || 0;
                              setReportData({ ...reportData, mediosGenteBien: updated });
                            }}
                            className="w-full bg-[#141414] border border-[#333] rounded px-2 py-1 text-[#85A900] font-bold font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#262626] pt-3">
                <h4 className="font-bold text-[#D4F634] mb-2 uppercase text-[11px]">
                  Próximo Mes Financiero (Proyección)
                </h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={reportData.financieroProximoMes.targetMonth}
                      onChange={(e) => setReportData({
                        ...reportData,
                        financieroProximoMes: {
                          ...reportData.financieroProximoMes,
                          targetMonth: e.target.value
                        }
                      })}
                      placeholder="Nombre del Mes (ej. JULIO)"
                      className="w-1/3 bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-2 text-white font-mono font-bold"
                    />
                  </div>

                  {reportData.financieroProximoMes.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={item.concepto}
                        onChange={(e) => {
                          const newItems = [...reportData.financieroProximoMes.items];
                          newItems[idx].concepto = e.target.value;
                          setReportData({
                            ...reportData,
                            financieroProximoMes: { ...reportData.financieroProximoMes, items: newItems }
                          });
                        }}
                        className="flex-1 bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-1.5 text-white"
                      />
                      <input
                        type="number"
                        value={item.monto}
                        onChange={(e) => {
                          const newItems = [...reportData.financieroProximoMes.items];
                          newItems[idx].monto = parseFloat(e.target.value) || 0;
                          setReportData({
                            ...reportData,
                            financieroProximoMes: { ...reportData.financieroProximoMes, items: newItems }
                          });
                        }}
                        className="w-36 bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-1.5 text-white font-mono text-right"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="flex justify-end gap-3 border-t border-[#262626] pt-4 mt-5">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#262626] hover:bg-[#333] text-white text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleSaveReport(reportData);
                  setIsEditModalOpen(false);
                }}
                className="px-5 py-2 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black text-xs font-bold shadow-lg cursor-pointer"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PROYECCIÓN FULLSCREEN DE LA PUBLICACIÓN (MEDIOS ON)               */}
      {/* ========================================================================= */}
      {selectedPostForPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPostForPreview(null)}
        >
          <div 
            className="bg-[#121212] border border-[#2D2D2D] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl text-white flex flex-col md:flex-row relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Modal Button */}
            <button
              onClick={() => setSelectedPostForPreview(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-[#D4F634] border border-white/20 transition-all cursor-pointer"
              title="Cerrar proyección"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Projected Post Media */}
            <div className="md:w-1/2 bg-black flex items-center justify-center relative min-h-[300px] border-b md:border-b-0 md:border-r border-[#262626]">
              <img
                src={selectedPostForPreview.imageUrl}
                alt={selectedPostForPreview.previewTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover max-h-[460px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                }}
              />

              {selectedPostForPreview.tipo === 'REEL' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-xs border border-white/40 flex items-center justify-center shadow-2xl">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* Watermark Tag */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-[#D4F634] px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border border-[#D4F634]/40">
                {selectedPostForPreview.tipo} • ÉPIKA CHAPULTEPEC
              </div>
            </div>

            {/* Right Column: Publication Details & Direct Link */}
            <div className="md:w-1/2 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-4 bg-[#141414]">
              
              <div>
                {/* Account details */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#262626]">
                  <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600">
                    <div className="w-full h-full rounded-full bg-black text-[#D4F634] flex items-center justify-center font-black text-xs">
                      GB
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white font-sans">
                        {selectedPostForPreview.accountHandle || '@gentebienjalisco'}
                      </span>
                      <span className="w-4 h-4 rounded-full bg-[#1D9BF0] text-white flex items-center justify-center text-[9px] font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {selectedPostForPreview.publishDate || 'Publicación Editorial'}
                    </span>
                  </div>
                </div>

                {/* Title & Caption */}
                <div className="my-3 space-y-2">
                  <h3 className="text-base font-black text-[#D4F634] uppercase font-sans">
                    {selectedPostForPreview.previewTitle}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedPostForPreview.caption || 'Departamentos de lujo en preventa exclusiva. Una propuesta arquitectónica que redefine el corazón cultural de Guadalajara. #EpikaChapultepec #GenteBienJalisco'}
                  </p>
                </div>

                {/* Social Metrics Counter */}
                <div className="flex items-center gap-4 py-2.5 px-3 bg-[#1C1C1C] rounded-xl border border-[#2A2A2A] text-xs font-semibold text-gray-300">
                  <span className="flex items-center gap-1.5 text-red-400">
                    <Heart className="w-4 h-4 fill-red-400" />
                    <span className="font-mono font-bold">{selectedPostForPreview.likes || selectedPostForPreview.interacciones * 15}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    <span className="font-mono font-bold">{selectedPostForPreview.comments || selectedPostForPreview.interacciones}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-[#D4F634]" />
                    <span className="font-mono font-bold">{selectedPostForPreview.shares || Math.round(selectedPostForPreview.alcance * 0.03)}</span>
                  </span>
                </div>

                {/* Funnel Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                    <span className="text-[10px] text-gray-400 block uppercase">Alcance</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {selectedPostForPreview.alcance.toLocaleString('es-MX')}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                    <span className="text-[10px] text-gray-400 block uppercase">Impresiones</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {selectedPostForPreview.impresiones.toLocaleString('es-MX')}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                    <span className="text-[10px] text-gray-400 block uppercase">Interacciones</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {selectedPostForPreview.interacciones}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#181818] border border-[#262626]">
                    <span className="text-[10px] text-gray-400 block uppercase">Inversión Asignada</span>
                    <span className="font-mono font-black text-[#D4F634] text-sm">
                      ${selectedPostForPreview.inversion.toLocaleString('es-MX')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Publication URL CTA */}
              <div className="pt-3 border-t border-[#262626] space-y-2">
                <button
                  type="button"
                  onClick={(e) => handleOpenExternalUrl(selectedPostForPreview.postUrl, e)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#D4F634] hover:bg-[#C2E426] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D4F634]/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-black" />
                  <span>Abrir Publicación Oficial en Redes Sociales</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </button>

                <p className="text-[10px] text-gray-400 text-center">
                  URL activa: <span className="text-gray-300 font-mono underline cursor-pointer" onClick={(e) => handleOpenExternalUrl(selectedPostForPreview.postUrl, e)}>{selectedPostForPreview.postUrl}</span>
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL RÁPIDO: EDITAR ENLACE DIRECTO DEL POST (QUICK URL UPDATER)         */}
      {/* ========================================================================= */}
      {editingPostUrlItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setEditingPostUrlItem(null)}
        >
          <div 
            className="bg-[#141414] border border-[#2D2D2D] rounded-2xl max-w-lg w-full p-5 shadow-2xl text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#D4F634]" />
                <h3 className="text-sm font-bold text-white uppercase">
                  Editar Enlace Directo de la Publicación
                </h3>
              </div>
              <button
                onClick={() => setEditingPostUrlItem(null)}
                className="p-1 rounded text-gray-400 hover:text-white hover:bg-[#262626]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Pega aquí el enlace real (Instagram, Facebook o Web):
                </label>
                <input
                  type="text"
                  value={editingPostUrlItem.url}
                  onChange={(e) => setEditingPostUrlItem({ ...editingPostUrlItem, url: e.target.value })}
                  placeholder="https://www.instagram.com/p/..."
                  className="w-full bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-2 text-[#D4F634] font-mono text-xs focus:border-[#D4F634] focus:outline-hidden"
                />
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10.5px] text-gray-400 font-bold uppercase">
                  Enlaces Oficiales Recomendados (1 Clic):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPostUrlItem({ ...editingPostUrlItem, url: 'https://www.instagram.com/gentebien.jalisco/' })}
                    className="p-2 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] border border-[#333] text-left text-[11px] text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                    <span className="truncate">@gentebien.jalisco</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingPostUrlItem({ ...editingPostUrlItem, url: 'https://www.facebook.com/EpikaChapultepec/' })}
                    className="p-2 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] border border-[#333] text-left text-[11px] text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#1877F2]" />
                    <span className="truncate">Facebook Épika</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingPostUrlItem({ ...editingPostUrlItem, url: 'https://epika.mx/' })}
                    className="p-2 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] border border-[#333] text-left text-[11px] text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#D4F634]" />
                    <span className="truncate">Sitio Web epika.mx</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingPostUrlItem({ ...editingPostUrlItem, url: 'https://www.informador.mx/seccion/gente-bien/' })}
                    className="p-2 rounded-lg bg-[#1C1C1C] hover:bg-[#262626] border border-[#333] text-left text-[11px] text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate">Gente Bien Jalisco</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#262626] pt-3">
              <button
                type="button"
                onClick={(e) => handleOpenExternalUrl(editingPostUrlItem.url, e)}
                className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-200 text-xs font-bold flex items-center gap-1.5 border border-[#333] cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D4F634]" />
                <span>Probar Enlace</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPostUrlItem(null)}
                  className="px-3 py-1.5 rounded-lg bg-[#262626] hover:bg-[#333] text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = reportData.mediosGenteBien.map((m) => 
                      m.id === editingPostUrlItem.id ? { ...m, postUrl: editingPostUrlItem.url } : m
                    );
                    const newReport = { ...reportData, mediosGenteBien: updated };
                    handleSaveReport(newReport);
                    setEditingPostUrlItem(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black text-xs font-black shadow-md cursor-pointer"
                >
                  Guardar Enlace
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Top Ad Lead URL Modal */}
      {editingLeadAdItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs print:hidden">
          <div className="bg-[#141414] border border-[#333] rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#262626] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[#D4F634]/10 rounded-lg border border-[#D4F634]/30">
                  <TrendingUp className="w-4 h-4 text-[#D4F634]" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">
                    Editar Enlace de Lead Real
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Anuncio: <span className="text-[#D4F634] font-bold">{editingLeadAdItem.headline}</span> ({editingLeadAdItem.leads} Leads)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingLeadAdItem(null)}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">
                  URL de Redirección del Lead / Campaña
                </label>
                <input
                  type="text"
                  value={editingLeadAdItem.url}
                  onChange={(e) => setEditingLeadAdItem({ ...editingLeadAdItem, url: e.target.value })}
                  placeholder="https://epika.mx/ o https://api.whatsapp.com/send..."
                  className="w-full bg-[#1F1F1F] border border-[#333] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-[#D4F634]"
                />
                <p className="text-[10px] text-gray-500 mt-1">
                  Al hacer clic sobre el anuncio en la sección "ADS CON MEJORES RESULTADOS", el usuario será redirigido a este enlace de captación.
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setEditingLeadAdItem({ ...editingLeadAdItem, url: 'https://epika.mx/' })}
                  className="px-2 py-1 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 rounded text-[10.5px] border border-[#333] flex items-center gap-1"
                >
                  <Globe className="w-3 h-3 text-[#D4F634]" />
                  <span>epika.mx</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLeadAdItem({ ...editingLeadAdItem, url: 'https://api.whatsapp.com/send?phone=523312345678&text=Hola%20quiero%20informes%20de%20Epika%20Chapultepec' })}
                  className="px-2 py-1 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 rounded text-[10.5px] border border-[#333] flex items-center gap-1"
                >
                  <span>💬 WhatsApp Lead</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLeadAdItem({ ...editingLeadAdItem, url: 'https://www.facebook.com/EpikaChapultepec/' })}
                  className="px-2 py-1 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-300 rounded text-[10.5px] border border-[#333] flex items-center gap-1"
                >
                  <Share2 className="w-3 h-3 text-[#1877F2]" />
                  <span>Facebook Lead</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#262626] pt-3">
              <button
                type="button"
                onClick={(e) => handleOpenExternalUrl(editingLeadAdItem.url, e)}
                className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] text-gray-200 text-xs font-bold flex items-center gap-1.5 border border-[#333] cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D4F634]" />
                <span>Probar Enlace</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLeadAdItem(null)}
                  className="px-3 py-1.5 rounded-lg bg-[#262626] hover:bg-[#333] text-white text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = reportData.topAds.map((ad) => 
                      ad.id === editingLeadAdItem.id ? { ...ad, leadUrl: editingLeadAdItem.url } : ad
                    );
                    const newReport = { ...reportData, topAds: updated };
                    handleSaveReport(newReport);
                    setEditingLeadAdItem(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black text-xs font-black shadow-md cursor-pointer"
                >
                  Guardar Enlace Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
