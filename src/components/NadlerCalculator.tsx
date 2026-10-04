import { useState, useMemo } from 'react';

interface Props { onBack: () => void }

// Nadler formula: Blood volume estimation
// Males:   V(L) = 0.3669 × H(m)³ + 0.03219 × W(kg) + 0.6041
// Females: V(L) = 0.3561 × H(m)³ + 0.03308 × W(kg) + 0.1833
function nadler(sex: 'M' | 'F', heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  if (sex === 'M') {
    return 0.3669 * Math.pow(h, 3) + 0.03219 * weightKg + 0.6041;
  } else {
    return 0.3561 * Math.pow(h, 3) + 0.03308 * weightKg + 0.1833;
  }
}

// Standard maximum volumes from the medical reference charts
const MAX_STHO_ML = 450; // standard max for whole blood
const MAX_PLASMA_ML = 650; // standard max for plasma apheresis

export default function NadlerCalculator({ onBack }: Props) {
  const [sex, setSex] = useState<'M' | 'F'>('M');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const result = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h < 100 || h > 230 || w < 30 || w > 300) return null;

    const totalVolumeL = nadler(sex, h, w);
    const totalVolumeMl = totalVolumeL * 1000;

    const maxSthoCalc = Math.round(totalVolumeMl * 0.13);
    const maxPlasmaCalc = Math.round(totalVolumeMl * 0.18);

    // Applied limits
    const sthoAllowed = Math.min(maxSthoCalc, MAX_STHO_ML);
    const plasmaAllowed = Math.min(maxPlasmaCalc, MAX_PLASMA_ML);

    // Standard donation volumes
    const sthoStandard = 450; // mL typically collected
    const plasmaStandard = 600; // mL typically collected for 70kg+ donor

    const sthoFeasible = sthoAllowed >= 300; // min feasible STHO
    const plasmaFeasible = plasmaAllowed >= 400;

    return {
      totalVolumeL: totalVolumeL.toFixed(2),
      totalVolumeMl: Math.round(totalVolumeMl),
      maxSthoCalc,
      maxPlasmaCalc,
      sthoAllowed,
      plasmaAllowed,
      sthoFeasible,
      plasmaFeasible,
      sthoStandard,
      plasmaStandard,
      sthoPercent13: Math.round((sthoStandard / totalVolumeMl) * 100),
      plasmaPercent18: Math.round((plasmaStandard / totalVolumeMl) * 100),
    };
  }, [sex, height, weight]);

  const isValid = parseFloat(height) >= 100 && parseFloat(weight) >= 30;

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
            <div className="w-5 h-5 bg-[#C0182A] rounded-sm flex items-center justify-center">
              <svg className="stroke-white" width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">Calculateur Nadler</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-1">Volume sanguin & volumes de don maximum</h1>
          <p className="text-sm text-[#6B6560] font-sans">Formule de Nadler — 13 % du volume sanguin total pour le sang total (STHO), 18 % pour le plasma (PLAS).</p>
        </div>

        {/* Input card */}
        <div className="bg-white border border-[#D8D3CC] rounded-sm p-6 mb-5">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#6B6560] mb-4">Paramètres du donneur</h2>
          <div className="grid gap-5">
            {/* Sex */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Sexe biologique</label>
              <div className="flex gap-2">
                {(['M', 'F'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`flex-1 py-2.5 text-sm font-sans font-medium rounded-sm border transition-colors ${sex === s ? 'bg-[#C0182A] text-white border-[#C0182A]' : 'bg-white text-[#1A1A1A] border-[#D8D3CC] hover:border-[#C0182A]'}`}
                  >
                    {s === 'M' ? 'Homme' : 'Femme'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Height */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Taille (cm)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    placeholder="ex : 172"
                    min="100" max="230"
                    className="w-full px-4 pr-10 py-2.5 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] placeholder:text-[#6B6560]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6560] font-mono">cm</span>
                </div>
              </div>
              {/* Weight */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Poids (kg)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    placeholder="ex : 70"
                    min="30" max="300"
                    className="w-full px-4 pr-10 py-2.5 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] placeholder:text-[#6B6560]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B6560] font-mono">kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && isValid && (
          <div className="space-y-4">
            {/* Total blood volume */}
            <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
              <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-1">Volume sanguin total estimé (Nadler)</p>
              <div className="flex items-end gap-3">
                <span className="font-serif text-4xl font-semibold text-[#1A1A1A]">{result.totalVolumeL}</span>
                <span className="text-lg text-[#6B6560] font-sans mb-1">L</span>
                <span className="text-sm text-[#6B6560] font-mono mb-1.5">= {result.totalVolumeMl} mL</span>
              </div>
              {/* Bar */}
              <div className="mt-3 h-2 bg-[#EAE8E3] rounded-full overflow-hidden">
                <div className="h-full bg-[#C0182A] rounded-full transition-all duration-500" style={{ width: `${Math.min((result.totalVolumeMl / 8000) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-[#6B6560] font-sans mt-1.5">Formule Nadler ({sex === 'M' ? 'Homme' : 'Femme'})</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* STHO */}
              <div className={`rounded-sm border p-5 ${result.sthoFeasible ? 'bg-white border-[#D8D3CC]' : 'bg-[#FEF2F2] border-[#FCA5A5]'}`}>
                <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Don STHO (Sang total)</p>
                <div className="mb-3">
                  <p className="text-xs text-[#6B6560] font-sans">13% du VST</p>
                  <p className="font-serif text-3xl font-semibold text-[#1A1A1A]">{result.maxSthoCalc} <span className="text-base text-[#6B6560]">mL</span></p>
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between bg-[#F0EDE8] rounded-sm px-2.5 py-1.5">
                    <span className="text-[#6B6560]">Volume max applicable</span>
                    <span className="font-mono font-semibold text-[#1A1A1A]">{result.sthoAllowed} mL</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#F0EDE8] rounded-sm px-2.5 py-1.5">
                    <span className="text-[#6B6560]">Don standard (450 mL)</span>
                    <span className={`font-mono font-semibold ${result.sthoFeasible ? 'text-[#166534]' : 'text-[#991B1B]'}`}>
                      {result.sthoFeasible ? '✓ Autorisé' : '✗ Refusé'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-[#F0EDE8] rounded-sm px-2.5 py-1.5">
                    <span className="text-[#6B6560]">% du VST (450 mL)</span>
                    <span className={`font-mono font-semibold ${result.sthoPercent13 <= 13 ? 'text-[#166534]' : 'text-[#991B1B]'}`}>
                      {result.sthoPercent13}% {result.sthoPercent13 <= 13 ? '≤ 13% ✓' : '> 13% ✗'}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-[#EAE8E3] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${result.sthoFeasible ? 'bg-[#C0182A]' : 'bg-[#FCA5A5]'}`}
                    style={{ width: `${Math.min((result.sthoAllowed / 600) * 100, 100)}%` }} />
                </div>
              </div>

              {/* PLAS */}
              <div className={`rounded-sm border p-5 ${result.plasmaFeasible ? 'bg-white border-[#D8D3CC]' : 'bg-[#FEF2F2] border-[#FCA5A5]'}`}>
                <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Don PLAS (Plasma)</p>
                <div className="mb-3">
                  <p className="text-xs text-[#6B6560] font-sans">18% du VST</p>
                  <p className="font-serif text-3xl font-semibold text-[#1A1A1A]">{result.maxPlasmaCalc} <span className="text-base text-[#6B6560]">mL</span></p>
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between bg-[#F0EDE8] rounded-sm px-2.5 py-1.5">
                    <span className="text-[#6B6560]">Volume max applicable</span>
                    <span className="font-mono font-semibold text-[#1A1A1A]">{result.plasmaAllowed} mL</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#F0EDE8] rounded-sm px-2.5 py-1.5">
                    <span className="text-[#6B6560]">Don standard (600 mL)</span>
                    <span className={`font-mono font-semibold ${result.plasmaFeasible ? 'text-[#166534]' : 'text-[#991B1B]'}`}>
                      {result.plasmaFeasible ? '✓ Autorisé' : '✗ Refusé'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-[#F0EDE8] rounded-sm px-2.5 py-1.5">
                    <span className="text-[#6B6560]">% du VST (600 mL)</span>
                    <span className={`font-mono font-semibold ${result.plasmaPercent18 <= 18 ? 'text-[#166534]' : 'text-[#991B1B]'}`}>
                      {result.plasmaPercent18}% {result.plasmaPercent18 <= 18 ? '≤ 18% ✓' : '> 18% ✗'}
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-[#EAE8E3] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${result.plasmaFeasible ? 'bg-[#1A4A8A]' : 'bg-[#FCA5A5]'}`}
                    style={{ width: `${Math.min((result.plasmaAllowed / 800) * 100, 100)}%` }} />
                </div>
              </div>
            </div>

            {/* Formula detail */}
            <div className="bg-[#F0EDE8] border border-[#D8D3CC] rounded-sm p-4">
              <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Formule appliquée</p>
              <p className="text-xs font-mono text-[#1A1A1A]">
                {sex === 'M'
                  ? `V(L) = 0.3669 × (${(parseFloat(height)/100).toFixed(2)})³ + 0.03219 × ${weight} + 0.6041 = ${result.totalVolumeL} L`
                  : `V(L) = 0.3561 × (${(parseFloat(height)/100).toFixed(2)})³ + 0.03308 × ${weight} + 0.1833 = ${result.totalVolumeL} L`}
              </p>
              <p className="text-xs text-[#6B6560] font-sans mt-2">
                Limites: STHO ≤ 13% VST (max {MAX_STHO_ML} mL) · PLAS ≤ 18% VST (max {MAX_PLASMA_ML} mL) · Poids minimum: 50 kg
              </p>
            </div>
          </div>
        )}

        {!isValid && (height || weight) && (
          <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-sm p-4 text-sm font-sans text-[#92400E]">
            Veuillez saisir une taille (100–230 cm) et un poids (30–300 kg) valides.
          </div>
        )}
      </main>
    </div>
  );
}
