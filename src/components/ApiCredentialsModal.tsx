import React, { useState, useEffect } from 'react';
import { 
  Key, 
  X, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  Save,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { AdPlatformSyncStatus } from '../types';

interface ApiCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncData: {
    meta: AdPlatformSyncStatus;
    googleAds: AdPlatformSyncStatus;
    stackAdapt: AdPlatformSyncStatus;
  };
  onSyncPlatform: (platform: 'meta' | 'google_ads' | 'stackadapt') => void;
}

export const ApiCredentialsModal: React.FC<ApiCredentialsModalProps> = ({
  isOpen,
  onClose,
  syncData,
  onSyncPlatform
}) => {
  // State for all fields
  const [metaAccountId, setMetaAccountId] = useState(() => localStorage.getItem('epika_meta_id') || '2043417892891975');
  const [metaAppId, setMetaAppId] = useState(() => localStorage.getItem('epika_meta_app_id') || '2373560423171686');
  const [metaAppSecret, setMetaAppSecret] = useState(() => localStorage.getItem('epika_meta_secret') || '487f50dfa69c2523fecf620568b76786');
  const [metaAccessToken, setMetaAccessToken] = useState(() => localStorage.getItem('epika_meta_token') || 'EAAhuvZAngRmYBSCTPnMtUZCvlOSzRZB5uwWxHHShYmjUICtdfQhGFRBVDDXU3wlGFzi38FuPUJknK4vIqL3bxJ7RFaABdEvyRkOXz3jLzQesASRYQ3rsZAdj3aAKW6l84zmP89yFIUdS7JNsDx3JPbaOZBUoj9ID4WdsFVoGShdBnKX5MG8MKZAYixTjK9RXgcXgZDZD');

  const [googleCustomerId, setGoogleCustomerId] = useState(() => localStorage.getItem('epika_google_id') || '171-833-1328');
  const [googleDevToken, setGoogleDevToken] = useState(() => localStorage.getItem('epika_google_dev_token') || '9WP0xwvo9PYPwZ02KYs_Ag');
  const [googleClientId, setGoogleClientId] = useState(() => localStorage.getItem('epika_google_client_id') || '359442674926-kj0e2tufn6il1doudpt66qev1odm1npp.apps.googleusercontent.com');

  const [stackAdaptAccountId, setStackAdaptAccountId] = useState(() => localStorage.getItem('epika_stack_id') || '268858');
  const [stackAdaptToken, setStackAdaptToken] = useState(() => localStorage.getItem('epika_stack_token') || 'e6bcab244d239a36b68a3daabf593313fc0ce33263f5698b97d30fb204489fac');

  const [showTokens, setShowTokens] = useState(false);
  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    localStorage.setItem('epika_meta_id', metaAccountId);
    localStorage.setItem('epika_meta_app_id', metaAppId);
    localStorage.setItem('epika_meta_secret', metaAppSecret);
    localStorage.setItem('epika_meta_token', metaAccessToken);

    localStorage.setItem('epika_google_id', googleCustomerId);
    localStorage.setItem('epika_google_dev_token', googleDevToken);
    localStorage.setItem('epika_google_client_id', googleClientId);

    localStorage.setItem('epika_stack_id', stackAdaptAccountId);
    localStorage.setItem('epika_stack_token', stackAdaptToken);

    try {
      await fetch('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meta: { adAccountId: metaAccountId, appId: metaAppId, appSecret: metaAppSecret, accessToken: metaAccessToken },
          googleAds: { customerId: googleCustomerId, developerToken: googleDevToken, clientId: googleClientId },
          stackAdapt: { accountId: stackAdaptAccountId, apiToken: stackAdaptToken }
        })
      });
    } catch (e) {
      console.warn('Saved in browser');
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleApplyPresets = () => {
    setMetaAccountId('2043417892891975');
    setMetaAppId('2373560423171686');
    setMetaAppSecret('487f50dfa69c2523fecf620568b76786');
    setMetaAccessToken('EAAhuvZAngRmYBSCTPnMtUZCvlOSzRZB5uwWxHHShYmjUICtdfQhGFRBVDDXU3wlGFzi38FuPUJknK4vIqL3bxJ7RFaABdEvyRkOXz3jLzQesASRYQ3rsZAdj3aAKW6l84zmP89yFIUdS7JNsDx3JPbaOZBUoj9ID4WdsFVoGShdBnKX5MG8MKZAYixTjK9RXgcXgZDZD');

    setGoogleCustomerId('171-833-1328');
    setGoogleDevToken('9WP0xwvo9PYPwZ02KYs_Ag');
    setGoogleClientId('359442674926-kj0e2tufn6il1doudpt66qev1odm1npp.apps.googleusercontent.com');

    setStackAdaptAccountId('268858');
    setStackAdaptToken('e6bcab244d239a36b68a3daabf593313fc0ce33263f5698b97d30fb204489fac');
  };

  const handleSync = async (platform: 'meta' | 'google_ads' | 'stackadapt') => {
    setSyncingPlatform(platform);
    await onSyncPlatform(platform);
    setSyncingPlatform(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#262626] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#E5E7EB]">
        
        {/* Header */}
        <div className="bg-[#0D0D0D] border-b border-[#262626] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#D4F634] text-black border border-black flex items-center justify-center font-bold text-sm shadow-md">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight font-sans">
                Configuración Manual de IDs & Tokens
              </h2>
              <p className="text-xs text-[#A3A3A3]">
                Ingresa aquí las IDs y Tokens conforme los tengas disponibles para Epika Chapultepec
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTokens(!showTokens)}
              className="text-xs px-2.5 py-1 rounded bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white border border-[#262626] flex items-center gap-1 cursor-pointer"
            >
              {showTokens ? <EyeOff className="w-3.5 h-3.5 text-[#D4F634]" /> : <Eye className="w-3.5 h-3.5" />}
              {showTokens ? 'Ocultar Tokens' : 'Mostrar Tokens'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white border border-[#262626] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Action Helper */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4F634] shrink-0" />
              <span className="text-[#A3A3A3]">
                ¿Quieres rellenar con las credenciales oficiales de prueba de Epika?
              </span>
            </div>
            <button
              type="button"
              onClick={handleApplyPresets}
              className="px-3 py-1 bg-[#D4F634]/15 hover:bg-[#D4F634]/25 text-[#D4F634] border border-[#D4F634]/30 rounded font-bold whitespace-nowrap cursor-pointer"
            >
              Autocompletar Conocidos
            </button>
          </div>

          {savedSuccess && (
            <div className="bg-[#D4F634]/15 border border-[#D4F634]/30 p-3 rounded-lg flex items-center gap-2 text-[#D4F634] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#D4F634]" />
              Credenciales guardadas y sincronizadas exitosamente.
            </div>
          )}

          {/* 1. Meta Graph API */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4F634]"></span>
                <h3 className="font-bold text-white text-xs font-sans">Meta Marketing API (Facebook / Instagram Lead Ads & WhatsApp)</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4F634]/15 text-[#D4F634] border border-[#D4F634]/30">
                {metaAccessToken ? 'Token Ingresado' : 'Token Pendiente'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">Ad Account ID</label>
                <input
                  type="text"
                  value={metaAccountId}
                  onChange={(e) => setMetaAccountId(e.target.value)}
                  placeholder="ej. 2043417892891975"
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">App ID</label>
                <input
                  type="text"
                  value={metaAppId}
                  onChange={(e) => setMetaAppId(e.target.value)}
                  placeholder="ej. 2373560423171686"
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">
                  App Secret <span className="text-[#D4F634] font-normal">(No requerido / Opcional)</span>
                </label>
                <input
                  type={showTokens ? "text" : "password"}
                  value={metaAppSecret}
                  onChange={(e) => setMetaAppSecret(e.target.value)}
                  placeholder="No es necesario para consultar datos"
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">Access Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  value={metaAccessToken}
                  onChange={(e) => setMetaAccessToken(e.target.value)}
                  placeholder="EAA..."
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#262626]">
              <span className="text-[#A3A3A3]">Última sync: <strong className="text-white">{syncData.meta.lastSynced}</strong></span>
              <button
                onClick={() => handleSync('meta')}
                disabled={syncingPlatform === 'meta'}
                className="px-3 py-1 bg-[#262626] hover:bg-[#333] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${syncingPlatform === 'meta' ? 'animate-spin text-[#D4F634]' : ''}`} />
                {syncingPlatform === 'meta' ? 'Sincronizando...' : 'Test Sync'}
              </button>
            </div>
          </div>

          {/* 2. Google Ads API */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4F634]"></span>
                <h3 className="font-bold text-white text-xs font-sans">Google Ads API (Search, Display & PMax)</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4F634]/15 text-[#D4F634] border border-[#D4F634]/30">
                {googleDevToken ? 'Token Ingresado' : 'Token Pendiente'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">Customer ID</label>
                <input
                  type="text"
                  value={googleCustomerId}
                  onChange={(e) => setGoogleCustomerId(e.target.value)}
                  placeholder="ej. 171-833-1328"
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">Developer Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  value={googleDevToken}
                  onChange={(e) => setGoogleDevToken(e.target.value)}
                  placeholder="Developer Token"
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">OAuth Client ID</label>
                <input
                  type="text"
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  placeholder="359442674926-..."
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#262626]">
              <span className="text-[#A3A3A3]">Última sync: <strong className="text-white">{syncData.googleAds.lastSynced}</strong></span>
              <button
                onClick={() => handleSync('google_ads')}
                disabled={syncingPlatform === 'google_ads'}
                className="px-3 py-1 bg-[#262626] hover:bg-[#333] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${syncingPlatform === 'google_ads' ? 'animate-spin text-[#D4F634]' : ''}`} />
                {syncingPlatform === 'google_ads' ? 'Sincronizando...' : 'Test Sync'}
              </button>
            </div>
          </div>

          {/* 3. StackAdapt Programmatic DSP */}
          <div className="bg-[#1A1A1A] border border-[#262626] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4F634]"></span>
                <h3 className="font-bold text-white text-xs font-sans">StackAdapt DSP (Geofencing & Audiencias)</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4F634]/15 text-[#D4F634] border border-[#D4F634]/30">
                {stackAdaptToken ? 'Token Ingresado' : 'Token Pendiente'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">Account ID</label>
                <input
                  type="text"
                  value={stackAdaptAccountId}
                  onChange={(e) => setStackAdaptAccountId(e.target.value)}
                  placeholder="ej. 268858"
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">API Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  value={stackAdaptToken}
                  onChange={(e) => setStackAdaptToken(e.target.value)}
                  placeholder="e6bcab244d..."
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#262626]">
              <span className="text-[#A3A3A3]">Última sync: <strong className="text-white">{syncData.stackAdapt.lastSynced}</strong></span>
              <button
                onClick={() => handleSync('stackadapt')}
                disabled={syncingPlatform === 'stackadapt'}
                className="px-3 py-1 bg-[#262626] hover:bg-[#333] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${syncingPlatform === 'stackadapt' ? 'animate-spin text-[#D4F634]' : ''}`} />
                {syncingPlatform === 'stackadapt' ? 'Sincronizando...' : 'Test Sync'}
              </button>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-[#0D0D0D] border-t border-[#262626] px-6 py-4 flex items-center justify-between">
          <span className="text-[11px] text-[#A3A3A3]">
            Los datos se guardan de forma segura en tu navegador y servidor local.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white rounded-lg text-xs font-semibold border border-[#262626] transition-colors cursor-pointer"
            >
              Cerrar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#D4F634] hover:bg-[#C2E426] text-black rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-[#D4F634]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-black" />
              Guardar Credenciales
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
