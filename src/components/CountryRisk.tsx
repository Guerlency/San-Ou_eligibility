import { useState, useMemo } from 'react';
import {
  COUNTRIES, CONTINENTS, RISK_LABELS, RISK_COLORS, DEFERRAL_COLORS,
  RiskCode, DeferralValue, CountryEntry
} from '../data/countryRiskData';

interface Props {
  onBack: () => void;
}

const RISK_CODES: RiskCode[] = ['A', 'C', 'D', 'T', 'Z', 'M'];

export default function CountryRisk({ onBack }: Props) {
  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<RiskCode | 'all'>('all');
  const [showHighVIH, setShowHighVIH] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return COUNTRIES.filter(c => {
      const matchSearch = !q || c.region.toLowerCase().includes(q) || c.continent.toLowerCase().includes(q);
      const matchContinent = continent === 'all' || c.continent === continent;
      const matchRisk = riskFilter === 'all' || c.risks.includes(riskFilter);
      const matchVIH = !showHighVIH || c.highVIH;
      return matchSearch && matchContinent && matchRisk && matchVIH;
    });
  }, [search, continent, riskFilter, showHighVIH]);

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#D8D3CC] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 flex-wrap">
          <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Retour
          </button>
          <div className="w-px h-4 bg-[#D8D3CC] flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-5 h-5 bg-[#059669] rounded-sm flex items-center justify-center">
              <svg className="stroke-white" width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">Pays/Régions à risque</span>
          </div>
          <div className="flex-1 max-w-sm ml-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#6B6560]" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un pays ou une région…"
                className="w-full pl-8 pr-4 py-2 text-sm font-sans bg-[#F7F6F4] border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669] placeholder:text-[#6B6560]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#1A1A1A]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="border-t border-[#EAE8E3] overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6 py-2 flex gap-2 items-center min-w-max flex-wrap">
            {/* Continent */}
            <div className="flex gap-1">
              <button onClick={() => setContinent('all')} className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors ${continent === 'all' ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}>
                Tous continents
              </button>
              {CONTINENTS.map(c => (
                <button key={c} onClick={() => setContinent(c)} className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors whitespace-nowrap ${continent === c ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-[#D8D3CC] flex-shrink-0" />
            {/* Risk codes */}
            <div className="flex gap-1">
              <button onClick={() => setRiskFilter('all')} className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors ${riskFilter === 'all' ? 'bg-[#059669] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}>
                Tous risques
              </button>
              {RISK_CODES.map(r => (
                <button
                  key={r}
                  onClick={() => setRiskFilter(riskFilter === r ? 'all' : r)}
                  className={`px-2.5 py-1.5 text-xs font-mono font-bold rounded-sm transition-colors ${riskFilter === r ? '' : ''}`}
                  style={riskFilter === r
                    ? { background: RISK_COLORS[r].bg, color: RISK_COLORS[r].text, border: `1px solid ${RISK_COLORS[r].border}`, outline: `2px solid ${RISK_COLORS[r].text}`, outlineOffset: '1px' }
                    : { background: RISK_COLORS[r].bg, color: RISK_COLORS[r].text, border: `1px solid ${RISK_COLORS[r].border}` }
                  }
                  title={RISK_LABELS[r]}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-[#D8D3CC] flex-shrink-0" />
            <button
              onClick={() => setShowHighVIH(!showHighVIH)}
              className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors flex items-center gap-1.5 ${showHighVIH ? 'bg-[#7F1D1D] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}
            >
              <div className={`w-2 h-2 rounded-full ${showHighVIH ? 'bg-white' : 'bg-[#C0182A]'}`} />
              Haute prévalence VIH
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-5">
        {/* Legend + stats */}
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <p className="text-sm font-sans text-[#6B6560] mb-2">
              <span className="font-mono text-[#1A1A1A] font-medium">{filtered.length}</span> entrée{filtered.length !== 1 ? 's' : ''}
            </p>
            {/* Risk legend */}
            <div className="flex flex-wrap gap-2">
              {RISK_CODES.map(r => (
                <span key={r} className="flex items-center gap-1.5 text-xs font-sans px-2 py-1 rounded-sm" style={{ background: RISK_COLORS[r].bg, color: RISK_COLORS[r].text, border: `1px solid ${RISK_COLORS[r].border}` }}>
                  <span className="font-mono font-bold">{r}</span> {RISK_LABELS[r]}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-[#D8D3CC] rounded-sm px-4 py-2 text-xs font-sans text-[#6B6560]">
            <span className="font-mono font-semibold text-[#1A1A1A]">STHO</span> = Sang total &nbsp;·&nbsp;
            <span className="font-mono font-semibold text-[#1A1A1A]">PLAS</span> = Plasma &nbsp;·&nbsp;
            <span className="font-mono font-semibold text-[#1A1A1A]">PLQT</span> = Plaquettes
          </div>
        </div>

        {/* Note Chagas */}
        <div className="bg-[#FFFBEB] border border-[#FDE047] rounded-sm p-3 mb-4 flex gap-2">
          <svg className="stroke-[#854D0E] flex-shrink-0 mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <p className="text-xs font-sans text-[#854D0E]">
            <strong>Chagas (C) :</strong> Le type de séjour influence le délai — séjour en plein air ou en habitation précaire : 6 mois + TEST sérologique. Séjour à l'hôtel : 28 jours. Durée {'>'} 3 mois = 6 mois quelle que soit l'hébergement.
          </p>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#D8D3CC] rounded-sm p-12 text-center">
            <p className="text-[#6B6560] font-sans text-sm">Aucun pays ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans border-collapse">
                <thead>
                  <tr className="bg-[#F0EDE8] border-b border-[#D8D3CC]">
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#6B6560] font-medium w-[38%]">Région / Pays</th>
                    <th className="text-left px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#6B6560] font-medium">Risques infectieux</th>
                    <th className="text-center px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#6B6560] font-medium">STHO</th>
                    <th className="text-center px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#6B6560] font-medium">PLAS</th>
                    <th className="text-center px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#6B6560] font-medium">PLQT</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry, i) => (
                    <CountryRow key={`${entry.region}-${i}`} entry={entry} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CountryRow({ entry }: { entry: CountryEntry }) {
  return (
    <tr className="border-b border-[#EAE8E3] hover:bg-[#F7F6F4] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-start gap-2">
          {entry.highVIH && (
            <span className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#C0182A]" title="Haute prévalence VIH" />
          )}
          <div>
            <p className={`font-sans leading-snug ${entry.highVIH ? 'font-semibold text-[#1A1A1A]' : 'font-medium text-[#1A1A1A]'}`}>
              {entry.region}
            </p>
            <p className="text-xs text-[#6B6560] mt-0.5">{entry.continent}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {entry.risks.length === 0 ? (
            <span className="text-xs text-[#6B6560]">—</span>
          ) : (
            entry.risks.map(r => (
              <span
                key={r}
                className="text-xs font-mono font-bold px-1.5 py-0.5 rounded-sm"
                style={{ background: RISK_COLORS[r].bg, color: RISK_COLORS[r].text, border: `1px solid ${RISK_COLORS[r].border}` }}
                title={RISK_LABELS[r]}
              >
                {r}
              </span>
            ))
          )}
        </div>
      </td>
      <DeferralCell value={entry.stho} />
      <DeferralCell value={entry.plas} />
      <DeferralCell value={entry.plqt} />
    </tr>
  );
}

function DeferralCell({ value }: { value: DeferralValue }) {
  const colors = DEFERRAL_COLORS[value];
  return (
    <td className="px-4 py-3 text-center">
      <span
        className="inline-block text-xs font-mono font-semibold px-2 py-1 rounded-sm whitespace-nowrap"
        style={{ background: colors.bg, color: colors.text }}
      >
        {value}
      </span>
    </td>
  );
}
