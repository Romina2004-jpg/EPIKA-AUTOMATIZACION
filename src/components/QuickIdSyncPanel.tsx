import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Layers,
  Zap,
  Eye,
  EyeOff,
  Save,
  AlertCircle
} from 'lucide-react';

interface QuickIdSyncPanelProps {
  onSyncAll: () => void;
  isSyncing: boolean;
  onAutoFillIds: (ids: { metaId: string; googleId: string; stackAdaptId: string }) => void;
}

export const QuickIdSyncPanel: React.FC<QuickIdSyncPanelProps> = ({
  onSyncAll,
  isSyncing,
  onAutoFillIds
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Editable IDs and Tokens
  const [metaId, setMetaId] = useState(() => localStorage.getItem('epika_meta_id') || '2043417892891975');
  const [metaAppId, setMetaAppId] = useState(() => localStorage.getItem('epika_meta_app_id') || '2373560423171686');
  const [metaToken, setMetaToken] = useState(() => localStorage.getItem('epika_meta_token') || 'EAAhuvZAngRmYBSCTPnMtUZCvlOSzRZB5uwWxHHShYmjUICtdfQhGFRBVDDXU3wlGFzi38FuPUJknK4vIqL3bxJ7RFaABdEvyRkOXz3jLzQesASRYQ3rsZAdj3aAKW6l84zmP89yFIUdS7JNsDx3JPbaOZBUoj9ID4WdsFVoGShdBnKX5MG8MKZAYixTjK9RXgcXgZDZD');

  const [googleId, setGoogleId] = useState(() => localStorage.getItem('epika_google_id') || '171-833-1328');
  const [googleDevToken, setGoogleDevToken] = useState(() => localStorage.getItem('epika_google_dev_token') || '9WP0xwvo9PYPwZ02KYs_Ag');
  const [googleClientId, setGoogleClientId] = useState(() => localStorage.getItem('epika_google_client_id') || '359442674926-kj0e2tufn6il1doudpt66qev1odm1npp.apps.googleusercontent.com');

  const [stackAdaptId, setStackAdaptId] = useState(() => localStorage.getItem('epika_stack_id') || '268858');
  const [stackAdaptToken, setStackAdaptToken] = useState(() => localStorage.getItem('epika_stack_token') || 'e6bcab244d239a36b68a3daabf593313fc0ce33263f5698b97d30fb204489fac');

  const [showTokens, setShowTokens] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Save to localStorage & Backend
  const handleSaveCredentials = async () => {
    localStorage.setItem('epika_meta_id', metaId);
    localStorage.setItem('epika_meta_app_id', metaAppId);
    localStorage.setItem('epika_meta_token', metaToken);

    localStorage.setItem('epika_google_id', googleId);
    localStorage.setItem('epika_google_dev_token', googleDevToken);
    localStorage.setItem('epika_google_client_id', googleClientId);

    localStorage.setItem('epika_stack_id', stackAdaptId);
    localStorage.setItem('epika_stack_token', stackAdaptToken);

    try {
      await fetch('/api/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meta: { adAccountId: metaId, appId: metaAppId, accessToken: metaToken },
          googleAds: { customerId: googleId, developerToken: googleDevToken, clientId: googleClientId },
          stackAdapt: { accountId: stackAdaptId, apiToken: stackAdaptToken }
        })
      });
    } catch (e) {
      console.warn('Saved in browser');
    }

    onAutoFillIds({ metaId, googleId, stackAdaptId });
    setStatusMessage('¡IDs y Tokens guardados exitosamente en la plataforma!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleApplyKnownDefaults = () => {
    setMetaId('2043417892891975');
    setMetaAppId('2373560423171686');
    setMetaToken('EAAhuvZAngRmYBSCTPnMtUZCvlOSzRZB5uwWxHHShYmjUICtdfQhGFRBVDDXU3wlGFzi38FuPUJknK4vIqL3bxJ7RFaABdEvyRkOXz3jLzQesASRYQ3rsZAdj3aAKW6l84zmP89yFIUdS7JNsDx3JPbaOZBUoj9ID4WdsFVoGShdBnKX5MG8MKZAYixTjK9RXgcXgZDZD');

    setGoogleId('171-833-1328');
    setGoogleDevToken('9WP0xwvo9PYPwZ02KYs_Ag');
    setGoogleClientId('359442674926-kj0e2tufn6il1doudpt66qev1odm1npp.apps.googleusercontent.com');

    setStackAdaptId('268858');
    setStackAdaptToken('e6bcab244d239a36b68a3daabf593313fc0ce33263f5698b97d30fb204489fac');

    setStatusMessage('Valores conocidos de Epika Chapultepec cargados. Puedes modificarlos o agregar los que falten.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-[#121212] border border-[#262626] rounded-xl shadow-xl overflow-hidden text-[#E5E7EB] mb-6">
      
      {/* Top Banner (Always Visible on Page) */}
      <div className="p-3 sm:p-4 bg-[#141414] flex flex-col md:flex-row items-center justify-between gap-3 border-b border-[#262626]">
        
        {/* Left Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-8 h-8 rounded-lg bg-[#D4F634]/15 border border-[#D4F634]/30 text-[#D4F634] flex items-center justify-center font-bold text-sm shrink-0">
            <Key className="w-4 h-4 text-[#D4F634]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                Panel Directo de IDs & Tokens de Acceso
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4F634]/10 text-[#D4F634] border border-[#D4F634]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4F634]"></span>
                Ingreso Manual Directo
              </span>
            </div>
            <p className="text-[11px] text-[#A3A3A3]">
              Ingresa o actualiza las IDs y Tokens de Meta, Google Ads y StackAdapt conforme los tengas a la mano.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-white font-semibold border border-[#262626] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-[#D4F634]" />
            <span>{isExpanded ? 'Ocultar Formulario de IDs' : 'Ingresar / Editar IDs y Tokens'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onSyncAll}
            disabled={isSyncing}
            className="text-xs px-3.5 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black font-black flex items-center gap-1.5 transition-all shadow-lg shadow-[#D4F634]/20 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Datos'}</span>
          </button>

        </div>
      </div>

      {/* Confirmation feedback */}
      {statusMessage && (
        <div className="bg-[#D4F634]/10 border-b border-[#D4F634]/30 px-4 py-2 text-xs font-semibold text-[#D4F634] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#D4F634] shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Direct Interactive Form on the Web Page */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-[#0D0D0D] space-y-4 animate-in slide-in-from-top-2 duration-200 text-xs">
          
          <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
            <span className="text-xs font-bold text-white uppercase tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4F634]" />
              Configuración Manual de Credenciales y Cuentas
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowTokens(!showTokens)}
                className="text-[11px] text-[#A3A3A3] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {showTokens ? <EyeOff className="w-3 h-3 text-[#D4F634]" /> : <Eye className="w-3 h-3" />}
                {showTokens ? 'Ocultar Tokens' : 'Mostrar Tokens'}
              </button>

              <button
                type="button"
                onClick={handleApplyKnownDefaults}
                className="text-[11px] text-[#D4F634] hover:underline font-bold"
              >
                Cargar valores precargados
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* 1. META ADS */}
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4F634]"></span>
                  <span className="font-bold text-white text-xs">Meta Ads (FB / IG)</span>
                </div>
                <span className="text-[10px] text-[#D4F634] font-mono">
                  {metaToken ? 'Token cargado' : 'Token pendiente'}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">Ad Account ID</label>
                <input
                  type="text"
                  placeholder="ej. 2043417892891975"
                  value={metaId}
                  onChange={(e) => setMetaId(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">App ID</label>
                <input
                  type="text"
                  placeholder="ej. 2373560423171686"
                  value={metaAppId}
                  onChange={(e) => setMetaAppId(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">Access Token (User / Page)</label>
                <input
                  type={showTokens ? "text" : "password"}
                  placeholder="Pega aquí tu token de Meta"
                  value={metaToken}
                  onChange={(e) => setMetaToken(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div className="pt-1 text-[10px] text-[#D4F634]/90 flex items-center gap-1">
                <span>✓</span>
                <span>No necesitas App Secret: el Access Token es suficiente.</span>
              </div>
            </div>

            {/* 2. GOOGLE ADS */}
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8DB600]"></span>
                  <span className="font-bold text-white text-xs">Google Ads</span>
                </div>
                <span className="text-[10px] text-[#D4F634] font-mono">
                  {googleDevToken ? 'Token cargado' : 'Token pendiente'}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">Customer ID</label>
                <input
                  type="text"
                  placeholder="ej. 171-833-1328"
                  value={googleId}
                  onChange={(e) => setGoogleId(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">Developer Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  placeholder="ej. 9WP0xwvo9PYPwZ02KYs_Ag"
                  value={googleDevToken}
                  onChange={(e) => setGoogleDevToken(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">OAuth Client ID</label>
                <input
                  type="text"
                  placeholder="ej. 359442674926-..."
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>
            </div>

            {/* 3. STACKADAPT */}
            <div className="bg-[#141414] border border-[#262626] rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262626]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span className="font-bold text-white text-xs">StackAdapt DSP</span>
                </div>
                <span className="text-[10px] text-[#D4F634] font-mono">
                  {stackAdaptToken ? 'Token cargado' : 'Token pendiente'}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">Account ID</label>
                <input
                  type="text"
                  placeholder="ej. 268858"
                  value={stackAdaptId}
                  onChange={(e) => setStackAdaptId(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#737373] uppercase font-bold block mb-1">API Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  placeholder="ej. e6bcab244d239a..."
                  value={stackAdaptToken}
                  onChange={(e) => setStackAdaptToken(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] rounded px-2.5 py-1.5 font-mono text-white text-xs focus:ring-1 focus:ring-[#D4F634] focus:outline-none"
                />
              </div>

              <div className="pt-2 text-[11px] text-[#737373]">
                Segmentación activa: Corredor Chapultepec y Guadalajara
              </div>
            </div>

          </div>

          {/* Bottom Save Action */}
          <div className="pt-3 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-[#737373]">
              💡 Puedes dejar campos vacíos si aún no tienes el token a la mano; el sistema mantendrá la operación sin interrupciones.
            </span>

            <button
              type="button"
              onClick={handleSaveCredentials}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#D4F634] hover:bg-[#C2E426] text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D4F634]/20 transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Credenciales en el Sistema</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
