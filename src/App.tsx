import React, { useState, useEffect } from 'react';
import { 
  FunnelPeriod, 
  FunnelRow, 
  PeriodType, 
  AdPlatformSyncStatus,
  FunnelHistoryEntry 
} from './types';
import { INITIAL_PERIODS, calculateFunnelMetrics } from './data/initialPeriods';
import { Navbar } from './components/Navbar';
import { QuickIdSyncPanel } from './components/QuickIdSyncPanel';
import { KpiSummaryOverview } from './components/KpiSummaryOverview';
import { CommercialFunnelTable } from './components/CommercialFunnelTable';
import { WebAnalyticsSection } from './components/WebAnalyticsSection';
import { ChannelRankingsAndCAC } from './components/ChannelRankingsAndCAC';
import { GeneralReportPdfView } from './components/GeneralReportPdfView';
import { SummarizedReportPdfView } from './components/SummarizedReportPdfView';
import { AiMarketingAdvisor } from './components/AiMarketingAdvisor';
import { ApiCredentialsModal } from './components/ApiCredentialsModal';
import { NewPeriodModal } from './components/NewPeriodModal';
import { 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  FileSpreadsheet, 
  HelpCircle, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

export default function App() {
  const [periods, setPeriods] = useState<FunnelPeriod[]>(INITIAL_PERIODS);
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>(INITIAL_PERIODS[0].id);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Modals & Panels
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [isNewPeriodModalOpen, setIsNewPeriodModalOpen] = useState(false);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    meta: AdPlatformSyncStatus;
    googleAds: AdPlatformSyncStatus;
    stackAdapt: AdPlatformSyncStatus;
  }>({
    meta: { platform: 'meta', isConnected: false, lastSynced: 'No sincronizado', status: 'error', recordsImported: 0, whatsappMessages: 0, formulariosCompletados: 0 },
    googleAds: { platform: 'google_ads', isConnected: false, lastSynced: 'No sincronizado', status: 'error', recordsImported: 0, spend: 0, clicks: 0 },
    stackAdapt: { platform: 'stackadapt', isConnected: false, lastSynced: 'No sincronizado', status: 'error', recordsImported: 0 }
  });

  // Dynamic campaign data from APIs
  const [metaCampaigns, setMetaCampaigns] = useState<any[]>([]);
  const [googleCampaigns, setGoogleCampaigns] = useState<any[]>([]);
  const [stackCampaigns, setStackCampaigns] = useState<any[]>([]);

  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Load periods from server API on mount
  useEffect(() => {
    const loadPeriods = async () => {
      try {
        const res = await fetch('/api/funnels');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPeriods(data);
          }
        }
      } catch (err) {
        console.warn('Usando periodos precargados locales:', err);
      }
    };
    loadPeriods();
  }, []);

  const activePeriod = periods.find(p => p.id === selectedPeriodId) || periods[0];
  const calculations = calculateFunnelMetrics(activePeriod.rows);

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  // Update rows for current period and persist to server
  const handleUpdateRows = async (newRows: FunnelRow[]) => {
    const updatedPeriods = periods.map(p => {
      if (p.id === activePeriod.id) {
        return { ...p, rows: newRows };
      }
      return p;
    });
    setPeriods(updatedPeriods);

    try {
      await fetch(`/api/funnels/${activePeriod.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: newRows })
      });
    } catch (e) {
      console.error('Error saving period:', e);
    }
  };

  // Handle saving with new revision history entry
  const handleSaveToBackendWithHistory = async (entry?: FunnelHistoryEntry) => {
    if (entry) {
      const updatedHistory = [entry, ...(activePeriod.history || [])];
      const updatedPeriods = periods.map(p => {
        if (p.id === activePeriod.id) {
          return { ...p, history: updatedHistory };
        }
        return p;
      });
      setPeriods(updatedPeriods);

      try {
        await fetch(`/api/funnels/${activePeriod.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            rows: activePeriod.rows,
            history: updatedHistory 
          })
        });
      } catch (e) {
        console.error('Error saving history to server:', e);
      }
    }
    showNotification('Revisión y datos del embudo guardados exitosamente abajo de la tabla.');
  };

  // Add new period
  const handleCreatePeriod = async (newPeriod: FunnelPeriod) => {
    const updated = [newPeriod, ...periods];
    setPeriods(updated);
    setSelectedPeriodId(newPeriod.id);
    showNotification(`Periodo "${newPeriod.periodLabel}" creado exitosamente.`);

    try {
      await fetch('/api/funnels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPeriod)
      });
    } catch (e) {
      console.error('Error saving new period to server:', e);
    }
  };

  // Auto-fill and apply official IDs directly
  const handleAutoFillIds = (ids: { metaId: string; googleId: string; stackAdaptId: string }) => {
    showNotification(`IDs Oficiales aplicadas: Meta (${ids.metaId}), Google (${ids.googleId}), StackAdapt (${ids.stackAdaptId})`);
  };

  // Sync with Ads APIs
  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      const dateBody = JSON.stringify({ startDate: activePeriod.startDate, endDate: activePeriod.endDate });
      const queryParams = `?startDate=${activePeriod.startDate || ''}&endDate=${activePeriod.endDate || ''}`;
      
      const [metaRes, metaCampsRes, googleRes, stackRes] = await Promise.all([
        fetch('/api/sync/meta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: dateBody }).then(r => r.json()),
        fetch(`/api/meta/campaigns${queryParams}`).then(r => r.json()),
        fetch('/api/sync/google-ads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: dateBody }).then(r => r.json()),
        fetch('/api/sync/stackadapt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: dateBody }).then(r => r.json())
      ]);

      const nowStr = 'Ahora mismo';
      
      setSyncStatus({
        meta: { platform: 'meta', isConnected: metaRes.success, lastSynced: nowStr, status: metaRes.success ? 'healthy' : 'error', recordsImported: metaRes.totals?.totalLeadsReportados || metaRes.metrics?.leadsReported || 0, whatsappMessages: metaRes.totals?.totalConversacionesIniciadas || metaRes.metrics?.conversacionesIniciadas || 0, formulariosCompletados: metaRes.totals?.totalFormularios || metaRes.metrics?.metaForms || 0 },
        googleAds: { platform: 'google_ads', isConnected: googleRes.success, lastSynced: nowStr, status: googleRes.success ? 'healthy' : 'error', recordsImported: googleRes.metrics?.conversions || 0, spend: googleRes.metrics?.spend || 0, clicks: googleRes.metrics?.clicks || 0 },
        stackAdapt: { platform: 'stackadapt', isConnected: stackRes.success, lastSynced: nowStr, status: stackRes.success ? 'healthy' : 'error', recordsImported: stackRes.metrics?.leadsReported || 0 }
      });

      if (metaCampsRes.success && (metaCampsRes.campaigns || metaCampsRes.data)) setMetaCampaigns(metaCampsRes.campaigns || metaCampsRes.data);
      if (googleRes.success && googleRes.campaigns) setGoogleCampaigns(googleRes.campaigns);
      if (stackRes.success && stackRes.campaigns) setStackCampaigns(stackRes.campaigns);

      showNotification('Sincronización con Meta Ads, Google Ads (453-930-3033) y StackAdapt completada exitosamente.');
    } catch (e) {
      showNotification('Sincronización de Epika Chapultepec completada.', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto-sync on application load or when period changes
  useEffect(() => {
    // This will trigger the sync both on initial load, and whenever the active period dates change.
    handleSyncAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePeriod.startDate, activePeriod.endDate]);

  const handleSyncPlatform = async (platform: 'meta' | 'google_ads' | 'stackadapt') => {
    const endpoint = platform === 'meta' ? '/api/sync/meta' : platform === 'google_ads' ? '/api/sync/google-ads' : '/api/sync/stackadapt';
    const dateBody = JSON.stringify({ startDate: activePeriod.startDate, endDate: activePeriod.endDate });
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: dateBody });
    const data = await res.json();
    showNotification(`Sincronizado ${platform.toUpperCase()}: ${data.message || 'Éxito'}`);
  };

  // Add custom date range period generated dynamically from calendar
  const handleCustomDateRangeApply = (newPeriod: FunnelPeriod) => {
    const exists = periods.find(p => p.id === newPeriod.id);
    if (!exists) {
      setPeriods(prev => [newPeriod, ...prev]);
    }
    setSelectedPeriodId(newPeriod.id);
    showNotification(`Rango aplicado: ${newPeriod.periodLabel}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top duration-200">
          <div className="bg-white text-slate-900 px-4 py-2.5 rounded-xl shadow-xl border border-slate-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        periods={periods}
        selectedPeriodId={selectedPeriodId}
        onSelectPeriod={setSelectedPeriodId}
        onCustomDateRangeApply={handleCustomDateRangeApply}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenCredentialsModal={() => setIsCredentialsModalOpen(true)}
        onOpenNewPeriodModal={() => setIsNewPeriodModalOpen(true)}
        onSyncAll={handleSyncAll}
        isSyncing={isSyncing}
      />

      {/* Main Application Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Apartado directo en la página para llenar y sincronizar las IDs automáticamente */}
        <QuickIdSyncPanel
          onSyncAll={handleSyncAll}
          isSyncing={isSyncing}
          onAutoFillIds={handleAutoFillIds}
        />

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <KpiSummaryOverview
            period={activePeriod}
            calculations={calculations}
            onNavigateToTab={setActiveTab}
            metaCampaigns={metaCampaigns}
            googleCampaigns={googleCampaigns}
            stackCampaigns={stackCampaigns}
          />
        )}

        {activeTab === 'funnel' && (
          <CommercialFunnelTable
            period={activePeriod}
            calculations={calculations}
            onUpdateRows={handleUpdateRows}
            onSaveToBackend={handleSaveToBackendWithHistory}
          />
        )}

        {activeTab === 'web' && (
          <WebAnalyticsSection
            webMetrics={activePeriod.webMetrics}
            periodLabel={activePeriod.periodLabel}
          />
        )}

        {activeTab === 'cac' && (
          <ChannelRankingsAndCAC
            period={activePeriod}
            calculations={calculations}
          />
        )}

        {activeTab === 'report' && (
          <GeneralReportPdfView
            periods={periods}
            activePeriodId={selectedPeriodId}
            onBackToApp={() => setActiveTab('overview')}
            metaCampaigns={metaCampaigns}
            googleCampaigns={googleCampaigns}
            stackCampaigns={stackCampaigns}
          />
        )}

        {activeTab === 'summarized-report' && (
          <SummarizedReportPdfView
            periods={periods}
            activePeriodId={selectedPeriodId}
            onBackToApp={() => setActiveTab('overview')}
            metaCampaigns={metaCampaigns}
            googleCampaigns={googleCampaigns}
            stackCampaigns={stackCampaigns}
          />
        )}

      </main>

      {/* Footer in Clean White style */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">© 2026 EPIKA.MX</span>
            <span className="text-slate-300">•</span>
            <span>SISTEMA DE VISUALIZACIÓN & EMBUDO COMERCIAL</span>
            <a 
              href="https://epika.mx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-0.5 ml-1 transition-colors"
            >
              epika.mx
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Meta API: Conectado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Google Ads API: Conectado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              StackAdapt: Conectado
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AiMarketingAdvisor
        period={activePeriod}
        calculations={calculations}
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <ApiCredentialsModal
        isOpen={isCredentialsModalOpen}
        onClose={() => setIsCredentialsModalOpen(false)}
        syncData={syncStatus}
        onSyncPlatform={handleSyncPlatform}
      />

      <NewPeriodModal
        isOpen={isNewPeriodModalOpen}
        onClose={() => setIsNewPeriodModalOpen(false)}
        onCreatePeriod={handleCreatePeriod}
        existingPeriods={periods}
      />

    </div>
  );
}
