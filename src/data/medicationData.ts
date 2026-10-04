import { REFERENCE_MEDICATIONS } from './fullMedicationData';

export type DonationType = 'STHO' | 'PLAS' | 'PLQT' | 'TOUS';

export interface MedicationEntry {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  deferralDays: number; // -1 = permanent CI
  deferralLabel: string;
  scope: DonationType;
  note?: string;
  requiresMedicalReview?: boolean;
}

export const MED_CATEGORIES = [
  'Anticoagulants & antiagrégants',
  'Dermatologie & tératogènes',
  'Neurologie & psychiatrie',
  'Cardiovasculaire',
  'Endocrinologie',
  'Oncologie & immunosuppresseurs',
  'Anti-infectieux',
  'Vaccins',
  'Hormones',
  'Autres',
] as const;

const CURATED_MEDICATIONS: MedicationEntry[] = [
  // Anticoagulants & antiagrégants
  { id: 'aspirine_forte', name: 'Aspirine ≥ 500 mg', aliases: ['acide acétylsalicylique', 'aspegic'], category: 'Anticoagulants & antiagrégants', deferralDays: 3, deferralLabel: '3 jours', scope: 'PLQT', note: 'Don de plaquettes uniquement. Pour STHO : pas de délai.' },
  { id: 'clopidogrel', name: 'Clopidogrel', aliases: ['Plavix', 'Duoplavin'], category: 'Anticoagulants & antiagrégants', deferralDays: 7, deferralLabel: '7 jours', scope: 'PLQT' },
  { id: 'prasugrel', name: 'Prasugrel', aliases: ['Efient'], category: 'Anticoagulants & antiagrégants', deferralDays: 7, deferralLabel: '7 jours', scope: 'PLQT' },
  { id: 'ticagrelor', name: 'Ticagrelor', aliases: ['Brilique'], category: 'Anticoagulants & antiagrégants', deferralDays: 7, deferralLabel: '7 jours', scope: 'PLQT' },
  { id: 'aod', name: 'Anticoagulants oraux directs (AOD)', aliases: ['rivaroxaban', 'apixaban', 'dabigatran', 'Xarelto', 'Eliquis', 'Pradaxa'], category: 'Anticoagulants & antiagrégants', deferralDays: 2, deferralLabel: '2 jours (48h)', scope: 'TOUS', note: 'Vérifier la pathologie causale — souvent contre-indication définitive.' },
  { id: 'avk', name: 'AVK (antivitamine K)', aliases: ['warfarine', 'acénocoumarol', 'Sintrom', 'Coumadine'], category: 'Anticoagulants & antiagrégants', deferralDays: 2, deferralLabel: '2 jours', scope: 'TOUS', note: 'La pathologie causale est souvent une CI définitive.' },
  { id: 'heparine', name: 'Héparine', aliases: ['HBPM', 'Lovenox', 'Fragmin', 'Innohep'], category: 'Anticoagulants & antiagrégants', deferralDays: 1, deferralLabel: '24h après dernière injection', scope: 'TOUS' },
  { id: 'acide_tranexamique', name: 'Acide tranexamique', aliases: ['Exacyl'], category: 'Anticoagulants & antiagrégants', deferralDays: 0, deferralLabel: 'Pas de délai', scope: 'TOUS' },

  // Dermatologie & tératogènes
  { id: 'isotretinoine', name: 'Isotrétinoïne', aliases: ['Roaccutane', 'Roacutane', 'Curacne'], category: 'Dermatologie & tératogènes', deferralDays: 30, deferralLabel: '1 mois', scope: 'TOUS' },
  { id: 'aciretine', name: 'Acitrétine', aliases: ['Soriatane', 'Neotigason'], category: 'Dermatologie & tératogènes', deferralDays: -1, deferralLabel: 'CI permanente', scope: 'TOUS', note: 'Demi-vie très longue, risque tératogène définitif.' },
  { id: 'etretinate', name: 'Étrétinate', aliases: ['Tigason'], category: 'Dermatologie & tératogènes', deferralDays: -1, deferralLabel: 'CI permanente', scope: 'TOUS' },
  { id: 'finasteride', name: 'Finastéride', aliases: ['Propecia', 'Proscar', 'Chibroproscar'], category: 'Dermatologie & tératogènes', deferralDays: 30, deferralLabel: '1 mois', scope: 'TOUS' },
  { id: 'dutasteride', name: 'Dutastéride', aliases: ['Avodart'], category: 'Dermatologie & tératogènes', deferralDays: 180, deferralLabel: '6 mois', scope: 'TOUS' },
  { id: 'thalidomide', name: 'Thalidomide', aliases: ['Thalodomid'], category: 'Dermatologie & tératogènes', deferralDays: -1, deferralLabel: 'CI permanente', scope: 'TOUS' },
  { id: 'raloxifene', name: 'Raloxifène', aliases: ['Evista'], category: 'Dermatologie & tératogènes', deferralDays: 30, deferralLabel: '1 mois', scope: 'TOUS' },
  { id: 'tamoxifene', name: 'Tamoxifène', aliases: ['Nolvadex'], category: 'Dermatologie & tératogènes', deferralDays: 30, deferralLabel: '1 mois (évaluation)', scope: 'TOUS', note: 'Cancer sous-jacent = CI permanente.' },
  { id: 'methotrexate', name: 'Méthotrexate', aliases: ['Novatrex', 'Ledertrexate'], category: 'Dermatologie & tératogènes', deferralDays: -1, deferralLabel: 'CI permanente ou 6 mois', scope: 'TOUS', note: 'Selon la pathologie causale et avis médical.' },

  // Neurologie & psychiatrie
  { id: 'carbamazepine', name: 'Carbamazépine', aliases: ['Tegretol'], category: 'Neurologie & psychiatrie', deferralDays: 0, deferralLabel: 'Pas de délai si stable', scope: 'TOUS', note: 'La pathologie (épilepsie) doit être évaluée séparément.' },
  { id: 'phenytoine', name: 'Phénytoïne', aliases: ['Dilantin', 'Phenytoïne'], category: 'Neurologie & psychiatrie', deferralDays: 0, deferralLabel: 'Évaluation médicale', scope: 'TOUS' },
  { id: 'valproate', name: 'Valproate / Acide valproïque', aliases: ['Depakine', 'Depakote'], category: 'Neurologie & psychiatrie', deferralDays: 0, deferralLabel: 'Évaluation médicale', scope: 'TOUS' },
  { id: 'lithium', name: 'Lithium', aliases: ['Camcolit', 'Maniprex', 'Téralysal'], category: 'Neurologie & psychiatrie', deferralDays: -1, deferralLabel: 'CI (trouble bipolaire)', scope: 'TOUS', note: 'La pathologie nécessite évaluation individuelle.' },
  { id: 'methylphenidate', name: 'Méthylphénidate', aliases: ['Ritaline', 'Concerta', 'Quasym', 'Medikinet'], category: 'Neurologie & psychiatrie', deferralDays: 0, deferralLabel: 'Évaluation médicale', scope: 'TOUS' },

  // Cardiovasculaire
  { id: 'antihypertenseurs', name: 'Antihypertenseurs', aliases: ['lisinopril', 'amlodipine', 'ramipril', 'bisoprolol', 'valsartan'], category: 'Cardiovasculaire', deferralDays: 0, deferralLabel: 'Pas de délai si équilibré', scope: 'TOUS', note: 'La pathologie cardiovasculaire doit être évaluée.' },
  { id: 'digoxine', name: 'Digoxine', aliases: ['Lanoxin'], category: 'Cardiovasculaire', deferralDays: 0, deferralLabel: 'Évaluation cardiologique', scope: 'TOUS' },
  { id: 'amiodarone', name: 'Amiodarone', aliases: ['Cordarone'], category: 'Cardiovasculaire', deferralDays: -1, deferralLabel: 'CI (arythmie sévère)', scope: 'TOUS' },
  { id: 'statines', name: 'Statines', aliases: ['atorvastatine', 'rosuvastatine', 'simvastatine', 'Crestor', 'Tahor', 'Zocor'], category: 'Cardiovasculaire', deferralDays: 0, deferralLabel: 'Pas de délai', scope: 'TOUS' },

  // Endocrinologie
  { id: 'insuline', name: 'Insuline', aliases: ['Lantus', 'Novorapid', 'Humalog', 'Levemir'], category: 'Endocrinologie', deferralDays: -1, deferralLabel: 'CI (DT1 insulino-dépendant)', scope: 'TOUS', note: 'Diabète de type 1 sous insuline = CI permanente.' },
  { id: 'antidiabetiques_oraux', name: 'Antidiabétiques oraux', aliases: ['metformine', 'Glucophage', 'Diamicron', 'Januvia', 'glipizide'], category: 'Endocrinologie', deferralDays: 0, deferralLabel: 'Pas de délai si DT2 équilibré', scope: 'TOUS' },
  { id: 'semaglutide', name: 'Sémaglutide', aliases: ['Ozempic', 'Wegovy', 'Rybelsus'], category: 'Endocrinologie', deferralDays: 0, deferralLabel: 'Pas de délai si équilibré', scope: 'TOUS' },
  { id: 'hormones_thyroide', name: 'Hormones thyroïdiennes', aliases: ['Levothyrox', 'lévothyroxine', 'thyroxine'], category: 'Endocrinologie', deferralDays: 0, deferralLabel: 'Pas de délai si équilibré', scope: 'TOUS' },
  { id: 'antithyroidiens', name: 'Antithyroïdiens', aliases: ['carbimazole', 'propylthiouracile', 'Strumazol', 'Propylex'], category: 'Endocrinologie', deferralDays: 0, deferralLabel: 'Évaluation médicale', scope: 'TOUS' },
  { id: 'contraceptifs_oraux', name: 'Contraceptifs oraux', aliases: ['pilule', 'oestrogènes', 'progestatifs'], category: 'Hormones', deferralDays: 0, deferralLabel: 'Pas de délai', scope: 'TOUS' },
  { id: 'testosterone', name: 'Testostérone', aliases: ['Sustanon', 'Androtardyl', 'Nebido'], category: 'Hormones', deferralDays: 30, deferralLabel: '1 mois', scope: 'TOUS' },

  // Oncologie & immunosuppresseurs
  { id: 'chimiotherapie', name: 'Chimiothérapie', aliases: ['cytotoxiques', 'anticancéreux'], category: 'Oncologie & immunosuppresseurs', deferralDays: -1, deferralLabel: 'CI permanente', scope: 'TOUS' },
  { id: 'immunosuppresseurs', name: 'Immunosuppresseurs', aliases: ['Cellcept', 'mycophénolate', 'ciclosporine', 'Sandimmun', 'Imuran', 'azathioprine'], category: 'Oncologie & immunosuppresseurs', deferralDays: -1, deferralLabel: 'CI (selon pathologie)', scope: 'TOUS' },
  { id: 'biotherapies', name: 'Biothérapies / Anticorps monoclonaux', aliases: ['adalimumab', 'etanercept', 'infliximab', 'Humira', 'Remicade', 'Enbrel', 'rituximab'], category: 'Oncologie & immunosuppresseurs', deferralDays: -1, deferralLabel: 'CI (évaluation)', scope: 'TOUS' },
  { id: 'corticoides_systemic', name: 'Corticoïdes systémiques (forte dose)', aliases: ['prednisone', 'méthylprednisolone', 'Medrol', 'Solupred', 'dexaméthasone'], category: 'Oncologie & immunosuppresseurs', deferralDays: 7, deferralLabel: '7 jours après arrêt', scope: 'TOUS', note: 'Dose faible ou locale : pas de délai.' },

  // Anti-infectieux
  { id: 'antibiotiques', name: 'Antibiotiques (en cours)', aliases: ['amoxicilline', 'augmentin', 'azithromycine', 'ceftriaxone', 'doxycycline'], category: 'Anti-infectieux', deferralDays: 14, deferralLabel: '14 jours après fin traitement + guérison', scope: 'TOUS' },
  { id: 'antimalariques', name: 'Antipaludéens (prophylaxie)', aliases: ['chloroquine', 'méfloquine', 'Malarone', 'atovaquone'], category: 'Anti-infectieux', deferralDays: 90, deferralLabel: '3 mois après retour de zone', scope: 'TOUS', note: 'Le retour de zone palustre impose délai indépendamment du traitement.' },
  { id: 'antiviraux', name: 'Antiviraux (VIH, hépatites)', aliases: ['tenofovir', 'emtricitabine', 'Truvada', 'entecavir', 'sofosbuvir'], category: 'Anti-infectieux', deferralDays: -1, deferralLabel: 'CI (pathologie causale)', scope: 'TOUS' },
  { id: 'antifongiques_systemic', name: 'Antifongiques systémiques', aliases: ['fluconazole', 'itraconazole', 'voriconazole', 'amphotéricine B'], category: 'Anti-infectieux', deferralDays: 14, deferralLabel: '14 jours après fin traitement', scope: 'TOUS' },

  // Vaccins
  { id: 'vaccin_vivant', name: 'Vaccins vivants atténués', aliases: ['ROR', 'varicelle', 'fièvre jaune', 'BCG', 'rotavirus'], category: 'Vaccins', deferralDays: 28, deferralLabel: '28 jours', scope: 'TOUS' },
  { id: 'vaccin_inactif', name: 'Vaccins inactivés / sous-unitaires', aliases: ['grippe', 'COVID-19', 'hépatite B', 'tétanos', 'pneumocoque', 'méningocoque'], category: 'Vaccins', deferralDays: 0, deferralLabel: 'Pas de délai (si asymptomatique)', scope: 'TOUS' },
  { id: 'vaccin_dengue', name: 'Vaccin Dengue (QDENGA)', aliases: ['QDENGA', 'Dengvaxia'], category: 'Vaccins', deferralDays: 28, deferralLabel: '28 jours', scope: 'TOUS' },

  // Autres
  { id: 'isotope_radioactif', name: 'Iode radioactif', aliases: ['I131', 'iode radioactif'], category: 'Autres', deferralDays: 90, deferralLabel: '3 mois', scope: 'TOUS' },
  { id: 'produits_contraste', name: 'Produits de contraste iodés', aliases: ['iohexol', 'ioméprol', 'Omnipaque', 'Ultravist'], category: 'Autres', deferralDays: 0, deferralLabel: 'Pas de délai', scope: 'TOUS' },
  { id: 'allopurinol', name: 'Allopurinol', aliases: ['Zyloric'], category: 'Autres', deferralDays: 0, deferralLabel: 'Pas de délai', scope: 'TOUS' },
  { id: 'colchicine', name: 'Colchicine', aliases: ['Colchicine'], category: 'Autres', deferralDays: 0, deferralLabel: 'Évaluation médicale', scope: 'TOUS' },
];

export const MEDICATIONS: MedicationEntry[] = [...CURATED_MEDICATIONS, ...REFERENCE_MEDICATIONS];
