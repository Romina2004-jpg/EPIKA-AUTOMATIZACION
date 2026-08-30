import React, { useState } from 'react';
import { FunnelPeriod, FunnelCalculations, FunnelRow } from '../types';
import { 
  Award, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building, 
  CheckCircle, 
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Percent
} from 'lucide-react';
import { UnifiedCampaignControlBar } from './UnifiedCampaignControlBar';

interface ChannelRankingsAndCACProps {
  period: FunnelPeriod;
  calculations: FunnelCalculations;
}

export const ChannelRankingsAndCAC: React.FC<ChannelRankingsAndCACProps> = ({
  period,
  calculations
}) => {
  const [selectedMetaCampaignId, setSelectedMetaCampaignId] = useState<string>('all');
  const [selectedMetaWaCampaignId, setSelectedMetaWaCampaignId] = useState<string>('all');
  const [selectedGoogleCampaignId, setSelectedGoogleCampaignId] = useState<string>('all');
  const [selectedStackCampaignId, setSelectedStackCampaignId] = useState<string>('all');
  // Sort by leads reales
  const sortedByRealLeads = [...period.rows].sort((a, b) => b.leadsDatosReales - a.leadsDatosReales);

  // Sort by visitas
  const sortedByVisitas = [...period.rows].sort((a, b) => b.visitas - a.visitas);

  // Sort by efficiency (Lowest CPL Real)
  const sortedByCplReal = [...period.rows]
    .filter(r => r.leadsDatosReales > 0)
    .sort((a, b) => (a.inversion / a.leadsDatosReales) - (b.inversion / b.leadsDatosReales));

  // Sort by ventas
  const sortedByVentas = [...period.rows].sort((a, b) => b.ventas - a.ventas);

  return (
    <div className="space-y-6 pb-12 text-slate-800">
      
      {/* Header in Crisp Light */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight font-sans">
                Rendimiento Comparativo de Medios & Costo de Adquisición (CAC)
              </h2>
              <p className="text-xs text-slate-500">
                Análisis de unit economics, ranking de efectividad y eficiencia por detonador para Epika Chapultepec
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-xs self-start sm:self-auto">
            <span className="text-slate-500 uppercase font-bold block text-[10px]">CAC Global del Periodo</span>
            <span className="text-lg font-extrabold text-emerald-700 font-mono">
              ${calculations.cac > 0 ? calculations.cac.toLocaleString('es-MX') : '0'}{' '}
              <span className="text-xs font-normal text-slate-500">MXN</span>
            </span>
          </div>
        </div>
      </div>

      {/* Podio / Top Performers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Podio 1: Mayor Volumen de Leads Reales */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#D4F634] text-black border border-black shadow-xs">
                🥇 Top 1 Leads Reales
              </span>
              <span className="text-xs text-slate-500 font-mono">Sierra Providencia</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {sortedByRealLeads[0]?.detonador}
            </h3>

            <div className="my-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-600 font-medium">Leads con Datos Reales:</span>
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  {sortedByRealLeads[0]?.leadsDatosReales}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-xs">
                <span className="text-slate-500">Tasa de Calidad:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {sortedByRealLeads[0]?.leadsTotales > 0 
                    ? ((sortedByRealLeads[0].leadsDatosReales / sortedByRealLeads[0].leadsTotales) * 100).toFixed(0) 
                    : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200 flex items-center justify-between">
            <span>CPL Real de este canal:</span>
            <span className="font-mono font-bold text-emerald-700">
              ${sortedByRealLeads[0]?.leadsDatosReales > 0 
                ? Math.round(sortedByRealLeads[0].inversion / sortedByRealLeads[0].leadsDatosReales).toLocaleString('es-MX') 
                : 0} MXN
            </span>
          </div>
        </div>

        {/* Podio 2: Mayor Generador de Citas Presenciales */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
                🥇 Top 1 Citas Showroom
              </span>
              <span className="text-xs text-slate-500 font-mono">Asistencia Showroom</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {sortedByVisitas[0]?.detonador}
            </h3>

            <div className="my-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-600 font-medium">Visitas Concretadas:</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {sortedByVisitas[0]?.visitas}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-xs">
                <span className="text-slate-500">Tasa de Asistencia:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {sortedByVisitas[0]?.leadsVivos > 0 
                    ? ((sortedByVisitas[0].visitas / sortedByVisitas[0].leadsVivos) * 100).toFixed(0) 
                    : 0}% vs vivos
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200 flex items-center justify-between">
            <span>Costo por Cita:</span>
            <span className="font-mono font-bold text-slate-900">
              ${sortedByVisitas[0]?.visitas > 0 
                ? Math.round(sortedByVisitas[0].inversion / sortedByVisitas[0].visitas).toLocaleString('es-MX') 
                : 0} MXN
            </span>
          </div>
        </div>

        {/* Podio 3: Mayor Eficiencia en Costo por Lead Real */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs">
                🥇 CPL Real Más Rentable
              </span>
              <span className="text-xs text-slate-500 font-mono">Menor Costo / Real</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {sortedByCplReal[0]?.detonador}
            </h3>

            <div className="my-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-600 font-medium">CPL Real Unitario:</span>
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  ${sortedByCplReal[0]?.leadsDatosReales > 0 
                    ? Math.round(sortedByCplReal[0].inversion / sortedByCplReal[0].leadsDatosReales).toLocaleString('es-MX') 
                    : 0}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-xs">
                <span className="text-slate-500">CPL Bruto Reportado:</span>
                <span className="font-bold text-slate-900 font-mono">
                  ${sortedByCplReal[0]?.leadsTotales > 0 
                    ? Math.round(sortedByCplReal[0].inversion / sortedByCplReal[0].leadsTotales).toLocaleString('es-MX') 
                    : 0}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-3 border-t border-slate-200 flex items-center justify-between">
            <span>Inversión del canal:</span>
            <span className="font-mono font-bold text-slate-900">
              ${sortedByCplReal[0]?.inversion.toLocaleString('es-MX')} MXN
            </span>
          </div>
        </div>

      </div>

      {/* Multi-Platform Campaign Selector & Real Data Drilldown */}
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

      {/* Comprehensive Channel Unit Economics Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight mb-1 font-sans">
          Tabla Integral de Unit Economics por Canal (Epika Chapultepec)
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Comparativa directa de costo por lead bruto vs real, costo por cita y CAC resultante
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[10px] text-slate-600 uppercase font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">Medio / Detonador</th>
                <th className="py-2.5 px-3 text-right">Inversión</th>
                <th className="py-2.5 px-3 text-right">Leads Brutos</th>
                <th className="py-2.5 px-3 text-right">CPL Bruto</th>
                <th className="py-2.5 px-3 text-right text-emerald-800">Leads Reales</th>
                <th className="py-2.5 px-3 text-right text-emerald-800">CPL Real</th>
                <th className="py-2.5 px-3 text-right">Citas</th>
                <th className="py-2.5 px-3 text-right">Costo Cita</th>
                <th className="py-2.5 px-3 text-right text-emerald-800">Ventas</th>
                <th className="py-2.5 px-3 text-right text-emerald-800">CAC Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[12px] text-slate-700 bg-white">
              {period.rows.map(row => {
                const cplBruto = row.leadsTotales > 0 ? Math.round(row.inversion / row.leadsTotales) : 0;
                const cplReal = row.leadsDatosReales > 0 ? Math.round(row.inversion / row.leadsDatosReales) : 0;
                const costoCita = row.visitas > 0 ? Math.round(row.inversion / row.visitas) : 0;
                const cacCanal = row.ventas > 0 ? Math.round(row.inversion / row.ventas) : 0;

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{row.detonador}</td>
                    <td className="py-2.5 px-3 text-right text-slate-600">${row.inversion.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-slate-900">{row.leadsTotales}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">${cplBruto.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">{row.leadsDatosReales}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">${cplReal.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-slate-900">{row.visitas}</td>
                    <td className="py-2.5 px-3 text-right text-slate-900">${costoCita.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">{row.ventas}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      {cacCanal > 0 ? `$${cacCanal.toLocaleString('es-MX')}` : '-'}
                    </td>
                  </tr>
                );
              })}
              
              {/* TOTAL SUMMARY ROW */}
              <tr className="bg-slate-100 font-extrabold text-slate-900 text-[13px] border-t-2 border-slate-300">
                <td className="py-3 px-3 font-sans font-black text-slate-900">TOTAL PROYECTO</td>
                <td className="py-3 px-3 text-right text-slate-900">${calculations.totalInversion.toLocaleString('es-MX')}</td>
                <td className="py-3 px-3 text-right text-slate-900">{calculations.totalLeads}</td>
                <td className="py-3 px-3 text-right text-slate-600">${calculations.cplReportado.toFixed(0)}</td>
                <td className="py-3 px-3 text-right text-emerald-700">{calculations.totalLeadsReales}</td>
                <td className="py-3 px-3 text-right text-emerald-700">${calculations.cplReal.toFixed(0)}</td>
                <td className="py-3 px-3 text-right text-slate-900">{calculations.totalVisitas}</td>
                <td className="py-3 px-3 text-right text-slate-900">${calculations.costoPorCita.toFixed(0)}</td>
                <td className="py-3 px-3 text-right text-emerald-700">{calculations.totalVentas}</td>
                <td className="py-3 px-3 text-right text-emerald-700">
                  ${calculations.cac > 0 ? calculations.cac.toLocaleString('es-MX') : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
