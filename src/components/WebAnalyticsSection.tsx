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
    <div className="space-y-6 pb-12 text-[#E5E7EB]">
      
      {/* Header Overview in Elegant Dark */}
      <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4F634] text-black border border-black flex items-center justify-center font-bold text-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-sans">
                  Comportamiento del Sitio Web Epika.mx (Google Analytics 4)
                </h2>
                <a 
                  href="https://epika.mx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[#D4F634] hover:underline inline-flex items-center gap-1 font-bold"
                >
                  epika.mx
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-[#A3A3A3]">
                Análisis detallado de sesiones, tasa de rebote, duración calificada y eventos de conversión para el periodo: {periodLabel}
              </p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-lg text-xs font-mono text-[#A3A3A3] self-start sm:self-auto">
            Total Sesiones: <span className="font-bold text-[#D4F634]">{webMetrics.totalSessions.toLocaleString('es-MX')}</span>
          </div>
        </div>
      </div>

      {/* 4 Core Web Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Tasa de Rebote */}
        <div className="bg-[#121212] rounded-xl p-4 border border-[#262626] shadow-xl">
          <div className="flex items-center justify-between text-[#A3A3A3] mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tasa de Rebote</span>
            <Activity className="w-4 h-4 text-[#737373]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {webMetrics.bounceRate}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#D4F634] font-bold">
            <span>✓</span>
            <span>Objetivo inmobiliario &lt;45% cumplido</span>
          </div>
          <p className="text-[11px] text-[#737373] mt-1">
            Porcentaje de usuarios que abandonan sin interactuar.
          </p>
        </div>

        {/* 2. Tiempo Promedio General */}
        <div className="bg-[#121212] rounded-xl p-4 border border-[#262626] shadow-xl">
          <div className="flex items-center justify-between text-[#A3A3A3] mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tiempo Promedio General</span>
            <Clock className="w-4 h-4 text-[#737373]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {webMetrics.avgTimeSeconds}{' '}
            <span className="text-sm font-normal text-[#737373]">segundos</span>
          </div>
          <div className="mt-2 text-xs text-[#A3A3A3] font-mono">
            {(webMetrics.avgTimeSeconds / 60).toFixed(1)} minutos por sesión
          </div>
          <p className="text-[11px] text-[#737373] mt-1">
            Permanencia promedio de todos los visitantes.
          </p>
        </div>

        {/* 3. Tráfico Calificado (> 20s) */}
        <div className="bg-[#121212] rounded-xl p-4 border border-[#262626] shadow-xl">
          <div className="flex items-center justify-between text-[#A3A3A3] mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tráfico Calificado (&gt; 20s)</span>
            <Target className="w-4 h-4 text-[#D4F634]" />
          </div>
          <div className="text-3xl font-extrabold text-[#D4F634] font-mono">
            {webMetrics.qualifiedTrafficPercent}%
          </div>
          <div className="mt-2 text-xs text-[#A3A3A3] font-mono">
            {webMetrics.qualifiedTrafficVisits.toLocaleString('es-MX')} visitas con lectura real
          </div>
          <p className="text-[11px] text-[#737373] mt-1">
            Usuarios que permanecieron más de 20 segundos explorando.
          </p>
        </div>

        {/* 4. Tiempo Promedio No Rebotados */}
        <div className="bg-[#121212] rounded-xl p-4 border border-[#262626] shadow-xl">
          <div className="flex items-center justify-between text-[#A3A3A3] mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider">Tiempo de No Rebotados</span>
            <Eye className="w-4 h-4 text-[#D4F634]" />
          </div>
          <div className="text-3xl font-extrabold text-[#D4F634] font-mono">
            {webMetrics.qualifiedAvgTimeSeconds}{' '}
            <span className="text-sm font-normal text-[#737373]">segundos</span>
          </div>
          <div className="mt-2 text-xs text-[#D4F634] font-mono font-semibold">
            {(webMetrics.qualifiedAvgTimeSeconds / 60).toFixed(1)} min de alta interacción
          </div>
          <p className="text-[11px] text-[#737373] mt-1">
            Visitantes interesados en amenidades, tipologías y cotizador.
          </p>
        </div>

      </div>

      {/* Events and Conversions Logrados en Epika.mx */}
      <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-xl">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-1 font-sans">
          Eventos Logrados en Epika.mx (Conversiones Clave)
        </h3>
        <p className="text-xs text-[#A3A3A3] mb-4">
          Acciones de alta intención ejecutadas por los prospectos en el sitio web oficial
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          <div className="bg-[#1A1A1A] rounded-lg p-3.5 border border-[#262626] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4F634]/15 border border-[#D4F634]/30 text-[#D4F634] flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Clic a WhatsApp</span>
              <span className="text-xl font-extrabold text-white font-mono">{webMetrics.events.whatsappClicks}</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-lg p-3.5 border border-[#262626] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4F634]/15 border border-[#D4F634]/30 text-[#D4F634] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Clic a Teléfono</span>
              <span className="text-xl font-extrabold text-white font-mono">{webMetrics.events.phoneClicks}</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-lg p-3.5 border border-[#262626] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4F634]/15 border border-[#D4F634]/30 text-[#D4F634] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Formularios Web</span>
              <span className="text-xl font-extrabold text-[#D4F634] font-mono">{webMetrics.events.formSubmits}</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-lg p-3.5 border border-[#262626] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D4F634]/15 border border-[#D4F634]/30 text-[#D4F634] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Sección "Gracias"</span>
              <span className="text-xl font-extrabold text-white font-mono">{webMetrics.events.thankYouPageViews}</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-lg p-3.5 border border-[#262626] flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="w-9 h-9 rounded-lg bg-[#D4F634]/15 border border-[#D4F634]/30 text-[#D4F634] flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block">Descarga Brochure</span>
              <span className="text-xl font-extrabold text-white font-mono">{webMetrics.events.brochureDownloads}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Traffic by Acquisition Channel in Elegant Dark */}
      <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-xl">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-1 font-sans">
          Rendimiento por Canal de Adquisición Web
        </h3>
        <p className="text-xs text-[#A3A3A3] mb-4">
          Comportamiento específico de usuarios según la fuente de tráfico que los llevó a Epika.mx
        </p>

        <div className="overflow-x-auto border border-[#262626] rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1A1A1A] text-[10px] text-[#A3A3A3] uppercase font-bold border-b border-[#262626]">
                <th className="py-2.5 px-3">Canal de Adquisición</th>
                <th className="py-2.5 px-3 text-right">Sesiones</th>
                <th className="py-2.5 px-3 text-right">Sesiones Calificadas</th>
                <th className="py-2.5 px-3 text-right">Tasa Rebote</th>
                <th className="py-2.5 px-3 text-right">Duración Prom.</th>
                <th className="py-2.5 px-3 text-right">Eventos Logrados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F] font-mono text-[12px] text-[#D4D4D4]">
              {webMetrics.channelTraffic.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-white">{c.channel}</td>
                  <td className="py-2.5 px-3 text-right text-white font-bold">{c.sessions.toLocaleString('es-MX')}</td>
                  <td className="py-2.5 px-3 text-right text-[#D4F634] font-bold">{c.qualifiedSessions.toLocaleString('es-MX')}</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.bounceRate <= 38 ? 'bg-[#D4F634]/15 text-[#D4F634] border border-[#D4F634]/30' : 'bg-[#1A1A1A] text-[#A3A3A3]'
                    }`}>
                      {c.bounceRate}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-[#A3A3A3]">{c.avgDurationSec}s</td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#D4F634]">{c.eventsCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
