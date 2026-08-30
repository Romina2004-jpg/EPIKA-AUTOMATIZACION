/**
 * Types and interfaces for Epika Chapultepec Marketing Analytics & Commercial Funnel Dashboard
 */

export type PeriodType = 'monthly' | 'bimonthly' | 'yearly' | 'custom' | 'weekly' | 'annual';
export type FunnelType = PeriodType;

export interface FunnelRow {
  id: string;
  detonador: string; // 'Pagina Web' | 'Facebook' | 'Instagram' | 'Señalizacion/Punto de Venta' | 'Google Ads' | 'StackAdapt' | etc.
  leadsTotales: number;
  leadsDatosReales: number;
  mostroInteres: number;
  leadsVivos: number;
  visitas: number;
  habloOferta: number;
  ofertas: number;
  ventas: number;
  principalFuga: string; // e.g. '% asistencia', '% interés inicial', '% interés en oferta'
  inversion: number; // gasto en pesos MXN
  tipoDetonador?: 'meta_forms' | 'whatsapp' | 'web_form' | 'stackadapt' | 'google_ads' | 'showroom' | 'other';
  // Meta specific metrics
  mensajesIniciados?: number;
  mensajesConcretados?: number;
}

export interface FunnelCalculations {
  // Totals
  totalLeads: number;
  totalLeadsReales: number;
  totalMostroInteres: number;
  totalLeadsVivos: number;
  totalVisitas: number;
  totalHabloOferta: number;
  totalOfertas: number;
  totalVentas: number;
  totalInversion: number;

  // Meta specific aggregated messages
  totalMensajesIniciadosMeta: number; // Conversaciones de mensajería iniciadas (métrica oficial de campaña Meta)
  totalMensajesConcretadosMeta: number; // Mensajes donde el prospecto respondió y compartió datos reales
  pctMensajesConcretadosMeta: number; // Tasa de concreción de conversaciones Meta
  costoPorConversacionIniciadaMeta: number; // Inversión Meta / Conversaciones Iniciadas Meta

  // % Conversión vs Etapa Anterior
  pctCalidadDatos: number; // leadsDatosReales / leadsTotales
  pctInteresInicial: number; // mostroInteres / leadsDatosReales
  pctLeadsVivos: number; // leadsVivos / mostroInteres
  pctAsistencia: number; // visitas / leadsVivos
  pctInteresOferta: number; // habloOferta / visitas
  pctOferta: number; // ofertas / habloOferta
  pctCierreOferta: number; // ventas / ofertas

  // % Conversión Acumulada (vs leads totales o leads calificados)
  pctAcumuladoLeadsReales: number;
  pctAcumuladoInteres: number;
  pctAcumuladoVivos: number;
  pctAcumuladoVisitas: number;
  pctAcumuladoHabloOferta: number;
  pctAcumuladoOfertas: number;
  pctAcumuladoVentas: number;

  // Marketing Unit Economics
  cplReportado: number; // Inversión total / Leads totales
  cplReal: number; // Inversión total / Leads datos reales
  costoPorCita: number; // Inversión total / Visitas
  cac: number; // Inversión total / Ventas
  leadsReportadosPorVenta: number; // Leads totales / Ventas (o null si 0)
  leadsRealesPorVenta: number; // Leads reales / Ventas (o null si 0)
  visitasPorVenta: number; // Visitas / Ventas
}

export interface WebBehaviorMetrics {
  bounceRate: number; // e.g. 41.8%
  avgTimeSeconds: number; // e.g. 52 seconds
  qualifiedTrafficPercent: number; // % of visits > 20s (e.g. 58.4%)
  qualifiedTrafficVisits: number; // e.g. 840
  qualifiedAvgTimeSeconds: number; // Average time of non-bounced/qualified users (e.g. 124 seconds)
  totalSessions: number;
  events: {
    whatsappClicks: number;
    phoneClicks: number;
    formSubmits: number;
    thankYouPageViews: number; // Seccion "Gracias"
    brochureDownloads: number;
  };
  thankYouSources?: {
    source: string; // e.g. 'ADS GOOGLE (Search & Maps)', 'ADS META (FB / IG)', 'STACKADAPT (DSP Programática)', 'ORGÁNICO / DIRECTO / OTRO MEDIO'
    count: number;
    percentage: number;
    color?: string;
    details?: string;
  }[];
  channelTraffic: {
    channel: string;
    sessions: number;
    qualifiedSessions: number;
    bounceRate: number;
    avgDurationSec: number;
    eventsCompleted: number;
  }[];
}

export interface AdPlatformSyncStatus {
  platform: 'meta' | 'google_ads' | 'stackadapt';
  name?: string;
  account?: string;
  connected?: boolean;
  isConnected?: boolean;
  status?: 'healthy' | 'warning' | 'error';
  lastSynced: string;
  spend?: number;
  impressions?: number;
  reach?: number;
  clicks?: number;
  leadsReported?: number;
  recordsImported?: number;
  metaForms?: number;
  whatsappMessages?: number;
  conversacionesIniciadas?: number;
  costPerMessagingConversation?: number;
  mensajesConcretados?: number;
  webConversions?: number;
  details?: string;
}

export interface FunnelHistoryEntry {
  id: string;
  timestamp: string;
  periodId: string;
  periodLabel: string;
  savedBy: string;
  note?: string;
  snapshot: {
    totalLeads: number;
    totalLeadsReales: number;
    totalVisitas: number;
    totalOfertas: number;
    totalVentas: number;
    totalInversion: number;
    totalMensajesConcretadosMeta: number;
    cac: number;
    rowsCount: number;
  };
  rows: FunnelRow[];
}

export interface FunnelPeriod {
  id: string;
  periodType: PeriodType;
  periodLabel: string; // e.g. 'Del 3 al 9 de Agosto' or 'Agosto 2026'
  dateRange: string;
  startDate?: string; // ISO date 'YYYY-MM-DD'
  endDate?: string; // ISO date 'YYYY-MM-DD'
  projectName?: string; // 'Epika Chapultepec'
  rows: FunnelRow[];
  webMetrics: WebBehaviorMetrics;
  syncData?: {
    meta?: AdPlatformSyncStatus;
    googleAds?: AdPlatformSyncStatus;
    stackAdapt?: AdPlatformSyncStatus;
  };
  updatedAt?: string;
  history?: FunnelHistoryEntry[];
}

export interface AiMarketingInsight {
  summary: string;
  mainBottleneck: string;
  cacDiagnosis: string;
  channelRecommendations: {
    channel: string;
    action: 'increase' | 'maintain' | 'optimize' | 'reduce';
    reason: string;
    budgetAdjustmentPct: number;
  }[];
  conversionImprovementPlan: string[];
  projectedImpact: string;
}
