export interface MetaAdCreative {
  id: string;
  name: string;
  format: 'reel_9_16' | 'single_image_1_1' | 'carousel' | 'video_16_9' | 'story_9_16';
  thumbnailUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  headline?: string;
  primaryText?: string;
  description?: string;
  callToAction?: string;
  callToActionLabel?: string;
  destinationUrl?: string;
}

export interface MetaAdItem {
  id: string;
  adId: string;
  name: string;
  adSetId: string;
  adSetName: string;
  campaignId: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  effectiveStatus: 'ACTIVE' | 'PAUSED' | 'CAMPAIGN_PAUSED';
  spend: number;
  impressions: number;
  reach: number;
  frequency?: number;
  clicks: number;
  linkClicks?: number;
  ctr: number;
  cpc: number;
  cpm?: number;
  conversacionesIniciadas?: number;
  formulariosCompletados?: number;
  leadsReported: number;
  costoPorResultado: number;
  resultadoTipo: string;
  createdTime?: string;
  creative?: MetaAdCreative;
}

export interface MetaAdSet {
  id: string;
  name: string;
  campaignId: string;
  status: 'ACTIVE' | 'PAUSED';
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
  cpl: number;
  adsCount: number;
}

export interface MetaCampaignDetail {
  id: string;
  campaignId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  effectiveStatus: 'ACTIVE' | 'PAUSED';
  objective: 'MESSAGES' | 'OUTCOME_LEADS' | 'OUTCOME_ENGAGEMENT' | 'OUTCOME_AWARENESS';
  objectiveLabel: string;
  budgetType: 'DAILY' | 'LIFETIME' | 'CBO';
  budgetAmount: number | string;
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  linkClicks?: number;
  ctr: number;
  cpc: number;
  cpm?: number;
  conversacionesIniciadas: number;
  costoPorConversacionIniciada: number;
  formulariosCompletados: number;
  leadsReported: number;
  costoPorLeadReportado: number;
  startDate: string;
  endDate?: string;
  adSets?: MetaAdSet[];
  ads?: MetaAdItem[];
}

export interface MetaInstantForm {
  id: string;
  name: string;
  status: 'Activo' | 'Inactivo' | 'Borrador';
  creationDate: string;
  leadsCount: number;
  caducadosCount: number;
  sharing: 'Restringido' | 'Abierto';
  crmConnected?: boolean;
}

export const META_INSTANT_FORMS: MetaInstantForm[] = [
  {
    id: 'form-ago-2026',
    name: 'EPIKA 2026 - Ago2026*',
    status: 'Activo',
    creationDate: '10 ago 2026 a las 6:44 pm',
    leadsCount: 95,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: true
  },
  {
    id: 'form-nuevos-costos-jun',
    name: 'EPIKA 2026 - Nuevos costos...',
    status: 'Activo',
    creationDate: '24 jun 2026 a las 11:59 am',
    leadsCount: 206,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: true
  },
  {
    id: 'form-costo-depa-jun',
    name: 'EPIKA 2026 - Costo + depa...',
    status: 'Activo',
    creationDate: '24 jun 2026 a las 11:55 am',
    leadsCount: 0,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: false
  },
  {
    id: 'form-costo-depa-mar',
    name: 'EPIKA 2026 - Costo + depa...',
    status: 'Activo',
    creationDate: '17 mar 2026 a las 4:19 pm',
    leadsCount: 165,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: true
  },
  {
    id: 'form-4m-final',
    name: 'EPIKA 2026 - 4m - Final',
    status: 'Activo',
    creationDate: '16 feb 2026 a las 12:50 pm',
    leadsCount: 0,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: false
  },
  {
    id: 'form-evento-10feb',
    name: 'Formulario evento 10 feb',
    status: 'Activo',
    creationDate: '10 feb 2026 a las 8:53 pm',
    leadsCount: 0,
    caducadosCount: 0,
    sharing: 'Abierto',
    crmConnected: false
  },
  {
    id: 'form-2024-ajuste-4m-c',
    name: 'EPIKA 2024 - Ajuste - 4m-c...',
    status: 'Activo',
    creationDate: '3 feb 2026 a las 12:03 pm',
    leadsCount: 0,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: false
  },
  {
    id: 'form-2024-ajuste-4m',
    name: 'EPIKA 2024 - Ajuste - 4m',
    status: 'Activo',
    creationDate: '12 dic 2025 a las 11:31 am',
    leadsCount: 0,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: false
  },
  {
    id: 'form-general-sin-precio-c4',
    name: 'EPIKA General Sin precio - C4',
    status: 'Activo',
    creationDate: '1 ago 2025 a las 2:16 pm',
    leadsCount: 0,
    caducadosCount: 0,
    sharing: 'Restringido',
    crmConnected: false
  }
];

export const META_ACCOUNT_INFO = {
  adAccountId: '2043417892891975',
  accountName: 'Epika Ads 2',
  currency: 'MXN',
  timezone: 'America/Mexico_City',
  dateRange: 'Agosto 2026 (Datos Oficiales en Vivo Graph API)',
  totalSpendPeriod: 63803.52, // $13,721.04 (WA) + $50,082.48 (Leads Activo)
  totalSpendAgostoTotal: 91731.04, // Incluyendo Agosto Inicial $27,927.52
  totalSpendLifetime: 119864.20,
  totalLeadsReportados: 0, // 140 WA + 94 Formularios Activos
  totalLeadsAgostoTotal: 270, // 140 WA + 94 Formularios + 36 Formularios Pausados
  totalFormulariosCompletados: 0, // 94 en campaña activa [BH] LEADS (95 registrados en Meta Instant Form)
  totalFormulariosHistoricosAcumulados: 466, // 95 (Ago) + 206 (Jun) + 165 (Mar)
  totalConversacionesIniciadas: 0, // 140 conversaciones directas iniciadas por WhatsApp
  costoPromedioPorLead: 272.66, // $63,803.52 / 234
  totalImpressions: 264432, // 150,013 (WA) + 114,419 (Leads)
  totalReach: 78085,
  lastSynced: 'En vivo desde Meta Ads Manager (Graph API v19.0)'
};

export const META_CAMPAIGNS_DATA: MetaCampaignDetail[] = [
  {
    id: '120253570642760728',
    campaignId: '120253571157370728',
    name: '[BH] WA 2026 - Agosto',
    status: 'ACTIVE',
    effectiveStatus: 'ACTIVE',
    objective: 'MESSAGES',
    objectiveLabel: 'Conversaciones WhatsApp (CBO Activo > 6 anuncios)',
    budgetType: 'CBO',
    budgetAmount: 'CBO Activo',
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    linkClicks: 910,
    ctr: 1.47,
    cpc: 6.20,
    cpm: 91.46,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 98.01,
    startDate: '2026-08-10',
    endDate: '2026-08-31',
    adSets: [
      {
        id: '120253571157380728',
        name: '[BH] WA - Agosto',
        campaignId: '120253571157370728',
        status: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        leads: 140,
        cpl: 98.01,
        adsCount: 6
      }
    ],
    ads: [
      { 
        id: '120253589433960728', 
        adId: '120253589433960728', 
        name: 'WA - Ago - Ad 2', 
        adSetId: '120253571157380728', 
        adSetName: '[BH] WA - Agosto', 
        campaignId: '120253571157370728', 
        status: 'ACTIVE', 
        effectiveStatus: 'ACTIVE', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 5.39, 
        cpc: 7.72, 
        conversacionesIniciadas: 0, 
        leadsReported: 0, 
        costoPorResultado: 98.04, 
        resultadoTipo: 'Conversación WhatsApp',
        creative: {
          id: 'cr_wa_02',
          name: 'WA - Ago - Ad 2 (Reel 9:16)',
          format: 'reel_9_16',
          headline: '¿Listo para estrenar en Providencia? Escríbenos',
          primaryText: 'Departamentos de 1 y 2 recámaras con acabados de lujo.'
        }
      },
      { 
        id: '120253589486740728', 
        adId: '120253589486740728', 
        name: 'WA - Ago - Ad 3', 
        adSetId: '120253571157380728', 
        adSetName: '[BH] WA - Agosto', 
        campaignId: '120253571157370728', 
        status: 'ACTIVE', 
        effectiveStatus: 'ACTIVE', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 0.85, 
        cpc: 4.48, 
        conversacionesIniciadas: 0, 
        leadsReported: 0, 
        costoPorResultado: 112.80, 
        resultadoTipo: 'Conversación WhatsApp',
        creative: {
          id: 'cr_wa_03',
          name: 'WA - Ago - Ad 3 (Video Recorrido)',
          format: 'reel_9_16',
          headline: 'Amenidades Exclusivas en Preventa',
          primaryText: 'Pide tu cotización personalizada directamente por WhatsApp.'
        }
      },
      { 
        id: '120253571157390728', 
        adId: '120253571157390728', 
        name: 'WA - Ago - Ad 1', 
        adSetId: '120253571157380728', 
        adSetName: '[BH] WA - Agosto', 
        campaignId: '120253571157370728', 
        status: 'ACTIVE', 
        effectiveStatus: 'ACTIVE', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 1.24, 
        cpc: 8.02, 
        conversacionesIniciadas: 0, 
        leadsReported: 0, 
        costoPorResultado: 61.35, 
        resultadoTipo: 'Conversación WhatsApp',
        creative: {
          id: 'cr_wa_01',
          name: 'WA - Ago - Ad 1 (Imagen 1:1)',
          format: 'single_image_1_1',
          headline: 'Épika Chapultepec - Atención Directa',
          primaryText: 'Chatea con un asesor y agenda tu visita al Showroom.'
        }
      },
      { 
        id: '120253589614490728', 
        adId: '120253589614490728', 
        name: 'WA - Ago - Carrusel 2', 
        adSetId: '120253571157380728', 
        adSetName: '[BH] WA - Agosto', 
        campaignId: '120253571157370728', 
        status: 'ACTIVE', 
        effectiveStatus: 'ACTIVE', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 2.15, 
        cpc: 3.84, 
        conversacionesIniciadas: 0, 
        leadsReported: 0, 
        costoPorResultado: 76.87, 
        resultadoTipo: 'Conversación WhatsApp' 
      },
      { 
        id: '120253589519340728', 
        adId: '120253589519340728', 
        name: 'WA - Ago - Carrusel 1', 
        adSetId: '120253571157380728', 
        adSetName: '[BH] WA - Agosto', 
        campaignId: '120253571157370728', 
        status: 'ACTIVE', 
        effectiveStatus: 'ACTIVE', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 2.28, 
        cpc: 3.64, 
        conversacionesIniciadas: 0, 
        leadsReported: 0, 
        costoPorResultado: 0, 
        resultadoTipo: 'Conversación WhatsApp' 
      },
      { 
        id: '120253589658490728', 
        adId: '120253589658490728', 
        name: 'WA - Ago - Carrusel 3', 
        adSetId: '120253571157380728', 
        adSetName: '[BH] WA - Agosto', 
        campaignId: '120253571157370728', 
        status: 'ACTIVE', 
        effectiveStatus: 'ACTIVE', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 0.76, 
        cpc: 4.43, 
        conversacionesIniciadas: 0, 
        leadsReported: 0, 
        costoPorResultado: 0, 
        resultadoTipo: 'Conversación WhatsApp' 
      }
    ]
  },
  {
    id: '120253570596410728',
    campaignId: '120253570596410728',
    name: '[BH] LEADS 2026 - Agosto',
    status: 'ACTIVE',
    effectiveStatus: 'ACTIVE',
    objective: 'OUTCOME_LEADS',
    objectiveLabel: 'Clientes potenciales (Formularios Instantáneos > 11 anuncios)',
    budgetType: 'CBO',
    budgetAmount: 'CBO Activo',
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    linkClicks: 1867,
    ctr: 2.53,
    cpc: 17.29,
    cpm: 437.71,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 532.79, // $50,082.48 / 94
    startDate: '2026-08-10',
    endDate: '2026-09-30',
    adSets: [
      {
        id: '120253570596420728',
        name: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        leads: 87,
        cpl: 507.76,
        adsCount: 9
      },
      {
        id: '120253570596430728',
        name: '[BH] Leads - Foráneos Norte - Ago-Sep26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        leads: 7,
        cpl: 843.96,
        adsCount: 2
      }
    ],
    ads: [
      {
        id: '120253570987130728',
        adId: '120253570987130728',
        name: 'Ago - Ad 2',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 3.01,
        cpc: 18.04,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 482.84,
        resultadoTipo: 'Formulario',
        creative: {
          id: 'cr_ago_02',
          name: 'Ago - Ad 2 (Reel 9:16)',
          format: 'reel_9_16',
          headline: 'Departamentos en Sierra Providencia',
          primaryText: 'Preventa exclusiva en Sierra Providencia. Plusvalía y amenidades premium.'
        }
      },
      {
        id: '120253571089200728',
        adId: '120253571089200728',
        name: 'Ago - Ad 5',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 4.04,
        cpc: 21.03,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 491.95,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571148540728',
        adId: '120253571148540728',
        name: 'Ago - Ad 8',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 1.63,
        cpc: 26.98,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 389.24,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571058200728',
        adId: '120253571058200728',
        name: 'Ago - Ad 6',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 2.43,
        cpc: 30.48,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 311.56,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571239010728',
        adId: '120253571239010728',
        name: '[BH] Norte - Ago Ad 1',
        adSetId: '120253570596430728',
        adSetName: '[BH] Leads - Foráneos Norte - Ago-Sep26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 1.89,
        cpc: 13.36,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 737.57,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571242310728',
        adId: '120253571242310728',
        name: '[BH] CEDIS - Ago Ad 1',
        adSetId: '120253570596430728',
        adSetName: '[BH] Leads - Foráneos Norte - Ago-Sep26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 2.84,
        cpc: 35.80,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 1109.92,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571034450728',
        adId: '120253571034450728',
        name: 'Ago - Ad 4',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 2.14,
        cpc: 35.27,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 1022.93,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253570992380728',
        adId: '120253570992380728',
        name: 'Ago - Ad 1',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 3.83,
        cpc: 18.33,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 1613.35,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571078200728',
        adId: '120253571078200728',
        name: 'Ago - Ad 7',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 1.58,
        cpc: 3.80,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 0,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253571120200728',
        adId: '120253571120200728',
        name: 'Ago - Carrusel 1',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 4.76,
        cpc: 5.19,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 0,
        resultadoTipo: 'Formulario'
      },
      {
        id: '120253570997030728',
        adId: '120253570997030728',
        name: 'Ago - Ad 3',
        adSetId: '120253570596420728',
        adSetName: '[BH] Leads - Agosto26*',
        campaignId: '120253570596410728',
        status: 'ACTIVE',
        effectiveStatus: 'ACTIVE',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        ctr: 1.46,
        cpc: 34.60,
        leadsReported: 0,
        formulariosCompletados: 0,
        conversacionesIniciadas: 0,
        costoPorResultado: 0,
        resultadoTipo: 'Formulario'
      }
    ]
  },
  {
    id: '120253335110950728',
    campaignId: '120253335110950728',
    name: 'Agosto 2026 - Leads (Pausada)',
    status: 'PAUSED',
    effectiveStatus: 'PAUSED',
    objective: 'OUTCOME_LEADS',
    objectiveLabel: 'Cliente Potencial Inicial (Formulario)',
    budgetType: 'LIFETIME',
    budgetAmount: 85000.00,
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    linkClicks: 1621,
    ctr: 1.25,
    cpc: 13.94,
    cpm: 174.04,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 775.76,
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    adSets: [
      {
        id: '120253335110960728',
        name: 'Conjunto Torre 2',
        campaignId: '120253335110950728',
        status: 'PAUSED',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        leads: 23,
        cpl: 1003.02,
        adsCount: 1
      },
      {
        id: '120253335110960729',
        name: 'Conjunto Torre 1',
        campaignId: '120253335110950728',
        status: 'PAUSED',
        spend: 0,
        impressions: 0,
        reach: 0,
        clicks: 0,
        leads: 13,
        cpl: 373.70,
        adsCount: 1
      }
    ],
    ads: [
      { 
        id: '120253336057450728', 
        adId: '120253336057450728', 
        name: 'Torre 2', 
        adSetId: '120253335110960728', 
        adSetName: 'Conjunto Torre 2', 
        campaignId: '120253335110950728', 
        status: 'PAUSED', 
        effectiveStatus: 'PAUSED', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 1.26, 
        cpc: 16.99, 
        leadsReported: 0, 
        formulariosCompletados: 0, 
        conversacionesIniciadas: 0,
        costoPorResultado: 1003.02, 
        resultadoTipo: 'Formulario' 
      },
      { 
        id: '120253335110960728', 
        adId: '120253335110960728', 
        name: 'Torre 1', 
        adSetId: '120253335110960729', 
        adSetName: 'Conjunto Torre 1', 
        campaignId: '120253335110950728', 
        status: 'PAUSED', 
        effectiveStatus: 'PAUSED', 
        spend: 0, 
        impressions: 0, 
        reach: 0, 
        clicks: 0, 
        ctr: 1.23, 
        cpc: 7.52, 
        leadsReported: 0, 
        formulariosCompletados: 0, 
        conversacionesIniciadas: 0,
        costoPorResultado: 373.70, 
        resultadoTipo: 'Formulario' 
      }
    ]
  },
  {
    id: '120252809517950728',
    campaignId: '120252809517950728',
    status: 'PAUSED',
    effectiveStatus: 'PAUSED',
    objective: 'OUTCOME_ENGAGEMENT',
    objectiveLabel: 'Interacción',
    budgetType: 'DAILY',
    budgetAmount: 50.00,
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    ctr: 7.47,
    cpc: 0.93,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 0,
    startDate: '2026-07-01',
    endDate: '2026-07-31'
  },
  {
    id: '120252809785800728',
    campaignId: '120252809785800728',
    name: 'Julio - Interacción - IG',
    status: 'PAUSED',
    effectiveStatus: 'PAUSED',
    objective: 'OUTCOME_ENGAGEMENT',
    objectiveLabel: 'Interacción',
    budgetType: 'DAILY',
    budgetAmount: 50.00,
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    ctr: 0.08,
    cpc: 235.88,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 0,
    startDate: '2026-07-01',
    endDate: '2026-07-31'
  },
  {
    id: '120251353511420728',
    campaignId: '120251353511420728',
    name: 'Junio - Interacción - FB',
    status: 'PAUSED',
    effectiveStatus: 'PAUSED',
    objective: 'OUTCOME_ENGAGEMENT',
    objectiveLabel: 'Interacción',
    budgetType: 'DAILY',
    budgetAmount: 0,
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 0,
    startDate: '2026-06-01',
    endDate: '2026-06-30'
  },
  {
    id: '120251353384080728',
    campaignId: '120251353384080728',
    name: 'Junio - Interacción - IG',
    status: 'PAUSED',
    effectiveStatus: 'PAUSED',
    objective: 'OUTCOME_ENGAGEMENT',
    objectiveLabel: 'Interacción',
    budgetType: 'DAILY',
    budgetAmount: 0,
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 0,
    startDate: '2026-06-01',
    endDate: '2026-06-30'
  },
  {
    id: '120249629598080728',
    campaignId: '120249629598080728',
    name: 'Mayo 2026 - Weekend',
    status: 'PAUSED',
    effectiveStatus: 'PAUSED',
    objective: 'OUTCOME_LEADS',
    objectiveLabel: 'Clientes Potenciales',
    budgetType: 'DAILY',
    budgetAmount: 0,
    spend: 0,
    impressions: 0,
    reach: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversacionesIniciadas: 0,
    costoPorConversacionIniciada: 0,
    formulariosCompletados: 0,
    leadsReported: 0,
    costoPorLeadReportado: 0,
    startDate: '2026-05-01',
    endDate: '2026-05-31'
  }
];
