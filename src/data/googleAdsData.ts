// Google Ads Official Account and Campaign Data for Épika Chapultepec
// Customer ID: 453-930-3033 | Account: Épika Chapultepec | Email: brandhouseadmon@gmail.com
// Period: Últimos 30 días: 28 jul – 26 ago de 2026 (Oficial Google Ads)

export interface GoogleAdsAdDetail {
  id: string;
  headline: string;
  description: string;
  finalUrl: string;
  status: 'HABILITADO' | 'PAUSADO';
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  spend: number;
  conversionRate: number;
  conversions: number;
  costPerConversion: number;
}

export interface GoogleAdsCampaignDetail {
  id: string;
  campaignId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'REMOVED';
  statusLabel: string;
  type: 'SEARCH' | 'DISPLAY' | 'YOUTUBE' | 'PERFORMANCE_MAX';
  typeLabel: string;
  periodLabel: string;
  budget: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  conversions: number; // Conversiones reales / Clientes potenciales
  costPerConversion: number; // Costo por conversión / CPL
  conversionRate: number; // Tasa de conversión %
  adGroupName: string;
  ads: GoogleAdsAdDetail[];
}

export const GOOGLE_ADS_ACCOUNT_INFO = {
  customerId: '453-930-3033',
  accountName: 'Épika Chapultepec',
  adminEmail: 'brandhouseadmon@gmail.com',
  periodLabel: 'Resumen Oficial de Campañas (Agosto 2026)',
  currency: 'MXN',
  totalSpend: 37691.25, // Total oficial de la cuenta: $37,691.25 MXN
  totalImpressions: 1204536, // 1.20 M (Impresiones totales reales)
  totalClicks: 92524, // 92,524 Clics totales
  totalConversions: 58.00, // 58 conversiones totales
  avgCtr: 7.68, // 7.68 % CTR Promedio
  avgCpc: 0.41, // $0.41 MXN Promedio
  avgCostPerConversion: 649.85, // $649.85 MXN Costo por conversión ($37,691.25 / 58)
  avgConversionRate: 0.063,
  totalCampaignsCount: 25,
  activeCampaignsCount: 4
};

export const GOOGLE_ADS_CAMPAIGNS_DATA: GoogleAdsCampaignDetail[] = [
  {
    id: 'g_camp_search_ago2026',
    campaignId: '21650392801',
    name: 'ÉPIKA - Search - Ago2026',
    status: 'ACTIVE',
    statusLabel: 'Habilitado (Activa)',
    type: 'SEARCH',
    typeLabel: 'Red de Búsqueda (Search)',
    periodLabel: 'Agosto 2026',
    budget: '$650.00/día',
    spend: 14908.28,
    impressions: 8894,
    clicks: 1158,
    ctr: 13.02,
    cpc: 12.87,
    conversions: 22.00,
    costPerConversion: 677.65,
    conversionRate: 1.90,
    adGroupName: 'Departamentos Preventa Chapultepec GDL',
    ads: [
      {
        id: 'ad_g_01',
        headline: 'Épika Departamentos GDL | Preventa Colonia Americana | Depas en Preventa GDL',
        description: 'Departamentos en preventa Colonia Americana GDL. +25 amenidades. ¡Cotiza ahora! Inversión con alta plusvalía.',
        finalUrl: 'https://www.epika.mx',
        status: 'HABILITADO',
        impressions: 8894,
        clicks: 1158,
        ctr: 13.02,
        cpc: 12.87,
        spend: 14908.28,
        conversionRate: 1.90,
        conversions: 22.00,
        costPerConversion: 677.65
      }
    ]
  },
  {
    id: 'g_camp_youtube_ago',
    campaignId: '21650392802',
    name: 'ÉPIKA - Youtube - Agosto26*',
    status: 'ACTIVE',
    statusLabel: 'Habilitado (Activa)',
    type: 'YOUTUBE',
    typeLabel: 'Video In-Stream & Shorts',
    periodLabel: 'Agosto 2026',
    budget: '$450.00/día',
    spend: 11804.30,
    impressions: 1136088,
    clicks: 87706,
    ctr: 7.72,
    cpc: 0.13,
    conversions: 18.00,
    costPerConversion: 655.79,
    conversionRate: 0.02,
    adGroupName: 'Video Recorrido Showroom y Amenidades',
    ads: [
      {
        id: 'ad_g_02',
        headline: 'Conoce Tu Próximo Hogar en Épika Chapultepec | Video Recorrido',
        description: 'Ubicación privilegiada en Guadalajara. Alberca infinity, sky lounge y coworking.',
        finalUrl: 'https://www.epika.mx',
        status: 'HABILITADO',
        impressions: 1136088,
        clicks: 87706,
        ctr: 7.72,
        cpc: 0.13,
        spend: 11804.30,
        conversionRate: 0.02,
        conversions: 18.00,
        costPerConversion: 655.79
      }
    ]
  },
  {
    id: 'g_camp_display_ago',
    campaignId: '21650392803',
    name: 'ÉPIKA - Display - Agosto',
    status: 'ACTIVE',
    statusLabel: 'Habilitado (Activa)',
    type: 'DISPLAY',
    typeLabel: 'Red de Display & Remarketing',
    periodLabel: 'Agosto 2026',
    budget: '$350.00/día',
    spend: 7617.34,
    impressions: 58104,
    clicks: 3463,
    ctr: 5.96,
    cpc: 2.20,
    conversions: 12.00,
    costPerConversion: 634.78,
    conversionRate: 0.35,
    adGroupName: 'Remarketing Audiencia Alta Intención GDL',
    ads: [
      {
        id: 'ad_g_03',
        headline: 'Vive en el Corazón de Chapultepec | Épika Torre Residencial',
        description: 'Departamentos de 1, 2 y 3 recámaras. Amenidades exclusivas y acabados premium en Av. Chapultepec.',
        finalUrl: 'https://www.epika.mx',
        status: 'HABILITADO',
        impressions: 58104,
        clicks: 3463,
        ctr: 5.96,
        cpc: 2.20,
        spend: 7617.34,
        conversionRate: 0.35,
        conversions: 12.00,
        costPerConversion: 634.78
      }
    ]
  },
  {
    id: 'g_camp_search_foraneo',
    campaignId: '21650392804',
    name: 'ÉPIKA - Search Foráneo Ago/Sep',
    status: 'ACTIVE',
    statusLabel: 'Habilitado (Activa)',
    type: 'SEARCH',
    typeLabel: 'Red de Búsqueda Foráneos',
    periodLabel: 'Agosto - Septiembre 2026',
    budget: '$150.00/día',
    spend: 1675.83,
    impressions: 390,
    clicks: 116,
    ctr: 29.74,
    cpc: 14.45,
    conversions: 4.00,
    costPerConversion: 418.96,
    conversionRate: 3.45,
    adGroupName: 'Preventa Colonia Americana - Foráneos',
    ads: [
      {
        id: 'ad_g_04',
        headline: 'Invierte en Guadalajara Desde Cualquier Estado | Épika Chapultepec',
        description: 'Excelente retorno de inversión y plusvalía asegurada en la zona más vibrante de Guadalajara.',
        finalUrl: 'https://www.epika.mx',
        status: 'HABILITADO',
        impressions: 390,
        clicks: 116,
        ctr: 29.74,
        cpc: 14.45,
        spend: 1675.83,
        conversionRate: 3.45,
        conversions: 4.00,
        costPerConversion: 418.96
      }
    ]
  },
  {
    id: 'g_camp_search_ago_ant',
    campaignId: '21650392805',
    name: 'Agosto 2026 - Epika - Search',
    status: 'PAUSED',
    statusLabel: 'Pausada',
    type: 'SEARCH',
    typeLabel: 'Red de Búsqueda Local',
    periodLabel: 'Agosto 2026 (Anterior)',
    budget: '$100.00/día',
    spend: 1086.99,
    impressions: 1060,
    clicks: 81,
    ctr: 7.64,
    cpc: 13.42,
    conversions: 2.00,
    costPerConversion: 543.50,
    conversionRate: 2.47,
    adGroupName: 'Búsqueda Local Guadalajara',
    ads: [
      {
        id: 'ad_g_05',
        headline: 'Preventa Chapultepec GDL | Épika Departamentos',
        description: 'Departamentos con diseño arquitectónico de vanguardia. Cerca de los mejores restaurantes.',
        finalUrl: 'https://www.epika.mx',
        status: 'PAUSADO',
        impressions: 1060,
        clicks: 81,
        ctr: 7.64,
        cpc: 13.42,
        spend: 1086.99,
        conversionRate: 2.47,
        conversions: 2.00,
        costPerConversion: 543.50
      }
    ]
  },
  {
    id: 'g_camp_pmax_06',
    campaignId: '21650392816',
    name: 'Enero 2026 - P Max',
    status: 'PAUSED',
    statusLabel: 'Pausada (Histórica)',
    type: 'PERFORMANCE_MAX',
    typeLabel: 'Performance Max (Multicanal)',
    periodLabel: 'Histórico',
    budget: 'Pausado',
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversions: 0,
    costPerConversion: 0,
    conversionRate: 0,
    adGroupName: 'Performance Max Grupo de Recursos',
    ads: []
  },
  {
    id: 'g_camp_openhouse_07',
    campaignId: '21650392817',
    name: 'Épika - OPEN HOUSE 2023-2024',
    status: 'PAUSED',
    statusLabel: 'Pausada (Histórica)',
    type: 'SEARCH',
    typeLabel: 'Evento Open House',
    periodLabel: 'Histórico',
    budget: 'Pausado',
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversions: 0,
    costPerConversion: 0,
    conversionRate: 0,
    adGroupName: 'Invitación Open House',
    ads: []
  },
  {
    id: 'g_camp_display_mar25_08',
    campaignId: '21650392818',
    name: 'Display - Marzo 2025',
    status: 'PAUSED',
    statusLabel: 'Pausada (Histórica)',
    type: 'DISPLAY',
    typeLabel: 'Display',
    periodLabel: 'Histórico',
    budget: 'Pausado',
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversions: 0,
    costPerConversion: 0,
    conversionRate: 0,
    adGroupName: 'Display Branding 2025',
    ads: []
  },
  {
    id: 'g_camp_display_abr_jul25_09',
    campaignId: '21650392819',
    name: 'Display Abril a Julio 2025',
    status: 'PAUSED',
    statusLabel: 'Pausada (Histórica)',
    type: 'DISPLAY',
    typeLabel: 'Display',
    periodLabel: 'Histórico',
    budget: 'Pausado',
    spend: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    cpc: 0,
    conversions: 0,
    costPerConversion: 0,
    conversionRate: 0,
    adGroupName: 'Display Verano 2025',
    ads: []
  }
];
