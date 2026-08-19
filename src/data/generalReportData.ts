import { ReactNode } from 'react';

export interface MonthlyInvestment {
  month: string; // 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'
  monthKey: string;
  mediosOffTorre2: number;
  produccionMateriales: number;
  metaTorre1: number;
  metaTorre2: number;
  webGoogle: number;
  igualaServicios: number;
}

export interface MonthlyLeadsMetrics {
  month: string;
  leadsMetaTorre1: number;
  leadsMetaTorre2: number;
  costoLeadMeta: number;
  leadsGoogle: number;
  costoLeadGoogle: number;
}

export interface MonthlyVisitas {
  month: string;
  fb: number;
  ig: number;
  web: number;
  pop: number;
  totalLeadsCaptados?: number;
}

export interface MonthlyVentas {
  month: string;
  publicidad: number;
  pop: number;
  roas: number;
}

export interface TopAdCreative {
  id: string;
  leads: number;
  headline: string;
  subheadline: string;
  tag: string;
  priceTag: string;
  bgColor: string;
  imageUrl?: string;
  leadUrl?: string;
  platform?: string;
}

export interface MediaOnGenteBien {
  id?: string;
  tipo: 'POST' | 'REEL' | 'STORY' | string;
  alcance: number;
  impresiones: number;
  interacciones: number;
  inversion: number;
  previewTitle: string;
  imageUrl: string;
  postUrl: string;
  caption?: string;
  accountHandle?: string;
  publishDate?: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface FinancialProjectionNextMonth {
  targetMonth: string;
  items: {
    concepto: string;
    monto: number;
  }[];
}

export interface GeneralReportData {
  title: string;
  periodRangeLabel: string;
  activeFocusMonth: string; // e.g. 'Junio 2026'
  investments: MonthlyInvestment[];
  leadsMetrics: MonthlyLeadsMetrics[];
  visitas: MonthlyVisitas[];
  ventas: MonthlyVentas[];
  topAds: TopAdCreative[];
  mediosGenteBien: MediaOnGenteBien[];
  proximosPasos: string[];
  financieroProximoMes: FinancialProjectionNextMonth;
}

export const DEFAULT_GENERAL_REPORT: GeneralReportData = {
  title: 'REPORTE GENERAL',
  periodRangeLabel: 'ENERO 2026 - JUNIO 2026',
  activeFocusMonth: 'JUNIO',
  investments: [
    {
      month: 'Enero',
      monthKey: 'ene',
      mediosOffTorre2: 207309.18,
      produccionMateriales: 0,
      metaTorre1: 92600.75,
      metaTorre2: 58830.49,
      webGoogle: 44165.75,
      igualaServicios: 60000.00
    },
    {
      month: 'Febrero',
      monthKey: 'feb',
      mediosOffTorre2: 293112.24,
      produccionMateriales: 0,
      metaTorre1: 87398.15,
      metaTorre2: 65579.85,
      webGoogle: 37626.34,
      igualaServicios: 60000.00
    },
    {
      month: 'Marzo',
      monthKey: 'mar',
      mediosOffTorre2: 127519.18,
      produccionMateriales: 0,
      metaTorre1: 85796.88,
      metaTorre2: 109291.89,
      webGoogle: 35896.24,
      igualaServicios: 60000.00
    },
    {
      month: 'Abril',
      monthKey: 'abr',
      mediosOffTorre2: 151225.65,
      produccionMateriales: 25000.00,
      metaTorre1: 84309.10,
      metaTorre2: 44275.26,
      webGoogle: 21391.12,
      igualaServicios: 60000.00
    },
    {
      month: 'Mayo',
      monthKey: 'may',
      mediosOffTorre2: 199299.21,
      produccionMateriales: 25000.00,
      metaTorre1: 61643.46,
      metaTorre2: 18091.93,
      webGoogle: 70006.10,
      igualaServicios: 60000.00
    },
    {
      month: 'Junio',
      monthKey: 'jun',
      mediosOffTorre2: 102145.00,
      produccionMateriales: 0,
      metaTorre1: 65569.76,
      metaTorre2: 29416.09,
      webGoogle: 53829.66,
      igualaServicios: 60000.00
    }
  ],
  leadsMetrics: [
    {
      month: 'Ene',
      leadsMetaTorre1: 261,
      leadsMetaTorre2: 105,
      costoLeadMeta: 419,
      leadsGoogle: 116,
      costoLeadGoogle: 428
    },
    {
      month: 'Feb',
      leadsMetaTorre1: 204,
      leadsMetaTorre2: 49,
      costoLeadMeta: 512,
      leadsGoogle: 15,
      costoLeadGoogle: 508
    },
    {
      month: 'Mar',
      leadsMetaTorre1: 129,
      leadsMetaTorre2: 97,
      costoLeadMeta: 516,
      leadsGoogle: 59,
      costoLeadGoogle: 441
    },
    {
      month: 'Abr',
      leadsMetaTorre1: 156,
      leadsMetaTorre2: 97,
      costoLeadMeta: 505.03,
      leadsGoogle: 20,
      costoLeadGoogle: 501
    },
    {
      month: 'May',
      leadsMetaTorre1: 206,
      leadsMetaTorre2: 21,
      costoLeadMeta: 324.50,
      leadsGoogle: 116,
      costoLeadGoogle: 603
    },
    {
      month: 'Jun',
      leadsMetaTorre1: 151,
      leadsMetaTorre2: 32,
      costoLeadMeta: 467,
      leadsGoogle: 198,
      costoLeadGoogle: 334.35
    }
  ],
  visitas: [
    { month: 'Ene', fb: 3, ig: 3, web: 0, pop: 15 },
    { month: 'Feb', fb: 1, ig: 9, web: 0, pop: 9 },
    { month: 'Mar', fb: 4, ig: 3, web: 4, pop: 6 },
    { month: 'Abr', fb: 1, ig: 5, web: 2, pop: 8 },
    { month: 'Mayo', fb: 4, ig: 0, web: 2, pop: 12 },
    { month: 'Junio', fb: 2, ig: 4, web: 3, pop: 3 }
  ],
  ventas: [
    { month: 'ENERO', publicidad: 1, pop: 0, roas: 9.93 },
    { month: 'FEBRERO', publicidad: 4, pop: 1, roas: 42.22 },
    { month: 'MARZO', publicidad: 0, pop: 1, roas: 12.40 },
    { month: 'ABRIL', publicidad: 0, pop: 0, roas: 0 },
    { month: 'MAYO', publicidad: 0, pop: 0, roas: 0 },
    { month: 'JUNIO', publicidad: 0, pop: 0, roas: 0 }
  ],
  topAds: [
    {
      id: 'ad-1',
      leads: 81,
      headline: 'EPIKA CHAPULTEPEC',
      subheadline: 'Departamentos en preventa exclusiva',
      tag: 'Conoce más',
      priceTag: 'DESDE $3.6 MDP',
      bgColor: '#1E293B',
      leadUrl: 'https://epika.mx/',
      platform: 'Meta Ads (Instagram / FB)'
    },
    {
      id: 'ad-2',
      leads: 43,
      headline: 'INVIERTE EN LO MEJOR',
      subheadline: 'Zona Chapultepec Guadalajara',
      tag: 'Obtener oferta',
      priceTag: 'PREVENTA',
      bgColor: '#D97706',
      leadUrl: 'https://wa.me/523318258000?text=Hola%2C%20vi%20el%20anuncio%20de%20%C3%89pika%20Chapultepec%20y%20quiero%20informaci%C3%B3n',
      platform: 'WhatsApp Leads'
    },
    {
      id: 'ad-3',
      leads: 19,
      headline: 'DEPARTAMENTOS DE LUJO',
      subheadline: 'Rendimiento y plusvalía garantizada',
      tag: 'Enganche diferido',
      priceTag: '$180,902',
      bgColor: '#0F766E',
      leadUrl: 'https://www.facebook.com/EpikaChapultepec/',
      platform: 'Facebook Leads'
    },
    {
      id: 'ad-4',
      leads: 17,
      headline: 'ENTREGA 2026',
      subheadline: 'Vive en el corazón cultural de GDL',
      tag: 'Ver modelos',
      priceTag: 'DESDE $3.6 MDP',
      bgColor: '#2563EB',
      leadUrl: 'https://epika.mx/#contacto',
      platform: 'Web Lead Form'
    }
  ],
  mediosGenteBien: [
    {
      id: 'gb-post-1',
      tipo: 'POST',
      alcance: 1258,
      impresiones: 2889,
      interacciones: 19,
      inversion: 14250,
      previewTitle: 'Post Editorial Gente Bien Jalisco',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      postUrl: 'https://www.instagram.com/gentebien.jalisco/',
      caption: 'Épika Chapultepec: Departamentos de lujo en preventa exclusiva. Una propuesta arquitectónica que redefine el corazón cultural de Guadalajara. #EpikaChapultepec #GenteBienJalisco',
      accountHandle: '@gentebien.jalisco',
      publishDate: '12 de Junio, 2026',
      likes: 342,
      comments: 19,
      shares: 45
    },
    {
      id: 'gb-reel-2',
      tipo: 'REEL',
      alcance: 1985,
      impresiones: 2637,
      interacciones: 23,
      inversion: 9975,
      previewTitle: 'Reel Recorrido Showroom Épika',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      postUrl: 'https://www.facebook.com/EpikaChapultepec/',
      caption: '¡Conoce el departamento muestra de Épika Chapultepec! Espacios diseñados para un estilo de vida contemporáneo con amenidades de primer nivel.',
      accountHandle: '@EpikaChapultepec',
      publishDate: '24 de Junio, 2026',
      likes: 512,
      comments: 23,
      shares: 78
    },
    {
      id: 'gb-post-3',
      tipo: 'PORTAL WEB',
      alcance: 3420,
      impresiones: 5890,
      interacciones: 42,
      inversion: 8500,
      previewTitle: 'Lanzamiento Oficial Preventa Épika Chapultepec',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      postUrl: 'https://epika.mx/',
      caption: 'Descubre los modelos de departamentos, amenidades exclusivas y planes de financiamiento directo. Av. Chapultepec, Guadalajara.',
      accountHandle: 'epika.mx',
      publishDate: '28 de Junio, 2026',
      likes: 428,
      comments: 31,
      shares: 64
    }
  ],
  proximosPasos: [
    'Análisis y optimizaciones de las nuevas creatividades con costos y promociones.',
    'Publicaciones impresas y RRSS en Club Social y Gente Bien.',
    'Optimización de inversión y eficiencia de costos.'
  ],
  financieroProximoMes: {
    targetMonth: 'JULIO',
    items: [
      { concepto: 'Medios Digitales Torre 1 y 2', monto: 150000.00 },
      { concepto: 'Medio Off: Torre 2', monto: 77145.00 },
      { concepto: 'Iguala de servicios digitales', monto: 60000.00 }
    ]
  }
};
