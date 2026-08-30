import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  X, 
  Layers, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { FunnelPeriod } from '../types';
import { 
  formatSpanishDate, 
  formatShortDateRange, 
  calculateDaysBetween, 
  createCustomDateRangePeriod 
} from '../data/initialPeriods';

interface DateRangeCalendarPickerProps {
  periods: FunnelPeriod[];
  selectedPeriodId: string;
  onSelectPeriod: (periodId: string) => void;
  onCustomDateRangeApply: (newPeriod: FunnelPeriod) => void;
  className?: string;
  compact?: boolean;
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAYS_OF_WEEK = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

export const DateRangeCalendarPicker: React.FC<DateRangeCalendarPickerProps> = ({
  periods,
  selectedPeriodId,
  onSelectPeriod,
  onCustomDateRangeApply,
  className = '',
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePeriod = periods.find(p => p.id === selectedPeriodId) || periods[0];

  // Internal draft date range state
  const [startDate, setStartDate] = useState<string>(activePeriod.startDate || '2026-08-01');
  const [endDate, setEndDate] = useState<string>(activePeriod.endDate || '2026-08-27');
  
  // Selection mode: 'start' | 'end' | 'done'
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  // Month navigation in calendar
  const initialYear = activePeriod.startDate ? parseInt(activePeriod.startDate.split('-')[0], 10) : 2026;
  const initialMonth = activePeriod.startDate ? parseInt(activePeriod.startDate.split('-')[1], 10) - 1 : 7; // August = 7 (0-indexed)
  
  const [viewYear, setViewYear] = useState<number>(initialYear);
  const [viewMonth, setViewMonth] = useState<number>(initialMonth);

  // Synchronize when active period changes
  useEffect(() => {
    if (activePeriod.startDate && activePeriod.endDate) {
      setStartDate(activePeriod.startDate);
      setEndDate(activePeriod.endDate);
      const parts = activePeriod.startDate.split('-');
      if (parts.length === 3) {
        setViewYear(parseInt(parts[0], 10));
        setViewMonth(parseInt(parts[1], 10) - 1);
      }
    }
  }, [activePeriod.id]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const daysCount = calculateDaysBetween(startDate, endDate);

  // Quick Preset Handlers
  const handlePresetSelect = (start: string, end: string, existingPeriodId?: string) => {
    setStartDate(start);
    setEndDate(end);
    const parts = start.split('-');
    setViewYear(parseInt(parts[0], 10));
    setViewMonth(parseInt(parts[1], 10) - 1);

    if (existingPeriodId && periods.some(p => p.id === existingPeriodId)) {
      onSelectPeriod(existingPeriodId);
      setIsOpen(false);
    } else {
      const custom = createCustomDateRangePeriod(start, end, periods);
      onCustomDateRangeApply(custom);
      setIsOpen(false);
    }
  };

  const handleApply = () => {
    // Check if start > end and swap if necessary
    let actualStart = startDate;
    let actualEnd = endDate;
    if (new Date(actualStart) > new Date(actualEnd)) {
      actualStart = endDate;
      actualEnd = startDate;
      setStartDate(actualStart);
      setEndDate(actualEnd);
    }

    // Check if an existing period matches
    const existing = periods.find(p => p.startDate === actualStart && p.endDate === actualEnd);
    if (existing) {
      onSelectPeriod(existing.id);
    } else {
      const customPeriod = createCustomDateRangePeriod(actualStart, actualEnd, periods);
      onCustomDateRangeApply(customPeriod);
    }
    setIsOpen(false);
  };

  // Calendar Day Click Handler
  const handleDayClick = (dayStr: string) => {
    if (!startDate || (startDate && endDate)) {
      // Starting new selection
      setStartDate(dayStr);
      setEndDate('');
    } else if (startDate && !endDate) {
      if (new Date(dayStr) < new Date(startDate)) {
        setEndDate(startDate);
        setStartDate(dayStr);
      } else {
        setEndDate(dayStr);
      }
    }
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  // Generate Calendar Grid Days
  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days: { dateStr: string; dayNumber: number; isCurrentMonth: boolean }[] = [];
    
    // Day of week for 1st day (0 = Sunday, 1 = Monday, ... 6 = Saturday)
    // Convert so Monday = 0, Sunday = 6
    let firstDayIndex = date.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    // Previous month padding days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const monthFormatted = String(prevMonth + 1).padStart(2, '0');
      const dayFormatted = String(d).padStart(2, '0');
      days.push({
        dateStr: `${prevYear}-${monthFormatted}-${dayFormatted}`,
        dayNumber: d,
        isCurrentMonth: false
      });
    }

    // Current month days
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const monthFormatted = String(month + 1).padStart(2, '0');
      const dayFormatted = String(d).padStart(2, '0');
      days.push({
        dateStr: `${year}-${monthFormatted}-${dayFormatted}`,
        dayNumber: d,
        isCurrentMonth: true
      });
    }

    // Next month padding days to complete 35 or 42 grid cells
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remainingCells; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const monthFormatted = String(nextMonth + 1).padStart(2, '0');
      const dayFormatted = String(d).padStart(2, '0');
      days.push({
        dateStr: `${nextYear}-${monthFormatted}-${dayFormatted}`,
        dayNumber: d,
        isCurrentMonth: false
      });
    }

    return days;
  };

  const calendarDays = getDaysInMonth(viewYear, viewMonth);

  // Helper to check day status
  const isSelectedStart = (dStr: string) => startDate === dStr;
  const isSelectedEnd = (dStr: string) => endDate === dStr;
  const isInRange = (dStr: string) => {
    if (startDate && endDate) {
      return dStr > startDate && dStr < endDate;
    }
    if (startDate && !endDate && hoverDate) {
      const minD = startDate < hoverDate ? startDate : hoverDate;
      const maxD = startDate < hoverDate ? hoverDate : startDate;
      return dStr > minD && dStr < maxD;
    }
    return false;
  };

  const displayDateLabel = activePeriod.startDate && activePeriod.endDate 
    ? formatShortDateRange(activePeriod.startDate, activePeriod.endDate)
    : activePeriod.periodLabel;

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      
      {/* Trigger Button */}
      <button
        id="btn-calendar-period-picker"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-1.5 sm:px-3.5 sm:py-2 text-left shadow-xs transition-all duration-150 active:scale-98 group cursor-pointer"
        aria-label="Abrir calendario para seleccionar rango de fechas"
      >
        <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
          <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
        </div>

        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
              {displayDateLabel}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-md">
              {daysCount} {daysCount === 1 ? 'día' : 'días'}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
            Click para cambiar rango de fechas o periodo
          </span>
        </div>

        <div className="text-slate-400 group-hover:text-slate-600 transition-colors ml-auto pl-1">
          <Filter className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* Popover / Calendar Modal */}
      {isOpen && (
        <div className="fixed sm:absolute top-16 sm:top-full left-4 sm:left-auto right-4 sm:right-0 mt-2 z-50 w-[calc(100vw-32px)] sm:w-[580px] md:w-[640px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Popover Header */}
          <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  Seleccionar Rango de Fechas
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Campaña & Embudo
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Elige de qué fecha a qué fecha deseas analizar los datos de inversión y captación
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar calendario"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Date Inputs (Desde - Hasta) */}
          <div className="p-3.5 sm:px-4 sm:py-3 bg-slate-50/60 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Fecha de Inicio (Desde):
              </label>
              <input
                id="input-calendar-start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white border border-slate-300 hover:border-emerald-500 focus:border-emerald-500 text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Fecha de Fin (Hasta):
              </label>
              <input
                id="input-calendar-end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-slate-300 hover:border-emerald-500 focus:border-emerald-500 text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Body: Presets + Interactive Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[65vh] overflow-y-auto">
            
            {/* Left Column: Quick Presets */}
            <div className="md:col-span-4 p-3 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 block mb-2">
                Accesos Rápidos
              </span>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-08-01', '2026-08-31', 'period-mensual-agosto')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-08-01' && endDate === '2026-08-31'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Agosto 2026 (Mes Actual)</span>
                <span className="text-[10px] text-slate-400">31d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-08-10', '2026-08-26')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-08-10' && endDate === '2026-08-26'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>10 - 26 Ago (Google Ads)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">17d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-07-27', '2026-08-25')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-07-27' && endDate === '2026-08-25'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>27 Jul - 25 Ago (Meta/DSP)</span>
                <span className="text-[10px] text-slate-400">30d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-08-03', '2026-08-09', 'period-semana-actual')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-08-03' && endDate === '2026-08-09'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Semana 3 al 9 de Agosto</span>
                <span className="text-[10px] text-slate-400">7d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-08-20', '2026-08-27')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-08-20' && endDate === '2026-08-27'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Últimos 7 días</span>
                <span className="text-[10px] text-slate-400">7d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-08-13', '2026-08-27')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-08-13' && endDate === '2026-08-27'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Últimos 14 días</span>
                <span className="text-[10px] text-slate-400">14d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-07-28', '2026-08-27')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-07-28' && endDate === '2026-08-27'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Últimos 30 días</span>
                <span className="text-[10px] text-slate-400">30d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-07-01', '2026-08-31', 'period-bimestral-jul-ago')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-07-01' && endDate === '2026-08-31'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Bimestre Julio - Agosto</span>
                <span className="text-[10px] text-slate-400">62d</span>
              </button>

              <button
                type="button"
                onClick={() => handlePresetSelect('2026-01-01', '2026-12-31', 'period-anual-2026')}
                className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  startDate === '2026-01-01' && endDate === '2026-12-31'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-700 hover:bg-slate-200/60 hover:text-slate-900'
                }`}
              >
                <span>Año 2026 Completo (YTD)</span>
                <span className="text-[10px] text-slate-400">365d</span>
              </button>
            </div>

            {/* Right Column: Visual Interactive Month Grid */}
            <div className="md:col-span-8 p-4 bg-white flex flex-col justify-between">
              
              {/* Month Header with Navigation */}
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      {MONTH_NAMES[viewMonth]} {viewYear}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      (Toca inicio y fin)
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                      title="Mes anterior"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                      title="Mes siguiente"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Day-of-week header */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {DAYS_OF_WEEK.map((d, idx) => (
                    <div key={idx} className="text-[11px] font-bold text-slate-400 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar Days Matrix */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((item, index) => {
                    const isStart = isSelectedStart(item.dateStr);
                    const isEnd = isSelectedEnd(item.dateStr);
                    const inRange = isInRange(item.dateStr);

                    let dayClasses = "h-8 w-full rounded-md text-xs font-semibold flex items-center justify-center transition-all cursor-pointer relative ";

                    if (isStart && isEnd) {
                      dayClasses += "bg-emerald-600 text-white font-bold shadow-xs z-10";
                    } else if (isStart) {
                      dayClasses += "bg-emerald-600 text-white font-bold shadow-xs rounded-r-none z-10";
                    } else if (isEnd) {
                      dayClasses += "bg-emerald-600 text-white font-bold shadow-xs rounded-l-none z-10";
                    } else if (inRange) {
                      dayClasses += "bg-emerald-50 text-emerald-900 rounded-none hover:bg-emerald-100";
                    } else if (!item.isCurrentMonth) {
                      dayClasses += "text-slate-300 hover:bg-slate-100 hover:text-slate-500";
                    } else {
                      dayClasses += "text-slate-800 hover:bg-slate-100";
                    }

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDayClick(item.dateStr)}
                        onMouseEnter={() => setHoverDate(item.dateStr)}
                        onMouseLeave={() => setHoverDate(null)}
                        className={dayClasses}
                      >
                        {item.dayNumber}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Range Preview Summary Tag */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="text-slate-500 flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">
                    {startDate ? formatSpanishDate(startDate) : 'Sin inicio'}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="font-semibold text-slate-800">
                    {endDate ? formatSpanishDate(endDate) : 'Selecciona fin'}
                  </span>
                </div>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {daysCount} días
                </span>
              </div>

            </div>

          </div>

          {/* Modal Footer with Actions */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setStartDate('2026-08-01');
                setEndDate('2026-08-27');
              }}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Restablecer a Agosto
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              
              <button
                id="btn-apply-calendar-date-range"
                type="button"
                onClick={handleApply}
                disabled={!startDate || !endDate}
                className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer active:scale-95"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Aplicar a Campañas ({daysCount}d)</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
