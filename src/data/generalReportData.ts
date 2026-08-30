export interface MonthlyInvestment {
  month: string;
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
  leadsStackAdapt?: number;
  costoLeadStackAdapt?: number;
  leadsWebForms?: number;
  costoLeadWebForms?: number;
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

export interface MonthlyHistoricalPerformance {
  month: string;
  inversion: number;
  leadsReales: number;
  citas: number;
  ventas: number;
  cpl: number;
  cpv: number | null;
  roas: number;
}

export interface UnitEconomicsItem {
  canal: string;
  inversion: number;
  leadsBrutos: number;
  cplBruto: number;
  leadsReales: number;
  cplReal: number;
  citas: number;
  costoCita: number;
  ventas: number;
  cacEstimado: string;
  notaAislamiento?: string;
}

export interface ThankYouAttributionSource {
  source: string;
  sublabel: string;
  count: number;
  percentage: number;
  color: string;
  badge: string;
  iconName?: string;
}

export interface ThankYouSurveyFlowStep {
  stepNumber: number;
  name: string;
  description: string;
  detail: string;
  badge: string;
}

export interface ThankYouSurveyFlowItem {
  id: string;
  sourceName: string;
  channelCategory: 'Google Ads' | 'Meta Ads' | 'StackAdapt' | 'Orgánico/Directo';
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  count: number;
  percentage: number;
  campaignOrigin: string;
  landingUrl: string;
  surveyType: string;
  avgTimeOnPage: string;
  conversionRate: string;
  steps: ThankYouSurveyFlowStep[];
}

export interface ThankYouIndividualSurveyLog {
  id: string;
  leadCode: string;
  timestamp: string;
  source: string;
  utmCampaign: string;
  device: 'Móvil' | 'Desktop' | 'Tablet';
  surveyAnswers: {
    presupuesto: string;
    interesModelo: string;
    tiempoCompra: string;
    medioContacto: string;
  };
  destination: string;
  status: 'Verificado' | 'Cita Agendada' | 'En Seguimiento';
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
  tipo: 'POST' | 'REEL' | 'STORY' | 'PORTAL WEB' | string;
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
  activeFocusMonth: string;
  kpis: {
    leadsReales: number;
    citas: number;
    leadsVivos: number;
    apartados: number;
    ventas: number;
  };
  unitEconomics: UnitEconomicsItem[];
  leadsDetonadoresActuales: {
    label: string;
    sublabel: string;
    count: number;
    costoUnitario?: string;
    color: string;
  }[];
  canalHighlights: {
    volumen: {
      canal: string;
      leadsReales: number;
      cplReal: string;
      desc: string;
    };
    citas: {
      canal: string;
      citas: number;
      asistencia: string;
      desc: string;
    };
    ventas: {
      canal: string;
      ventas: number;
      desc: string;
    };
  };
  investments: MonthlyInvestment[];
  leadsMetrics: MonthlyLeadsMetrics[];
  historicalMonthly: MonthlyHistoricalPerformance[];
  webMetrics: {
    bounceRate: number;
    avgTimeSeconds: number;
    qualifiedTrafficPercent: number;
    qualifiedTrafficVisits: number;
    qualifiedAvgTimeSeconds: number;
    totalSessions: number;
    events: {
      whatsappClicks: number;
      phoneClicks: number;
      formSubmits: number;
      thankYouPageViews: number;
      brochureDownloads: number;
    };
    thankYouSources: ThankYouAttributionSource[];
    surveyFlow: ThankYouSurveyFlowItem[];
    surveyLogs: ThankYouIndividualSurveyLog[];
  };
  visitas: MonthlyVisitas[];
  ventas: MonthlyVentas[];
  topAds: TopAdCreative[];
  mediosGenteBien: MediaOnGenteBien[];
  proximosPasos: string[];
  financieroProximoMes: FinancialProjectionNextMonth;
}

export const DEFAULT_GENERAL_REPORT: GeneralReportData = {
  title: 'REPORTE GENERAL',
  periodRangeLabel: 'Del 3 al 9 de Agosto',
  activeFocusMonth: 'JUNIO',
  kpis: {
    leadsReales: 381,
    citas: 381,
    leadsVivos: 381,
    apartados: 381,
    ventas: 381
  },
  // TABLA INTEGRAL DE UNIT ECONOMICS POR CANAL (EPIKA CHAPULTEPEC)
  // AISLAMIENTO TOTAL: 'Pagina Web' solo contiene formularios y tráfico directo de epika.mx
  unitEconomics: [
    {
      canal: 'Pagina Web',
      inversion: 3850,
      leadsBrutos: 17,
      cplBruto: 226,
      leadsReales: 8,
      cplReal: 481,
      citas: 0,
      costoCita: 0,
      ventas: 0,
      cacEstimado: '$-',
      notaAislamiento: 'Formularios y tráfico orgánico/directo exclusivo epika.mx (Sin mezclar pautas)'
    },
    {
      canal: 'Facebook',
      inversion: 4200,
      leadsBrutos: 13,
      cplBruto: 323,
      leadsReales: 3,
      cplReal: 1400,
      citas: 0,
      costoCita: 0,
      ventas: 0,
      cacEstimado: '$-'
    },
    {
      canal: 'Instagram',
      inversion: 2950,
      leadsBrutos: 8,
      cplBruto: 368,
      leadsReales: 4,
      cplReal: 738,
      citas: 0,
      costoCita: 0,
      ventas: 0,
      cacEstimado: '$-'
    },
    {
      canal: 'Señalizacion/Punto de Venta',
      inversion: 1500,
      leadsBrutos: 6,
      cplBruto: 250,
      leadsReales: 6,
      cplReal: 250,
      citas: 3,
      costoCita: 500,
      ventas: 0,
      cacEstimado: '$-'
    },
    {
      canal: 'Google Ads (Search & Maps)',
      inversion: 4800,
      leadsBrutos: 11,
      cplBruto: 436,
      leadsReales: 7,
      cplReal: 686,
      citas: 2,
      costoCita: 2400,
      ventas: 0,
      cacEstimado: '$-'
    },
    {
      canal: 'StackAdapt (Programática)',
      inversion: 3100,
      leadsBrutos: 5,
      cplBruto: 620,
      leadsReales: 3,
      cplReal: 1033,
      citas: 1,
      costoCita: 3100,
      ventas: 0,
      cacEstimado: '$-'
    },
    {
      canal: 'TOTAL PROYECTO',
      inversion: 20400,
      leadsBrutos: 60,
      cplBruto: 340,
      leadsReales: 31,
      cplReal: 658,
      citas: 6,
      costoCita: 3400,
      ventas: 0,
      cacEstimado: '$-'
    }
  ],
  leadsDetonadoresActuales: [
    {
      label: 'Formularios Meta (FB / IG)',
      sublabel: 'Campaña Meta Lead Ads',
      count: 12,
      costoUnitario: '$354 / lead',
      color: '#1877F2'
    },
    {
      label: 'Conversaciones Meta (WhatsApp)',
      sublabel: 'Conversaciones directas iniciadas',
      count: 21,
      costoUnitario: '$340.5 / conversación',
      color: '#25D366'
    },
    {
      label: 'Web Epika.mx (/gracias)',
      sublabel: 'Formularios orgánicos y directos',
      count: 17,
      costoUnitario: '$226 / lead',
      color: '#D4F634'
    },
    {
      label: 'Google & StackAdapt (Search/DSP)',
      sublabel: 'Búsqueda de alta intención y geocercas',
      count: 16,
      costoUnitario: '$493 / lead',
      color: '#F59E0B'
    },
    {
      label: 'Punto de Venta (Showroom)',
      sublabel: 'Señalización exterior Chapultepec',
      count: 6,
      costoUnitario: '$250 / lead',
      color: '#EC4899'
    }
  ],
  canalHighlights: {
    volumen: {
      canal: 'Pagina Web',
      leadsReales: 8,
      cplReal: '$481 MXN',
      desc: 'Mayor volumen de datos reales verificados en el periodo.'
    },
    citas: {
      canal: 'Señalizacion/Punto de Venta',
      citas: 3,
      asistencia: '50% vs vivos',
      desc: 'Canal físico con mayor conversión y asistencia al showroom.'
    },
    ventas: {
      canal: 'Punto de Venta / Web',
      ventas: 1,
      desc: 'Mayor madurez de compra en Guadalajara e inversión de alto ticket.'
    }
  },
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
      costoLeadGoogle: 428,
      leadsStackAdapt: 6,
      costoLeadStackAdapt: 3150,
      leadsWebForms: 116,
      costoLeadWebForms: 428
    },
    {
      month: 'Feb',
      leadsMetaTorre1: 204,
      leadsMetaTorre2: 49,
      costoLeadMeta: 512,
      leadsGoogle: 15,
      costoLeadGoogle: 508,
      leadsStackAdapt: 5,
      costoLeadStackAdapt: 3420,
      leadsWebForms: 15,
      costoLeadWebForms: 508
    },
    {
      month: 'Mar',
      leadsMetaTorre1: 129,
      leadsMetaTorre2: 97,
      costoLeadMeta: 516,
      leadsGoogle: 59,
      costoLeadGoogle: 441,
      leadsStackAdapt: 8,
      costoLeadStackAdapt: 2890,
      leadsWebForms: 59,
      costoLeadWebForms: 441
    },
    {
      month: 'Abr',
      leadsMetaTorre1: 156,
      leadsMetaTorre2: 97,
      costoLeadMeta: 505.03,
      leadsGoogle: 20,
      costoLeadGoogle: 501,
      leadsStackAdapt: 6,
      costoLeadStackAdapt: 3200,
      leadsWebForms: 20,
      costoLeadWebForms: 501
    },
    {
      month: 'May',
      leadsMetaTorre1: 206,
      leadsMetaTorre2: 21,
      costoLeadMeta: 324.50,
      leadsGoogle: 116,
      costoLeadGoogle: 603,
      leadsStackAdapt: 9,
      costoLeadStackAdapt: 2450,
      leadsWebForms: 116,
      costoLeadWebForms: 603
    },
    {
      month: 'Jun',
      leadsMetaTorre1: 151,
      leadsMetaTorre2: 32,
      costoLeadMeta: 467,
      leadsGoogle: 198,
      costoLeadGoogle: 334.35,
      leadsStackAdapt: 7,
      costoLeadStackAdapt: 3030.10,
      leadsWebForms: 198,
      costoLeadWebForms: 334.35
    }
  ],
  // Historical performance table from August to December
  historicalMonthly: [
    {
      month: 'Agosto',
      inversion: 154000,
      leadsReales: 210,
      citas: 8,
      ventas: 2,
      cpl: 733.33,
      cpv: 77000,
      roas: 41.5
    },
    {
      month: 'Septiembre',
      inversion: 169000,
      leadsReales: 189,
      citas: 12,
      ventas: 0,
      cpl: 894.17,
      cpv: null,
      roas: 0
    },
    {
      month: 'Octubre',
      inversion: 140000,
      leadsReales: 235,
      citas: 8,
      ventas: 4,
      cpl: 595.74,
      cpv: 35000,
      roas: 91.4
    },
    {
      month: 'Noviembre',
      inversion: 187000,
      leadsReales: 265,
      citas: 21,
      ventas: 3,
      cpl: 705.66,
      cpv: 62333.33,
      roas: 51.3
    },
    {
      month: 'Diciembre',
      inversion: 125000,
      leadsReales: 244,
      citas: 18,
      ventas: 4,
      cpl: 512.29,
      cpv: 31250,
      roas: 102.4
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
    // EXACT DETAILED BREAKDOWN OF /GRACIAS SOURCE ATTRIBUTION
    thankYouSources: [
      {
        source: 'ADS GOOGLE',
        sublabel: 'Search, Maps & Performance Max',
        count: 12,
        percentage: 42.9,
        color: '#D4F634',
        badge: '42.9% Del Total'
      },
      {
        source: 'ADS META',
        sublabel: 'Facebook Ads & Instagram Lead Ads',
        count: 8,
        percentage: 28.6,
        color: '#1877F2',
        badge: '28.6% Del Total'
      },
      {
        source: 'STACKADAPT',
        sublabel: 'Programática Nativa & Display Chapultepec',
        count: 5,
        percentage: 17.9,
        color: '#A855F7',
        badge: '17.9% Del Total'
      },
      {
        source: 'ORGÁNICO / DIRECTO / OTROS',
        sublabel: 'Navegación directa en epika.mx y referencias',
        count: 3,
        percentage: 10.7,
        color: '#10B981',
        badge: '10.7% Del Total'
      }
    ],
    // DIAGRAMA DE FLUJO VISUAL DE PROCEDENCIA DE ENCUESTAS / FORMULARIOS /GRACIAS
    surveyFlow: [
      {
        id: 'flow-google',
        sourceName: 'Google Ads (Search & Maps)',
        channelCategory: 'Google Ads',
        badge: '41.2% del Flujo',
        color: '#D4F634',
        bgColor: '#1A2E05',
        borderColor: '#D4F634',
        count: 7,
        percentage: 41.2,
        campaignOrigin: 'Search: Departamentos Preventa Chapultepec + Maps Pins',
        landingUrl: 'https://epika.mx/#contacto',
        surveyType: 'Encuesta Inversión & Modelo Preferido (2R / 3R)',
        avgTimeOnPage: '1m 48s',
        conversionRate: '6.4%',
        steps: [
          {
            stepNumber: 1,
            name: 'Búsqueda de Alta Intención',
            description: 'Usuario busca "Departamentos preventa Guadalajara / Chapultepec" en Google',
            detail: 'Términos clave: Preventa Chapultepec, depas lujo GDL',
            badge: 'Detonador Publicitario'
          },
          {
            stepNumber: 2,
            name: 'Aterrizaje en Epika.mx',
            description: 'Llega a la sección de prototipos y cotizador con UTM de Google Ads',
            detail: 'utm_source=google&utm_medium=cpc&utm_campaign=search_chapultepec',
            badge: 'Landing Page'
          },
          {
            stepNumber: 3,
            name: 'Llenado de Encuesta Web',
            description: 'Responde encuesta de interés: tipo de modelo, rango de inversión y tiempo de compra',
            detail: 'Selecciona: $3.6M - $5.2M | Modelo 2 Recámaras',
            badge: 'Encuesta Respondida'
          },
          {
            stepNumber: 4,
            name: 'Llegada a /gracias',
            description: 'Redirección automática tras completar el formulario web exitosamente',
            detail: 'Disparo de evento GA4 thank_you_page + Webhook a CRM',
            badge: 'Conversión Final (/gracias)'
          }
        ]
      },
      {
        id: 'flow-meta',
        sourceName: 'Meta Ads (Facebook & Instagram)',
        channelCategory: 'Meta Ads',
        badge: '29.4% del Flujo',
        color: '#1877F2',
        bgColor: '#0F1E36',
        borderColor: '#1877F2',
        count: 5,
        percentage: 29.4,
        campaignOrigin: 'Reels & Stories: Departamentos de Lujo Preventa 2026',
        landingUrl: 'https://epika.mx/?utm_source=instagram&utm_medium=cpc',
        surveyType: 'Encuesta Perfil Comprador & Enganche Diferido',
        avgTimeOnPage: '1m 15s',
        conversionRate: '4.8%',
        steps: [
          {
            stepNumber: 1,
            name: 'Impacto Visual en Redes',
            description: 'Clic en Reel/Story de acabados de lujo y amenidades exclusivas en IG/FB',
            detail: 'Anuncio: "Vive en el corazón cultural de Guadalajara"',
            badge: 'Detonador Publicitario'
          },
          {
            stepNumber: 2,
            name: 'Aterrizaje en Landing Móvil',
            description: 'Carga rápida en navegador móvil dentro de Instagram/Facebook App',
            detail: 'utm_source=meta&utm_medium=paid_social&utm_campaign=preventa_2026',
            badge: 'Landing Page'
          },
          {
            stepNumber: 3,
            name: 'Llenado de Formulario Interactivo',
            description: 'Completa preguntas sobre interés de enganche diferido y amenidades',
            detail: 'Datos: Nombre, WhatsApp verificado, recámara deseada',
            badge: 'Encuesta Respondida'
          },
          {
            stepNumber: 4,
            name: 'Llegada a /gracias',
            description: 'Página de confirmación y pase para agendar cita en showroom',
            detail: 'Pixel Meta Lead activado + Asignación a asesor comercial',
            badge: 'Conversión Final (/gracias)'
          }
        ]
      },
      {
        id: 'flow-stackadapt',
        sourceName: 'StackAdapt (Programática DSP)',
        channelCategory: 'StackAdapt',
        badge: '17.6% del Flujo',
        color: '#A855F7',
        bgColor: '#25123A',
        borderColor: '#A855F7',
        count: 3,
        percentage: 17.6,
        campaignOrigin: 'Geocercas Zona Financiera / Chapultepec / Puerta de Hierro',
        landingUrl: 'https://epika.mx/ubicacion-amenidades',
        surveyType: 'Encuesta Inversionista Patrimonial & ROI',
        avgTimeOnPage: '2m 10s',
        conversionRate: '3.9%',
        steps: [
          {
            stepNumber: 1,
            name: 'Display & Banner Nativo',
            description: 'Impresión en portales financieros (El Economista, El Financiero, Mural GDL)',
            detail: 'Geocerca en zonas de alto poder adquisitivo de Guadalajara',
            badge: 'Detonador Publicitario'
          },
          {
            stepNumber: 2,
            name: 'Aterrizaje en Sección Amenidades',
            description: 'Visualización de mapa de ubicación, plusvalía y retorno de inversión proyectado',
            detail: 'utm_source=stackadapt&utm_medium=display&utm_campaign=geo_chapultepec',
            badge: 'Landing Page'
          },
          {
            stepNumber: 3,
            name: 'Encuesta de Inversión',
            description: 'Selecciona interés en esquema de pagos y rentabilidad en preventa',
            detail: 'Responde: Inversión Patrimonial | Enganche 20%',
            badge: 'Encuesta Respondida'
          },
          {
            stepNumber: 4,
            name: 'Llegada a /gracias',
            description: 'Descarga inmediata de brochure ejecutivo y confirmación en /gracias',
            detail: 'Notificación directa a gerencia de ventas',
            badge: 'Conversión Final (/gracias)'
          }
        ]
      },
      {
        id: 'flow-direct',
        sourceName: 'Orgánico, Directo & Códigos QR',
        channelCategory: 'Orgánico/Directo',
        badge: '11.8% del Flujo',
        color: '#10B981',
        bgColor: '#06291E',
        borderColor: '#10B981',
        count: 2,
        percentage: 11.8,
        campaignOrigin: 'Visita Directa epika.mx / Búsqueda Orgánica Google / QR Showroom',
        landingUrl: 'https://epika.mx/',
        surveyType: 'Formulario General de Contacto Web',
        avgTimeOnPage: '2m 35s',
        conversionRate: '8.2%',
        steps: [
          {
            stepNumber: 1,
            name: 'Tráfico de Marca / Orgánico',
            description: 'Escaneo de código QR en valla de Av. Chapultepec o búsqueda directa "Epika"',
            detail: 'Tráfico sin costo de pauta publicitaria (Tráfico puro)',
            badge: 'Detonador Natural'
          },
          {
            stepNumber: 2,
            name: 'Exploración Home Epika.mx',
            description: 'Recorrido completo de la web, amenidades, render 3D y galería de planos',
            detail: 'Tráfico orgánico con navegación profunda en epika.mx',
            badge: 'Landing Page'
          },
          {
            stepNumber: 3,
            name: 'Envío de Solicitud de Cita',
            description: 'Usuario llena sus datos para agendar recorrido presencial en departamento muestra',
            detail: 'Selecciona fecha tentativa y horario de visita',
            badge: 'Encuesta Respondida'
          },
          {
            stepNumber: 4,
            name: 'Llegada a /gracias',
            description: 'Página de confirmación /gracias con botón de WhatsApp directo',
            detail: 'Lead 100% calificado registrado en base de datos',
            badge: 'Conversión Final (/gracias)'
          }
        ]
      }
    ],
    // REGISTRO INDIVIDUAL DETALLADO DE LAS 17 ENCUESTAS QUE LLEGARON A /GRACIAS
    surveyLogs: [
      {
        id: 'surv-01',
        leadCode: 'LEAD-G01',
        timestamp: 'Hoy, 09:15',
        source: 'Google Ads (Search)',
        utmCampaign: 'search_chapultepec_preventa',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.8M - $4.5M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      },
      {
        id: 'surv-02',
        leadCode: 'LEAD-G02',
        timestamp: 'Hoy, 10:42',
        source: 'Google Ads (Search)',
        utmCampaign: 'search_departamentos_lujo_gdl',
        device: 'Desktop',
        surveyAnswers: {
          presupuesto: '$4.5M - $5.5M',
          interesModelo: 'Modelo C (3 Recámaras / Terraza)',
          tiempoCompra: 'Inmediato',
          medioContacto: 'Llamada telefónica'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      },
      {
        id: 'surv-03',
        leadCode: 'LEAD-M01',
        timestamp: 'Hoy, 11:20',
        source: 'Meta Ads (Instagram)',
        utmCampaign: 'ig_reels_preventa_lujo',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.6M - $4.0M',
          interesModelo: 'Modelo A (1 Recámara + Flex)',
          tiempoCompra: '3 a 6 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Verificado'
      },
      {
        id: 'surv-04',
        leadCode: 'LEAD-G03',
        timestamp: 'Hoy, 12:05',
        source: 'Google Ads (Maps)',
        utmCampaign: 'maps_local_chapultepec',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$4.0M - $4.8M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'En Seguimiento'
      },
      {
        id: 'surv-05',
        leadCode: 'LEAD-S01',
        timestamp: 'Hoy, 12:50',
        source: 'StackAdapt (DSP)',
        utmCampaign: 'dsp_geocerca_financiera',
        device: 'Desktop',
        surveyAnswers: {
          presupuesto: '$5.0M+',
          interesModelo: 'Penthouse / Modelo C',
          tiempoCompra: 'Inversionista patrimonial',
          medioContacto: 'Correo y WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      },
      {
        id: 'surv-06',
        leadCode: 'LEAD-M02',
        timestamp: 'Hoy, 13:30',
        source: 'Meta Ads (Facebook)',
        utmCampaign: 'fb_feed_inversion_rentabilidad',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.6M - $4.2M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Verificado'
      },
      {
        id: 'surv-07',
        leadCode: 'LEAD-O01',
        timestamp: 'Hoy, 14:15',
        source: 'Orgánico / Directo',
        utmCampaign: 'direct_traffic_epika_web',
        device: 'Desktop',
        surveyAnswers: {
          presupuesto: '$4.2M - $5.0M',
          interesModelo: 'Modelo B / Torre 2',
          tiempoCompra: '1 a 2 meses',
          medioContacto: 'Llamada telefónica'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      },
      {
        id: 'surv-08',
        leadCode: 'LEAD-G04',
        timestamp: 'Hoy, 15:00',
        source: 'Google Ads (Search)',
        utmCampaign: 'search_chapultepec_preventa',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.8M - $4.5M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: '3 a 6 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'En Seguimiento'
      },
      {
        id: 'surv-09',
        leadCode: 'LEAD-M03',
        timestamp: 'Hoy, 15:40',
        source: 'Meta Ads (Instagram)',
        utmCampaign: 'ig_stories_amenidades_alberca',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.6M - $4.0M',
          interesModelo: 'Modelo A (1 Recámara)',
          tiempoCompra: 'Inmediato',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Verificado'
      },
      {
        id: 'surv-10',
        leadCode: 'LEAD-S02',
        timestamp: 'Hoy, 16:25',
        source: 'StackAdapt (DSP)',
        utmCampaign: 'dsp_display_mural_gdl',
        device: 'Desktop',
        surveyAnswers: {
          presupuesto: '$4.5M - $5.5M',
          interesModelo: 'Modelo C (3 Recámaras)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'En Seguimiento'
      },
      {
        id: 'surv-11',
        leadCode: 'LEAD-G05',
        timestamp: 'Hoy, 17:10',
        source: 'Google Ads (Search)',
        utmCampaign: 'search_depas_guadalajara_centro',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.6M - $4.2M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Verificado'
      },
      {
        id: 'surv-12',
        leadCode: 'LEAD-M04',
        timestamp: 'Hoy, 17:55',
        source: 'Meta Ads (Facebook)',
        utmCampaign: 'fb_lead_retargeting_visitas',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$4.0M - $4.8M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: 'Inmediato',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      },
      {
        id: 'surv-13',
        leadCode: 'LEAD-O02',
        timestamp: 'Hoy, 18:30',
        source: 'Orgánico (QR Showroom)',
        utmCampaign: 'qr_valla_exterior_chapultepec',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$4.2M - $5.0M',
          interesModelo: 'Modelo C (3 Recámaras)',
          tiempoCompra: 'Inmediato',
          medioContacto: 'Visita Showroom'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      },
      {
        id: 'surv-14',
        leadCode: 'LEAD-G06',
        timestamp: 'Hoy, 19:15',
        source: 'Google Ads (Performance Max)',
        utmCampaign: 'pmax_epika_inversion_2026',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.8M - $4.6M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: '3 a 6 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'En Seguimiento'
      },
      {
        id: 'surv-15',
        leadCode: 'LEAD-M05',
        timestamp: 'Hoy, 20:00',
        source: 'Meta Ads (Instagram)',
        utmCampaign: 'ig_reels_preventa_lujo',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$3.6M - $4.0M',
          interesModelo: 'Modelo A (1 Recámara)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Verificado'
      },
      {
        id: 'surv-16',
        leadCode: 'LEAD-S03',
        timestamp: 'Hoy, 20:45',
        source: 'StackAdapt (DSP)',
        utmCampaign: 'dsp_geocerca_financiera',
        device: 'Móvil',
        surveyAnswers: {
          presupuesto: '$4.8M - $5.5M',
          interesModelo: 'Modelo C (3 Recámaras)',
          tiempoCompra: '1 a 3 meses',
          medioContacto: 'Correo y WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Verificado'
      },
      {
        id: 'surv-17',
        leadCode: 'LEAD-G07',
        timestamp: 'Hoy, 21:30',
        source: 'Google Ads (Search)',
        utmCampaign: 'search_chapultepec_preventa',
        device: 'Desktop',
        surveyAnswers: {
          presupuesto: '$4.0M - $4.8M',
          interesModelo: 'Modelo B (2 Recámaras)',
          tiempoCompra: 'Inmediato',
          medioContacto: 'WhatsApp'
        },
        destination: 'epika.mx/gracias',
        status: 'Cita Agendada'
      }
    ]
  },
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
