import { useState } from 'react';
import { QUESTIONNAIRE_STEPS } from '../data/eligibilityData';

type Result = 'eligible' | 'ineligible' | 'temporaire' | null;

interface Props {
  onBack: () => void;
}

export default function DonorQuestionnaire({ onBack }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState<Result>(null);
  const [reason, setReason] = useState('');
  const [delai, setDelai] = useState('');

  const step = QUESTIONNAIRE_STEPS[stepIndex];
  const question = step?.questions[questionIndex];
  const totalQuestions = QUESTIONNAIRE_STEPS.reduce((s, st) => s + st.questions.length, 0);
  const answeredQuestions = QUESTIONNAIRE_STEPS.slice(0, stepIndex).reduce((s, st) => s + st.questions.length, 0) + questionIndex;
  const progress = (answeredQuestions / totalQuestions) * 100;

  function handleAnswer(answer: 'yes' | 'no') {
    const outcome = answer === 'yes' ? question.yes : question.no;
    if (outcome === 'ineligible') {
      setResult('ineligible');
      setReason((question as any).ineligibleReason || '');
    } else if (outcome === 'temporaire') {
      setResult('temporaire');
      setDelai((question as any).delai || '');
      setReason((question as any).ineligibleReason || '');
    } else {
      // continue
      const nextQ = questionIndex + 1;
      if (nextQ < step.questions.length) {
        setQuestionIndex(nextQ);
      } else {
        const nextStep = stepIndex + 1;
        if (nextStep < QUESTIONNAIRE_STEPS.length) {
          setStepIndex(nextStep);
          setQuestionIndex(0);
        } else {
          setResult('eligible');
        }
      }
    }
  }

  function restart() {
    setStepIndex(0);
    setQuestionIndex(0);
    setResult(null);
    setReason('');
    setDelai('');
  }

  if (result) {
    return (
      <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
        <Header onBack={onBack} title="Questionnaire donneur" />
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-lg w-full">
            {result === 'eligible' && (
              <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
                <div className="bg-[#DCFCE7] px-7 py-6 border-b border-[#86EFAC]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="stroke-white" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#166534]">Vous semblez éligible</h2>
                  </div>
                  <p className="text-[#166534] text-sm font-sans">D'après vos réponses, vous pouvez vous présenter à un site de collecte.</p>
                </div>
                <div className="px-7 py-6">
                  <p className="text-sm text-[#6B6560] font-sans mb-4">La décision finale appartient au médecin de sélection après entretien et mesures biologiques sur place.</p>
                  <div className="bg-[#F0EDE8] rounded-sm p-4 mb-5">
                    <p className="text-xs font-mono text-[#6B6560] uppercase tracking-widest mb-1">Prochaine étape</p>
                    <p className="text-sm text-[#1A1A1A] font-sans">Rendez-vous sur <strong>dondesang.be</strong> pour trouver le site de collecte le plus proche et prendre rendez-vous.</p>
                  </div>
                  <button onClick={restart} className="w-full border border-[#D8D3CC] text-[#1A1A1A] text-sm font-sans py-2.5 rounded-sm hover:bg-[#F0EDE8] transition-colors">
                    Recommencer le questionnaire
                  </button>
                </div>
              </div>
            )}

            {result === 'ineligible' && (
              <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
                <div className="bg-[#FEE2E2] px-7 py-6 border-b border-[#FCA5A5]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#C0182A] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="stroke-white" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#991B1B]">Don non recommandé</h2>
                  </div>
                  <p className="text-[#991B1B] text-sm font-sans">D'après vos réponses, vous ne remplissez pas les critères d'éligibilité actuels.</p>
                </div>
                <div className="px-7 py-6">
                  {reason && (
                    <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-sm p-4 mb-5">
                      <p className="text-xs font-mono text-[#991B1B] uppercase tracking-widest mb-1">Motif</p>
                      <p className="text-sm text-[#7F1D1D] font-sans">{reason}</p>
                    </div>
                  )}
                  <p className="text-sm text-[#6B6560] font-sans mb-4">Si vous avez des doutes sur votre situation, n'hésitez pas à contacter directement un médecin de sélection.</p>
                  <button onClick={restart} className="w-full border border-[#D8D3CC] text-[#1A1A1A] text-sm font-sans py-2.5 rounded-sm hover:bg-[#F0EDE8] transition-colors">
                    Recommencer
                  </button>
                </div>
              </div>
            )}

            {result === 'temporaire' && (
              <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
                <div className="bg-[#FEF3C7] px-7 py-6 border-b border-[#FCD34D]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#D97706] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="stroke-white" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                      </svg>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#92400E]">Report temporaire</h2>
                  </div>
                  <p className="text-[#92400E] text-sm font-sans">Une situation récente vous impose un délai avant de pouvoir donner.</p>
                </div>
                <div className="px-7 py-6">
                  {delai && (
                    <div className="bg-[#FFFBEB] border border-[#FCD34D] rounded-sm p-4 mb-5">
                      <p className="text-xs font-mono text-[#92400E] uppercase tracking-widest mb-1">Délai à respecter</p>
                      <p className="text-sm font-semibold text-[#78350F] font-sans">{delai}</p>
                    </div>
                  )}
                  <p className="text-sm text-[#6B6560] font-sans mb-4">Une fois ce délai passé, vous pourrez vous présenter à un site de collecte. Le médecin de sélection validera définitivement votre aptitude.</p>
                  <button onClick={restart} className="w-full border border-[#D8D3CC] text-[#1A1A1A] text-sm font-sans py-2.5 rounded-sm hover:bg-[#F0EDE8] transition-colors">
                    Recommencer
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F4] flex flex-col">
      <Header onBack={onBack} title="Questionnaire donneur" />

      <main className="flex-1 flex flex-col items-center px-6 py-8">
        <div className="max-w-xl w-full">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#6B6560] uppercase tracking-widest">{step.title}</span>
              <span className="text-xs font-mono text-[#6B6560]">{answeredQuestions + 1} / {totalQuestions}</span>
            </div>
            <div className="h-1 bg-[#EAE8E3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C0182A] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
            {/* Step tabs */}
            <div className="flex gap-1 mt-3">
              {QUESTIONNAIRE_STEPS.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i < stepIndex ? 'bg-[#C0182A]' : i === stepIndex ? 'bg-[#C0182A]/50' : 'bg-[#EAE8E3]'}`}
                />
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white border border-[#D8D3CC] rounded-sm overflow-hidden">
            <div className="px-7 py-6 border-b border-[#EAE8E3]">
              <p className="text-xs font-mono text-[#C0182A] uppercase tracking-widest mb-3">Question {answeredQuestions + 1}</p>
              <p className="font-serif text-xl font-semibold text-[#1A1A1A] leading-snug">{question.text}</p>
            </div>

            <div className="px-7 py-6 flex gap-3">
              <button
                onClick={() => handleAnswer('yes')}
                className="flex-1 bg-[#1A1A1A] text-white text-sm font-sans font-medium py-3 rounded-sm hover:bg-[#333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2"
              >
                Oui
              </button>
              <button
                onClick={() => handleAnswer('no')}
                className="flex-1 bg-white border border-[#D8D3CC] text-[#1A1A1A] text-sm font-sans font-medium py-3 rounded-sm hover:bg-[#F0EDE8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C0182A] focus:ring-offset-2"
              >
                Non
              </button>
            </div>
          </div>

          <div className="mt-6 bg-[#DBEAFE] border border-[#93C5FD] rounded-sm p-4 flex gap-3">
            <svg className="stroke-[#1E40AF] flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            <p className="text-xs text-[#1E40AF] font-sans leading-relaxed">
              Répondez honnêtement. Ce questionnaire n'est pas un test — il vise à protéger votre santé et celle des receveurs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Header({ onBack, title }: { onBack: () => void; title: string }) {
  return (
    <header className="bg-white border-b border-[#D8D3CC]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-sm font-sans">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Retour
        </button>
        <div className="w-px h-4 bg-[#D8D3CC]" />
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#C0182A] rounded-sm flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z" fill="white"/>
            </svg>
          </div>
          <span className="font-serif text-sm font-semibold text-[#1A1A1A]">{title}</span>
        </div>
      </div>
    </header>
  );
}
