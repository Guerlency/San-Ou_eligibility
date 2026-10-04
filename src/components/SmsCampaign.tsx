import { useState } from 'react';

interface Props { onBack: () => void }

type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type DonationType = 'STHO' | 'PLAS' | 'PLQT';
type CampaignStatus = 'draft' | 'scheduled' | 'sent';

interface Campaign {
  id: string;
  name: string;
  groups: BloodGroup[];
  donationTypes: DonationType[];
  message: string;
  status: CampaignStatus;
  recipientCount: number;
  scheduledAt?: string;
  sentAt?: string;
}

const BLOOD_GROUPS: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
const DONATION_TYPES: DonationType[] = ['STHO', 'PLAS', 'PLQT'];

const TEMPLATES = [
  {
    name: 'Pénurie critique O-',
    message: 'URGENT – Dr MICHEL Guerlency : pénurie critique de sang O-. Votre don est vital. RDV au {SITE} au {TEL}. Merci.',
  },
  {
    name: 'Appel pénurie générale',
    message: 'Dr MICHEL Guerlency : les stocks sont en alerte. Nous avons besoin de vous. Donnez votre sang au {SITE}, du lundi au vendredi 8h-18h. Plus d\'infos : {TEL}.',
  },
  {
    name: 'Rappel don plaquettes',
    message: 'Dr MICHEL Guerlency – Rappel : vous pouvez à nouveau donner vos plaquettes. Prenez RDV au {TEL} ou sur dondesang.be. Merci de votre fidélité.',
  },
  {
    name: 'Message personnalisé',
    message: '',
  },
];

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Pénurie O-', groups: ['O-', 'O+'], donationTypes: ['STHO'], message: 'URGENT – pénurie critique O-. RDV au centre de collecte.', status: 'sent', recipientCount: 342, sentAt: '2026-09-28 10:30' },
  { id: '2', name: 'Rappel plaquettes semaine 40', groups: ['A+', 'A-', 'AB+', 'AB-'], donationTypes: ['PLQT'], message: 'Rappel : vous pouvez à nouveau donner vos plaquettes.', status: 'scheduled', recipientCount: 187, scheduledAt: '2026-09-30 09:00' },
  { id: '3', name: 'Stock plasma critique', groups: ['A+', 'B+', 'AB+', 'O+'], donationTypes: ['PLAS'], message: 'Alerte stocks plasma — votre don est essentiel.', status: 'draft', recipientCount: 0 },
];

const CHARS_LIMIT = 160;

function estimateRecipients(groups: BloodGroup[], types: DonationType[]): number {
  const basePerGroup: Record<BloodGroup, number> = { 'O-': 287, 'O+': 1240, 'A+': 890, 'A-': 178, 'B+': 340, 'B-': 68, 'AB+': 156, 'AB-': 31 };
  return Math.round(groups.reduce((s, g) => s + (basePerGroup[g] || 0), 0) * (types.length / 3) * 0.6);
}

export default function SmsCampaign({ onBack }: Props) {
  const [tab, setTab] = useState<'new' | 'history'>('new');
  const [selectedGroups, setSelectedGroups] = useState<BloodGroup[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<DonationType[]>(['STHO']);
  const [message, setMessage] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [templateIdx, setTemplateIdx] = useState(0);
  const [scheduledDate, setScheduledDate] = useState('');
  const [sent, setSent] = useState(false);

  const estimatedRecipients = estimateRecipients(selectedGroups, selectedTypes);
  const charsLeft = CHARS_LIMIT - message.length;
  const smsCount = Math.ceil(message.length / CHARS_LIMIT);

  function applyTemplate(idx: number) {
    setTemplateIdx(idx);
    setMessage(TEMPLATES[idx].message);
    if (TEMPLATES[idx].name !== 'Message personnalisé') {
      setCampaignName(TEMPLATES[idx].name);
    }
  }

  function toggleGroup(g: BloodGroup) {
    setSelectedGroups(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }

  function toggleType(t: DonationType) {
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  function handleSend() {
    setSent(true);
  }

  const canSend = selectedGroups.length > 0 && selectedTypes.length > 0 && message.trim().length > 10 && campaignName.trim().length > 0;

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
        <Header onBack={onBack} />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="stroke-[#16A34A]" width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-2">Campagne envoyée</h2>
            <p className="text-sm text-[#6B6560] font-sans mb-1">« {campaignName} »</p>
            <p className="text-sm text-[#6B6560] font-sans mb-6">{estimatedRecipients} destinataires · {smsCount} SMS</p>
            <button onClick={() => { setSent(false); setSelectedGroups([]); setMessage(''); setCampaignName(''); }} className="px-6 py-2.5 bg-[#C0182A] text-white text-sm font-sans rounded-sm hover:bg-[#A01525] transition-colors">
              Nouvelle campagne
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      <Header onBack={onBack} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#D8D3CC]">
          {(['new', 'history'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-sans border-b-2 transition-colors ${tab === t ? 'border-[#C0182A] text-[#C0182A] font-medium' : 'border-transparent text-[#6B6560] hover:text-[#1A1A1A]'}`}>
              {t === 'new' ? 'Nouvelle campagne' : 'Historique'}
            </button>
          ))}
        </div>

        {tab === 'history' && (
          <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-[#F0EDE8] border-b border-[#D8D3CC]">
                  <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Campagne</th>
                  <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Groupes</th>
                  <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Types</th>
                  <th className="text-center px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Destinataires</th>
                  <th className="text-center px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#6B6560]">Statut</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CAMPAIGNS.map((c, i) => (
                  <tr key={c.id} className={`${i < MOCK_CAMPAIGNS.length - 1 ? 'border-b border-[#EAE8E3]' : ''} hover:bg-[#F7F6F4] transition-colors`}>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#1A1A1A]">{c.name}</p>
                      <p className="text-xs text-[#6B6560] mt-0.5 truncate max-w-xs">{c.message}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {c.groups.map(g => <span key={g} className="text-xs bg-[#FEE2E2] text-[#991B1B] px-1.5 py-0.5 rounded-sm font-mono">{g}</span>)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {c.donationTypes.map(t => <span key={t} className="text-xs bg-[#EAE8E3] text-[#3A3A3A] px-1.5 py-0.5 rounded-sm font-mono">{t}</span>)}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-sm">{c.recipientCount > 0 ? c.recipientCount : '—'}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-sm font-sans ${c.status === 'sent' ? 'bg-[#DCFCE7] text-[#166534]' : c.status === 'scheduled' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#EAE8E3] text-[#6B6560]'}`}>
                        {c.status === 'sent' ? `Envoyé ${c.sentAt}` : c.status === 'scheduled' ? `Planifié ${c.scheduledAt}` : 'Brouillon'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'new' && (
          <div className="grid md:grid-cols-5 gap-5">
            {/* Left: config */}
            <div className="md:col-span-3 space-y-4">
              {/* Name */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Nom de la campagne</label>
                <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="ex : Pénurie O- urgente — semaine 40" className="w-full px-4 py-2.5 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] placeholder:text-[#6B6560]" />
              </div>

              {/* Blood groups */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-3">Groupes sanguins ciblés</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {BLOOD_GROUPS.map(g => (
                    <button key={g} onClick={() => toggleGroup(g)} className={`py-2 text-sm font-mono font-bold rounded-sm border transition-colors ${selectedGroups.includes(g) ? 'bg-[#C0182A] text-white border-[#C0182A]' : 'bg-white text-[#1A1A1A] border-[#D8D3CC] hover:border-[#C0182A]'}`}>
                      {g}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedGroups([...BLOOD_GROUPS])} className="text-xs text-[#C0182A] font-sans hover:underline">Sélectionner tout</button>
                  <span className="text-[#D8D3CC]">·</span>
                  <button onClick={() => setSelectedGroups([])} className="text-xs text-[#6B6560] font-sans hover:underline">Désélectionner</button>
                </div>
              </div>

              {/* Donation types */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-3">Types de dons concernés</label>
                <div className="flex gap-2">
                  {DONATION_TYPES.map(t => (
                    <button key={t} onClick={() => toggleType(t)} className={`flex-1 py-2 text-sm font-mono font-semibold rounded-sm border transition-colors ${selectedTypes.includes(t) ? 'bg-[#1A4A8A] text-white border-[#1A4A8A]' : 'bg-white text-[#1A1A1A] border-[#D8D3CC] hover:border-[#1A4A8A]'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-[#6B6560]">Message SMS</label>
                  <span className={`text-xs font-mono ${charsLeft < 20 ? 'text-[#C0182A]' : 'text-[#6B6560]'}`}>{message.length}/{CHARS_LIMIT}</span>
                </div>

                {/* Templates */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {TEMPLATES.map((t, i) => (
                    <button key={i} onClick={() => applyTemplate(i)} className={`text-xs px-2.5 py-1 rounded-sm font-sans border transition-colors ${templateIdx === i ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-[#F0EDE8] text-[#3A3A3A] border-[#D8D3CC] hover:bg-[#EAE8E3]'}`}>
                      {t.name}
                    </button>
                  ))}
                </div>

                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Rédigez votre message SMS…"
                  className="w-full px-4 py-3 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A] placeholder:text-[#6B6560] resize-none"
                />
                <p className="text-xs text-[#6B6560] font-sans mt-1.5">{'{SITE}'} = nom du centre · {'{TEL}'} = téléphone · Remplacés automatiquement à l'envoi.</p>
              </div>

              {/* Schedule */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <label className="block text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-2">Envoi planifié (optionnel)</label>
                <input type="datetime-local" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="w-full px-4 py-2.5 text-sm font-sans border border-[#D8D3CC] rounded-sm focus:outline-none focus:border-[#C0182A] focus:ring-1 focus:ring-[#C0182A]" />
                <p className="text-xs text-[#6B6560] font-sans mt-1.5">Laissez vide pour un envoi immédiat.</p>
              </div>
            </div>

            {/* Right: preview */}
            <div className="md:col-span-2 space-y-4">
              {/* Stats */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-3">Résumé</p>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B6560] font-sans">Destinataires estimés</span>
                    <span className="font-mono font-semibold text-[#1A1A1A]">{selectedGroups.length > 0 ? estimatedRecipients.toLocaleString('fr-BE') : '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B6560] font-sans">SMS par destinataire</span>
                    <span className="font-mono text-[#1A1A1A]">{message ? smsCount : '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B6560] font-sans">SMS total estimés</span>
                    <span className="font-mono font-semibold text-[#C0182A]">{selectedGroups.length > 0 && message ? (estimatedRecipients * smsCount).toLocaleString('fr-BE') : '—'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B6560] font-sans">Envoi</span>
                    <span className="text-xs font-sans text-[#1A1A1A]">{scheduledDate ? new Date(scheduledDate).toLocaleString('fr-BE') : 'Immédiat'}</span>
                  </div>
                </div>
              </div>

              {/* SMS Preview */}
              <div className="bg-white border border-[#D8D3CC] rounded-sm p-5">
                <p className="text-xs font-mono uppercase tracking-widest text-[#6B6560] mb-3">Aperçu SMS</p>
                <div className="bg-[#F0EDE8] rounded-sm p-4 min-h-[80px]">
                  {message ? (
                    <p className="text-sm font-sans text-[#1A1A1A] leading-relaxed whitespace-pre-wrap break-words">
                      {message.replace('{SITE}', 'Centre Charleroi').replace('{TEL}', '071 92 33 00')}
                    </p>
                  ) : (
                    <p className="text-sm text-[#6B6560] font-sans italic">Aperçu du message…</p>
                  )}
                </div>
                <p className="text-xs text-[#6B6560] font-sans mt-2">Expéditeur : DON DE SANG</p>
              </div>

              {/* Warnings */}
              {selectedGroups.length === 0 && (
                <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-sm p-3 text-xs text-[#92400E] font-sans">
                  Sélectionnez au moins un groupe sanguin.
                </div>
              )}
              {message.length > 0 && charsLeft < 0 && (
                <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-sm p-3 text-xs text-[#991B1B] font-sans">
                  Message trop long ({-charsLeft} caractères en trop). Le message sera découpé en {smsCount} SMS.
                </div>
              )}

              {/* Send button */}
              <button
                disabled={!canSend}
                onClick={handleSend}
                className="w-full py-3 bg-[#C0182A] text-white text-sm font-sans font-medium rounded-sm hover:bg-[#A01525] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="stroke-white" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                {scheduledDate ? 'Planifier la campagne' : 'Envoyer la campagne'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <header className="bg-white border-b border-[#D8D3CC]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Retour
        </button>
        <div className="w-px h-4 bg-[#D8D3CC]" />
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#C0182A] rounded-sm flex items-center justify-center">
            <svg className="stroke-white" width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="font-serif text-sm font-semibold text-[#1A1A1A]">Campagne SMS Pénurie</span>
        </div>
      </div>
    </header>
  );
}
