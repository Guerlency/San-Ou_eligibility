import { useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import DonorQuestionnaire from './components/DonorQuestionnaire';
import PhysicianReference from './components/PhysicianReference';
import CountryRisk from './components/CountryRisk';
import SearchConsole from './components/SearchConsole';
import MedCalculator from './components/MedCalculator';
import NadlerCalculator from './components/NadlerCalculator';
import SmsCampaign from './components/SmsCampaign';
import Epidemiology from './components/Epidemiology';

type AppMode = 'home' | 'donor' | 'physician' | 'country' | 'search' | 'medcalc' | 'nadler' | 'sms' | 'epi';

const NAV_ITEMS = [
  { id: 'search', label: 'Recherche', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
  )},
  { id: 'epi', label: 'Épidémiologie', urgent: true, icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  )},
  { id: 'medcalc', label: 'Médicaments', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/></svg>
  )},
  { id: 'nadler', label: 'Nadler', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  )},
  { id: 'sms', label: 'SMS Pénurie', icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  )},
] as const;

export default function App() {
  const [mode, setMode] = useState<AppMode>('home');

  if (mode !== 'home') {
    const MODULE_SHORTCUTS = [
      { id: 'donor' as AppMode, label: 'Donneur', color: '#C0182A' },
      { id: 'physician' as AppMode, label: 'Médecins', color: '#1A4A8A' },
      { id: 'country' as AppMode, label: 'Pays', color: '#059669' },
      { id: 'search' as AppMode, label: 'Recherche', color: '#C0182A' },
      { id: 'epi' as AppMode, label: 'Épidémio', color: '#DC2626', urgent: true },
      { id: 'medcalc' as AppMode, label: 'Médicaments', color: '#9333EA' },
      { id: 'nadler' as AppMode, label: 'Nadler', color: '#C0182A' },
      { id: 'sms' as AppMode, label: 'SMS', color: '#C0182A' },
    ];
    const inner =
      mode === 'donor' ? <DonorQuestionnaire onBack={() => setMode('home')} /> :
      mode === 'physician' ? <PhysicianReference onBack={() => setMode('home')} /> :
      mode === 'country' ? <CountryRisk onBack={() => setMode('home')} /> :
      mode === 'search' ? <SearchConsole onBack={() => setMode('home')} /> :
      mode === 'medcalc' ? <MedCalculator onBack={() => setMode('home')} /> :
      mode === 'nadler' ? <NadlerCalculator onBack={() => setMode('home')} /> :
      mode === 'sms' ? <SmsCampaign onBack={() => setMode('home')} /> :
      <Epidemiology onBack={() => setMode('home')} />;
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-[#1A1A1A] border-b border-[#333] flex items-center gap-0 overflow-x-auto flex-shrink-0" style={{ height: '36px' }}>
          <button
            onClick={() => setMode('home')}
            className="flex items-center gap-1.5 px-3 h-full text-white/80 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 border-r border-white/10"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z"/></svg>
            <span className="text-xs font-serif font-semibold tracking-tight">San'Ou</span>
          </button>
          {MODULE_SHORTCUTS.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-1 px-3 h-full text-xs font-sans transition-colors flex-shrink-0 whitespace-nowrap ${mode === m.id ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              {m.label}
              {m.urgent && <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse flex-shrink-0" />}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto">{inner}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#D8D3CC]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {/* Logo San'Ou */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 bg-[#C0182A] rounded-sm flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z" fill="white"/>
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-[#1A1A1A] tracking-tight">San'Ou</span>
              <span className="ml-1.5 text-xs text-[#6B6560] font-sans">par Dr MICHEL Guerlency</span>
            </div>
          </div>

          {/* Quick access tools */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setMode(item.id as AppMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans rounded-sm transition-colors ${(item as any).urgent ? 'text-[#DC2626] hover:bg-[#FEE2E2] font-medium' : 'text-[#6B6560] hover:text-[#1A1A1A] hover:bg-[#F0EDE8]'}`}
              >
                {item.icon}
                {item.label}
                {(item as any).urgent && <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center px-6 py-10">
        <div className="max-w-5xl w-full">
          <div className="mb-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#C0182A] font-medium">Sélection médicale</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#1A1A1A] leading-tight mb-3">
            San'Ou
          </h1>
          <p className="text-[#6B6560] text-base font-sans leading-relaxed mb-8 max-w-2xl">
            Plateforme de sélection médicale des donneurs de sang — questionnaire donneur, référentiels médicaux, calculateurs et outils de gestion des stocks.
          </p>

          {/* Primary modules */}
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <ModuleCard
              onClick={() => setMode('donor')}
              color="red"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              title="Questionnaire donneur"
              description="Auto-évaluation guidée en 4 étapes — éligibilité avant présentation au centre."
              cta="Démarrer →"
            />
            <ModuleCard
              onClick={() => setMode('physician')}
              color="navy"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>}
              title="Critères médicaux"
              description="Référentiel complet — pathologies, chirurgies et comportements à risque."
              cta="Ouvrir →"
            />
            <ModuleCard
              onClick={() => setMode('country')}
              color="green"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
              title="Pays à risque"
              description="Délais STHO / PLAS / PLQT par pays — Malaria, Chagas, Dengue et Zika."
              cta="Consulter →"
            />
          </div>

          {/* Épidémiologie alert card */}
          <div
            className="mb-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-sm p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FEE2E2] transition-colors"
            onClick={() => setMode('epi')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#DC2626] rounded-sm flex items-center justify-center flex-shrink-0">
                <svg className="stroke-white" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-sans font-semibold text-[#991B1B]">Mise à jour épidémiologique — 25/09/2026</p>
                <p className="text-xs text-[#991B1B] font-sans">WNV (16 pays) · WNV Belgique dépistage obligatoire · Dengue & Chikungunya France/Italie — Exclusion 28 jours</p>
              </div>
            </div>
            <svg className="stroke-[#DC2626] flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>

          {/* Secondary tools */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <ToolCard
              onClick={() => setMode('epi')}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
              title="Épidémiologie"
              description="WNV, Dengue, Chikungunya — alertes régionales et communes belges."
              accent="#DC2626"
            />
            <ToolCard
              onClick={() => setMode('search')}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>}
              title="Recherche unifiée"
              description="Pathologies, pays, médicaments — recherche croisée instantanée."
              accent="#C0182A"
            />
            <ToolCard
              onClick={() => setMode('medcalc')}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/></svg>}
              title="Calculateur médicaments"
              description="Date d'arrêt et de reprise — délais d'écartement médicamenteux."
              accent="#9333EA"
            />
            <ToolCard
              onClick={() => setMode('nadler')}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
              title="Calculateur Nadler"
              description="Volume sanguin estimé · 13% STHO · 18% PLAS selon taille et poids."
              accent="#C0182A"
            />
            <ToolCard
              onClick={() => setMode('sms')}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
              title="Campagne SMS Pénurie"
              description="Ciblage par groupe sanguin et type de don — gestion des alertes stock."
              accent="#C0182A"
            />
          </div>

          {/* Legal notice */}
          <div className="mt-6 bg-[#DBEAFE] border border-[#93C5FD] rounded-sm p-3.5 flex gap-3">
            <svg className="stroke-[#1E40AF] flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            <p className="text-xs text-[#1E40AF] font-sans leading-relaxed">
              Document confidentiel à usage interne — Dr MICHEL Guerlency. Basé sur la Loi du 05/07/1994, l'AR du 04/04/1996 et les bonnes pratiques applicables. La décision finale d'aptitude au don appartient au personnel qualifié habilité à la sélection médicale de la collecte.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#D8D3CC] py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-xs text-[#6B6560] font-sans">San'Ou · Dr MICHEL Guerlency</p>
          <p className="text-xs font-mono text-[#6B6560]">Référentiels médicaux belges</p>
        </div>
      </footer>
    </div>
  );
}

function ModuleCard({ onClick, color, icon, title, description, cta }: {
  onClick: () => void; color: 'red' | 'navy' | 'green';
  icon: ReactNode; title: string; description: string; cta: string;
}) {
  const styles = {
    red: { bg: 'bg-[#C0182A] hover:bg-[#A01525]', text: 'text-white', sub: 'text-white/70', iconBg: 'bg-white/20', border: 'border-[#C0182A]' },
    navy: { bg: 'bg-[#1A4A8A] hover:bg-[#153D75]', text: 'text-white', sub: 'text-white/70', iconBg: 'bg-white/20', border: 'border-[#1A4A8A]' },
    green: { bg: 'bg-white hover:shadow-md hover:border-[#059669]', text: 'text-[#1A1A1A]', sub: 'text-[#6B6560]', iconBg: 'bg-[#D1FAE5] group-hover:bg-[#059669]', border: 'border-[#D8D3CC]' },
  }[color];

  return (
    <button onClick={onClick} className={`group text-left ${styles.bg} border ${styles.border} rounded-sm p-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C0182A]`}>
      <div className={`w-9 h-9 ${styles.iconBg} rounded-sm flex items-center justify-center mb-4 transition-colors`}
        style={{ color: color === 'green' ? '#059669' : 'white' }}>
        {icon}
      </div>
      <h2 className={`font-serif text-lg font-semibold mb-1 ${styles.text}`}>{title}</h2>
      <p className={`text-sm leading-relaxed mb-3 ${styles.sub}`}>{description}</p>
      <p className={`text-xs font-mono ${color === 'green' ? 'text-[#059669] opacity-0 group-hover:opacity-100' : 'text-white/80'} transition-opacity`}>{cta}</p>
    </button>
  );
}

function ToolCard({ onClick, icon, title, description, accent }: {
  onClick: () => void; icon: ReactNode; title: string; description: string; accent: string;
}) {
  return (
    <button onClick={onClick} className="group text-left bg-white border border-[#D8D3CC] rounded-sm p-4 hover:shadow-md transition-all duration-200 focus:outline-none" style={{ '--accent': accent } as CSSProperties}
      onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#D8D3CC')}
    >
      <div className="w-7 h-7 bg-[#F0EDE8] rounded-sm flex items-center justify-center mb-3 transition-colors" style={{ color: '#6B6560' }}>
        {icon}
      </div>
      <p className="text-sm font-sans font-semibold text-[#1A1A1A] mb-1 leading-tight">{title}</p>
      <p className="text-xs text-[#6B6560] font-sans leading-relaxed">{description}</p>
    </button>
  );
}
