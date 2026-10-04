import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { CRITERIA } from '../data/eligibilityData';
import { COUNTRIES, RISK_LABELS, RISK_COLORS } from '../data/countryRiskData';
import { MEDICATIONS } from '../data/medicationData';

interface Props { onBack: () => void }

type ResultType = 'criteria' | 'country' | 'medication';

interface SearchResult {
  type: ResultType;
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  detail: string;
  extra?: string;
}

const TYPE_LABELS: Record<ResultType, string> = {
  criteria: 'Critère médical',
  country: 'Pays / Région',
  medication: 'Médicament',
};

const TYPE_ICONS: Record<ResultType, ReactNode> = {
  criteria: (
    <svg className="stroke-[#1A4A8A]" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
    </svg>
  ),
  country: (
    <svg className="stroke-[#059669]" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  medication: (
    <svg className="stroke-[#9333EA]" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>
    </svg>
  ),
};

export default function SearchConsole({ onBack }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ResultType | 'all'>('all');

  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const out: SearchResult[] = [];

    // Criteria
    if (filter === 'all' || filter === 'criteria') {
      CRITERIA.filter(c =>
        c.label.toLowerCase().includes(q) ||
        c.detail.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
      ).forEach(c => {
        const statusColors: Record<string, string> = {
          eligible: '#166534', ineligible: '#991B1B', temporaire: '#92400E', info: '#1E40AF'
        };
        const statusBg: Record<string, string> = {
          eligible: '#DCFCE7', ineligible: '#FEE2E2', temporaire: '#FEF3C7', info: '#DBEAFE'
        };
        out.push({
          type: 'criteria',
          id: c.id,
          title: c.label,
          subtitle: c.category,
          badge: c.status === 'eligible' ? 'Éligible' : c.status === 'ineligible' ? 'CI permanente' : c.status === 'temporaire' ? 'Report temporaire' : 'Info',
          badgeColor: statusColors[c.status],
          detail: c.detail,
          extra: c.delai ? `Délai : ${c.delai}` : undefined,
        });
      });
    }

    // Countries
    if (filter === 'all' || filter === 'country') {
      COUNTRIES.filter(c =>
        c.region.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q) ||
        c.risks.some(r => RISK_LABELS[r].toLowerCase().includes(q))
      ).forEach(c => {
        const worstStho = c.stho;
        out.push({
          type: 'country',
          id: c.region,
          title: c.region,
          subtitle: c.continent,
          badge: worstStho === 'Ok' ? 'Ok' : worstStho,
          badgeColor: worstStho === 'Ok' ? '#166534' : worstStho === '28 jours' ? '#854D0E' : '#991B1B',
          detail: c.risks.length ? `Risques : ${c.risks.map(r => RISK_LABELS[r]).join(', ')}` : 'Aucun risque infectieux spécifique',
          extra: `STHO ${c.stho} · PLAS ${c.plas} · PLQT ${c.plqt}`,
        });
      });
    }

    // Medications
    if (filter === 'all' || filter === 'medication') {
      MEDICATIONS.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.aliases.some(a => a.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q) ||
        m.note?.toLowerCase().includes(q)
      ).forEach(m => {
        out.push({
          type: 'medication',
          id: m.id,
          title: m.name,
          subtitle: m.category,
          badge: m.deferralDays === -1 ? 'CI permanente' : m.deferralLabel,
          badgeColor: m.deferralDays === -1 ? '#991B1B' : m.deferralDays === 0 ? '#166534' : '#92400E',
          detail: m.note || `Délai d'écartement : ${m.deferralLabel}`,
          extra: m.aliases.slice(0, 3).join(', '),
        });
      });
    }

    return out.slice(0, 60);
  }, [query, filter]);

  const grouped = useMemo(() => {
    const map = new Map<ResultType, SearchResult[]>();
    for (const r of results) {
      if (!map.has(r.type)) map.set(r.type, []);
      map.get(r.type)!.push(r);
    }
    return map;
  }, [results]);

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      <header className="bg-white border-b border-[#D8D3CC] sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Retour
          </button>
          <div className="w-px h-4 bg-[#D8D3CC] flex-shrink-0" />
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#6B6560]" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Rechercher une pathologie, un pays, un médicament…"
                className="w-full pl-9 pr-4 py-2.5 text-sm font-sans bg-[#F7F6F4] border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] placeholder:text-[#6B6560]"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#1A1A1A]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-[#EAE8E3]">
          <div className="max-w-4xl mx-auto px-6 py-2 flex gap-1.5">
            {(['all', 'criteria', 'country', 'medication'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors flex items-center gap-1.5 ${filter === f ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}
              >
                {f === 'all' ? 'Tout' : f === 'criteria' ? 'Critères médicaux' : f === 'country' ? 'Pays à risque' : 'Médicaments'}
                {query && results.filter(r => f === 'all' || r.type === f).length > 0 && (
                  <span className={`text-xs font-mono ${filter === f ? 'text-white/70' : 'text-[#6B6560]'}`}>
                    {f === 'all' ? results.length : results.filter(r => r.type === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-6">
        {!query && (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-[#EAE8E3] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="stroke-[#6B6560]" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-[#6B6560] font-sans text-sm mb-1">Recherche unifiée</p>
            <p className="text-xs text-[#6B6560] font-sans">Pathologies · Pays à risque infectieux · Médicaments & contre-indications</p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {['VIH', 'Paludisme', 'Isotrétinoïne', 'Héparine', 'Brésil', 'Grossesse', 'Clopidogrel', 'Congo'].map(kw => (
                <button key={kw} onClick={() => setQuery(kw)} className="px-3 py-1.5 bg-white border border-[#D8D3CC] text-sm font-sans text-[#3A3A3A] rounded-sm hover:border-[#C0182A] hover:text-[#C0182A] transition-colors">
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6B6560] font-sans text-sm">Aucun résultat pour « {query} »</p>
          </div>
        )}

        {query && results.length > 0 && (
          <div className="space-y-6">
            {Array.from(grouped.entries()).map(([type, items]) => (
              <section key={type}>
                <h2 className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">
                  {TYPE_ICONS[type]}
                  {TYPE_LABELS[type]}s
                  <span className="text-[#D8D3CC]">—</span>
                  <span>{items.length}</span>
                </h2>
                <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden divide-y divide-[#EAE8E3]">
                  {items.map(r => (
                    <div key={r.id} className="px-5 py-4 hover:bg-[#F7F6F4] transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-sans font-medium text-sm text-[#1A1A1A]">{r.title}</p>
                            {r.extra && <span className="text-xs font-mono text-[#6B6560] truncate hidden md:block">{r.extra}</span>}
                          </div>
                          <p className="text-xs text-[#6B6560] font-sans mb-1">{r.subtitle}</p>
                          <p className="text-xs text-[#3A3A3A] font-sans leading-relaxed">{r.detail}</p>
                        </div>
                        <span
                          className="text-xs font-sans px-2 py-0.5 rounded-sm flex-shrink-0 whitespace-nowrap"
                          style={{ background: `${r.badgeColor}18`, color: r.badgeColor, border: `1px solid ${r.badgeColor}40` }}
                        >
                          {r.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
