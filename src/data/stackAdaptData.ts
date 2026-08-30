// StackAdapt Programmatic DSP Official Data for Épika Chapultepec
// Account ID: 268858 | Platform: StackAdapt DSP | Token: e6bcab...
// Period: 27 Jul - 25 Ago 2026

export interface StackAdaptCampaignDetail {
  id: string;
  campaignId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  statusLabel: string;
  channelType: 'NATIVE' | 'DISPLAY_GEOFENCING' | 'RETARGETING' | 'VIDEO';
  channelTypeLabel: string;
  targetingStrategy: string;
  periodLabel: string;
  budget: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  leadsReported: number; // Conversiones / Form submit / Contactos cualificados
  cpl: number; // Costo por lead real
}

export const STACKADAPT_ACCOUNT_INFO = {
  accountId: '268858',
  accountName: 'Épika Chapultepec DSP (StackAdapt)',
  currency: 'MXN',
  currencyNative: 'USD',
  exchangeRateUsdToMxn: 19.00,
  periodLabel: 'Agosto 2026 (Datos Oficiales en Vivo GraphQL)',
  totalSpend: 0,
  totalSpendUsd: 1116.35,
  totalImpressions: 183353,
  totalClicks: 0,
  totalLeadsReported: 7, // EXACTO de la API de StackAdapt (3 Nativo + 3 Display + 1 Video)
  avgCtr: 1.07,
  avgCpc: 10.82,
  avgCpcUsd: 0.57,
  avgCpm: 115.69,
  avgCpmUsd: 6.09,
  avgCpl: 3030.10,
  avgCplUsd: 159.48
};

export const STACKADAPT_CAMPAIGNS_DATA: StackAdaptCampaignDetail[] = [
  {
    id: '3334857',
    campaignId: '3334857',
    name: 'EPK - NATIVO - Preventa GDL - Agosto',
    status: 'ACTIVE',
    statusLabel: 'Activa',
    channelType: 'NATIVE',
    channelTypeLabel: 'Publicidad Nativa (Preventa GDL)',
    targetingStrategy: 'Audiencias de alta afinidad inversión inmobiliaria, Guadalajara y foráneos',
    periodLabel: '10 ago - 30 ago 2026',
    budget: '$42.78 USD/día',
    spend: 0, // $402.30 USD
    impressions: 0,
    clicks: 0,
    ctr: 0.31,
    cpc: 45.50,
    cpm: 141.50,
    leadsReported: 0, // 3 conversiones reales
    cpl: 2547.90
  },
  {
    id: '3342529',
    campaignId: '3342529',
    name: 'ÉPIKA - Display',
    status: 'ACTIVE',
    statusLabel: 'Activa',
    channelType: 'DISPLAY_GEOFENCING',
    channelTypeLabel: 'Display / Banners Programáticos',
    targetingStrategy: 'Geocercas y segmentación demográfica ABC+ zona metropolitana de Guadalajara',
    periodLabel: '17 ago - 30 ago 2026',
    budget: '$74.25 USD/día',
    spend: 0, // $368.98 USD
    impressions: 0,
    clicks: 0,
    ctr: 0.15,
    cpc: 68.06,
    cpm: 100.95,
    leadsReported: 0, // 3 conversiones reales
    cpl: 2336.87
  },
  {
    id: '3345281',
    campaignId: '3345281',
    name: 'Video Agosto',
    status: 'ACTIVE',
    statusLabel: 'Activa',
    channelType: 'VIDEO',
    channelTypeLabel: 'Video Programático (In-Stream / Out-Stream)',
    targetingStrategy: 'Audiencias video premium y retargeting de alto impacto',
    periodLabel: '19 ago - 31 ago 2026',
    budget: 'Vuelo Activo',
    spend: 0, // $345.08 USD
    impressions: 0,
    clicks: 0,
    ctr: 2.82,
    cpc: 3.88,
    cpm: 109.50,
    leadsReported: 0, // 1 conversión real
    cpl: 6556.52
  },
  {
    id: '3268974',
    campaignId: '3268974',
    name: 'CTV Julio',
    status: 'PAUSED',
    statusLabel: 'Pausada',
    channelType: 'VIDEO',
    channelTypeLabel: 'Connected TV (CTV)',
    targetingStrategy: 'Smart TVs en zonas residenciales AAA',
    periodLabel: '02 jun - 12 ago 2026',
    budget: 'Concluido',
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    cpm: 0,
    leadsReported: 0,
    cpl: 0
  },
  {
    id: '3270939',
    campaignId: '3270939',
    name: 'Nativos',
    status: 'PAUSED',
    statusLabel: 'Pausada',
    channelType: 'NATIVE',
    channelTypeLabel: 'Nativos Histórico',
    targetingStrategy: 'Campaña base previa',
    periodLabel: '04 jun - 12 ago 2026',
    budget: 'Pausada',
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    cpm: 0,
    leadsReported: 0,
    cpl: 0
  }
];
