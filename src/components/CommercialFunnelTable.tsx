import React, { useState, useEffect } from 'react';
import { 
  FunnelRow, 
  FunnelPeriod, 
  FunnelCalculations,
  FunnelHistoryEntry 
} from '../types';
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
    <div className="space-y-6 pb-12 text-[#E5E7EB]">
      
      {/* Top Action Toolbar in Elegant Dark */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#121212] p-4 rounded-xl border border-[#262626] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D4F634] border border-black text-black flex items-center justify-center font-black text-base shrink-0 shadow-xs">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight font-sans">
                Plantilla de Embudo Comercial (Sierra Providencia)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4F634]/15 text-[#D4F634] border border-[#D4F634]/30 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4F634]"></span>
                {autoSaveStatus}
              </span>
            </div>
            <p className="text-xs text-[#A3A3A3]">
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
                : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#262626] hover:bg-[#262626]'
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
                : 'bg-[#1A1A1A] text-[#A3A3A3] border-[#262626] hover:bg-[#262626]'
            }`}
            title="Mostrar u ocultar columna de presupuesto invertido"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{showInversionColumn ? 'Inversión MXN' : 'Ver Inversión'}</span>
          </button>

          <button
            onClick={handleAddRow}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-white font-bold flex items-center gap-1.5 border border-[#262626] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#D4F634]" />
            <span>Agregar Fila</span>
          </button>

          <button
            onClick={handleSaveWithHistory}
            className="text-xs px-4 py-1.5 rounded-lg bg-[#D4F634] hover:bg-[#c5e628] text-black font-black flex items-center gap-1.5 transition-all shadow-md active:scale-95 border border-black cursor-pointer"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-black" /> : <Save className="w-3.5 h-3.5 text-black" />}
            <span>{savedSuccess ? '¡Guardado!' : 'Guardar en Historial'}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#262626] text-[#A3A3A3] hover:text-white font-semibold flex items-center gap-1.5 border border-[#262626] transition-colors cursor-pointer"
            title="Descargar archivo CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          THE EXACT "PLANTILLA DE EMBUDO COMERCIAL" (SIERRA PROVIDENCIA - EPIKA)
          ========================================================================= */}
      <div className="bg-[#121212] rounded-xl shadow-2xl border border-[#262626] overflow-hidden font-sans">
        
        {/* Top Dark Header matching screenshot */}
        <div className="bg-[#0D0D0D] border-b border-[#262626] text-white text-center py-3 px-4 font-black tracking-wider text-sm sm:text-base uppercase flex items-center justify-center gap-2">
          <span>PLANTILLA DE EMBUDO COMERCIAL</span>
        </div>

        {/* Project Name & Date Range Bar matching screenshot */}
        <div className="bg-[#1A1A1A] border-b border-[#262626] flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5E7EB] divide-y sm:divide-y-0 sm:divide-x divide-[#262626]">
          <div className="w-full sm:w-1/2 p-2.5 flex items-center gap-2">
            <span className="text-[#A3A3A3] font-bold uppercase tracking-wider text-[11px]">Proyecto / desarrollo:</span>
            <span className="bg-[#D4F634] text-black border border-black px-3.5 py-0.5 rounded font-black tracking-wide shadow-xs uppercase">
              Epika Chapultepec
            </span>
          </div>
          <div className="w-full sm:w-1/2 p-2.5 sm:text-center text-[#A3A3A3] font-medium font-mono text-[11px]">
            {period.periodLabel} ({period.dateRange})
          </div>
        </div>

        {/* The Commercial Funnel Table in Elegant Dark */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-xs">
            
            {/* Primary Table Headers */}
            <thead>
              <tr className="bg-[#1A1A1A] text-[10px] text-[#A3A3A3] uppercase font-bold border-b border-[#262626]">
                <th className="py-2.5 px-3 text-left min-w-[170px] border-r border-[#262626]">Detonador</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-[#262626]">Leads totales</th>
                <th className="py-2.5 px-2 min-w-[85px] border-r border-[#262626]">Leads con datos reales</th>
                
                {/* Meta Mensajes Columns */}
                {showMetaMessagesColumns && (
                  <>
                    <th className="py-2.5 px-2 min-w-[85px] border-r border-[#262626] bg-[#161616] text-[#D4F634]" title="Conversaciones de mensajería iniciadas (dato directo de la columna de campaña en Meta Ads)">
                      Conversaciones Iniciadas (Meta)
                    </th>
                    <th className="py-2.5 px-2 min-w-[85px] border-r border-[#262626] bg-[#161616] text-white" title="Mensajes donde el prospecto respondió y compartió datos reales">
                      Mensajes Concretados (Meta)
                    </th>
                  </>
                )}

                <th className="py-2.5 px-2 min-w-[65px] border-r border-[#262626]">Mostró interés</th>
                <th className="py-2.5 px-2 min-w-[75px] border-r border-[#262626]">Leads siguen vivos</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-[#262626]">Visitas</th>
                <th className="py-2.5 px-2 min-w-[85px] border-r border-[#262626]">Habló de hacer una oferta</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-[#262626]">Ofertas</th>
                <th className="py-2.5 px-2 min-w-[65px] border-r border-[#262626]">Ventas</th>
                {showInversionColumn && (
                  <th className="py-2.5 px-2 min-w-[85px] border-r border-[#262626] bg-[#161616]">Inversión (MXN)</th>
                )}
                <th className="py-2.5 px-3 min-w-[130px] bg-[#161616]">Principal fuga</th>
                <th className="py-2.5 px-1.5 w-8 bg-[#161616]"></th>
              </tr>

              {/* Indicador / Target Row (exact screenshot values: 133 | 80 | 64 | 48 | 10 | 6 | 2 | 1) */}
              <tr className="bg-[#161616] text-[#A3A3A3] font-bold text-xs border-b border-[#262626]">
                <td className="py-2 px-3 text-left font-bold border-r border-[#262626] text-white italic">
                  Indicador
                </td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-white">133</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-[#D4F634]">80</td>
                
                {showMetaMessagesColumns && (
                  <>
                    <td className="py-2 px-2 border-r border-[#262626] font-mono text-[#D4F634] text-[11px]" title="Objetivo Meta: Conversaciones de mensajería iniciadas">
                      80
                    </td>
                    <td className="py-2 px-2 border-r border-[#262626] font-mono text-white text-[11px]" title="Objetivo Meta: Concreción con datos reales (60%)">
                      48 (60%)
                    </td>
                  </>
                )}

                <td className="py-2 px-2 border-r border-[#262626] font-mono text-white">64</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-white">48</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-white">10</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-white">6</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-white">2</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono text-[#D4F634]">1</td>
                {showInversionColumn && (
                  <td className="py-2 px-2 border-r border-[#262626] font-mono text-[11px] text-[#D4F634]">
                    Presupuesto
                  </td>
                )}
                <td className="py-2 px-3 bg-[#1A1A1A] text-[#D4F634] font-semibold text-xs">
                  % asistencia
                </td>
                <td className="bg-[#161616]"></td>
              </tr>
            </thead>

            {/* Editable Channel Rows */}
            <tbody className="divide-y divide-[#1F1F1F] bg-[#121212]">
              {rows.map((row) => {
                const isMetaChannel = row.detonador.toLowerCase().includes('facebook') || 
                                      row.detonador.toLowerCase().includes('instagram') || 
                                      row.detonador.toLowerCase().includes('meta') ||
                                      row.tipoDetonador === 'meta_forms' ||
                                      row.tipoDetonador === 'whatsapp';

                return (
                  <tr key={row.id} className="hover:bg-[#1A1A1A] transition-colors text-white font-medium">
                    
                    {/* Detonador Name */}
                    <td className="py-2.5 px-3 text-left border-r border-[#1F1F1F] font-bold">
                      <input
                        type="text"
                        value={row.detonador}
                        onChange={(e) => handleTextChange(row.id, 'detonador', e.target.value)}
                        className="w-full bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded px-1.5 py-0.5 text-xs font-bold text-white border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Leads totales */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.leadsTotales}
                        onChange={(e) => handleCellChange(row.id, 'leadsTotales', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Leads con datos reales */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.leadsDatosReales}
                        onChange={(e) => handleCellChange(row.id, 'leadsDatosReales', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-[#D4F634] font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Meta Messaging Columns */}
                    {showMetaMessagesColumns && (
                      <>
                        {/* Conversaciones Iniciadas (Meta Ads Manager Campaign Column) */}
                        <td className="py-2.5 px-1 border-r border-[#1F1F1F] bg-[#161616]">
                          {isMetaChannel ? (
                            <input
                              type="number"
                              min="0"
                              value={row.mensajesIniciados !== undefined ? row.mensajesIniciados : row.leadsTotales}
                              onChange={(e) => handleCellChange(row.id, 'mensajesIniciados', e.target.value)}
                              className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-[#D4F634] font-bold border border-transparent hover:border-[#333]"
                              title="Conversaciones de mensajería iniciadas en Meta (dato oficial de campaña)"
                            />
                          ) : (
                            <span className="text-[#525252] text-xs font-mono">-</span>
                          )}
                        </td>

                        {/* Mensajes Concretados (Meta) */}
                        <td className="py-2.5 px-1 border-r border-[#1F1F1F] bg-[#161616]">
                          {isMetaChannel ? (
                            <input
                              type="number"
                              min="0"
                              value={row.mensajesConcretados !== undefined ? row.mensajesConcretados : row.leadsDatosReales}
                              onChange={(e) => handleCellChange(row.id, 'mensajesConcretados', e.target.value)}
                              className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                              title="Mensajes donde el cliente respondió y concretó datos reales"
                            />
                          ) : (
                            <span className="text-[#525252] text-xs font-mono">-</span>
                          )}
                        </td>
                      </>
                    )}

                    {/* Mostró interés */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.mostroInteres}
                        onChange={(e) => handleCellChange(row.id, 'mostroInteres', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Leads siguen vivos */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.leadsVivos}
                        onChange={(e) => handleCellChange(row.id, 'leadsVivos', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Visitas */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.visitas}
                        onChange={(e) => handleCellChange(row.id, 'visitas', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Habló de hacer una oferta */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.habloOferta}
                        onChange={(e) => handleCellChange(row.id, 'habloOferta', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Ofertas */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.ofertas}
                        onChange={(e) => handleCellChange(row.id, 'ofertas', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-white font-bold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Ventas */}
                    <td className="py-2.5 px-1 border-r border-[#1F1F1F]">
                      <input
                        type="number"
                        min="0"
                        value={row.ventas}
                        onChange={(e) => handleCellChange(row.id, 'ventas', e.target.value)}
                        className="w-14 text-center bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 font-mono text-[#D4F634] font-extrabold border border-transparent hover:border-[#333]"
                      />
                    </td>

                    {/* Inversión */}
                    {showInversionColumn && (
                      <td className="py-2.5 px-1 border-r border-[#1F1F1F] bg-[#161616]">
                        <div className="flex items-center justify-center font-mono">
                          <span className="text-[#737373] text-[10px] mr-0.5">$</span>
                          <input
                            type="number"
                            min="0"
                            value={row.inversion}
                            onChange={(e) => handleCellChange(row.id, 'inversion', e.target.value)}
                            className="w-16 text-right bg-transparent hover:bg-[#1A1A1A] focus:bg-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#D4F634] rounded py-0.5 text-[#E5E7EB] font-bold border border-transparent hover:border-[#333]"
                          />
                        </div>
                      </td>
                    )}

                    {/* Principal fuga */}
                    <td className="py-2.5 px-3 border-r border-[#1F1F1F] bg-[#1A1A1A] text-white font-medium">
                      <select
                        value={row.principalFuga}
                        onChange={(e) => handleTextChange(row.id, 'principalFuga', e.target.value)}
                        className="bg-transparent text-xs font-bold text-[#D4F634] focus:outline-none cursor-pointer"
                      >
                        <option value="% calidad de datos" className="bg-[#121212] text-white">% calidad de datos</option>
                        <option value="% interés inicial" className="bg-[#121212] text-white">% interés inicial</option>
                        <option value="% leads vivos" className="bg-[#121212] text-white">% leads vivos</option>
                        <option value="% asistencia" className="bg-[#121212] text-white">% asistencia</option>
                        <option value="% interés en oferta" className="bg-[#121212] text-white">% interés en oferta</option>
                        <option value="% oferta" className="bg-[#121212] text-white">% oferta</option>
                        <option value="% cierre de oferta" className="bg-[#121212] text-white">% cierre de oferta</option>
                      </select>
                    </td>

                    {/* Delete Row Button */}
                    <td className="py-2.5 px-1 bg-[#121212]">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-[#525252] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        title="Eliminar fila"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}

              {/* TOTAL ROW in Elegant Dark */}
              <tr className="bg-[#1A1A1A] text-white font-extrabold text-[13px] border-t-2 border-[#262626]">
                <td className="py-3 px-3 text-left border-r border-[#262626] font-black tracking-wider text-[#D4F634]">
                  TOTAL
                </td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono">{calculations.totalLeads}</td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono text-[#D4F634]">{calculations.totalLeadsReales}</td>
                
                {showMetaMessagesColumns && (
                  <>
                    <td className="py-3 px-2 border-r border-[#262626] font-mono text-[#D4F634] bg-[#1E1E1E]" title="Total Conversaciones de Mensajería Iniciadas en Meta (Columna Campañas)">
                      {calculations.totalMensajesIniciadosMeta}
                    </td>
                    <td className="py-3 px-2 border-r border-[#262626] font-mono text-white bg-[#202020]" title="Total Mensajes Concretados (Tasa de Concreción)">
                      {calculations.totalMensajesConcretadosMeta}{' '}
                      <span className="text-[10px] text-[#D4F634] font-normal">
                        ({calculations.pctMensajesConcretadosMeta.toFixed(0)}%)
                      </span>
                    </td>
                  </>
                )}

                <td className="py-3 px-2 border-r border-[#262626] font-mono">{calculations.totalMostroInteres}</td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono">{calculations.totalLeadsVivos}</td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono text-white">{calculations.totalVisitas}</td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono">{calculations.totalHabloOferta}</td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono">{calculations.totalOfertas}</td>
                <td className="py-3 px-2 border-r border-[#262626] font-mono text-[#D4F634]">{calculations.totalVentas}</td>
                {showInversionColumn && (
                  <td className="py-3 px-2 border-r border-[#262626] font-mono font-bold text-white bg-[#222]">
                    ${calculations.totalInversion.toLocaleString('es-MX')}
                  </td>
                )}
                <td className="py-3 px-3 bg-[#1A1A1A] text-[#D4F634] font-extrabold">
                  % interés en oferta
                </td>
                <td className="bg-[#1A1A1A]"></td>
              </tr>
            </tbody>

          </table>
        </div>

        {/* =========================================================================
            LOWER SECTION 1: % CONVERSIÓN VS ETAPA ANTERIOR
            ========================================================================= */}
        <div className="border-t-2 border-[#262626] overflow-x-auto bg-[#121212]">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-[#1A1A1A] text-[10px] text-[#A3A3A3] uppercase font-bold border-b border-[#262626]">
                <th className="py-2.5 px-4 text-left min-w-[200px] border-r border-[#262626]"></th>
                <th className="py-2 px-2 min-w-[100px] border-r border-[#262626]">% calidad de datos</th>
                <th className="py-2 px-2 min-w-[100px] border-r border-[#262626]">% interés inicial</th>
                <th className="py-2 px-2 min-w-[100px] border-r border-[#262626]">% leads vivos</th>
                <th className="py-2 px-2 min-w-[100px] border-r border-[#262626]">% asistencia</th>
                <th className="py-2 px-2 min-w-[105px] border-r border-[#262626]">% interés en oferta</th>
                <th className="py-2 px-2 min-w-[90px] border-r border-[#262626]">% oferta</th>
                <th className="py-2 px-2 min-w-[100px]">% cierre de oferta</th>
              </tr>

              {/* Benchmark Indicador row from screenshot: 60% | 80% | 75% | 21% | 60% | 33% | 50% */}
              <tr className="bg-[#161616] text-[#A3A3A3] font-bold text-[12px] border-b border-[#262626]">
                <td className="py-2 px-4 text-right border-r border-[#262626] font-bold italic text-white">
                  Indicador
                </td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono">60%</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono">80%</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono">75%</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono">21%</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono">60%</td>
                <td className="py-2 px-2 border-r border-[#262626] font-mono">33%</td>
                <td className="py-2 px-2 font-mono">50%</td>
              </tr>
            </thead>

            {/* Calculated Conversion vs Previous Stage */}
            <tbody className="bg-[#121212] font-bold text-white">
              <tr className="border-b border-[#262626]">
                <td className="py-2.5 px-4 text-left border-r border-[#262626] font-extrabold text-[#D4F634]">
                  Conversión vs. etapa anterior
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono text-[#D4F634]">
                  {calculations.pctCalidadDatos.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctInteresInicial.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctLeadsVivos.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono text-white">
                  {calculations.pctAsistencia.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctInteresOferta.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctOferta.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 font-mono text-[#D4F634]">
                  {calculations.pctCierreOferta.toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* =========================================================================
            LOWER SECTION 2: % CONVERSIÓN ACUMULADA
            ========================================================================= */}
        <div className="border-t border-[#262626] overflow-x-auto bg-[#121212]">
          <table className="w-full text-center border-collapse text-xs">
            <thead>
              <tr className="bg-[#161616] text-[#A3A3A3] font-bold text-[12px] border-b border-[#262626]">
                <td className="py-2 px-4 text-right min-w-[200px] border-r border-[#262626] font-bold italic text-white">
                  Indicador
                </td>
                <td className="py-2 px-2 min-w-[100px] border-r border-[#262626] font-mono">100%</td>
                <td className="py-2 px-2 min-w-[100px] border-r border-[#262626] font-mono">80%</td>
                <td className="py-2 px-2 min-w-[100px] border-r border-[#262626] font-mono">60%</td>
                <td className="py-2 px-2 min-w-[100px] border-r border-[#262626] font-mono">13%</td>
                <td className="py-2 px-2 min-w-[105px] border-r border-[#262626] font-mono">8%</td>
                <td className="py-2 px-2 min-w-[90px] border-r border-[#262626] font-mono">3%</td>
                <td className="py-2 px-2 min-w-[100px] font-mono">1%</td>
              </tr>
            </thead>

            {/* Calculated Cumulative Conversion */}
            <tbody className="bg-[#121212] font-bold text-white">
              <tr>
                <td className="py-2.5 px-4 text-left border-r border-[#262626] font-extrabold text-[#D4F634]">
                  Conversión acumulada
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono text-[#D4F634]">
                  {calculations.pctAcumuladoLeadsReales.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctAcumuladoInteres.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctAcumuladoVivos.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono text-white">
                  {calculations.pctAcumuladoVisitas.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctAcumuladoHabloOferta.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 border-r border-[#262626] font-mono">
                  {calculations.pctAcumuladoOfertas.toFixed(1)}%
                </td>
                <td className="py-2.5 px-2 font-mono text-[#D4F634]">
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
      <section id="section-historial-guardados" className="bg-[#121212] rounded-xl border border-[#262626] p-5 shadow-2xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#262626] gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4F634] text-black border border-black flex items-center justify-center font-bold text-sm">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight flex items-center gap-2 font-sans">
                Historial de Registros & Versiones Guardadas del Embudo
              </h3>
              <p className="text-xs text-[#A3A3A3]">
                Cada cambio guardado se registra aquí abajo con su snapshot de métricas, fecha exacta y opción de restauración.
              </p>
            </div>
          </div>

          <span className="text-xs text-white font-mono bg-[#1A1A1A] px-3 py-1 rounded border border-[#262626] self-start sm:self-auto font-bold">
            {historyLog.length} registro(s) almacenados
          </span>
        </div>

        {/* Quick Note & Save Form */}
        <div className="bg-[#181818] border border-[#262626] rounded-lg p-3.5 flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1">
            <label className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-1">
              Guardar nueva revisión con nota descriptiva
            </label>
            <input
              type="text"
              placeholder="p. ej. Cierre de semana con 3 citas confirmadas en Showroom Epika"
              value={saveNote}
              onChange={(e) => setSaveNote(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#333] rounded px-3 py-1.5 text-xs text-white placeholder-[#737373] focus:outline-none focus:ring-1 focus:ring-[#D4F634]"
            />
          </div>

          <button
            onClick={handleSaveWithHistory}
            className="w-full sm:w-auto mt-2 sm:mt-4 px-4 py-2 rounded-lg bg-[#D4F634] hover:bg-[#c5e628] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 border border-black cursor-pointer"
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
              className="bg-[#1A1A1A] border border-[#262626] hover:border-[#D4F634]/40 rounded-xl p-4 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#262626]">
                
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#262626] text-[#D4F634] font-bold text-xs flex items-center justify-center font-mono">
                    #{historyLog.length - index}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4F634]" />
                        {entry.timestamp}
                      </span>
                      <span className="text-[10px] bg-[#D4F634]/15 text-[#D4F634] px-2 py-0.5 rounded border border-[#D4F634]/30 font-bold">
                        {entry.savedBy}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-xs text-[#A3A3A3] mt-1 italic">
                        "{entry.note}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRestoreRevision(entry)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#262626] hover:bg-[#D4F634] text-[#E5E7EB] hover:text-black font-bold flex items-center gap-1.5 transition-colors border border-[#333] cursor-pointer"
                    title="Cargar esta versión en la tabla superior"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restaurar Esta Versión</span>
                  </button>
                </div>

              </div>

              {/* Snapshot Metrics Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-3 text-center">
                
                <div className="bg-[#121212] p-2 rounded border border-[#262626]">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">Leads Totales</span>
                  <span className="text-sm font-bold text-white font-mono">{entry.snapshot.totalLeads}</span>
                </div>

                <div className="bg-[#121212] p-2 rounded border border-[#262626]">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">Leads Reales</span>
                  <span className="text-sm font-bold text-[#D4F634] font-mono">{entry.snapshot.totalLeadsReales}</span>
                </div>

                <div className="bg-[#121212] p-2 rounded border border-[#262626]">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">Mensajes Meta</span>
                  <span className="text-sm font-bold text-white font-mono">{entry.snapshot.totalMensajesConcretadosMeta || 0}</span>
                </div>

                <div className="bg-[#121212] p-2 rounded border border-[#262626]">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">Citas Showroom</span>
                  <span className="text-sm font-bold text-white font-mono">{entry.snapshot.totalVisitas}</span>
                </div>

                <div className="bg-[#121212] p-2 rounded border border-[#262626]">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">Ventas</span>
                  <span className="text-sm font-bold text-[#D4F634] font-mono">{entry.snapshot.totalVentas}</span>
                </div>

                <div className="bg-[#121212] p-2 rounded border border-[#262626]">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">Inversión</span>
                  <span className="text-sm font-bold text-[#E5E7EB] font-mono">${entry.snapshot.totalInversion.toLocaleString('es-MX')}</span>
                </div>

                <div className="bg-[#121212] p-2 rounded border border-[#262626] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#A3A3A3] uppercase block font-semibold">CAC Resultante</span>
                  <span className="text-sm font-bold text-[#D4F634] font-mono">
                    {entry.snapshot.cac > 0 ? `$${entry.snapshot.cac.toLocaleString('es-MX')}` : 'N/A'}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Guide note in Elegant Dark */}
      <div className="bg-[#121212] border border-[#262626] rounded-xl p-4 text-xs text-[#A3A3A3] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#D4F634] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">Guía de Interpretación de Fuga Comercial Epika Chapultepec:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[#A3A3A3]">
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
