import { useState, useMemo } from 'react';
import { ALL_ALERTS, EpiAlert } from '../data/epidemiologyData';

interface Props { onBack: () => void }

export default function Epidemiology({ onBack }: Props) {
  const [activeAlertId, setActiveAlertId] = useState(ALL_ALERTS[0].id);
  const [search, setSearch] = useState('');
  const [showNewOnly, setShowNewOnly] = useState(false);

  const alert = ALL_ALERTS.find(a => a.id === activeAlertId) || ALL_ALERTS[0];

  const filteredCountries = useMemo(() => {
    const q = search.toLowerCase().trim();
    return alert.countries.map(c => {
      const regions = c.regions.filter(r => {
        const matchSearch = !q || r.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
        const matchNew = !showNewOnly || r.isNew || r.isMobileCollect;
        return matchSearch && matchNew;
      });
      return { ...c, regions };
    }).filter(c => c.regions.length > 0);
  }, [alert, search, showNewOnly]);

  const totalRegions = alert.countries.reduce((s, c) => s + c.regions.length, 0);
  const newRegions = alert.countries.reduce((s, c) => s + c.regions.filter(r => r.isNew).length, 0);

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#D8D3CC] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">
          <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Retour
          </button>
          <div className="w-px h-4 bg-[#D8D3CC] flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-5 h-5 bg-[#DC2626] rounded-sm flex items-center justify-center">
              <svg className="stroke-white" width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">Épidémiologie</span>
          </div>
          <div className="flex-1 max-w-xs ml-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#6B6560]" width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une région, commune…"
                className="w-full pl-8 pr-4 py-2 text-xs font-sans bg-[#F7F6F4] border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#DC2626] placeholder:text-[#6B6560]"
              />
            </div>
          </div>
        </div>

        {/* Alert tabs */}
        <div className="border-t border-[#EAE8E3] overflow-x-auto">
          <div className="max-w-6xl mx-auto px-6 flex gap-0 min-w-max">
            {ALL_ALERTS.map(a => (
              <button
                key={a.id}
                onClick={() => { setActiveAlertId(a.id); setSearch(''); setShowNewOnly(false); }}
                className={`relative flex items-center gap-2 px-4 py-3 text-xs font-sans border-b-2 transition-colors whitespace-nowrap ${activeAlertId === a.id ? 'border-[#DC2626] text-[#DC2626] font-medium' : 'border-transparent text-[#6B6560] hover:text-[#1A1A1A] hover:bg-[#F7F6F4]'}`}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.riskColor }} />
                {a.disease}
                <span className="text-[10px] font-mono text-[#6B6560]">{a.updateDate}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
        {/* Alert banner */}
        <AlertBanner alert={alert} />

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-sm font-sans text-[#6B6560]">
              <span className="font-mono text-[#1A1A1A] font-medium">{filteredCountries.reduce((s, c) => s + c.regions.length, 0)}</span> région{totalRegions !== 1 ? 's' : ''} dans <span className="font-mono text-[#1A1A1A] font-medium">{filteredCountries.length}</span> pays/arrondissement{filteredCountries.length !== 1 ? 's' : ''}
            </span>
            {newRegions > 0 && (
              <button
                onClick={() => setShowNewOnly(!showNewOnly)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans rounded-sm border transition-colors ${showNewOnly ? 'bg-[#DC2626] text-white border-[#DC2626]' : 'bg-white text-[#DC2626] border-[#DC2626]/40 hover:bg-[#FEE2E2]'}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {newRegions} nouvelles régions
              </button>
            )}
          </div>
          <p className="text-xs font-mono text-[#6B6560]">MAJ : {alert.updateDate}</p>
        </div>

        {/* Region grid */}
        {filteredCountries.length === 0 ? (
          <div className="bg-white border border-[#D8D3CC] rounded-sm p-12 text-center">
            <p className="text-[#6B6560] font-sans text-sm">Aucune région ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCountries.map(country => (
              <CountrySection key={country.country} country={country.country} regions={country.regions} alertId={alert.id} />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-sans text-[#6B6560]">
          {newRegions > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#FEE2E2] border border-[#FCA5A5]" />
              (*) Nouvelle région concernée
            </div>
          )}
          {alert.id === 'wnv-belgique-20260925' && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#FEF9C3] border border-[#FDE047]" />
              Collecte mobile — dépistage systématique de tous les donneurs
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function AlertBanner({ alert }: { alert: EpiAlert }) {
  const isWNVBelgique = alert.id === 'wnv-belgique-20260925';
  const bgColor = isWNVBelgique ? '#DBEAFE' : '#FEE2E2';
  const borderColor = isWNVBelgique ? '#93C5FD' : '#FCA5A5';
  const textColor = isWNVBelgique ? '#1E40AF' : '#991B1B';
  const iconColor = isWNVBelgique ? '#1E40AF' : '#DC2626';

  return (
    <div className="rounded-sm border overflow-hidden mb-5" style={{ borderColor }}>
      <div className="px-5 py-4 flex items-start gap-3" style={{ background: bgColor }}>
        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <div className="flex-1">
          <p className="text-sm font-sans font-semibold mb-0.5" style={{ color: textColor }}>
            {alert.deferralRule}
          </p>
          {alert.deferralNote && (
            <p className="text-xs font-sans leading-relaxed" style={{ color: textColor }}>
              {alert.deferralNote}
            </p>
          )}
          {alert.specialAlert && (
            <p className="text-xs font-sans leading-relaxed mt-1.5 font-medium" style={{ color: textColor }}>
              ★ {alert.specialAlert}
            </p>
          )}
        </div>
      </div>
      <div className="px-5 py-2.5 bg-white border-t flex items-center justify-between" style={{ borderColor: '#EAE8E3' }}>
        <p className="text-xs text-[#6B6560] font-sans">{alert.author}</p>
        <p className="text-xs font-mono text-[#6B6560]">{alert.updateDate}</p>
      </div>
    </div>
  );
}

function CountrySection({ country, regions, alertId }: {
  country: string;
  regions: { name: string; isNew?: boolean; isMobileCollect?: boolean }[];
  alertId: string;
}) {
  const newCount = regions.filter(r => r.isNew).length;
  const mobileCount = regions.filter(r => r.isMobileCollect).length;

  return (
    <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
      <div className="px-5 py-3 bg-[#F0EDE8] border-b border-[#D8D3CC] flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#1A1A1A] font-semibold flex items-center gap-2">
          {country}
        </h2>
        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <span className="text-xs bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5] px-2 py-0.5 rounded-sm font-sans">
              {newCount} nouvelle{newCount > 1 ? 's' : ''}
            </span>
          )}
          {mobileCount > 0 && (
            <span className="text-xs bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] px-2 py-0.5 rounded-sm font-sans">
              {mobileCount} collecte{mobileCount > 1 ? 's' : ''} mobile{mobileCount > 1 ? 's' : ''}
            </span>
          )}
          <span className="text-xs font-mono text-[#6B6560]">{regions.length} région{regions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {regions.map(r => (
            <span
              key={r.name}
              className="text-xs font-sans px-2.5 py-1 rounded-sm border transition-colors"
              style={
                r.isMobileCollect
                  ? { background: '#FEF9C3', color: '#78350F', borderColor: '#FDE047', fontWeight: 600 }
                  : r.isNew
                  ? { background: '#FEE2E2', color: '#991B1B', borderColor: '#FCA5A5', fontWeight: 500 }
                  : { background: '#F0EDE8', color: '#3A3A3A', borderColor: '#D8D3CC' }
              }
            >
              {r.name}{r.isNew ? ' *' : ''}{r.isMobileCollect ? ' ★' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
