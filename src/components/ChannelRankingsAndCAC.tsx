import React from 'react';
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

interface ChannelRankingsAndCACProps {
  period: FunnelPeriod;
  calculations: FunnelCalculations;
}

export const ChannelRankingsAndCAC: React.FC<ChannelRankingsAndCACProps> = ({
  period,
  calculations
}) => {
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
    <div className="space-y-6 pb-12 text-[#E5E7EB]">
      
      {/* Header in Elegant Dark */}
      <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4F634] text-black border border-black flex items-center justify-center font-bold text-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight font-sans">
                Rendimiento Comparativo de Medios & Costo de Adquisición (CAC)
              </h2>
              <p className="text-xs text-[#A3A3A3]">
                Análisis de unit economics, ranking de efectividad y eficiencia por detonador para Epika Chapultepec
              </p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#262626] px-4 py-2 rounded-lg text-xs self-start sm:self-auto">
            <span className="text-[#A3A3A3] uppercase font-bold block text-[10px]">CAC Global del Periodo</span>
            <span className="text-lg font-extrabold text-[#D4F634] font-mono">
              ${calculations.cac > 0 ? calculations.cac.toLocaleString('es-MX') : '0'}{' '}
              <span className="text-xs font-normal text-[#A3A3A3]">MXN</span>
            </span>
          </div>
        </div>
      </div>

      {/* Podio / Top Performers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Podio 1: Mayor Volumen de Leads Reales */}
        <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#D4F634] text-black border border-black shadow-xs">
                🥇 Top 1 Leads Reales
              </span>
              <span className="text-xs text-[#A3A3A3] font-mono">Sierra Providencia</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {sortedByRealLeads[0]?.detonador}
            </h3>

            <div className="my-3 p-3.5 bg-[#1A1A1A] rounded-lg border border-[#262626]">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#A3A3A3]">Leads con Datos Reales:</span>
                <span className="text-2xl font-black text-[#D4F634] font-mono">
                  {sortedByRealLeads[0]?.leadsDatosReales}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-xs">
                <span className="text-[#A3A3A3]">Tasa de Calidad:</span>
                <span className="font-bold text-white font-mono">
                  {sortedByRealLeads[0]?.leadsTotales > 0 
                    ? ((sortedByRealLeads[0].leadsDatosReales / sortedByRealLeads[0].leadsTotales) * 100).toFixed(0) 
                    : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#A3A3A3] pt-3 border-t border-[#262626] flex items-center justify-between">
            <span>CPL Real de este canal:</span>
            <span className="font-mono font-bold text-[#D4F634]">
              ${sortedByRealLeads[0]?.leadsDatosReales > 0 
                ? Math.round(sortedByRealLeads[0].inversion / sortedByRealLeads[0].leadsDatosReales).toLocaleString('es-MX') 
                : 0} MXN
            </span>
          </div>
        </div>

        {/* Podio 2: Mayor Generador de Citas Presenciales */}
        <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#D4F634] text-black border border-black shadow-xs">
                🥇 Top 1 Citas Showroom
              </span>
              <span className="text-xs text-[#A3A3A3] font-mono">Asistencia Showroom</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {sortedByVisitas[0]?.detonador}
            </h3>

            <div className="my-3 p-3.5 bg-[#1A1A1A] rounded-lg border border-[#262626]">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#A3A3A3]">Visitas Concretadas:</span>
                <span className="text-2xl font-black text-white font-mono">
                  {sortedByVisitas[0]?.visitas}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-xs">
                <span className="text-[#A3A3A3]">Tasa de Asistencia:</span>
                <span className="font-bold text-white font-mono">
                  {sortedByVisitas[0]?.leadsVivos > 0 
                    ? ((sortedByVisitas[0].visitas / sortedByVisitas[0].leadsVivos) * 100).toFixed(0) 
                    : 0}% vs vivos
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#A3A3A3] pt-3 border-t border-[#262626] flex items-center justify-between">
            <span>Costo por Cita:</span>
            <span className="font-mono font-bold text-white">
              ${sortedByVisitas[0]?.visitas > 0 
                ? Math.round(sortedByVisitas[0].inversion / sortedByVisitas[0].visitas).toLocaleString('es-MX') 
                : 0} MXN
            </span>
          </div>
        </div>

        {/* Podio 3: Mayor Eficiencia en Costo por Lead Real */}
        <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#D4F634] text-black border border-black shadow-xs">
                🥇 CPL Real Más Rentable
              </span>
              <span className="text-xs text-[#A3A3A3] font-mono">Menor Costo / Real</span>
            </div>

            <h3 className="text-lg font-bold text-white">
              {sortedByCplReal[0]?.detonador}
            </h3>

            <div className="my-3 p-3.5 bg-[#1A1A1A] rounded-lg border border-[#262626]">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#A3A3A3]">CPL Real Unitario:</span>
                <span className="text-2xl font-black text-[#D4F634] font-mono">
                  ${sortedByCplReal[0]?.leadsDatosReales > 0 
                    ? Math.round(sortedByCplReal[0].inversion / sortedByCplReal[0].leadsDatosReales).toLocaleString('es-MX') 
                    : 0}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1 text-xs">
                <span className="text-[#A3A3A3]">CPL Bruto Reportado:</span>
                <span className="font-bold text-white font-mono">
                  ${sortedByCplReal[0]?.leadsTotales > 0 
                    ? Math.round(sortedByCplReal[0].inversion / sortedByCplReal[0].leadsTotales).toLocaleString('es-MX') 
                    : 0}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#A3A3A3] pt-3 border-t border-[#262626] flex items-center justify-between">
            <span>Inversión del canal:</span>
            <span className="font-mono font-bold text-white">
              ${sortedByCplReal[0]?.inversion.toLocaleString('es-MX')} MXN
            </span>
          </div>
        </div>

      </div>

      {/* Comprehensive Channel Unit Economics Table */}
      <div className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-xl">
        <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-1 font-sans">
          Tabla Integral de Unit Economics por Canal (Epika Chapultepec)
        </h3>
        <p className="text-xs text-[#A3A3A3] mb-4">
          Comparativa directa de costo por lead bruto vs real, costo por cita y CAC resultante
        </p>

        <div className="overflow-x-auto border border-[#262626] rounded-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1A1A1A] text-[10px] text-[#A3A3A3] uppercase font-bold border-b border-[#262626]">
                <th className="py-2.5 px-3">Medio / Detonador</th>
                <th className="py-2.5 px-3 text-right">Inversión</th>
                <th className="py-2.5 px-3 text-right">Leads Brutos</th>
                <th className="py-2.5 px-3 text-right">CPL Bruto</th>
                <th className="py-2.5 px-3 text-right text-[#D4F634]">Leads Reales</th>
                <th className="py-2.5 px-3 text-right text-[#D4F634]">CPL Real</th>
                <th className="py-2.5 px-3 text-right">Citas</th>
                <th className="py-2.5 px-3 text-right">Costo Cita</th>
                <th className="py-2.5 px-3 text-right text-[#D4F634]">Ventas</th>
                <th className="py-2.5 px-3 text-right text-[#D4F634]">CAC Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F] font-mono text-[12px] text-[#D4D4D4]">
              {period.rows.map(row => {
                const cplBruto = row.leadsTotales > 0 ? Math.round(row.inversion / row.leadsTotales) : 0;
                const cplReal = row.leadsDatosReales > 0 ? Math.round(row.inversion / row.leadsDatosReales) : 0;
                const costoCita = row.visitas > 0 ? Math.round(row.inversion / row.visitas) : 0;
                const cacCanal = row.ventas > 0 ? Math.round(row.inversion / row.ventas) : 0;

                return (
                  <tr key={row.id} className="hover:bg-[#1A1A1A] transition-colors">
                    <td className="py-2.5 px-3 font-sans font-bold text-white">{row.detonador}</td>
                    <td className="py-2.5 px-3 text-right text-[#A3A3A3]">${row.inversion.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-white">{row.leadsTotales}</td>
                    <td className="py-2.5 px-3 text-right text-[#737373]">${cplBruto.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-[#D4F634] font-bold">{row.leadsDatosReales}</td>
                    <td className="py-2.5 px-3 text-right text-[#D4F634] font-bold">${cplReal.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right text-white">{row.visitas}</td>
                    <td className="py-2.5 px-3 text-right text-white">${costoCita.toLocaleString('es-MX')}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-[#D4F634]">{row.ventas}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-[#D4F634]">
                      {cacCanal > 0 ? `$${cacCanal.toLocaleString('es-MX')}` : '-'}
                    </td>
                  </tr>
                );
              })}
              
              {/* TOTAL SUMMARY ROW */}
              <tr className="bg-[#1A1A1A] font-extrabold text-white text-[13px] border-t-2 border-[#262626]">
                <td className="py-3 px-3 font-sans font-black text-[#D4F634]">TOTAL PROYECTO</td>
                <td className="py-3 px-3 text-right text-white">${calculations.totalInversion.toLocaleString('es-MX')}</td>
                <td className="py-3 px-3 text-right text-white">{calculations.totalLeads}</td>
                <td className="py-3 px-3 text-right text-[#A3A3A3]">${calculations.cplReportado.toFixed(0)}</td>
                <td className="py-3 px-3 text-right text-[#D4F634]">{calculations.totalLeadsReales}</td>
                <td className="py-3 px-3 text-right text-[#D4F634]">${calculations.cplReal.toFixed(0)}</td>
                <td className="py-3 px-3 text-right text-white">{calculations.totalVisitas}</td>
                <td className="py-3 px-3 text-right text-white">${calculations.costoPorCita.toFixed(0)}</td>
                <td className="py-3 px-3 text-right text-[#D4F634]">{calculations.totalVentas}</td>
                <td className="py-3 px-3 text-right text-[#D4F634]">
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
