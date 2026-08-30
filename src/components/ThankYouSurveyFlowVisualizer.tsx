import React, { useState } from 'react';
import {
  ThankYouSurveyFlowItem,
  ThankYouIndividualSurveyLog,
  ThankYouAttributionSource
} from '../data/generalReportData';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ListFilter,
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
  Search,
  Filter,
  Eye,
  Info,
  ChevronRight,
  TrendingUp,
  Activity,
  Globe,
  Share2
} from 'lucide-react';

interface ThankYouSurveyFlowVisualizerProps {
  sources?: ThankYouAttributionSource[];
  surveyFlow?: ThankYouSurveyFlowItem[];
  surveyLogs?: ThankYouIndividualSurveyLog[];
  totalThankYouViews?: number;
  isCompactForPdf?: boolean;
}

export const ThankYouSurveyFlowVisualizer: React.FC<ThankYouSurveyFlowVisualizerProps> = ({
  sources = [],
  surveyFlow = [],
  surveyLogs = [],
  totalThankYouViews = 17,
  isCompactForPdf = false
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'individual' | 'utms'>('flow');
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeFlow = selectedSourceId
    ? surveyFlow.find((f) => f.id === selectedSourceId) || surveyFlow[0]
    : null;

  const filteredLogs = surveyLogs.filter((log) => {
    const matchesSource =
      filterSource === 'all' ||
      (filterSource === 'google' && log.source.toLowerCase().includes('google')) ||
      (filterSource === 'meta' && (log.source.toLowerCase().includes('meta') || log.source.toLowerCase().includes('facebook') || log.source.toLowerCase().includes('instagram'))) ||
      (filterSource === 'stackadapt' && log.source.toLowerCase().includes('stackadapt')) ||
      (filterSource === 'direct' && (log.source.toLowerCase().includes('orgánico') || log.source.toLowerCase().includes('directo') || log.source.toLowerCase().includes('qr')));

    const matchesSearch =
      searchQuery === '' ||
      log.leadCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.utmCampaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.surveyAnswers.interesModelo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.surveyAnswers.presupuesto.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSource && matchesSearch;
  });

  return (
    <div className="bg-white border-2 border-slate-900 rounded-xl overflow-hidden text-slate-800 shadow-sm">
      {/* Visual Flow Header */}
      <div className="bg-slate-50 p-3.5 sm:p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xs">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider font-sans">
                FLUJO VISUAL DE PROCEDENCIA: FORMULARIO & ENCUESTAS /GRACIAS
              </h3>
              <span className="bg-[#D4F634] text-black border border-black text-[10px] font-black px-2 py-0.5 rounded-full font-sans tracking-tight">
                {totalThankYouViews} Encuestas Completadas
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-sans mt-0.5">
              Trazabilidad exacta del camino de conversión: desde el anuncio detonador hasta la pantalla final <span className="text-emerald-700 font-mono font-bold">epika.mx/gracias</span>
            </p>
          </div>
        </div>

        {/* View Toggle Tabs (Interactive) */}
        {!isCompactForPdf && (
          <div className="flex items-center bg-slate-200/80 p-1 rounded-lg border border-slate-300 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setActiveTab('flow')}
              className={`px-3 py-1.5 rounded-md text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'flow'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Diagrama de Flujo</span>
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-3 py-1.5 rounded-md text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'individual'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-blue-600" />
              <span>Registro de {surveyLogs.length} Encuestas</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content Body */}
      {activeTab === 'flow' ? (
        <div className="p-3 sm:p-5 space-y-5">
          {/* ========================================================================= */}
          {/* 1. VISUAL FLOW CONVERGENCE PIPELINE (SANKEY / NODE STYLE)                 */}
          {/* ========================================================================= */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                MAPA DE CONVERSIÓN MULTICANAL HACIA /GRACIAS
              </span>
              <span className="text-[9.5px] text-slate-500">
                Selecciona cualquier canal para inspeccionar su embudo paso a paso
              </span>
            </div>

            {/* Visual Pipeline Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              
              {/* Column A: 4 Traffic Sources (4 cols) */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>1. CANALES DETONADORES</span>
                  <span>LEADS (%)</span>
                </div>

                {surveyFlow.map((flow) => {
                  const isSelected = selectedSourceId === flow.id;
                  return (
                    <div
                      key={flow.id}
                      onClick={() => setSelectedSourceId(isSelected ? null : flow.id)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'border-slate-900 bg-white shadow-md ring-2 ring-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full shrink-0"
                          style={{ backgroundColor: flow.color }}
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                            {flow.sourceName}
                          </div>
                          <div className="text-[9px] text-slate-500 truncate max-w-[170px] sm:max-w-[210px]">
                            {flow.campaignOrigin}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black font-mono" style={{ color: flow.color }}>
                          {flow.count}
                        </span>
                        <span className="text-[9px] text-slate-500 block font-mono">
                          {flow.percentage}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Column B: Intermediate Convergence Junction (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-2.5 py-2">
                <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-center">
                  2. PROCESAMIENTO WEB EPIKA
                </div>

                {/* Node 1: Landing epika.mx */}
                <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-3 relative shadow-xs">
                  <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs border border-emerald-200 font-bold">
                    🌐
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-slate-900 flex items-center justify-between">
                      <span>Aterrizaje en Landing</span>
                      <span className="text-[9px] text-emerald-700 font-mono font-bold">epika.mx</span>
                    </div>
                    <p className="text-[9px] text-slate-500">
                      Captura de UTMs, modelos 2R/3R y cotizador
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded-full border border-slate-300" />
                </div>

                {/* Node 2: Survey Form Completion */}
                <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-3 relative shadow-xs">
                  <div className="w-7 h-7 rounded bg-blue-50 text-[#1877F2] flex items-center justify-center text-xs border border-blue-200 font-bold">
                    📋
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-slate-900 flex items-center justify-between">
                      <span>Llenado de Encuesta</span>
                      <span className="text-[9px] text-slate-600 font-mono font-semibold">4 Preguntas</span>
                    </div>
                    <p className="text-[9px] text-slate-500">
                      Presupuesto, recámaras y tiempo de compra
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 absolute -right-2 top-1/2 -translate-y-1/2 bg-white rounded-full border border-slate-300" />
                </div>

                {/* Node 3: Validation & Anti-Spam */}
                <div className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-3 shadow-xs">
                  <div className="w-7 h-7 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold border border-emerald-300">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-slate-900 flex items-center justify-between">
                      <span>Verificación de Teléfono</span>
                      <span className="text-[9px] text-emerald-700 font-mono font-bold">100% Real</span>
                    </div>
                    <p className="text-[9px] text-slate-500">
                      Validación de WhatsApp y datos reales
                    </p>
                  </div>
                </div>
              </div>

              {/* Column C: Destination /gracias (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-center">
                <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mb-1 text-center">
                  3. DESTINO FINAL /GRACIAS
                </div>

                <div className="bg-emerald-50 border-2 border-emerald-600 rounded-xl p-4 shadow-sm text-center relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 bg-[#D4F634] text-black border border-black font-black text-[10px] px-2.5 py-0.5 rounded-full mb-2 font-mono uppercase shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    CONVERSIÓN FINAL
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
                    epika.mx/gracias
                  </h4>

                  <div className="my-2.5 py-2 border-y border-emerald-200 flex items-center justify-around">
                    <div>
                      <span className="text-[9px] text-slate-600 block uppercase font-bold">TOTAL ENCUESTAS</span>
                      <span className="text-3xl font-black text-emerald-700 font-mono">{totalThankYouViews}</span>
                    </div>
                    <div className="h-8 w-px bg-emerald-300" />
                    <div>
                      <span className="text-[9px] text-slate-600 block uppercase font-bold">LEADS REALES</span>
                      <span className="text-3xl font-black text-slate-900 font-mono">{totalThankYouViews}</span>
                    </div>
                  </div>

                  <div className="text-[9.5px] text-emerald-800 font-semibold flex items-center justify-center gap-1">
                    <span>⚡ Redirección inmediata tras enviar encuesta</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. DETAILED STEP-BY-STEP BREAKDOWN OF THE SELECTED SOURCE                 */}
          {/* ========================================================================= */}
          {activeFlow && (
            <div className="bg-white border-2 border-slate-900 rounded-xl p-4 animate-in fade-in duration-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: activeFlow.color }}
                  />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase font-sans">
                      EMBUDO DE CONVERSIÓN: {activeFlow.sourceName}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {activeFlow.count} encuestas completadas ({activeFlow.percentage}% del total de /gracias)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-700 font-semibold">
                    Tiempo en sitio: <strong className="text-slate-900">{activeFlow.avgTimeOnPage}</strong>
                  </span>
                  <span className="bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 text-emerald-800 font-semibold">
                    Tasa de conversión: <strong className="text-emerald-700">{activeFlow.conversionRate}</strong>
                  </span>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {activeFlow.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between relative shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center font-mono">
                          {step.stepNumber}
                        </span>
                        <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                          {step.badge}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 mb-1 font-sans">
                        {step.name}
                      </h5>
                      <p className="text-[9.5px] text-slate-600 leading-snug">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200 text-[8.5px] text-slate-500 font-mono font-semibold">
                      {step.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. SUMMARY PERCENTAGE DISTRIBUTION PILLS                                  */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {surveyFlow.map((flow) => (
              <div
                key={flow.id}
                onClick={() => setSelectedSourceId(flow.id)}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-2.5 cursor-pointer transition-colors shadow-xs hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-800 truncate">
                    {flow.sourceName}
                  </span>
                  <span className="text-xs font-black font-mono" style={{ color: flow.color }}>
                    {flow.count}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${flow.percentage}%`, backgroundColor: flow.color }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1 text-[8.5px] text-slate-500 font-mono">
                  <span>{flow.surveyType}</span>
                  <span className="font-bold">{flow.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 4. INDIVIDUAL SURVEY LOGS TABLE & DETAILS                                 */
        /* ========================================================================= */
        <div className="p-3 sm:p-4 space-y-3">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 flex-1">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por código, campaña o modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-sans"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-bold">
              <button
                onClick={() => setFilterSource('all')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  filterSource === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Todos ({surveyLogs.length})
              </button>
              <button
                onClick={() => setFilterSource('google')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  filterSource === 'google' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Google Ads (7)
              </button>
              <button
                onClick={() => setFilterSource('meta')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  filterSource === 'meta' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Meta Ads (5)
              </button>
              <button
                onClick={() => setFilterSource('stackadapt')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  filterSource === 'stackadapt' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                StackAdapt (3)
              </button>
              <button
                onClick={() => setFilterSource('direct')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  filterSource === 'direct' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Orgánico (2)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-[10.5px] border-collapse bg-white">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[9.5px] uppercase tracking-wider">
                  <th className="py-2.5 px-3">CÓDIGO / HORA</th>
                  <th className="py-2.5 px-3">CANAL DETONADOR</th>
                  <th className="py-2.5 px-3">CAMPAÑA (UTM)</th>
                  <th className="py-2.5 px-3">MODELO INTERÉS</th>
                  <th className="py-2.5 px-3">PRESUPUESTO</th>
                  <th className="py-2.5 px-3">TIEMPO COMPRA</th>
                  <th className="py-2.5 px-3">CONTACTO</th>
                  <th className="py-2.5 px-3 text-right">ESTADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredLogs.map((log) => {
                  const isGoogle = log.source.includes('Google');
                  const isMeta = log.source.includes('Meta');
                  const isStack = log.source.includes('StackAdapt');

                  return (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3">
                        <span className="font-mono font-bold text-slate-900 block">{log.leadCode}</span>
                        <span className="text-[8.5px] text-slate-500">{log.timestamp}</span>
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className="font-bold inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px]"
                          style={{
                            backgroundColor: isGoogle
                              ? '#EFF6FF'
                              : isMeta
                              ? '#EFF6FF'
                              : isStack
                              ? '#FFF7ED'
                              : '#F0FDF4',
                            color: isGoogle
                              ? '#1D4ED8'
                              : isMeta
                              ? '#1D4ED8'
                              : isStack
                              ? '#C2410C'
                              : '#15803D'
                          }}
                        >
                          {log.source}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-mono text-[9px] text-slate-600 max-w-[140px] truncate">
                        {log.utmCampaign}
                      </td>
                      <td className="py-2 px-3 font-medium text-slate-900">
                        {log.surveyAnswers.interesModelo}
                      </td>
                      <td className="py-2 px-3 font-mono font-bold text-emerald-700">
                        {log.surveyAnswers.presupuesto}
                      </td>
                      <td className="py-2 px-3 text-slate-700">
                        {log.surveyAnswers.tiempoCompra}
                      </td>
                      <td className="py-2 px-3 text-slate-600 font-mono text-[9px]">
                        {log.surveyAnswers.medioContacto}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            log.status === 'Cita Agendada'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : log.status === 'Verificado'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
