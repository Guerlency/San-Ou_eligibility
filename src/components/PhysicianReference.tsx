import { useState, useMemo } from 'react';
import { CRITERIA, CATEGORIES, Criterion, EligibilityStatus } from '../data/eligibilityData';

interface Props {
  onBack: () => void;
}

const STATUS_LABELS: Record<EligibilityStatus, string> = {
  eligible: 'Éligible',
  ineligible: 'Contre-indication permanente',
  temporaire: 'Report temporaire',
  info: 'Information',
};

const STATUS_CLASSES: Record<EligibilityStatus, string> = {
  eligible: 'badge-eligible',
  ineligible: 'badge-ineligible',
  temporaire: 'badge-conditional',
  info: 'badge-info',
};

const STATUS_FILTERS: { value: EligibilityStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'eligible', label: 'Éligible' },
  { value: 'ineligible', label: 'Contre-indication perm.' },
  { value: 'temporaire', label: 'Report temporaire' },
  { value: 'info', label: 'Information' },
];

export default function PhysicianReference({ onBack }: Props) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeStatus, setActiveStatus] = useState<EligibilityStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return CRITERIA.filter(c => {
      const matchesSearch = !q || c.label.toLowerCase().includes(q) || c.detail.toLowerCase().includes(q) || c.tags.some(t => t.toLowerCase().includes(q));
      const matchesCat = activeCategory === 'all' || c.category === activeCategory;
      const matchesStatus = activeStatus === 'all' || c.status === activeStatus;
      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [search, activeCategory, activeStatus]);

  const grouped = useMemo(() => {
    const map = new Map<string, Criterion[]>();
    for (const c of filtered) {
      if (!map.has(c.category)) map.set(c.category, []);
      map.get(c.category)!.push(c);
    }
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#D8D3CC] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Retour
          </button>
          <div className="w-px h-4 bg-[#D8D3CC] flex-shrink-0" />
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-5 h-5 bg-[#1A4A8A] rounded-sm flex items-center justify-center">
              <svg className="stroke-white" width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/>
              </svg>
            </div>
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">Référentiel médical</span>
          </div>
          {/* Search */}
          <div className="flex-1 max-w-sm ml-auto">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#6B6560]" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un critère, pathologie, médicament…"
                className="w-full pl-8 pr-4 py-2 text-sm font-sans bg-[#F7F6F4] border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#1A4A8A] focus:ring-1 focus:ring-[#1A4A8A] placeholder:text-[#6B6560]"
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
          <div className="max-w-6xl mx-auto px-6 py-2 flex gap-3 min-w-max">
            {/* Category filter */}
            <div className="flex gap-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors ${activeCategory === 'all' ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}
              >
                Toutes catégories
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-px bg-[#D8D3CC] flex-shrink-0" />
            {/* Status filter */}
            <div className="flex gap-1">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setActiveStatus(f.value)}
                  className={`px-3 py-1.5 text-xs font-sans rounded-sm transition-colors whitespace-nowrap ${activeStatus === f.value ? 'bg-[#1A4A8A] text-white' : 'bg-[#F0EDE8] text-[#3A3A3A] hover:bg-[#EAE8E3]'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <span className="text-sm font-sans text-[#6B6560]">
              <span className="font-mono text-[#1A1A1A] font-medium">{filtered.length}</span> critère{filtered.length !== 1 ? 's' : ''} affiché{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-3">
              {(['ineligible', 'temporaire', 'eligible'] as EligibilityStatus[]).map(s => {
                const count = filtered.filter(c => c.status === s).length;
                return count > 0 ? (
                  <span key={s} className={`text-xs px-2 py-0.5 rounded-sm font-mono ${STATUS_CLASSES[s]}`}>
                    {count} {s === 'ineligible' ? 'CI perm.' : s === 'temporaire' ? 'temporaire' : 'éligible'}
                  </span>
                ) : null;
              })}
            </div>
          </div>
          <p className="text-xs font-mono text-[#6B6560]">Réf. AR 04/04/1996</p>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-[#D8D3CC] rounded-sm p-12 text-center">
            <p className="text-[#6B6560] font-sans text-sm">Aucun critère ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Array.from(grouped.entries()).map(([category, items]) => (
              <section key={category}>
                <h2 className="font-mono text-xs uppercase tracking-widest text-[#6B6560] mb-2 flex items-center gap-2">
                  <span>{category}</span>
                  <span className="text-[#D8D3CC]">—</span>
                  <span>{items.length} critère{items.length !== 1 ? 's' : ''}</span>
                </h2>
                <div className="border border-[#D8D3CC] rounded-sm overflow-hidden bg-white">
                  {items.map((criterion, idx) => (
                    <CriterionRow
                      key={criterion.id}
                      criterion={criterion}
                      isLast={idx === items.length - 1}
                      isExpanded={expandedId === criterion.id}
                      onToggle={() => setExpandedId(expandedId === criterion.id ? null : criterion.id)}
                    />
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

function CriterionRow({ criterion, isLast, isExpanded, onToggle }: {
  criterion: Criterion;
  isLast: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`${!isLast ? 'border-b border-[#EAE8E3]' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[#F7F6F4] transition-colors group"
      >
        <StatusDot status={criterion.status} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-sans font-medium text-[#1A1A1A] leading-tight">{criterion.label}</p>
          {criterion.delai && (
            <p className="text-xs font-mono text-[#6B6560] mt-0.5">Délai : {criterion.delai}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-sm font-sans ${STATUS_CLASSES[criterion.status]}`}>
            {STATUS_LABELS[criterion.status]}
          </span>
          <svg
            className={`stroke-[#6B6560] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 bg-[#F7F6F4] border-t border-[#EAE8E3]">
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="md:col-span-2">
              <p className="text-xs font-mono text-[#6B6560] uppercase tracking-widest mb-1.5">Détail du critère</p>
              <p className="text-sm font-sans text-[#1A1A1A] leading-relaxed">{criterion.detail}</p>

              {criterion.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {criterion.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#EAE8E3] text-[#6B6560] px-2 py-0.5 rounded-sm font-sans">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {criterion.delai && (
                <div className="bg-white border border-[#D8D3CC] rounded-sm p-3">
                  <p className="text-xs font-mono text-[#6B6560] uppercase tracking-widest mb-1">Délai à appliquer</p>
                  <p className="text-sm font-semibold text-[#1A1A1A] font-sans">{criterion.delai}</p>
                </div>
              )}
              {criterion.reference && (
                <div className="bg-white border border-[#D8D3CC] rounded-sm p-3">
                  <p className="text-xs font-mono text-[#6B6560] uppercase tracking-widest mb-1">Référence</p>
                  <p className="text-xs font-mono text-[#1A4A8A]">{criterion.reference}</p>
                </div>
              )}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-3">
                <p className="text-xs font-mono text-[#6B6560] uppercase tracking-widest mb-1">Catégorie</p>
                <p className="text-xs font-sans text-[#1A1A1A]">{criterion.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: EligibilityStatus }) {
  const colors: Record<EligibilityStatus, string> = {
    eligible: 'bg-[#16A34A]',
    ineligible: 'bg-[#C0182A]',
    temporaire: 'bg-[#D97706]',
    info: 'bg-[#1A4A8A]',
  };
  return (
    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${colors[status]}`} />
  );
}
