import { FunnelPeriod } from '../types';

const formatDateLocal = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const d = new Date();
const dayOfWeek = d.getDay() || 7;
  d.setDate(d.getDate() - dayOfWeek + 1);
  const startOfWeek = formatDateLocal(d);
const today = formatDateLocal(new Date());

const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const currentMonthName = MONTH_NAMES[new Date().getMonth()];
const currentYear = new Date().getFullYear();

export const INITIAL_PERIODS: FunnelPeriod[] = [
  {
    id: 'period-semanal-actual',
    periodType: 'monthly',
    periodLabel: `  (Semana Actual)`,
    dateRange: ` - `,
    startDate: startOfWeek,
    endDate: today,
    projectName: 'Epika Chapultepec',
    rows: [
      { id: 'r-m1', detonador: 'Pagina Web (Epika.mx)', leadsTotales: 0, leadsDatosReales: 0, mostroInteres: 0, leadsVivos: 0, visitas: 0, habloOferta: 0, ofertas: 0, ventas: 0, principalFuga: '% asistencia', inversion: 0, tipoDetonador: 'web_form' },
      { id: 'r-m2', detonador: 'Meta Ads - [BH] LEADS (Formularios)', leadsTotales: 0, leadsDatosReales: 0, mostroInteres: 0, leadsVivos: 0, visitas: 0, habloOferta: 0, ofertas: 0, ventas: 0, principalFuga: '% asistencia', inversion: 0, tipoDetonador: 'meta_forms' },
      { id: 'r-m3', detonador: 'Meta Ads - [BH] WA (WhatsApp CBO)', leadsTotales: 0, leadsDatosReales: 0, mostroInteres: 0, leadsVivos: 0, visitas: 0, habloOferta: 0, ofertas: 0, ventas: 0, principalFuga: '% interés inicial', inversion: 0, tipoDetonador: 'whatsapp' },
      { id: 'r-m4', detonador: 'Señalizacion / Punto de Venta', leadsTotales: 0, leadsDatosReales: 0, mostroInteres: 0, leadsVivos: 0, visitas: 0, habloOferta: 0, ofertas: 0, ventas: 0, principalFuga: '% interés en oferta', inversion: 0, tipoDetonador: 'showroom' },
      { id: 'r-m5', detonador: 'Google Ads (Search, Display & Youtube)', leadsTotales: 0, leadsDatosReales: 0, mostroInteres: 0, leadsVivos: 0, visitas: 0, habloOferta: 0, ofertas: 0, ventas: 0, principalFuga: '% oferta', inversion: 0, tipoDetonador: 'google_ads' },
      { id: 'r-m6', detonador: 'StackAdapt DSP (Nativo, Display & Video)', leadsTotales: 0, leadsDatosReales: 0, mostroInteres: 0, leadsVivos: 0, visitas: 0, habloOferta: 0, ofertas: 0, ventas: 0, principalFuga: '% interés inicial', inversion: 0, tipoDetonador: 'stackadapt', metadata: { account: 'ID: 268858' } }
    ],
    webMetrics: {
      totalVisitors: 0,
      newVisitors: 0,
      returningVisitors: 0,
      bounceRate: 0,
      averageSessionDuration: '00:00',
      events: { whatsappClicks: 0, phoneClicks: 0, formSubmits: 0, thankYouPageViews: 0, brochureDownloads: 0 }
    },
    history: []
  }
];

export function calculateFunnelMetrics(rows: import('../types').FunnelRow[]): import('../types').FunnelCalculations {
  const totalLeads = rows.reduce((acc, r) => acc + (Number(r.leadsTotales) || 0), 0);
  const totalLeadsReales = rows.reduce((acc, r) => acc + (Number(r.leadsDatosReales) || 0), 0);
  const totalMostroInteres = rows.reduce((acc, r) => acc + (Number(r.mostroInteres) || 0), 0);
  const totalLeadsVivos = rows.reduce((acc, r) => acc + (Number(r.leadsVivos) || 0), 0);
  const totalVisitas = rows.reduce((acc, r) => acc + (Number(r.visitas) || 0), 0);
  const totalHabloOferta = rows.reduce((acc, r) => acc + (Number(r.habloOferta) || 0), 0);
  const totalOfertas = rows.reduce((acc, r) => acc + (Number(r.ofertas) || 0), 0);
  const totalVentas = rows.reduce((acc, r) => acc + (Number(r.ventas) || 0), 0);
  const totalInversion = rows.reduce((acc, r) => acc + (Number(r.inversion) || 0), 0);

  // Meta Messages Concrete metrics calculation
  const metaRows = rows.filter(r => 
    r.tipoDetonador === 'meta_forms' || 
    r.tipoDetonador === 'whatsapp' || 
    r.detonador.toLowerCase().includes('facebook') || 
    r.detonador.toLowerCase().includes('instagram') ||
    r.detonador.toLowerCase().includes('whatsapp')
  );

  const totalMensajesIniciadosMeta = metaRows.reduce((acc, r) => {
    if (r.mensajesIniciados !== undefined) return acc + r.mensajesIniciados;
    // Default estimated from leads totales for meta channels
    return acc + (Number(r.leadsTotales) || 0);
  }, 0);

  const totalMensajesConcretadosMeta = metaRows.reduce((acc, r) => {
    if (r.mensajesConcretados !== undefined) return acc + r.mensajesConcretados;
    // Concretados corresponds to leads with verified real data & interaction
    return acc + (Number(r.leadsDatosReales) || 0);
  }, 0);

  const pctMensajesConcretadosMeta = totalMensajesIniciadosMeta > 0 
    ? (totalMensajesConcretadosMeta / totalMensajesIniciadosMeta) * 100 
    : 0;

  const totalInversionMeta = metaRows.reduce((acc, r) => acc + (Number(r.inversion) || 0), 0);
  const costoPorConversacionIniciadaMeta = totalMensajesIniciadosMeta > 0 
    ? totalInversionMeta / totalMensajesIniciadosMeta 
    : 0;

  const pctCalidadDatos = totalLeads > 0 ? (totalLeadsReales / totalLeads) * 100 : 0;
  const pctInteresInicial = totalLeadsReales > 0 ? (totalMostroInteres / totalLeadsReales) * 100 : 0;
  const pctLeadsVivos = totalMostroInteres > 0 ? (totalLeadsVivos / totalMostroInteres) * 100 : 0;
  const pctAsistencia = totalLeadsVivos > 0 ? (totalVisitas / totalLeadsVivos) * 100 : 0;
  const pctInteresOferta = totalVisitas > 0 ? (totalHabloOferta / totalVisitas) * 100 : 0;
  const pctOferta = totalHabloOferta > 0 ? (totalOfertas / totalHabloOferta) * 100 : 0;
  const pctCierreOferta = totalOfertas > 0 ? (totalVentas / totalOfertas) * 100 : 0;

  // Acumulados
  const pctAcumuladoLeadsReales = totalLeadsReales > 0 ? 100 : 0;
  const pctAcumuladoInteres = totalLeadsReales > 0 ? (totalMostroInteres / totalLeadsReales) * 100 : 0;
  const pctAcumuladoVivos = totalLeadsReales > 0 ? (totalLeadsVivos / totalLeadsReales) * 100 : 0;
  const pctAcumuladoVisitas = totalLeadsReales > 0 ? (totalVisitas / totalLeadsReales) * 100 : 0;
  const pctAcumuladoHabloOferta = totalLeadsReales > 0 ? (totalHabloOferta / totalLeadsReales) * 100 : 0;
  const pctAcumuladoOfertas = totalLeadsReales > 0 ? (totalOfertas / totalLeadsReales) * 100 : 0;
  const pctAcumuladoVentas = totalLeadsReales > 0 ? (totalVentas / totalLeadsReales) * 100 : 0;

  // Economics
  const cplReportado = totalLeads > 0 ? totalInversion / totalLeads : 0;
  const cplReal = totalLeadsReales > 0 ? totalInversion / totalLeadsReales : 0;
  const costoPorCita = totalVisitas > 0 ? totalInversion / totalVisitas : 0;
  const cac = totalVentas > 0 ? totalInversion / totalVentas : 0;

  const leadsReportadosPorVenta = totalVentas > 0 ? totalLeads / totalVentas : totalLeads;
  const leadsRealesPorVenta = totalVentas > 0 ? totalLeadsReales / totalVentas : totalLeadsReales;
  const visitasPorVenta = totalVentas > 0 ? totalVisitas / totalVentas : totalVisitas;

  return {
    totalLeads,
    totalLeadsReales,
    totalMostroInteres,
    totalLeadsVivos,
    totalVisitas,
    totalHabloOferta,
    totalOfertas,
    totalVentas,
    totalInversion,

    totalMensajesIniciadosMeta,
    totalMensajesConcretadosMeta,
    pctMensajesConcretadosMeta,
    costoPorConversacionIniciadaMeta,

    pctCalidadDatos,
    pctInteresInicial,
    pctLeadsVivos,
    pctAsistencia,
    pctInteresOferta,
    pctOferta,
    pctCierreOferta,

    pctAcumuladoLeadsReales,
    pctAcumuladoInteres,
    pctAcumuladoVivos,
    pctAcumuladoVisitas,
    pctAcumuladoHabloOferta,
    pctAcumuladoOfertas,
    pctAcumuladoVentas,

    cplReportado,
    cplReal,
    costoPorCita,
    cac,
    leadsReportadosPorVenta,
    leadsRealesPorVenta,
    visitasPorVenta
  };
}

const MONTH_NAMES_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const MONTH_NAMES_FULL_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export function formatSpanishDate(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const day = parts[2];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const year = parts[0];
  const monthName = MONTH_NAMES_ES[monthIdx] || parts[1];
  return `${day} ${monthName} ${year}`;
}

export function formatShortDateRange(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return 'Seleccionar fechas';
  const sParts = startDate.split('-');
  const eParts = endDate.split('-');
  if (sParts.length === 3 && eParts.length === 3) {
    const sDay = parseInt(sParts[2], 10);
    const eDay = parseInt(eParts[2], 10);
    const sMonth = MONTH_NAMES_ES[parseInt(sParts[1], 10) - 1] || sParts[1];
    const eMonth = MONTH_NAMES_ES[parseInt(eParts[1], 10) - 1] || eParts[1];
    const sYear = sParts[0];
    const eYear = eParts[0];

    if (sYear === eYear) {
      if (sMonth === eMonth) {
        return `${sDay} al ${eDay} de ${MONTH_NAMES_FULL_ES[parseInt(sParts[1], 10) - 1]} ${sYear}`;
      }
      return `${sDay} ${sMonth} - ${eDay} ${eMonth} ${sYear}`;
    }
    return `${sDay} ${sMonth} ${sYear} - ${eDay} ${eMonth} ${eYear}`;
  }
  return `${startDate} - ${endDate}`;
}

export function calculateDaysBetween(startDate: string, endDate: string): number {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  } catch {
    return 1;
  }
}

/**
 * Dynamically builds a custom FunnelPeriod based on exact start & end dates
 */
export function createCustomDateRangePeriod(
  startDate: string, 
  endDate: string, 
  basePeriods: FunnelPeriod[] = INITIAL_PERIODS
): FunnelPeriod {
  // Check if an existing period already has these exact dates
  const exactMatch = basePeriods.find(p => p.startDate === startDate && p.endDate === endDate);
  if (exactMatch) {
    return exactMatch;
  }

  const days = calculateDaysBetween(startDate, endDate);
  const formattedLabel = `Rango: ${formatShortDateRange(startDate, endDate)}`;
  const dateRangeStr = `${formatSpanishDate(startDate)} - ${formatSpanishDate(endDate)}`;

  // Find the closest base period (August monthly or default) to scale proportionally
  const baseMonthly = basePeriods.find(p => p.id === 'period-mensual-agosto') || basePeriods[0];
  const ratio = Math.max(0.1, Math.min(12, days / 31));

  const scaledRows = baseMonthly.rows.map(row => {
    const leadsTotales = Math.max(1, Math.round(row.leadsTotales * ratio));
    const leadsDatosReales = Math.max(0, Math.min(leadsTotales, Math.round(row.leadsDatosReales * ratio)));
    const mostroInteres = Math.max(0, Math.min(leadsDatosReales, Math.round(row.mostroInteres * ratio)));
    const leadsVivos = Math.max(0, Math.min(mostroInteres, Math.round(row.leadsVivos * ratio)));
    const visitas = Math.max(0, Math.min(leadsVivos, Math.round(row.visitas * ratio)));
    const habloOferta = Math.max(0, Math.min(visitas, Math.round(row.habloOferta * ratio)));
    const ofertas = Math.max(0, Math.min(habloOferta, Math.round(row.ofertas * ratio)));
    const ventas = Math.max(0, Math.min(ofertas, Math.round(row.ventas * ratio)));
    const inversion = Math.round(row.inversion * ratio * 100) / 100;

    return {
      ...row,
      id: `custom-${row.id}-${startDate}-${endDate}`,
      leadsTotales,
      leadsDatosReales,
      mostroInteres,
      leadsVivos,
      visitas,
      habloOferta,
      ofertas,
      ventas,
      inversion
    };
  });

  const scaledTraffic = (baseMonthly.webMetrics.channelTraffic || []).map(ch => ({
    ...ch,
    sessions: Math.max(10, Math.round(ch.sessions * ratio)),
    qualifiedSessions: Math.max(5, Math.round(ch.qualifiedSessions * ratio)),
    eventsCompleted: Math.max(1, Math.round(ch.eventsCompleted * ratio))
  }));

  const customPeriod: FunnelPeriod = {
    id: `custom-${startDate}-${endDate}`,
    periodType: 'custom',
    periodLabel: formattedLabel,
    dateRange: dateRangeStr,
    startDate,
    endDate,
    projectName: 'Epika Chapultepec',
    rows: scaledRows,
    webMetrics: {
      ...baseMonthly.webMetrics,
      totalSessions: Math.max(100, Math.round((baseMonthly.webMetrics.totalSessions || 0) * ratio)),
      qualifiedTrafficVisits: Math.max(50, Math.round((baseMonthly.webMetrics.qualifiedTrafficVisits || 0) * ratio)),
      events: {
        whatsappClicks: Math.round(baseMonthly.webMetrics.events.whatsappClicks * ratio),
        phoneClicks: Math.round(baseMonthly.webMetrics.events.phoneClicks * ratio),
        formSubmits: Math.round(baseMonthly.webMetrics.events.formSubmits * ratio),
        thankYouPageViews: Math.round(baseMonthly.webMetrics.events.thankYouPageViews * ratio),
        brochureDownloads: Math.round(baseMonthly.webMetrics.events.brochureDownloads * ratio)
      },
      channelTraffic: scaledTraffic
    },
    syncData: {
      meta: baseMonthly.syncData?.meta ? {
        ...baseMonthly.syncData.meta,
        spend: Math.round((baseMonthly.syncData.meta.spend || 60888) * ratio),
        leadsReported: Math.max(1, Math.round((baseMonthly.syncData.meta.leadsReported || 94) * ratio)),
        clicks: Math.round((baseMonthly.syncData.meta.clicks || 8120) * ratio),
        impressions: Math.round((baseMonthly.syncData.meta.impressions || 289400) * ratio)
      } : undefined,
      googleAds: baseMonthly.syncData?.googleAds ? {
        ...baseMonthly.syncData.googleAds,
        spend: Math.round((baseMonthly.syncData.googleAds.spend || 37691.25) * ratio * 100) / 100,
        leadsReported: Math.max(1, Math.round((baseMonthly.syncData.googleAds.leadsReported || 58) * ratio)),
        clicks: Math.round((baseMonthly.syncData.googleAds.clicks || 92524) * ratio),
        impressions: Math.round((baseMonthly.syncData.googleAds.impressions || 1204536) * ratio)
      } : undefined,
      stackAdapt: baseMonthly.syncData?.stackAdapt ? {
        ...baseMonthly.syncData.stackAdapt,
        spend: Math.round((baseMonthly.syncData.stackAdapt.spend || 21210.73) * ratio * 100) / 100,
        leadsReported: Math.max(1, Math.round((baseMonthly.syncData.stackAdapt.leadsReported || 7) * ratio)),
        clicks: Math.round((baseMonthly.syncData.stackAdapt.clicks || 1960) * ratio),
        impressions: Math.round((baseMonthly.syncData.stackAdapt.impressions || 183353) * ratio)
      } : undefined
    },
    updatedAt: new Date().toISOString()
  };

  return customPeriod;
}






