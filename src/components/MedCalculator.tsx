import { useState, useMemo } from 'react';
import { MEDICATIONS, MedicationEntry } from '../data/medicationData';

interface Props { onBack: () => void }

type Mode = 'from_last_dose' | 'from_donation_date';

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function subDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('fr-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function toInputDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export default function MedCalculator({ onBack }: Props) {
  const [search, setSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState<MedicationEntry | null>(null);
  const [mode, setMode] = useState<Mode>('from_last_dose');
  const [date, setDate] = useState(toInputDate(new Date()));
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = useMemo(() => {
    if (!search.trim() || search.trim().length < 2) return [];
    const q = search.toLowerCase();
    return MEDICATIONS.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.aliases.some(a => a.toLowerCase().includes(q)) ||
      m.note?.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [search]);

  const result = useMemo(() => {
    if (!selectedMed || !date) return null;
    const inputDate = new Date(date);

    if (selectedMed.requiresMedicalReview) {
      return { type: 'evaluation' as const };
    }
    if (selectedMed.deferralDays === -1) {
      return { type: 'permanent' as const };
    }
    if (selectedMed.deferralDays === 0) {
      return { type: 'none' as const };
    }

    if (mode === 'from_last_dose') {
      const earliestDonation = addDays(inputDate, selectedMed.deferralDays);
      const today = new Date();
      const alreadyPossible = earliestDonation <= today;
      return {
        type: 'date' as const,
        label: 'Date de don possible à partir du',
        date: earliestDonation,
        alreadyPossible,
        daysFromNow: Math.ceil((earliestDonation.getTime() - today.getTime()) / 86400000),
      };
    } else {
      const latestLastDose = subDays(inputDate, selectedMed.deferralDays);
      return {
        type: 'date' as const,
        label: 'Dernière prise acceptable avant le',
        date: latestLastDose,
        alreadyPossible: false,
        daysFromNow: 0,
      };
    }
  }, [selectedMed, date, mode]);

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      <header className="bg-white border-b border-[#D8D3CC]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Retour
          </button>
          <div className="w-px h-4 bg-[#D8D3CC]" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#9333EA] rounded-sm flex items-center justify-center">
              <svg className="stroke-white" width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
              </svg>
            </div>
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">Calculateur médicaments</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-1">Arrêt & Reprise des médicaments</h1>
          <p className="text-sm text-[#6B6560] font-sans">Calculez la date de don possible après arrêt d'un médicament, ou la date de dernière prise avant un don planifié.</p>
        </div>

        <div className="grid gap-4">
          {/* Medication search */}
          <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">1. Médicament</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 stroke-[#6B6560]" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
              </svg>
              <input
                type="text"
                value={selectedMed ? selectedMed.name : search}
                onChange={e => {
                  setSearch(e.target.value);
                  setSelectedMed(null);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Nom du médicament ou spécialité (ex: Clopidogrel, Roacutane…)"
                className="w-full pl-8 pr-4 py-2.5 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA] placeholder:text-[#6B6560]"
              />
              {(selectedMed || search) && (
                <button onClick={() => { setSearch(''); setSelectedMed(null); setShowDropdown(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560] hover:text-[#1A1A1A]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}

              {showDropdown && suggestions.length > 0 && !selectedMed && (
                <div className="absolute z-10 top-full mt-1 left-0 right-0 bg-white border border-[#D8D3CC] rounded-sm shadow-lg overflow-hidden">
                  {suggestions.map(m => (
                    <button
                      key={m.id}
                      className="w-full text-left px-4 py-3 hover:bg-[#F7F6F4] border-b border-[#EAE8E3] last:border-0 transition-colors"
                      onClick={() => { setSelectedMed(m); setSearch(m.name); setShowDropdown(false); }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-sans font-medium text-[#1A1A1A]">{m.name}</p>
                          <p className="text-xs text-[#6B6560] font-sans">{m.category} · {m.aliases.slice(0, 2).join(', ')}</p>
                        </div>
                        <span className={`text-xs font-mono flex-shrink-0 px-1.5 py-0.5 rounded-sm ${m.deferralDays === -1 ? 'bg-[#FEE2E2] text-[#991B1B]' : m.deferralDays === 0 ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                          {m.deferralLabel}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedMed && (
              <div className="mt-3 bg-[#F5F3FF] border border-[#C4B5FD] rounded-sm p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-mono text-[#9333EA] uppercase tracking-widest mb-0.5">{selectedMed.category}</p>
                    <p className="text-sm font-sans font-medium text-[#1A1A1A]">{selectedMed.name}</p>
                    {selectedMed.note && <p className="text-xs text-[#6B6560] font-sans mt-1">{selectedMed.note}</p>}
                  </div>
                  <span className={`text-xs font-mono flex-shrink-0 px-2 py-1 rounded-sm ${selectedMed.deferralDays === -1 ? 'bg-[#FEE2E2] text-[#991B1B]' : selectedMed.deferralDays === 0 ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                    {selectedMed.deferralLabel}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mode */}
          <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-3">2. Mode de calcul</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('from_last_dose')}
                className={`p-3 text-left border rounded-sm transition-colors ${mode === 'from_last_dose' ? 'border-[#9333EA] bg-[#F5F3FF]' : 'border-[#D8D3CC] hover:border-[#9333EA]/50'}`}
              >
                <p className="text-sm font-sans font-medium text-[#1A1A1A] mb-0.5">Depuis la dernière prise</p>
                <p className="text-xs text-[#6B6560] font-sans">→ Quand peut-il donner ?</p>
              </button>
              <button
                onClick={() => setMode('from_donation_date')}
                className={`p-3 text-left border rounded-sm transition-colors ${mode === 'from_donation_date' ? 'border-[#9333EA] bg-[#F5F3FF]' : 'border-[#D8D3CC] hover:border-[#9333EA]/50'}`}
              >
                <p className="text-sm font-sans font-medium text-[#1A1A1A] mb-0.5">Depuis la date de don</p>
                <p className="text-xs text-[#6B6560] font-sans">→ Dernière prise acceptable ?</p>
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
            <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">
              3. {mode === 'from_last_dose' ? 'Date de dernière prise' : 'Date de don planifiée'}
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-2.5 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA]"
            />
          </div>

          {/* Result */}
          {selectedMed && date && result && (
            <div className={`rounded-sm border overflow-hidden ${
              result.type === 'permanent' ? 'border-[#FCA5A5] bg-[#FEE2E2]' :
              result.type === 'evaluation' ? 'border-[#93C5FD] bg-[#DBEAFE]' :
              result.type === 'none' ? 'border-[#86EFAC] bg-[#DCFCE7]' :
              result.alreadyPossible ? 'border-[#86EFAC] bg-[#DCFCE7]' : 'border-[#FCD34D] bg-[#FEF3C7]'
            }`}>
              <div className="p-5">
                {result.type === 'permanent' && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#C0182A] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="stroke-white" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                      <p className="font-serif text-lg font-semibold text-[#991B1B]">Contre-indication permanente</p>
                    </div>
                    <p className="text-sm text-[#7F1D1D] font-sans">Ce médicament implique une contre-indication permanente ou nécessite une évaluation médicale individuelle approfondie. Aucun calcul de date n'est possible automatiquement.</p>
                  </>
                )}
                {result.type === 'evaluation' && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#1A4A8A] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="stroke-white" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                      </div>
                      <p className="font-serif text-lg font-semibold text-[#1E40AF]">Évaluation médicale requise</p>
                    </div>
                    <p className="text-sm text-[#1E3A8A] font-sans">Le délai dépend de l'indication, de la pathologie traitée ou d'autres conditions précisées dans le référentiel. Aucun calcul automatique fiable n'est possible.</p>
                  </>
                )}
                {result.type === 'none' && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="stroke-white" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p className="font-serif text-lg font-semibold text-[#166534]">Aucun délai requis</p>
                    </div>
                    <p className="text-sm text-[#14532D] font-sans">Ce médicament n'impose pas de délai d'écartement spécifique. La pathologie causale doit toutefois être évaluée séparément.</p>
                  </>
                )}
                {result.type === 'date' && (
                  <>
                    <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-1">{result.label}</p>
                    <p className={`font-serif text-2xl font-semibold mb-2 ${result.alreadyPossible ? 'text-[#166534]' : 'text-[#92400E]'}`}>
                      {formatDate(result.date)}
                    </p>
                    {result.alreadyPossible ? (
                      <p className="text-sm font-sans text-[#14532D]">✓ Le délai est déjà écoulé. Le donneur peut se présenter.</p>
                    ) : (
                      <p className="text-sm font-sans text-[#78350F]">
                        Dans {result.daysFromNow} jour{result.daysFromNow > 1 ? 's' : ''} à compter d'aujourd'hui. Délai : {selectedMed.deferralLabel}.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick reference table */}
        <div className="mt-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#6B6560] mb-3">Référence rapide – Médicaments courants</h2>
          <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#F0EDE8] border-b border-[#D8D3CC]">
                  <th className="text-left px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Médicament</th>
                  <th className="text-left px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Catégorie</th>
                  <th className="text-center px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Délai</th>
                </tr>
              </thead>
              <tbody>
                {MEDICATIONS.filter(m => ['isotretinoine', 'aciretine', 'clopidogrel', 'dutasteride', 'finasteride', 'aspirine_forte', 'vaccin_vivant', 'vaccin_inactif', 'antibiotiques', 'corticoides_systemic', 'insuline'].includes(m.id)).map((m, i, arr) => (
                  <tr key={m.id} className={`${i < arr.length - 1 ? 'border-b border-[#EAE8E3]' : ''} hover:bg-[#F7F6F4] cursor-pointer transition-colors`}
                    onClick={() => { setSelectedMed(m); setSearch(m.name); }}>
                    <td className="px-4 py-3 font-sans font-medium text-[#1A1A1A] text-sm">{m.name}</td>
                    <td className="px-4 py-3 text-xs text-[#6B6560]">{m.category}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-sm ${m.deferralDays === -1 ? 'bg-[#FEE2E2] text-[#991B1B]' : m.deferralDays === 0 ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'}`}>
                        {m.deferralLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
