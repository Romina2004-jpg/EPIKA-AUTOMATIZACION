import React, { useState, useEffect } from 'react';
import { 
  FunnelRow, 
  FunnelPeriod, 
  FunnelCalculations,
  FunnelHistoryEntry 
} from '../types';
import { UnifiedCampaignControlBar } from './UnifiedCampaignControlBar';
import { 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Download, 
  Edit3, 
  Check, 
  AlertCircle, 
  Info,
  DollarSign,
  History,
  MessageSquare,
  Clock,
  User,
  ArrowUpRight,
  TrendingUp,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

interface CommercialFunnelTableProps {
  period: FunnelPeriod;
  calculations: FunnelCalculations;
  onUpdateRows: (newRows: FunnelRow[]) => void;
  onSaveToBackend?: (entry?: FunnelHistoryEntry) => void;
}

export const CommercialFunnelTable: React.FC<CommercialFunnelTableProps> = ({
  period,
  calculations,
  onUpdateRows,
  onSaveToBackend
}) => {
  const [rows, setRows] = useState<FunnelRow[]>(period.rows);
  const [showInversionColumn, setShowInversionColumn] = useState(true);
  const [showMetaMessagesColumns, setShowMetaMessagesColumns] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('Sincronizado');
  const [saveNote, setSaveNote] = useState('');
  
  // History log saved below the table
  const [historyLog, setHistoryLog] = useState<FunnelHistoryEntry[]>(() => {
    if (period.history && period.history.length > 0) return period.history;
    // Default initial baseline revision
    return [
      {
        id: `rev-initial-${period.id}`,
        timestamp: '18 Ago 2026, 09:30 AM',
        periodId: period.id,
        periodLabel: period.periodLabel,
        savedBy: 'Sierra Providencia (Base Inicial)',
        note: 'Carga inicial de plantilla con indicadores benchmark',
        snapshot: {
          totalLeads: 60,
          totalLeadsReales: 31,
          totalVisitas: 6,
          totalOfertas: 1,
          totalVentas: 0,
          totalInversion: 20400,
          totalMensajesConcretadosMeta: 11,
          cac: 0,
          rowsCount: 6
        },
        rows: JSON.parse(JSON.stringify(period.rows))
      }
    ];
  });

  // Sync state if period changes
  useEffect(() => {
    setRows(period.rows);
    if (period.history) {
      setHistoryLog(period.history);
    }
  }, [period]);

  // Recalculate automatic principal fuga
  const detectPrincipalFuga = (r: FunnelRow): string => {
    if (r.leadsTotales > 0 && r.leadsDatosReales / r.leadsTotales < 0.5) return '% calidad de datos';
    if (r.leadsDatosReales > 0 && r.mostroInteres / r.leadsDatosReales < 0.5) return '% interés inicial';
    if (r.mostroInteres > 0 && r.leadsVivos / r.mostroInteres < 0.5) return '% leads vivos';
    if (r.leadsVivos > 0 && r.visitas / r.leadsVivos < 0.4) return '% asistencia';
    if (r.visitas > 0 && r.habloOferta / r.visitas < 0.4) return '% interés en oferta';
    if (r.habloOferta > 0 && r.ofertas / r.habloOferta < 0.4) return '% oferta';
    if (r.ofertas > 0 && r.ventas / r.ofertas < 0.4) return '% cierre de oferta';
    return '% asistencia';
  };

  const handleCellChange = (id: string, field: keyof FunnelRow, value: string | number) => {
    const numVal = typeof value === 'number' ? value : parseFloat(value) || 0;
    const updated = rows.map(r => {
      if (r.id === id) {
        const newRow = { ...r, [field]: numVal };
        if (field !== 'detonador' && field !== 'principalFuga') {
          newRow.principalFuga = detectPrincipalFuga(newRow);
        }
        return newRow;
      }
      return r;
    });
    setRows(updated);
    onUpdateRows(updated);
    setAutoSaveStatus('Guardando cambios...');
    setTimeout(() => setAutoSaveStatus('Auto-guardado activo'), 1200);
  };

  const handleTextChange = (id: string, field: keyof FunnelRow, value: string) => {
    const updated = rows.map(r => r.id === id ? { ...r, [field]: value } : r);
    setRows(updated);
    onUpdateRows(updated);
  };

  const handleAddRow = () => {
    const newRow: FunnelRow = {
      id: `row-custom-${Date.now()}`,
      detonador: 'Nuevo Detonador / Campaña',
      leadsTotales: 0,
      leadsDatosReales: 0,
      mostroInteres: 0,
      leadsVivos: 0,
      visitas: 0,
      habloOferta: 0,
      ofertas: 0,
      ventas: 0,
      principalFuga: '% asistencia',
      inversion: 0,
      tipoDetonador: 'other',
      mensajesIniciados: 0,
      mensajesConcretados: 0
    };
    const updated = [...rows, newRow];
    setRows(updated);
    onUpdateRows(updated);
  };

  const handleDeleteRow = (id: string) => {
    if (rows.length <= 1) return;
    const updated = rows.filter(r => r.id !== id);
    setRows(updated);
    onUpdateRows(updated);
  };

  // Manual save with revision history entry saved below the data
  const handleSaveWithHistory = () => {
    onUpdateRows(rows);

    const now = new Date();
    const formattedTimestamp = now.toLocaleDateString('es-MX', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }) + ', ' + now.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });

    const newHistoryEntry: FunnelHistoryEntry = {
      id: `rev-${Date.now()}`,
      timestamp: formattedTimestamp,
      periodId: period.id,
      periodLabel: period.periodLabel,
      savedBy: 'Agencia Marketing Epika',
      note: saveNote.trim() || `Actualización manual (${rows.length} detonadores)`,
      snapshot: {
        totalLeads: calculations.totalLeads,
        totalLeadsReales: calculations.totalLeadsReales,
        totalVisitas: calculations.totalVisitas,
        totalOfertas: calculations.totalOfertas,
        totalVentas: calculations.totalVentas,
        totalInversion: calculations.totalInversion,
        totalMensajesConcretadosMeta: calculations.totalMensajesConcretadosMeta,
        cac: calculations.cac,
        rowsCount: rows.length
      },
      rows: JSON.parse(JSON.stringify(rows))
    };

    const updatedHistory = [newHistoryEntry, ...historyLog];
    setHistoryLog(updatedHistory);
    setSaveNote('');
    setSavedSuccess(true);
    setAutoSaveStatus('Guardado en historial');

    if (onSaveToBackend) {
      onSaveToBackend(newHistoryEntry);
    }

    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Restore a previous version from the history below
  const handleRestoreRevision = (entry: FunnelHistoryEntry) => {
    const clonedRows = JSON.parse(JSON.stringify(entry.rows));
    setRows(clonedRows);
    onUpdateRows(clonedRows);
    setSavedSuccess(true);
    setAutoSaveStatus(`Restaurada versión de ${entry.timestamp}`);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportCsv = () => {
    const headers = [
      'Detonador', 
      'Leads Totales', 
      'Leads Datos Reales', 
      'Conversaciones Iniciadas Meta',
      'Mensajes Concretados Meta',
      'Mostró Interés', 
      'Leads Siguen Vivos', 
      'Visitas', 
      'Habló de Oferta', 
      'Ofertas', 
      'Ventas', 
      'Inversión (MXN)', 
      'Principal Fuga'
    ];

    const csvRows = rows.map(r => [
      `"${r.detonador}"`,
      r.leadsTotales,
      r.leadsDatosReales,
      r.mensajesIniciados !== undefined ? r.mensajesIniciados : (r.detonador.toLowerCase().includes('face') || r.detonador.toLowerCase().includes('insta') ? r.leadsTotales : '-'),
      r.mensajesConcretados !== undefined ? r.mensajesConcretados : (r.detonador.toLowerCase().includes('face') || r.detonador.toLowerCase().includes('insta') ? r.leadsDatosReales : '-'),
      r.mostroInteres,
      r.leadsVivos,
      r.visitas,
      r.habloOferta,
      r.ofertas,
      r.ventas,
      r.inversion,
      `"${r.principalFuga}"`
    ]);

    const totalRow = [
      '"TOTAL"',
      calculations.totalLeads,
      calculations.totalLeadsReales,
      calculations.totalMensajesIniciadosMeta,
      calculations.totalMensajesConcretadosMeta,
      calculations.totalMostroInteres,
      calculations.totalLeadsVivos,
      calculations.totalVisitas,
      calculations.totalHabloOferta,
      calculations.totalOfertas,
      calculations.totalVentas,
      calculations.totalInversion,
      '"% interés en oferta"'
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...csvRows.map(e => e.join(',')), totalRow.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Embudo_Comercial_Epika_${period.periodLabel.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 text-slate-800">
      
      {/* Top Action Toolbar in Crisp Light */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D4F634] border border-black text-black flex items-center justify-center font-black text-base shrink-0 shadow-xs">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight font-sans">
                Plantilla de Embudo Comercial (Sierra Providencia)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-100 text-lime-900 border border-lime-300 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-600"></span>
                {autoSaveStatus}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Llenado manual con cálculo instantáneo de indicadores y registro de histórico guardado abajo.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => setShowMetaMessagesColumns(!showMetaMessagesColumns)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showMetaMessagesColumns 
                ? 'bg-[#D4F634] text-black border-black shadow-xs' 
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
            title="Mostrar u ocultar desglose de mensajes concretados en Meta"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{showMetaMessagesColumns ? 'Mensajes Meta' : 'Ver Mensajes Meta'}</span>
          </button>

          <button
            onClick={() => setShowInversionColumn(!showInversionColumn)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showInversionColumn 
                ? 'bg-[#D4F634] text-black border-black shadow-xs' 
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
            title="Mostrar u ocultar columna de presupuesto invertido"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{showInversionColumn ? 'Inversión MXN' : 'Ver Inversión'}</span>
          </button>

          <button
            onClick={handleAddRow}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-900" />
            <span>Agregar Fila</span>
          </button>

          <button
            onClick={handleSaveWithHistory}
            className="text-xs px-4 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#c5e628] text-black font-black flex items-center gap-1.5 transition-all shadow-sm active:scale-95 border border-black cursor-pointer"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-black" /> : <Save className="w-3.5 h-3.5 text-black" />}
            <span>{savedSuccess ? '¡Guardado!' : 'Guardar en Historial'}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
            title="Descargar archivo CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Multi-Platform Campaign Selector (Meta Ads, Google Ads, StackAdapt DSP) */}
      <UnifiedCampaignControlBar />

      {/* =========================================================================
          THE EXACT "PLANTILLA DE EMBUDO COMERCIAL" (SIERRA PROVIDENCIA - EPIKA)
          ========================================================================= */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
        
        {/* Top Header matching screenshot */}
        <div className="bg-slate-900 text-white text-center py-3 px-4 font-black tracking-wider text-sm sm:text-base uppercase flex items-center justify-center gap-2">
          <span>PLANTILLA DE EMBUDO COMERCIAL</span>
        </div>

        {/* Project Name & Date Range Bar matching screenshot */}
        <div className="bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-800 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          <div className="w-full sm:w-1/2 p-2.5 flex items-center gap-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Proyecto / desarrollo:</span>
            <span className="bg-[#D4F634] text-black border border-black px-3.5 py-0.5 rounded font-black tracking-wide shadow-xs uppercase">
              Epika Chapultepec
            </span>
          </div>
          <div className="w-full sm:w-1/2 p-2.5 sm:text-center text-slate-500 font-medium font-mono text-[11px]">
            {period.periodLabel} ({period.dateRange})
          </div>
        </div>

        {/* The Commercial Funnel Table in Crisp Light */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-xs">
            
            {/* Primary Table Headers */}
            <thead>
              <tr className="bg-slate-100 text-[10px] text-slate-600 uppercase font-bold border-b border-slate-200">
                <th className="py-2.5 px-3 text-left min-w-[170px] border-r border-slate-200">Detonador</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-slate-200">Leads totales</th>
                <th className="py-2.5 px-2 min-w-[85px] border-r border-slate-200">Leads con datos reales</th>
                
                {/* Meta Mensajes Columns */}
                {showMetaMessagesColumns && (
                  <>
                    <th className="py-2.5 px-2 min-w-[85px] border-r border-slate-200 bg-lime-50 text-lime-900 font-bold" title="Conversaciones de mensajería iniciadas (dato directo de la columna de campaña en Meta Ads)">
                      Conversaciones Iniciadas (Meta)
                    </th>
                    <th className="py-2.5 px-2 min-w-[85px] border-r border-slate-200 bg-slate-50 text-slate-900 font-bold" title="Mensajes donde el prospecto respondió y compartió datos reales">
                      Mensajes Concretados (Meta)
                    </th>
                  </>
                )}

                <th className="py-2.5 px-2 min-w-[65px] border-r border-slate-200">Mostró interés</th>
                <th className="py-2.5 px-2 min-w-[75px] border-r border-slate-200">Leads siguen vivos</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-slate-200">Visitas</th>
                <th className="py-2.5 px-2 min-w-[85px] border-r border-slate-200">Habló de hacer una oferta</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-slate-200">Ofertas</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-slate-200">Ventas</th>
                {showInversionColumn && (
                  <th className="py-2.5 px-2 min-w-[85px] border-r border-slate-200 bg-slate-50">Inversión (MXN)</th>
                )}
                <th className="py-2.5 px-3 min-w-[130px] bg-slate-50">Principal fuga</th>
                <th className="py-2.5 px-1.5 w-8 bg-slate-50"></th>
              </tr>

              {/* Indicador / Target Row (exact screenshot values: 133 | 80 | 64 | 48 | 10 | 6 | 2 | 1) */}
              <tr className="bg-slate-50 text-slate-600 font-bold text-xs border-b border-slate-200">
                <td className="py-2 px-3 text-left font-bold border-r border-slate-200 text-slate-900 italic">
                  Indicador
                </td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900">133</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-emerald-700 font-extrabold">80</td>
                
                {showMetaMessagesColumns && (
                  <>
                    <td className="py-2 px-2 border-r border-slate-200 font-mono text-emerald-700 text-[11px]" title="Objetivo Meta: Conversaciones de mensajería iniciadas">
                      80
                    </td>
                    <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900 text-[11px]" title="Objetivo Meta: Concreción con datos reales (60%)">
                      48 (60%)
                    </td>
                  </>
                )}

                <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900">64</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900">48</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900">10</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900">6</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-slate-900">2</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono text-emerald-700 font-extrabold">1</td>
                {showInversionColumn && (
                  <td className="py-2 px-2 border-r border-slate-200 font-mono text-[11px] text-emerald-700">
                    Presupuesto
                  </td>
                )}
                <td className="py-2 px-3 bg-slate-100 text-slate-800 font-semibold text-xs">
                  % asistencia
                </td>
                <td className="bg-slate-50"></td>
              </tr>
            </thead>

            {/* Editable Channel Rows */}
            <tbody className="divide-y divide-slate-200 bg-white">
              {rows.map((row) => {
                const isMetaChannel = row.detonador.toLowerCase().includes('facebook') || 
                                      row.detonador.toLowerCase().includes('instagram') || 
                                      row.detonador.toLowerCase().includes('meta') ||
                                      row.tipoDetonador === 'meta_forms' ||
                                      row.tipoDetonador === 'whatsapp';

                return (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors text-slate-900 font-medium">
                    
                    {/* Detonador Name */}
                    <td className="py-2.5 px-3 text-left border-r border-slate-200 font-bold">
                      <input
                        type="text"
                        value={row.detonador}
                        onChange={(e) => handleTextChange(row.id, 'detonador', e.target.value)}
                        className="w-full bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded px-1.5 py-0.5 text-xs font-bold text-slate-900 border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Leads totales */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.leadsTotales}
                        onChange={(e) => handleCellChange(row.id, 'leadsTotales', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Leads con datos reales */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.leadsDatosReales}
                        onChange={(e) => handleCellChange(row.id, 'leadsDatosReales', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-emerald-700 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Meta Messaging Columns */}
                    {showMetaMessagesColumns && (
                      <>
                        {/* Conversaciones Iniciadas (Meta Ads Manager Campaign Column) */}
                        <td className="py-2.5 px-1 border-r border-slate-200 bg-lime-50/50">
                          {isMetaChannel ? (
                            <input
                              type="number"
                              min="0"
                              value={row.mensajesIniciados !== undefined ? row.mensajesIniciados : row.leadsTotales}
                              onChange={(e) => handleCellChange(row.id, 'mensajesIniciados', e.target.value)}
                              className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-lime-900 font-bold border border-transparent hover:border-slate-300"
                              title="Conversaciones de mensajería iniciadas en Meta (dato oficial de campaña)"
                            />
                          ) : (
                            <span className="text-slate-400 text-xs font-mono">-</span>
                          )}
                        </td>

                        {/* Mensajes Concretados (Meta) */}
                        <td className="py-2.5 px-1 border-r border-slate-200 bg-slate-50">
                          {isMetaChannel ? (
                            <input
                              type="number"
                              min="0"
                              value={row.mensajesConcretados !== undefined ? row.mensajesConcretados : row.leadsDatosReales}
                              onChange={(e) => handleCellChange(row.id, 'mensajesConcretados', e.target.value)}
                              className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                              title="Mensajes donde el cliente respondió y concretó datos reales"
                            />
                          ) : (
                            <span className="text-slate-400 text-xs font-mono">-</span>
                          )}
                        </td>
                      </>
                    )}

                    {/* Mostró interés */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.mostroInteres}
                        onChange={(e) => handleCellChange(row.id, 'mostroInteres', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Leads siguen vivos */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.leadsVivos}
                        onChange={(e) => handleCellChange(row.id, 'leadsVivos', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Visitas */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.visitas}
                        onChange={(e) => handleCellChange(row.id, 'visitas', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Habló de hacer una oferta */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.habloOferta}
                        onChange={(e) => handleCellChange(row.id, 'habloOferta', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Ofertas */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.ofertas}
                        onChange={(e) => handleCellChange(row.id, 'ofertas', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-slate-900 font-bold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Ventas */}
                    <td className="py-2.5 px-1 border-r border-slate-200">
                      <input
                        type="number"
                        min="0"
                        value={row.ventas}
                        onChange={(e) => handleCellChange(row.id, 'ventas', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 font-mono text-emerald-700 font-extrabold border border-transparent hover:border-slate-300"
                      />
                    </td>

                    {/* Inversión */}
                    {showInversionColumn && (
                      <td className="py-2.5 px-1 border-r border-slate-200 bg-slate-50">
                        <div className="flex items-center justify-center font-mono">
                          <span className="text-slate-400 text-[10px] mr-0.5">$</span>
                          <input
                            type="number"
                            min="0"
                            value={row.inversion}
                            onChange={(e) => handleCellChange(row.id, 'inversion', e.target.value)}
                            className="w-16 text-right bg-transparent hover:bg-slate-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-slate-400 rounded py-0.5 text-slate-900 font-bold border border-transparent hover:border-slate-300"
                          />
                        </div>
                      </td>
                    )}

                    {/* Principal fuga */}
                    <td className="py-2.5 px-3 border-r border-slate-200 bg-slate-50 text-slate-900 font-medium">
                      <select
                        value={row.principalFuga}
                        onChange={(e) => handleTextChange(row.id, 'principalFuga', e.target.value)}
                        className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                      >
                        <option value="% calidad de datos" className="bg-white text-slate-900">% calidad de datos</option>
                        <option value="% interés inicial" className="bg-white text-slate-900">% interés inicial</option>
                        <option value="% leads vivos" className="bg-white text-slate-900">% leads vivos</option>
                        <option value="% asistencia" className="bg-white text-slate-900">% asistencia</option>
                        <option value="% interés en oferta" className="bg-white text-slate-900">% interés en oferta</option>
                        <option value="% oferta" className="bg-white text-slate-900">% oferta</option>
                        <option value="% cierre de oferta" className="bg-white text-slate-900">% cierre de oferta</option>
                      </select>
                    </td>

                    {/* Delete Row Button */}
                    <td className="py-2.5 px-1 bg-white">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Eliminar fila"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}

              {/* TOTAL ROW in Crisp Light */}
              <tr className="bg-slate-100 text-slate-900 font-extrabold text-[13px] border-t-2 border-slate-300">
                <td className="py-3 px-3 text-left border-r border-slate-200 font-black tracking-wider text-slate-900">
                  TOTAL
                </td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono">{calculations.totalLeads}</td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono text-emerald-700">{calculations.totalLeadsReales}</td>
                
                {showMetaMessagesColumns && (
                  <>
                    <td className="py-3 px-2 border-r border-slate-200 font-mono text-lime-950 bg-lime-100/70" title="Total Conversaciones de Mensajería Iniciadas en Meta (Columna Campañas)">
                      {calculations.totalMensajesIniciadosMeta}
                    </td>
                    <td className="py-3 px-2 border-r border-slate-200 font-mono text-slate-900 bg-slate-200/60" title="Total Mensajes Concretados (Tasa de Concreción)">
                      {calculations.totalMensajesConcretadosMeta}{' '}
                      <span className="text-[10px] text-slate-600 font-normal">
                        ({calculations.pctMensajesConcretadosMeta.toFixed(0)}%)
                      </span>
                    </td>
                  </>
                )}

                <td className="py-3 px-2 border-r border-slate-200 font-mono">{calculations.totalMostroInteres}</td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono">{calculations.totalLeadsVivos}</td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono text-slate-900">{calculations.totalVisitas}</td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono">{calculations.totalHabloOferta}</td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono">{calculations.totalOfertas}</td>
                <td className="py-3 px-2 border-r border-slate-200 font-mono text-emerald-700">{calculations.totalVentas}</td>
                {showInversionColumn && (
                  <td className="py-3 px-2 border-r border-slate-200 font-mono font-bold text-slate-900 bg-slate-200/50">
                    ${calculations.totalInversion.toLocaleString('es-MX')}
                  </td>
                )}
                <td className="py-3 px-3 bg-slate-100 text-slate-900 font-extrabold">
                  % interés en oferta
                </td>
                <td className="bg-slate-100"></td>
              </tr>
            </tbody>

          </table>
        </div>

        {/* =========================================================================
            LOWER SECTION 1: % CONVERSIÓN VS ETAPA ANTERIOR
            ========================================================================= */}
        <div className="border-t-2 border-slate-200 overflow-x-auto bg-white">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-[10px] text-slate-600 uppercase font-bold border-b border-slate-200">
                <th className="py-2.5 px-4 text-left min-w-[200px] border-r border-slate-200"></th>
                <th className="py-2 px-2 min-w-[100px] border-r border-slate-200">% calidad de datos</th>
                <th className="py-2 px-2 min-w-[100px] border-r border-slate-200">% interés inicial</th>
                <th className="py-2 px-2 min-w-[100px] border-r border-slate-200">% leads vivos</th>
                <th className="py-2 px-2 min-w-[100px] border-r border-slate-200">% asistencia</th>
                <th className="py-2 px-2 min-w-[105px] border-r border-slate-200">% interés en oferta</th>
                <th className="py-2 px-2 min-w-[90px] border-r border-slate-200">% oferta</th>
                <th className="py-2 px-2 min-w-[100px]">% cierre de oferta</th>
              </tr>

              {/* Benchmark Indicador row from screenshot: 60% | 80% | 75% | 21% | 60% | 33% | 50% */}
              <tr className="bg-slate-50 text-slate-600 font-bold text-[12px] border-b border-slate-200">
                <td className="py-2 px-4 text-right border-r border-slate-200 font-bold italic text-slate-900">
                  Indicador
                </td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono">60%</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono">80%</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono">75%</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono">21%</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono">60%</td>
                <td className="py-2 px-2 border-r border-slate-200 font-mono">33%</td>
                <td className="py-2 px-2 font-mono">50%</td>
              </tr>
            </thead>

            {/* Calculated Conversion vs Previous Stage */}
            <tbody className="bg-white font-bold text-slate-900">
              <tr className="border-b border-slate-200">
                <td className="py-2.5 px-4 text-left border-r border-slate-200 font-extrabold text-slate-900">
                  Conversión vs. etapa anterior
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono text-emerald-700">
                  {calculations.pctCalidadDatos.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctInteresInicial.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctLeadsVivos.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono text-slate-900">
                  {calculations.pctAsistencia.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctInteresOferta.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctOferta.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 font-mono text-emerald-700">
                  {calculations.pctCierreOferta.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* =========================================================================
            LOWER SECTION 2: % CONVERSIÓN ACUMULADA
            ========================================================================= */}
        <div className="border-t border-slate-200 overflow-x-auto bg-white">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold text-[12px] border-b border-slate-200">
                <td className="py-2 px-4 text-right min-w-[200px] border-r border-slate-200 font-bold italic text-slate-900">
                  Indicador
                </td>
                <td className="py-2 px-2 min-w-[100px] border-r border-slate-200 font-mono">100%</td>
                <td className="py-2 px-2 min-w-[100px] border-r border-slate-200 font-mono">80%</td>
                <td className="py-2 px-2 min-w-[100px] border-r border-slate-200 font-mono">60%</td>
                <td className="py-2 px-2 min-w-[100px] border-r border-slate-200 font-mono">13%</td>
                <td className="py-2 px-2 min-w-[105px] border-r border-slate-200 font-mono">8%</td>
                <td className="py-2 px-2 min-w-[90px] border-r border-slate-200 font-mono">3%</td>
                <td className="py-2 px-2 min-w-[100px] font-mono">1%</td>
              </tr>
            </thead>

            {/* Calculated Cumulative Conversion */}
            <tbody className="bg-white font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-4 text-left border-r border-slate-200 font-extrabold text-slate-900">
                  Conversión acumulada
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono text-emerald-700">
                  {calculations.pctAcumuladoLeadsReales.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctAcumuladoInteres.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctAcumuladoVivos.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono text-slate-900">
                  {calculations.pctAcumuladoVisitas.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctAcumuladoHabloOferta.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-slate-200 font-mono">
                  {calculations.pctAcumuladoOfertas.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 font-mono text-emerald-700">
                  {calculations.pctAcumuladoVentas.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* =========================================================================
          APARTADO DIRECTO ABAJO DE LOS DATOS: REGISTRO & HISTORIAL DE GUARDADOS
          ========================================================================= */}
      <section id="section-historial-guardados" className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2 font-sans">
                Historial de Registros & Versiones Guardadas del Embudo
              </h3>
              <p className="text-xs text-slate-500">
                Cada cambio guardado se registra aquí abajo con su snapshot de métricas, fecha exacta y opción de restauración.
              </p>
            </div>
          </div>

          <span className="text-xs text-slate-700 font-mono bg-slate-100 px-3 py-1 rounded border border-slate-200 self-start sm:self-auto font-bold">
            {historyLog.length} registro(s) almacenados
          </span>
        </div>

        {/* Quick Note & Save Form */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1">
            <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
              Guardar nueva revisión con nota descriptiva
            </label>
            <input
              type="text"
              placeholder="p. ej. Cierre de semana con 3 citas confirmadas en Showroom Epika"
              value={saveNote}
              onChange={(e) => setSaveNote(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>

          <button
            onClick={handleSaveWithHistory}
            className="w-full sm:w-auto mt-2 sm:mt-4 px-4 py-2 rounded-lg bg-[#D4F634] hover:bg-[#c5e628] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 shrink-0 border border-black cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar en Historial</span>
          </button>
        </div>

        {/* List of Saved Historical Versions */}
        <div className="space-y-3 pt-1">
          {historyLog.map((entry, index) => (
            <div 
              key={entry.id}
              className="bg-slate-50/70 border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center font-mono">
                    #{historyLog.length - index}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-600" />
                        {entry.timestamp}
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-300 font-bold">
                        {entry.savedBy}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-xs text-slate-600 mt-1 italic">
                        "{entry.note}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestoreRevision(entry)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold flex items-center gap-1.5 transition-colors border border-slate-300 cursor-pointer shadow-xs"
                    title="Cargar esta versión en la tabla superior"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Esta Versión</span>
                  </button>
                </div>

              </div>

              {/* Snapshot Metrics Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-3 text-center">
                
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Leads Totales</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{entry.snapshot.totalLeads}</span>
                </div>

                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Leads Reales</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">{entry.snapshot.totalLeadsReales}</span>
                </div>

                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Mensajes Meta</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{entry.snapshot.totalMensajesConcretadosMeta || 0}</span>
                </div>

                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Citas Showroom</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{entry.snapshot.totalVisitas}</span>
                </div>

                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Ventas</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">{entry.snapshot.totalVentas}</span>
                </div>

                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Inversión</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">${entry.snapshot.totalInversion.toLocaleString('es-MX')}</span>
                </div>

                <div className="bg-white p-2 rounded border border-slate-200 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">CAC Resultante</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">
                    {entry.snapshot.cac > 0 ? `$${entry.snapshot.cac.toLocaleString('es-MX')}` : 'N/A'}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Guide note in Crisp Light */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">Guía de Interpretación de Fuga Comercial Epika Chapultepec:</p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-600">
            <li><strong>% calidad de datos:</strong> Porcentaje de leads que cuentan con teléfono y nombre verídico según reporte de Sierra Providencia.</li>
            <li><strong>Mensajes Concretados (Meta):</strong> Conversaciones de WhatsApp / Direct donde el usuario respondió activamente con interés.</li>
            <li><strong>% asistencia:</strong> Porcentaje de prospectos con interés que asisten a cita presencial en el showroom.</li>
            <li><strong>% interés en oferta:</strong> Prospectos que tras la visita solicitan corrida financiera, cotización formal o apartado.</li>
            <li><strong>% cierre de oferta:</strong> Prospectos con oferta que firman contrato de compraventa y formalizan la venta.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};
