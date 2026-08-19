import { FunnelPeriod } from '../types';

export const INITIAL_PERIODS: FunnelPeriod[] = [
  {
    id: 'period-semana-actual',
    periodType: 'weekly',
    periodLabel: 'Del 3 al 9 de Agosto (Semanal)',
    dateRange: '03 Ago 2026 - 09 Ago 2026',
    projectName: 'Epika Chapultepec',
    rows: [
      {
        id: 'r-1',
        detonador: 'Pagina Web',
        leadsTotales: 17,
        leadsDatosReales: 8,
        mostroInteres: 3,
        leadsVivos: 3,
        visitas: 0,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% asistencia',
        inversion: 3850,
        tipoDetonador: 'web_form'
      },
      {
        id: 'r-2',
        detonador: 'Facebook',
        leadsTotales: 13,
        leadsDatosReales: 3,
        mostroInteres: 2,
        leadsVivos: 2,
        visitas: 0,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% asistencia',
        inversion: 4200,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-3',
        detonador: 'Instagram',
        leadsTotales: 8,
        leadsDatosReales: 4,
        mostroInteres: 0,
        leadsVivos: 0,
        visitas: 0,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés inicial',
        inversion: 2950,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-4',
        detonador: 'Señalizacion/Punto de Venta',
        leadsTotales: 6,
        leadsDatosReales: 6,
        mostroInteres: 5,
        leadsVivos: 5,
        visitas: 3,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés en oferta',
        inversion: 1500,
        tipoDetonador: 'showroom'
      },
      {
        id: 'r-5',
        detonador: 'Google Ads (Search & Maps)',
        leadsTotales: 11,
        leadsDatosReales: 7,
        mostroInteres: 5,
        leadsVivos: 4,
        visitas: 2,
        habloOferta: 1,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% oferta',
        inversion: 4800,
        tipoDetonador: 'google_ads'
      },
      {
        id: 'r-6',
        detonador: 'StackAdapt (Programática)',
        leadsTotales: 5,
        leadsDatosReales: 3,
        mostroInteres: 2,
        leadsVivos: 2,
        visitas: 1,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés en oferta',
        inversion: 3100,
        tipoDetonador: 'stackadapt'
      }
    ],
    webMetrics: {
      bounceRate: 41.8,
      avgTimeSeconds: 52,
      qualifiedTrafficPercent: 58.4,
      qualifiedTrafficVisits: 840,
      qualifiedAvgTimeSeconds: 124,
      totalSessions: 1438,
      events: {
        whatsappClicks: 38,
        phoneClicks: 14,
        formSubmits: 28,
        thankYouPageViews: 28,
        brochureDownloads: 62
      },
      channelTraffic: [
        { channel: 'Meta Ads (FB/IG)', sessions: 620, qualifiedSessions: 345, bounceRate: 44.3, avgDurationSec: 46, eventsCompleted: 21 },
        { channel: 'Google Search & PMax', sessions: 480, qualifiedSessions: 320, bounceRate: 33.3, avgDurationSec: 88, eventsCompleted: 35 },
        { channel: 'StackAdapt Programmatic', sessions: 210, qualifiedSessions: 115, bounceRate: 45.2, avgDurationSec: 41, eventsCompleted: 8 },
        { channel: 'Orgánico & Directo (Epika.mx)', sessions: 128, qualifiedSessions: 60, bounceRate: 53.1, avgDurationSec: 34, eventsCompleted: 6 }
      ]
    },
    syncData: {
      meta: {
        platform: 'meta',
        name: 'Meta Ads (Facebook & Instagram)',
        account: 'act_2043417892891975',
        connected: true,
        lastSynced: 'Hace 5 minutos',
        spend: 7150,
        impressions: 48920,
        clicks: 1430,
        leadsReported: 21,
        metaForms: 13,
        whatsappMessages: 8,
        webConversions: 0,
        details: 'Token de acceso de sistema activo'
      },
      googleAds: {
        platform: 'google_ads',
        name: 'Google Ads (Search, Display & Maps)',
        account: '171-833-1328',
        connected: true,
        lastSynced: 'Hace 12 minutos',
        spend: 4800,
        impressions: 31200,
        clicks: 860,
        leadsReported: 11,
        webConversions: 11,
        details: 'Developer token activo'
      },
      stackAdapt: {
        platform: 'stackadapt',
        name: 'StackAdapt Programmatic DSP',
        account: 'ID: 268858',
        connected: true,
        lastSynced: 'Hace 18 minutos',
        spend: 3100,
        impressions: 54000,
        clicks: 410,
        leadsReported: 5,
        webConversions: 5,
        details: 'API Token Bearer activo'
      }
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'period-mensual-agosto',
    periodType: 'monthly',
    periodLabel: 'Mes de Agosto 2026',
    dateRange: '01 Ago 2026 - 31 Ago 2026',
    projectName: 'Epika Chapultepec',
    rows: [
      {
        id: 'r-m1',
        detonador: 'Pagina Web (Epika.mx)',
        leadsTotales: 68,
        leadsDatosReales: 38,
        mostroInteres: 24,
        leadsVivos: 20,
        visitas: 8,
        habloOferta: 4,
        ofertas: 2,
        ventas: 1,
        principalFuga: '% asistencia',
        inversion: 18500,
        tipoDetonador: 'web_form'
      },
      {
        id: 'r-m2',
        detonador: 'Facebook Ads',
        leadsTotales: 56,
        leadsDatosReales: 22,
        mostroInteres: 15,
        leadsVivos: 12,
        visitas: 4,
        habloOferta: 1,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% calidad de datos',
        inversion: 17200,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-m3',
        detonador: 'Instagram Ads',
        leadsTotales: 38,
        leadsDatosReales: 19,
        mostroInteres: 8,
        leadsVivos: 6,
        visitas: 2,
        habloOferta: 1,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés inicial',
        inversion: 13500,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-m4',
        detonador: 'Señalizacion / Punto de Venta',
        leadsTotales: 26,
        leadsDatosReales: 26,
        mostroInteres: 22,
        leadsVivos: 20,
        visitas: 14,
        habloOferta: 7,
        ofertas: 3,
        ventas: 1,
        principalFuga: '% cierre de oferta',
        inversion: 6000,
        tipoDetonador: 'showroom'
      },
      {
        id: 'r-m5',
        detonador: 'Google Ads (Búsqueda y PMax)',
        leadsTotales: 49,
        leadsDatosReales: 34,
        mostroInteres: 26,
        leadsVivos: 22,
        visitas: 9,
        habloOferta: 5,
        ofertas: 2,
        ventas: 1,
        principalFuga: '% asistencia',
        inversion: 21000,
        tipoDetonador: 'google_ads'
      },
      {
        id: 'r-m6',
        detonador: 'StackAdapt (Display Geo-Audience)',
        leadsTotales: 24,
        leadsDatosReales: 14,
        mostroInteres: 9,
        leadsVivos: 8,
        visitas: 3,
        habloOferta: 1,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés en oferta',
        inversion: 12500,
        tipoDetonador: 'stackadapt'
      }
    ],
    webMetrics: {
      bounceRate: 39.4,
      avgTimeSeconds: 58,
      qualifiedTrafficPercent: 60.6,
      qualifiedTrafficVisits: 3840,
      qualifiedAvgTimeSeconds: 132,
      totalSessions: 6330,
      events: {
        whatsappClicks: 164,
        phoneClicks: 58,
        formSubmits: 117,
        thankYouPageViews: 117,
        brochureDownloads: 275
      },
      channelTraffic: [
        { channel: 'Google Search & PMax', sessions: 2450, qualifiedSessions: 1690, bounceRate: 31.0, avgDurationSec: 96, eventsCompleted: 182 },
        { channel: 'Meta Ads (FB/IG)', sessions: 2200, qualifiedSessions: 1210, bounceRate: 45.0, avgDurationSec: 44, eventsCompleted: 98 },
        { channel: 'StackAdapt Programmatic', sessions: 1150, qualifiedSessions: 620, bounceRate: 46.1, avgDurationSec: 40, eventsCompleted: 34 },
        { channel: 'Orgánico & Directo', sessions: 530, qualifiedSessions: 320, bounceRate: 39.6, avgDurationSec: 72, eventsCompleted: 26 }
      ]
    },
    syncData: {
      meta: {
        platform: 'meta',
        name: 'Meta Ads (Facebook & Instagram)',
        account: 'act_2043417892891975',
        connected: true,
        lastSynced: 'Hace 8 minutos',
        spend: 30700,
        impressions: 215400,
        clicks: 5890,
        leadsReported: 94,
        metaForms: 58,
        whatsappMessages: 36,
        webConversions: 0,
        details: 'Sincronizado vía Graph API'
      },
      googleAds: {
        platform: 'google_ads',
        name: 'Google Ads (Search, Display & Maps)',
        account: '171-833-1328',
        connected: true,
        lastSynced: 'Hace 15 minutos',
        spend: 21000,
        impressions: 138000,
        clicks: 3920,
        leadsReported: 49,
        webConversions: 49,
        details: 'Campañas Búsqueda y PMax activas'
      },
      stackAdapt: {
        platform: 'stackadapt',
        name: 'StackAdapt Programmatic DSP',
        account: 'ID: 268858',
        connected: true,
        lastSynced: 'Hace 20 minutos',
        spend: 12500,
        impressions: 240000,
        clicks: 1850,
        leadsReported: 24,
        webConversions: 24,
        details: 'Campañas de geolocalización Chapultepec'
      }
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'period-bimestral-jul-ago',
    periodType: 'bimonthly',
    periodLabel: 'Bimestre: Julio - Agosto 2026',
    dateRange: '01 Jul 2026 - 31 Ago 2026',
    projectName: 'Epika Chapultepec',
    rows: [
      {
        id: 'r-b1',
        detonador: 'Pagina Web (Epika.mx)',
        leadsTotales: 132,
        leadsDatosReales: 72,
        mostroInteres: 46,
        leadsVivos: 38,
        visitas: 16,
        habloOferta: 8,
        ofertas: 4,
        ventas: 2,
        principalFuga: '% asistencia',
        inversion: 36000,
        tipoDetonador: 'web_form'
      },
      {
        id: 'r-b2',
        detonador: 'Facebook Ads',
        leadsTotales: 114,
        leadsDatosReales: 46,
        mostroInteres: 30,
        leadsVivos: 24,
        visitas: 9,
        habloOferta: 3,
        ofertas: 1,
        ventas: 1,
        principalFuga: '% calidad de datos',
        inversion: 34500,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-b3',
        detonador: 'Instagram Ads',
        leadsTotales: 76,
        leadsDatosReales: 38,
        mostroInteres: 16,
        leadsVivos: 12,
        visitas: 5,
        habloOferta: 2,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés inicial',
        inversion: 26000,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-b4',
        detonador: 'Señalizacion / Punto de Venta',
        leadsTotales: 50,
        leadsDatosReales: 50,
        mostroInteres: 42,
        leadsVivos: 39,
        visitas: 27,
        habloOferta: 14,
        ofertas: 6,
        ventas: 2,
        principalFuga: '% interés en oferta',
        inversion: 12000,
        tipoDetonador: 'showroom'
      },
      {
        id: 'r-b5',
        detonador: 'Google Ads (Búsqueda y PMax)',
        leadsTotales: 96,
        leadsDatosReales: 66,
        mostroInteres: 50,
        leadsVivos: 43,
        visitas: 18,
        habloOferta: 10,
        ofertas: 5,
        ventas: 2,
        principalFuga: '% asistencia',
        inversion: 41000,
        tipoDetonador: 'google_ads'
      },
      {
        id: 'r-b6',
        detonador: 'StackAdapt (Programática)',
        leadsTotales: 46,
        leadsDatosReales: 28,
        mostroInteres: 18,
        leadsVivos: 15,
        visitas: 6,
        habloOferta: 2,
        ofertas: 1,
        ventas: 0,
        principalFuga: '% interés en oferta',
        inversion: 24000,
        tipoDetonador: 'stackadapt'
      }
    ],
    webMetrics: {
      bounceRate: 40.1,
      avgTimeSeconds: 56,
      qualifiedTrafficPercent: 59.9,
      qualifiedTrafficVisits: 7420,
      qualifiedAvgTimeSeconds: 128,
      totalSessions: 12380,
      events: {
        whatsappClicks: 318,
        phoneClicks: 112,
        formSubmits: 228,
        thankYouPageViews: 228,
        brochureDownloads: 540
      },
      channelTraffic: [
        { channel: 'Google Search & PMax', sessions: 4800, qualifiedSessions: 3310, bounceRate: 31.0, avgDurationSec: 94, eventsCompleted: 350 },
        { channel: 'Meta Ads (FB/IG)', sessions: 4300, qualifiedSessions: 2360, bounceRate: 45.1, avgDurationSec: 45, eventsCompleted: 190 },
        { channel: 'StackAdapt Programmatic', sessions: 2250, qualifiedSessions: 1210, bounceRate: 46.2, avgDurationSec: 41, eventsCompleted: 72 },
        { channel: 'Orgánico & Directo', sessions: 1030, qualifiedSessions: 540, bounceRate: 47.5, avgDurationSec: 62, eventsCompleted: 48 }
      ]
    },
    syncData: {
      meta: {
        platform: 'meta',
        name: 'Meta Ads (Facebook & Instagram)',
        account: 'act_2043417892891975',
        connected: true,
        lastSynced: 'Hace 10 minutos',
        spend: 60500,
        impressions: 420000,
        clicks: 11600,
        leadsReported: 190,
        metaForms: 118,
        whatsappMessages: 72,
        webConversions: 0
      },
      googleAds: {
        platform: 'google_ads',
        name: 'Google Ads (Search, Display & Maps)',
        account: '171-833-1328',
        connected: true,
        lastSynced: 'Hace 15 minutos',
        spend: 41000,
        impressions: 270000,
        clicks: 7600,
        leadsReported: 96,
        webConversions: 96
      },
      stackAdapt: {
        platform: 'stackadapt',
        name: 'StackAdapt Programmatic DSP',
        account: 'ID: 268858',
        connected: true,
        lastSynced: 'Hace 25 minutos',
        spend: 24000,
        impressions: 470000,
        clicks: 3600,
        leadsReported: 46,
        webConversions: 46
      }
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'period-anual-2026',
    periodType: 'yearly',
    periodLabel: 'Año 2026 (YTD)',
    dateRange: '01 Ene 2026 - 31 Dic 2026',
    projectName: 'Epika Chapultepec',
    rows: [
      {
        id: 'r-y1',
        detonador: 'Pagina Web (Epika.mx)',
        leadsTotales: 520,
        leadsDatosReales: 290,
        mostroInteres: 180,
        leadsVivos: 148,
        visitas: 64,
        habloOferta: 32,
        ofertas: 16,
        ventas: 8,
        principalFuga: '% asistencia',
        inversion: 142000,
        tipoDetonador: 'web_form'
      },
      {
        id: 'r-y2',
        detonador: 'Facebook Ads',
        leadsTotales: 460,
        leadsDatosReales: 180,
        mostroInteres: 118,
        leadsVivos: 94,
        visitas: 36,
        habloOferta: 14,
        ofertas: 6,
        ventas: 3,
        principalFuga: '% calidad de datos',
        inversion: 136000,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-y3',
        detonador: 'Instagram Ads',
        leadsTotales: 310,
        leadsDatosReales: 155,
        mostroInteres: 66,
        leadsVivos: 48,
        visitas: 20,
        habloOferta: 8,
        ofertas: 2,
        ventas: 1,
        principalFuga: '% interés inicial',
        inversion: 104000,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-y4',
        detonador: 'Señalizacion / Punto de Venta',
        leadsTotales: 195,
        leadsDatosReales: 195,
        mostroInteres: 164,
        leadsVivos: 150,
        visitas: 108,
        habloOferta: 56,
        ofertas: 24,
        ventas: 9,
        principalFuga: '% interés en oferta',
        inversion: 48000,
        tipoDetonador: 'showroom'
      },
      {
        id: 'r-y5',
        detonador: 'Google Ads (Búsqueda y PMax)',
        leadsTotales: 380,
        leadsDatosReales: 260,
        mostroInteres: 196,
        leadsVivos: 168,
        visitas: 72,
        habloOferta: 38,
        ofertas: 19,
        ventas: 9,
        principalFuga: '% asistencia',
        inversion: 162000,
        tipoDetonador: 'google_ads'
      },
      {
        id: 'r-y6',
        detonador: 'StackAdapt (Programática)',
        leadsTotales: 185,
        leadsDatosReales: 110,
        mostroInteres: 72,
        leadsVivos: 60,
        visitas: 24,
        habloOferta: 8,
        ofertas: 4,
        ventas: 1,
        principalFuga: '% interés en oferta',
        inversion: 96000,
        tipoDetonador: 'stackadapt'
      }
    ],
    webMetrics: {
      bounceRate: 38.6,
      avgTimeSeconds: 62,
      qualifiedTrafficPercent: 61.4,
      qualifiedTrafficVisits: 29800,
      qualifiedAvgTimeSeconds: 135,
      totalSessions: 48500,
      events: {
        whatsappClicks: 1280,
        phoneClicks: 445,
        formSubmits: 900,
        thankYouPageViews: 900,
        brochureDownloads: 2150
      },
      channelTraffic: [
        { channel: 'Google Search & PMax', sessions: 19200, qualifiedSessions: 13440, bounceRate: 30.0, avgDurationSec: 98, eventsCompleted: 1420 },
        { channel: 'Meta Ads (FB/IG)', sessions: 16800, qualifiedSessions: 9400, bounceRate: 44.0, avgDurationSec: 46, eventsCompleted: 760 },
        { channel: 'StackAdapt Programmatic', sessions: 8500, qualifiedSessions: 4670, bounceRate: 45.0, avgDurationSec: 42, eventsCompleted: 290 },
        { channel: 'Orgánico & Directo', sessions: 4000, qualifiedSessions: 2290, bounceRate: 42.7, avgDurationSec: 68, eventsCompleted: 205 }
      ]
    },
    syncData: {
      meta: {
        platform: 'meta',
        name: 'Meta Ads (Facebook & Instagram)',
        account: 'act_2043417892891975',
        connected: true,
        lastSynced: 'Hace 30 minutos',
        spend: 240000,
        impressions: 1680000,
        clicks: 45600,
        leadsReported: 770,
        metaForms: 470,
        whatsappMessages: 300,
        webConversions: 0
      },
      googleAds: {
        platform: 'google_ads',
        name: 'Google Ads (Search, Display & Maps)',
        account: '171-833-1328',
        connected: true,
        lastSynced: 'Hace 45 minutos',
        spend: 162000,
        impressions: 1080000,
        clicks: 30400,
        leadsReported: 380,
        webConversions: 380
      },
      stackAdapt: {
        platform: 'stackadapt',
        name: 'StackAdapt Programmatic DSP',
        account: 'ID: 268858',
        connected: true,
        lastSynced: 'Hace 1 hora',
        spend: 96000,
        impressions: 1850000,
        clicks: 14200,
        leadsReported: 185,
        webConversions: 185
      }
    },
    updatedAt: new Date().toISOString()
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
