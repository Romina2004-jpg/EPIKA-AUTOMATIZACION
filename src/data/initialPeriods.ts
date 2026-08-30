import { FunnelPeriod } from '../types';

export const INITIAL_PERIODS: FunnelPeriod[] = [
  {
    id: 'period-semana-actual',
    periodType: 'weekly',
    periodLabel: 'Del 3 al 9 de Agosto (Semanal)',
    dateRange: '03 Ago 2026 - 09 Ago 2026',
    startDate: '2026-08-03',
    endDate: '2026-08-09',
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
        detonador: 'Meta Ads - [BH] LEADS (Formularios)',
        leadsTotales: 13,
        leadsDatosReales: 6,
        mostroInteres: 4,
        leadsVivos: 3,
        visitas: 1,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% asistencia',
        inversion: 12500,
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-3',
        detonador: 'Meta Ads - [BH] WA (WhatsApp)',
        leadsTotales: 18,
        leadsDatosReales: 9,
        mostroInteres: 5,
        leadsVivos: 4,
        visitas: 1,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés inicial',
        inversion: 7938.37,
        tipoDetonador: 'whatsapp'
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
        leadsTotales: 2,
        leadsDatosReales: 2,
        mostroInteres: 1,
        leadsVivos: 1,
        visitas: 0,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés inicial',
        inversion: 4850,
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
      thankYouSources: [
        { source: 'ADS GOOGLE', count: 12, percentage: 42.9, color: '#D4F634', details: 'Búsqueda, Maps & PMax' },
        { source: 'ADS META', count: 8, percentage: 28.6, color: '#1877F2', details: 'Facebook & Instagram Lead Ads' },
        { source: 'STACKADAPT', count: 2, percentage: 7.1, color: '#A855F7', details: 'Programática Nativa & Display' },
        { source: 'ORGÁNICO / DIRECTO / OTROS', count: 6, percentage: 21.4, color: '#10B981', details: 'Tráfico directo y referencias' }
      ],
      channelTraffic: [
        { channel: 'Meta Ads (FB/IG)', sessions: 620, qualifiedSessions: 345, bounceRate: 44.3, avgDurationSec: 46, eventsCompleted: 21 },
        { channel: 'Google Search & PMax', sessions: 480, qualifiedSessions: 320, bounceRate: 33.3, avgDurationSec: 88, eventsCompleted: 35 },
        { channel: 'StackAdapt Programmatic', sessions: 210, qualifiedSessions: 115, bounceRate: 45.2, avgDurationSec: 41, eventsCompleted: 2 },
        { channel: 'Orgánico & Directo (Epika.mx)', sessions: 128, qualifiedSessions: 60, bounceRate: 53.1, avgDurationSec: 34, eventsCompleted: 6 }
      ]
    },
    syncData: {
      meta: {
        platform: 'meta',
        name: 'Meta Ads (Epika Ads 2)',
        account: 'act_2043417892891975',
        connected: true,
        lastSynced: 'En vivo (03 Ago - 09 Ago)',
        spend: 20438.37,
        impressions: 95720,
        reach: 61542,
        clicks: 2775,
        leadsReported: 21,
        metaForms: 21,
        whatsappMessages: 0,
        webConversions: 0,
        details: 'Campaña: Agosto 2026 - Leads ($20,438.37 gastado / 21 leads a $973.26 c/u). Nuevas activas: [BH] WA 2026 - Agosto y [BH] LEADS 2026 - Agosto'
      },
      googleAds: {
        platform: 'google_ads',
        name: 'Google Ads (Épika Chapultepec)',
        account: '453-930-3033',
        connected: true,
        lastSynced: 'En vivo (03 Ago - 09 Ago)',
        spend: 12850.00,
        impressions: 74200,
        clicks: 1520,
        leadsReported: 22,
        webConversions: 22,
        details: 'Campaña Search & Display activa (453-930-3033)'
      },
      stackAdapt: {
        platform: 'stackadapt',
        name: 'StackAdapt Programmatic DSP',
        account: 'ID: 41799',
        connected: true,
        lastSynced: 'En vivo vía GraphQL',
        spend: 4850,
        impressions: 42000,
        clicks: 450,
        leadsReported: 2,
        webConversions: 2,
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
    startDate: '2026-08-01',
    endDate: '2026-08-31',
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
        detonador: 'Meta Ads - [BH] LEADS (Formularios)',
        leadsTotales: 93,
        leadsDatosReales: 48,
        mostroInteres: 30,
        leadsVivos: 24,
        visitas: 8,
        habloOferta: 2,
        ofertas: 1,
        ventas: 1,
        principalFuga: '% calidad de datos',
        inversion: 45808.85, // $42,460.38 (Leads Ago) + $3,348.47 (Leads Foráneos)
        tipoDetonador: 'meta_forms'
      },
      {
        id: 'r-m3',
        detonador: 'Meta Ads - [BH] WA (WhatsApp CBO)',
        leadsTotales: 140,
        leadsDatosReales: 68,
        mostroInteres: 38,
        leadsVivos: 30,
        visitas: 10,
        habloOferta: 4,
        ofertas: 1,
        ventas: 0,
        principalFuga: '% interés inicial',
        inversion: 13136.50, // $13,136.50 [BH] WA - Agosto
        tipoDetonador: 'whatsapp'
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
        detonador: 'Google Ads (Search, Display & Youtube)',
        leadsTotales: 58,
        leadsDatosReales: 48,
        mostroInteres: 38,
        leadsVivos: 32,
        visitas: 12,
        habloOferta: 8,
        ofertas: 4,
        ventas: 1,
        principalFuga: '% asistencia',
        inversion: 37691.25,
        tipoDetonador: 'google_ads'
      },
      {
        id: 'r-m6',
        detonador: 'StackAdapt DSP (Nativo, Display & Video)',
        leadsTotales: 7,
        leadsDatosReales: 5,
        mostroInteres: 3,
        leadsVivos: 3,
        visitas: 1,
        habloOferta: 0,
        ofertas: 0,
        ventas: 0,
        principalFuga: '% interés en oferta',
        inversion: 21210.73,
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
      thankYouSources: [
        { source: 'ADS GOOGLE', count: 52, percentage: 44.4, color: '#D4F634', details: 'Búsqueda, Maps & PMax' },
        { source: 'ADS META', count: 36, percentage: 30.8, color: '#1877F2', details: 'Facebook & Instagram Lead Ads' },
        { source: 'STACKADAPT', count: 7, percentage: 6.0, color: '#A855F7', details: 'Programática Nativa & Display' },
        { source: 'ORGÁNICO / DIRECTO / OTROS', count: 22, percentage: 18.8, color: '#10B981', details: 'Tráfico directo y referencias' }
      ],
      channelTraffic: [
        { channel: 'Google Search & PMax', sessions: 2450, qualifiedSessions: 1690, bounceRate: 31.0, avgDurationSec: 96, eventsCompleted: 182 },
        { channel: 'Meta Ads (FB/IG)', sessions: 2200, qualifiedSessions: 1210, bounceRate: 45.0, avgDurationSec: 44, eventsCompleted: 98 },
        { channel: 'StackAdapt Programmatic', sessions: 1150, qualifiedSessions: 620, bounceRate: 46.1, avgDurationSec: 40, eventsCompleted: 7 },
        { channel: 'Orgánico & Directo', sessions: 530, qualifiedSessions: 320, bounceRate: 39.6, avgDurationSec: 72, eventsCompleted: 26 }
      ]
    },
    syncData: {
      meta: {
        platform: 'meta',
        name: 'Meta Ads (Facebook & Instagram)',
        account: 'act_2043417892891975',
        connected: true,
        lastSynced: 'En vivo desde Meta Ads Manager',
        spend: 58945.35, // $42,460.38 (Leads Ago) + $3,348.47 (Leads Foráneos) + $13,136.50 (WA)
        impressions: 262700,
        clicks: 5430,
        leadsReported: 233,
        metaForms: 93,
        whatsappMessages: 140,
        webConversions: 0,
        details: 'Cuenta act_2043417892891975: $42,460.38 Leads Ago + $3,348.47 Foráneos + $13,136.50 WA'
      },
      googleAds: {
        platform: 'google_ads',
        name: 'Google Ads (Épika Chapultepec)',
        account: '453-930-3033',
        connected: true,
        lastSynced: 'En vivo (Agosto 2026)',
        spend: 37691.25,
        impressions: 1204536,
        clicks: 92524,
        leadsReported: 58,
        webConversions: 58,
        details: 'Cuenta 453-930-3033: 92.5 mil clics, 1.20 M impresiones, $37,691.25 coste, CPC $0.41'
      },
      stackAdapt: {
        platform: 'stackadapt',
        name: 'StackAdapt Programmatic DSP',
        account: 'ID: 268858',
        connected: true,
        lastSynced: 'En vivo vía GraphQL',
        spend: 21210.73,
        impressions: 183353,
        clicks: 1960,
        leadsReported: 7,
        webConversions: 7,
        details: '7 Conversiones oficiales (3 Nativo + 3 Display + 1 Video)'
      }
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'period-bimestral-jul-ago',
    periodType: 'bimonthly',
    periodLabel: 'Bimestre: Julio - Agosto 2026',
    dateRange: '01 Jul 2026 - 31 Ago 2026',
    startDate: '2026-07-01',
    endDate: '2026-08-31',
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
        name: 'Google Ads (Épika Chapultepec)',
        account: '453-930-3033',
        connected: true,
        lastSynced: 'En vivo (Bimestre Jul-Ago)',
        spend: 98400.00,
        impressions: 590000,
        clicks: 12100,
        leadsReported: 165,
        webConversions: 165,
        details: 'Consolidado Bimestral Google Ads (453-930-3033)'
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
    startDate: '2026-01-01',
    endDate: '2026-12-31',
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
        name: 'Google Ads (Épika Chapultepec)',
        account: '453-930-3033',
        connected: true,
        lastSynced: 'Consolidado Anual YTD',
        spend: 340000.00,
        impressions: 2150000,
        clicks: 44200,
        leadsReported: 580,
        webConversions: 580,
        details: 'Histórico Anual Google Ads (453-930-3033)'
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
      totalSessions: Math.max(100, Math.round(baseMonthly.webMetrics.totalSessions * ratio)),
      qualifiedTrafficVisits: Math.max(50, Math.round(baseMonthly.webMetrics.qualifiedTrafficVisits * ratio)),
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
