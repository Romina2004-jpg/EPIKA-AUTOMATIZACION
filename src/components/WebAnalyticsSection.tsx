import React from 'react';
import { WebBehaviorMetrics } from '../types';
import { 
  Globe, 
  Activity, 
  Clock, 
  Eye, 
  Target, 
  MessageSquare, 
  Phone, 
  FileText, 
  CheckCircle2, 
  Download,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface WebAnalyticsSectionProps {
  webMetrics: WebBehaviorMetrics;
  periodLabel: string;
}

export const WebAnalyticsSection: React.FC<WebAnalyticsSectionProps> = ({
  webMetrics,
  periodLabel
}) => {
  return (
    <div className="space-y-6 pb-12 text-slate-800">
      
      {/* Header Overview in Crisp Light */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight font-sans">
                  Comportamiento del Sitio Web Epika.mx (Google Analytics 4)
                </h2>
                <a 
                  href="https://epika.mx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-emerald-700 hover:underline inline-flex items-center gap-1 font-bold"
                >
                  epika.mx
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-slate-500">
                Análisis detallado de sesiones, tasa de rebote, duración calificada y eventos de conversión para el periodo: {periodLabel}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-600 self-start sm:self-auto">
            Total Sesiones: <span className="font-bold text-emerald-700">{webMetrics.totalSessions.toLocaleString('es-MX')}</span>
          </div>
        </div>
      </div>

      {/* 4 Core Web Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Tasa de Rebote */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tasa de Rebote</span>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {webMetrics.bounceRate}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
            <span>✓</span>
            <span>Objetivo inmobiliario &lt;45% cumplido</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Porcentaje de usuarios que abandonan sin interactuar.
          </p>
        </div>

        {/* 2. Tiempo Promedio General */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tiempo Promedio General</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            {webMetrics.avgTimeSeconds}{' '}
            <span className="text-sm font-normal text-slate-500">segundos</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 font-mono">
            {(webMetrics.avgTimeSeconds / 60).toFixed(1)} minutos por sesión
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Permanencia promedio de todos los visitantes.
          </p>
        </div>

        {/* 3. Tráfico Calificado (> 20s) */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tráfico Calificado (&gt; 20s)</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono">
            {webMetrics.qualifiedTrafficPercent}%
          </div>
          <div className="mt-2 text-xs text-slate-600 font-mono">
            {webMetrics.qualifiedTrafficVisits.toLocaleString('es-MX')} visitas con lectura real
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Usuarios que permanecieron más de 20 segundos explorando.
          </p>
        </div>

        {/* 4. Tiempo Promedio No Rebotados */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tiempo de No Rebotados</span>
            <Eye className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono">
            {webMetrics.qualifiedAvgTimeSeconds}{' '}
            <span className="text-sm font-normal text-slate-500">segundos</span>
          </div>
          <div className="mt-2 text-xs text-emerald-800 font-mono font-semibold">
            {(webMetrics.qualifiedAvgTimeSeconds / 60).toFixed(1)} min de alta interacción
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Visitantes interesados en amenidades, tipologías y cotizador.
          </p>
        </div>

      </div>

      {/* Events and Conversions Logrados en Epika.mx */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight mb-1 font-sans">
          Eventos Logrados en Epika.mx (Conversiones Clave)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Acciones de alta intención ejecutadas por los prospectos en el sitio web oficial
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Clic a WhatsApp</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">{webMetrics.events.whatsappClicks}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Clic a Teléfono</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">{webMetrics.events.phoneClicks}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Formularios Web</span>
              <span className="text-xl font-extrabold text-emerald-700 font-mono">{webMetrics.events.formSubmits}</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Sección "Gracias"</span>
                <span className="text-xl font-extrabold text-slate-900 font-mono">{webMetrics.events.thankYouPageViews}</span>
              </div>
            </div>
            <span className="text-[9.5px] text-emerald-700 mt-2 font-semibold">
              ✓ Formularios con confirmación
            </span>
          </div>

          <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Descarga Brochure</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono">{webMetrics.events.brochureDownloads}</span>
            </div>
          </div>

        </div>

        {/* Detailed Source Attribution for /gracias */}
        {webMetrics.thankYouSources && webMetrics.thankYouSources.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                  Atribución Exacta de Llegadas a Formulario /gracias (De dónde llegaron)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Desglose granular del origen de tráfico de cada usuario que completó el formulario de contacto
                </p>
              </div>
              <span className="text-[10px] font-bold bg-[#D4F634] text-black border border-black px-2.5 py-0.5 rounded-full uppercase">
                {webMetrics.events.thankYouPageViews} Conversiones Totales
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {webMetrics.thankYouSources.map((s, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-slate-900 font-sans uppercase">
                      {s.source}
                    </span>
                    <span 
                      className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800"
                    >
                      {s.percentage}%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    {s.details || 'Campaña activa'}
                  </p>
                  <div className="flex items-baseline justify-between pt-1 border-t border-slate-200">
                    <span className="text-[10px] text-slate-500 font-medium">Llegadas:</span>
                    <span className="text-base font-black text-slate-900 font-mono">{s.count} <span className="text-[10px] text-slate-500 font-normal">leads</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Traffic by Acquisition Channel in Crisp Light */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight mb-1 font-sans">
          Rendimiento por Canal de Adquisición Web
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Comportamiento específico de usuarios según la fuente de tráfico que los llevó a Epika.mx
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[10px] text-slate-600 uppercase font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">Canal de Adquisición</th>
                <th className="py-2.5 px-3 text-right">Sesiones</th>
                <th className="py-2.5 px-3 text-right">Sesiones Calificadas</th>
                <th className="py-2.5 px-3 text-right">Tasa Rebote</th>
                <th className="py-2.5 px-3 text-right">Duración Prom.</th>
                <th className="py-2.5 px-3 text-right">Eventos Logrados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[12px] text-slate-700 bg-white">
              {webMetrics.channelTraffic.map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{c.channel}</td>
                  <td className="py-2.5 px-3 text-right text-slate-900 font-bold">{c.sessions.toLocaleString('es-MX')}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">{c.qualifiedSessions.toLocaleString('es-MX')}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.bounceRate <= 38 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {c.bounceRate}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{c.avgDurationSec}s</td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{c.eventsCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
