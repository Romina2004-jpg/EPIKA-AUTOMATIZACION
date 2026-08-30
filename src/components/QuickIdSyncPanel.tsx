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

  const [googleId, setGoogleId] = useState(() => localStorage.getItem('epika_google_id') || '453-930-3033');
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

    setGoogleId('453-930-3033');
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
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden text-slate-800 mb-6">
      
      {/* Top Banner (Always Visible on Page) */}
      <div className="p-3 sm:p-4 bg-slate-50/80 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-200">
        
        {/* Left Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
            <Key className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">
                Panel Directo de IDs & Tokens de Acceso
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Ingreso Manual Directo
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Ingresa o actualiza las IDs y Tokens de Meta, Google Ads y StackAdapt conforme los tengas a la mano.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isExpanded ? 'Ocultar Formulario de IDs' : 'Ingresar / Editar IDs y Tokens'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onSyncAll}
            disabled={isSyncing}
            className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Datos'}</span>
          </button>

        </div>
      </div>

      {/* Confirmation feedback */}
      {statusMessage && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Direct Interactive Form on the Web Page */}
      {isExpanded && (
        <div className="p-4 sm:p-5 bg-white space-y-4 animate-in slide-in-from-top-2 duration-200 text-xs">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Configuración Manual de Credenciales y Cuentas
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowTokens(!showTokens)}
                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                {showTokens ? <EyeOff className="w-3 h-3 text-emerald-600" /> : <Eye className="w-3 h-3" />}
                {showTokens ? 'Ocultar Tokens' : 'Mostrar Tokens'}
              </button>

              <button
                type="button"
                onClick={handleApplyKnownDefaults}
                className="text-[11px] text-emerald-700 hover:underline font-bold"
              >
                Cargar valores precargados
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* 1. META ADS */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="font-bold text-slate-900 text-xs">Meta Ads (FB / IG)</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-medium">
                  {metaToken ? 'Token cargado' : 'Token pendiente'}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Ad Account ID</label>
                <input
                  type="text"
                  placeholder="ej. 2043417892891975"
                  value={metaId}
                  onChange={(e) => setMetaId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">App ID</label>
                <input
                  type="text"
                  placeholder="ej. 2373560423171686"
                  value={metaAppId}
                  onChange={(e) => setMetaAppId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Access Token (User / Page)</label>
                <input
                  type={showTokens ? "text" : "password"}
                  placeholder="Pega aquí tu token de Meta"
                  value={metaToken}
                  onChange={(e) => setMetaToken(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-1 text-[10px] text-emerald-800 flex items-center gap-1">
                <span>✓</span>
                <span>No necesitas App Secret: el Access Token es suficiente.</span>
              </div>
            </div>

            {/* 2. GOOGLE ADS */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-bold text-slate-900 text-xs">Google Ads</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-medium">
                  {googleDevToken ? 'Token cargado' : 'Token pendiente'}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Customer ID</label>
                <input
                  type="text"
                  placeholder="ej. 453-930-3033"
                  value={googleId}
                  onChange={(e) => setGoogleId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Developer Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  placeholder="ej. 9WP0xwvo9PYPwZ02KYs_Ag"
                  value={googleDevToken}
                  onChange={(e) => setGoogleDevToken(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">OAuth Client ID</label>
                <input
                  type="text"
                  placeholder="ej. 359442674926-..."
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 3. STACKADAPT */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  <span className="font-bold text-slate-900 text-xs">StackAdapt DSP</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono font-medium">
                  {stackAdaptToken ? 'Token cargado' : 'Token pendiente'}
                </span>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Account ID</label>
                <input
                  type="text"
                  placeholder="ej. 268858"
                  value={stackAdaptId}
                  onChange={(e) => setStackAdaptId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">API Token</label>
                <input
                  type={showTokens ? "text" : "password"}
                  placeholder="ej. e6bcab244d239a..."
                  value={stackAdaptToken}
                  onChange={(e) => setStackAdaptToken(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 font-mono text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 text-[11px] text-slate-500">
                Segmentación activa: Corredor Chapultepec y Guadalajara
              </div>
            </div>

          </div>

          {/* Bottom Save Action */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500">
              💡 Puedes dejar campos vacíos si aún no tienes el token a la mano; el sistema mantendrá la operación sin interrupciones.
            </span>

            <button
              type="button"
              onClick={handleSaveCredentials}
              className="w-full sm:w-auto px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span>Guardar Credenciales en el Sistema</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
