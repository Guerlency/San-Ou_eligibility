import { MANUAL_CRITERIA } from './fullEligibilityData';

export type EligibilityStatus = 'eligible' | 'ineligible' | 'temporaire' | 'info';

export interface Criterion {
  id: string;
  category: string;
  label: string;
  detail: string;
  delai?: string;
  status: EligibilityStatus;
  tags: string[];
  reference?: string;
}

export const CATEGORIES = [
  'Critères généraux',
  'Antécédents médicaux',
  'Médicaments',
  'Voyages',
  'Comportements à risque',
  'Situations temporaires',
  'Femmes',
  'Cardiovasculaire',
  'Respiratoire',
  'Digestif',
  'Rénal & urologique',
  'Neurologie',
  'Rhumatologie & traumatologie',
  'Endocrinologie',
  'Hématologie',
  'Grossesse & gynécologie',
  'Dermatologie',
  'ORL & ophtalmologie',
  'Cancers & tumeurs',
  'Maladies rares',
  'Maladies systémiques',
  'Infections',
  'Maladies génétiques',
  'Chirurgies & interventions',
  'Examens médicaux',
  'Soins dentaires',
  'Allergologie',
  'Expositions & soins',
  'Handicap & consentement',
] as const;

const CURATED_CRITERIA: Criterion[] = [
  // Critères généraux
  { id: 'age', category: 'Critères généraux', label: 'Âge', detail: 'Le donneur doit être âgé de 18 à 65 ans révolus pour son premier don.', status: 'info', tags: ['âge', 'général'], reference: 'Loi 05/07/1994' },
  { id: 'poids', category: 'Critères généraux', label: 'Poids minimum', detail: 'Poids minimum de 50 kg requis.', status: 'info', tags: ['poids', 'général'], reference: 'AR 04/04/1996' },
  { id: 'hb_homme', category: 'Critères généraux', label: 'Hémoglobine – Homme', detail: 'Taux d\'hémoglobine ≥ 13,5 g/dL requis avant le don.', status: 'info', tags: ['hémoglobine', 'biologie', 'homme'], reference: 'AR 04/04/1996' },
  { id: 'hb_femme', category: 'Critères généraux', label: 'Hémoglobine – Femme', detail: 'Taux d\'hémoglobine ≥ 12,5 g/dL requis avant le don.', status: 'info', tags: ['hémoglobine', 'biologie', 'femme'], reference: 'AR 04/04/1996' },
  { id: 'intervalle_sang_h', category: 'Critères généraux', label: 'Intervalle – Sang total (Homme)', detail: 'Délai minimum de 8 semaines entre deux dons de sang total. Maximum 6 dons par an.', delai: '8 semaines', status: 'temporaire', tags: ['intervalle', 'homme', 'sang total'] },
  { id: 'intervalle_sang_f', category: 'Critères généraux', label: 'Intervalle – Sang total (Femme)', detail: 'Délai minimum de 8 semaines entre deux dons de sang total. Un délai de 12 semaines est conseillé. Maximum 4 dons par an.', delai: '12 semaines conseillées (minimum 8 semaines)', status: 'temporaire', tags: ['intervalle', 'femme', 'sang total'] },
  { id: 'intervalle_plasma', category: 'Critères généraux', label: 'Intervalle – Plasma', detail: 'Délai minimum de 2 semaines entre deux dons de plasma. Maximum 24 dons par an.', delai: '2 semaines', status: 'temporaire', tags: ['intervalle', 'plasma', 'aphérèse'] },
  { id: 'intervalle_plaquettes', category: 'Critères généraux', label: 'Intervalle – Plaquettes', detail: 'Délai minimum de 4 semaines entre deux dons de plaquettes. Maximum 12 dons par an.', delai: '4 semaines', status: 'temporaire', tags: ['intervalle', 'plaquettes', 'aphérèse'] },
  { id: 'tension', category: 'Critères généraux', label: 'Pression artérielle', detail: 'PA systolique entre 100 et 180 mmHg, PA diastolique entre 50 et 100 mmHg au moment du don.', status: 'info', tags: ['tension', 'biologie'] },
  { id: 'pouls', category: 'Critères généraux', label: 'Pouls', detail: 'Pouls entre 50 et 100 bpm. Arythmies significatives : contre-indication.', status: 'info', tags: ['pouls', 'biologie'] },

  // Antécédents médicaux - inéligibilité permanente
  { id: 'vih', category: 'Antécédents médicaux', label: 'VIH / Sida', detail: 'Contre-indication permanente à tout don de sang ou de composants sanguins.', status: 'ineligible', tags: ['VIH', 'sida', 'infection', 'permanent'] },
  { id: 'hepatite_b', category: 'Antécédents médicaux', label: 'Hépatite B (AgHBs+)', detail: 'Portage de l\'Ag HBs : contre-indication permanente.', status: 'ineligible', tags: ['hépatite B', 'virus', 'permanent'] },
  { id: 'hepatite_c', category: 'Antécédents médicaux', label: 'Hépatite C (ARN+)', detail: 'Infection par le VHC confirmée : contre-indication permanente si ARN+ persistant. Rémission prolongée possible selon protocole.', status: 'ineligible', tags: ['hépatite C', 'virus', 'permanent'] },
  { id: 'htlv', category: 'Antécédents médicaux', label: 'HTLV I/II', detail: 'Infection par le virus HTLV I ou II : contre-indication permanente.', status: 'ineligible', tags: ['HTLV', 'virus', 'permanent'] },
  { id: 'maladie_creutzfeldt', category: 'Antécédents médicaux', label: 'MCJ / Prion', detail: 'Maladie de Creutzfeldt-Jakob ou risque lié aux prions : contre-indication permanente.', status: 'ineligible', tags: ['MCJ', 'prion', 'permanent', 'dégénératif'] },
  { id: 'cancer', category: 'Antécédents médicaux', label: 'Cancer / Hémopathie maligne', detail: 'Antécédent de cancer ou d\'hémopathie maligne : contre-indication permanente dans la plupart des cas. Évaluation au cas par cas pour certains cancers en rémission.', status: 'ineligible', tags: ['cancer', 'oncologie', 'permanent'] },
  { id: 'hemochromatose', category: 'Antécédents médicaux', label: 'Hémochromatose génétique', detail: 'Don thérapeutique autorisé sous conditions strictes (protocole interne spécifique).', status: 'temporaire', tags: ['hémochromatose', 'génétique', 'protocole'] },
  { id: 'drepanocytose', category: 'Antécédents médicaux', label: 'Drépanocytose', detail: 'Drépanocytose homozygote : contre-indication permanente. Trait drépanocytaire (hétérozygote) : éligible.', status: 'ineligible', tags: ['drépanocytose', 'hémoglobine', 'génétique'] },
  { id: 'hemophilie', category: 'Antécédents médicaux', label: 'Hémophilie / Troubles coagulation', detail: 'Contre-indication permanente pour les hémophiles et troubles hémorragiques constitutionnels sévères.', status: 'ineligible', tags: ['hémophilie', 'coagulation', 'permanent'] },
  { id: 'epilepsie', category: 'Antécédents médicaux', label: 'Épilepsie', detail: 'Épilepsie non contrôlée ou crise récente : contre-indication. En l\'absence de traitement et de crise depuis plus de 3 ans, un don peut être envisagé après évaluation médicale individuelle. Une rémission prolongée, parfois de plusieurs années sans crise et sans traitement, peut être requise selon la situation.', delai: 'Plus de 3 ans sans crise ni traitement, selon évaluation', status: 'temporaire', tags: ['épilepsie', 'neurologie', 'crise', 'traitement', 'rémission', 'évaluation'] },
  { id: 'diabete', category: 'Antécédents médicaux', label: 'Diabète', detail: 'Diabète insulino-dépendant : contre-indication. Diabète de type 2 équilibré par régime ou antidiabétiques oraux : éligible sous conditions.', status: 'temporaire', tags: ['diabète', 'métabolisme', 'évaluation'] },
  { id: 'maladie_autoimmune', category: 'Antécédents médicaux', label: 'Maladies auto-immunes', detail: 'Lupus, polyarthrite rhumatoïde, sclérose en plaques, etc. : évaluation médicale individuelle selon activité et traitement.', status: 'temporaire', tags: ['auto-immune', 'rhumatologie', 'évaluation'] },
  { id: 'cardiopathie', category: 'Antécédents médicaux', label: 'Cardiopathie / Coronaropathie', detail: 'Antécédent de maladie coronarienne, IDM, trouble du rythme grave : contre-indication permanente ou temporaire selon évaluation.', status: 'ineligible', tags: ['cardiologie', 'coronaire', 'permanent'] },
  { id: 'avc', category: 'Antécédents médicaux', label: 'AVC / AIT', detail: 'Antécédent d\'AVC ou d\'AIT : contre-indication permanente.', status: 'ineligible', tags: ['AVC', 'AIT', 'neurologie', 'permanent'] },

  // Chirurgies et interventions
  { id: 'chirurgie_recente', category: 'Situations temporaires', label: 'Chirurgie récente (sans endoscopie)', detail: 'Délai de 6 mois après toute intervention chirurgicale avec anesthésie générale ou locorégionale.', delai: '6 mois', status: 'temporaire', tags: ['chirurgie', 'anesthésie', 'postopératoire'] },
  { id: 'endoscopie', category: 'Situations temporaires', label: 'Endoscopie à risque', detail: 'Coloscopie, gastroscopie avec biopsies : délai de 4 mois.', delai: '4 mois', status: 'temporaire', tags: ['endoscopie', 'biopsie', 'gastro'] },
  { id: 'tatouage', category: 'Situations temporaires', label: 'Tatouage / Piercing', detail: 'Délai de 4 mois après tout tatouage ou piercing.', delai: '4 mois', status: 'temporaire', tags: ['tatouage', 'piercing', 'risque cutané'] },
  { id: 'acupuncture', category: 'Situations temporaires', label: 'Acupuncture', detail: 'Si réalisée avec des aiguilles à usage unique par un professionnel de santé : pas de délai. Sinon : délai de 4 mois.', delai: '0 ou 4 mois', status: 'temporaire', tags: ['acupuncture', 'médecine douce'] },
  { id: 'transfusion', category: 'Situations temporaires', label: 'Transfusion sanguine', detail: 'Délai de 4 mois après toute transfusion de produits sanguins labiles.', delai: '4 mois', status: 'temporaire', tags: ['transfusion', 'produits sanguins'] },
  { id: 'greffe', category: 'Antécédents médicaux', label: 'Greffe d\'organe / Tissu', detail: 'Contre-indication permanente pour les greffes d\'organes solides. Greffe de cornée : contre-indication permanente.', status: 'ineligible', tags: ['greffe', 'transplantation', 'permanent'] },

  // Infections et maladies
  { id: 'infection_aigue', category: 'Situations temporaires', label: 'Infection aiguë (grippe, angine…)', detail: 'Délai de 2 semaines après guérison complète et arrêt du traitement antibiotique.', delai: '2 semaines', status: 'temporaire', tags: ['infection', 'grippe', 'angine', 'antibiotique'] },
  { id: 'covid19', category: 'Situations temporaires', label: 'COVID-19', detail: 'Délai de 4 semaines après guérison complète. Vaccination COVID-19 : aucun délai sauf vaccin vivant atténué (7 jours).', delai: '4 semaines', status: 'temporaire', tags: ['COVID', 'SARS-CoV-2', 'pandémie'] },
  { id: 'paludisme', category: 'Situations temporaires', label: 'Paludisme avéré', detail: 'Délai de 3 ans après traitement et guérison de paludisme confirmé.', delai: '3 ans', status: 'temporaire', tags: ['paludisme', 'malaria', 'tropical'] },
  { id: 'leishmaniose', category: 'Situations temporaires', label: 'Leishmaniose', detail: 'Délai de 3 ans après traitement de leishmaniose viscérale confirmée.', delai: '3 ans', status: 'temporaire', tags: ['leishmaniose', 'tropical', 'parasite'] },
  { id: 'brucellose', category: 'Situations temporaires', label: 'Brucellose / Fièvre de Malte', detail: 'Contre-indication permanente si brucellose confirmée.', status: 'ineligible', tags: ['brucellose', 'zoonose', 'permanent'] },
  { id: 'syphilis', category: 'Comportements à risque', label: 'Syphilis', detail: 'Délai de 12 mois après traitement et guérison confirmée de syphilis.', delai: '12 mois', status: 'temporaire', tags: ['syphilis', 'IST', 'bactérie'] },

  // Médicaments
  { id: 'anticoagulants', category: 'Médicaments', label: 'Anticoagulants / Antiagrégants', detail: 'Héparine, AVK, AOD, aspirine ≥ 500mg : délai variable. Clopidogrel : 7 jours. Évaluation selon le type de don (plaquettes contre-indiquées sous antiagrégants).', delai: 'Variable', status: 'temporaire', tags: ['anticoagulant', 'AVK', 'héparine', 'clopidogrel', 'aspirine'] },
  { id: 'isotretinoine', category: 'Médicaments', label: 'Isotrétinoïne (Roaccutane®)', detail: 'Délai de 1 mois après la dernière prise.', delai: '1 mois', status: 'temporaire', tags: ['isotrétinoïne', 'acné', 'tératogène'] },
  { id: 'finasteride', category: 'Médicaments', label: 'Finastéride (Propecia®, Proscar®)', detail: 'Délai de 1 mois après la dernière prise.', delai: '1 mois', status: 'temporaire', tags: ['finastéride', 'prostate', 'tératogène'] },
  { id: 'dutasteride', category: 'Médicaments', label: 'Dutastéride (Avodart®)', detail: 'Délai de 6 mois après la dernière prise.', delai: '6 mois', status: 'temporaire', tags: ['dutastéride', 'prostate', 'tératogène'] },
  { id: 'acitretine', category: 'Médicaments', label: 'Acitrétine (Soriatane®)', detail: 'Contre-indication définitive (longue demi-vie, tératogène).', status: 'ineligible', tags: ['acitrétine', 'psoriasis', 'tératogène', 'permanent'] },
  { id: 'immunosuppresseurs', category: 'Médicaments', label: 'Immunosuppresseurs / Biothérapies', detail: 'Contre-indication temporaire pendant le traitement et souvent pendant plusieurs mois après.', status: 'temporaire', tags: ['immunosuppresseur', 'biothérapie', 'greffe'] },
  { id: 'antibiotiques', category: 'Médicaments', label: 'Antibiotiques en cours', detail: 'Délai jusqu\'à 2 semaines après la fin du traitement et guérison de l\'infection causale.', delai: '2 semaines après fin', status: 'temporaire', tags: ['antibiotique', 'infection', 'traitement'] },
  { id: 'vaccin_vivant', category: 'Médicaments', label: 'Vaccins vivants atténués', detail: 'ROR, varicelle, fièvre jaune, BCG : délai de 4 semaines après vaccination.', delai: '4 semaines', status: 'temporaire', tags: ['vaccin', 'vivant', 'ROR', 'varicelle', 'fièvre jaune'] },
  { id: 'vaccin_inactif', category: 'Médicaments', label: 'Vaccins inactivés / sous-unitaires', detail: 'Grippe, COVID, hépatite B, tétanos, diphtérie, pneumocoque : aucun délai si donneur asymptomatique.', delai: 'Aucun', status: 'eligible', tags: ['vaccin', 'inactivé', 'grippe', 'hépatite B'] },

  // Voyages
  { id: 'zone_paludisme', category: 'Voyages', label: 'Voyage en zone endémique paludisme', detail: 'Délai de 4 mois minimum après le retour d\'une zone d\'endémie palustre si le donneur est asymptomatique. Des conditions ou examens complémentaires peuvent imposer un délai plus long.', delai: '4 mois minimum', status: 'temporaire', tags: ['voyage', 'paludisme', 'tropique', 'endémie'] },
  { id: 'naissance_zone_endemique', category: 'Voyages', label: 'Naissance / Résidence ≥ 6 mois en zone endémique', detail: 'Né(e) ou ayant résidé > 6 mois en zone d\'endémie palustre : délai de 3 ans ou sérologie négative après 3 mois de retour.', delai: '3 ans ou sérologie', status: 'temporaire', tags: ['voyage', 'résidence', 'paludisme', 'tropique'] },
  { id: 'west_nile', category: 'Voyages', label: 'Zone West Nile Virus', detail: 'Retour de zone de transmission active (détectée par autorités) : délai de 28 jours.', delai: '28 jours', status: 'temporaire', tags: ['West Nile', 'arbovirose', 'voyage'] },
  { id: 'dengue_zika', category: 'Voyages', label: 'Zone dengue / Zika / Chikungunya', detail: 'Retour de zone de transmission : délai de 28 jours après le retour. Symptômes évocateurs : délai de 28 jours après guérison.', delai: '28 jours', status: 'temporaire', tags: ['dengue', 'Zika', 'chikungunya', 'arbovirose', 'voyage'] },

  // Comportements à risque
  { id: 'partenaires_multiples', category: 'Comportements à risque', label: 'Partenaires sexuels multiples', detail: 'Nouveau partenaire ou partenaires multiples dans les 4 derniers mois : délai de 4 mois après dernière exposition à risque. Applicable à tous sexes.', delai: '4 mois', status: 'temporaire', tags: ['partenaire', 'sexuel', 'IST', 'risque'] },
  { id: 'rapport_risque', category: 'Comportements à risque', label: 'Rapport sexuel à risque', detail: 'Rapport sans préservatif avec personne dont le statut sérologique est inconnu ou positif VIH/hépatites : délai de 4 mois.', delai: '4 mois', status: 'temporaire', tags: ['rapport', 'sexuel', 'risque', 'IST'] },
  { id: 'drogues_iv', category: 'Comportements à risque', label: 'Usage de drogues intraveineuses', detail: 'Contre-indication permanente pour tout antécédent d\'utilisation de drogues par voie injectable (IV ou IM).', status: 'ineligible', tags: ['drogue', 'injectables', 'permanent', 'VIH', 'hépatite'] },
  { id: 'argent_sexe', category: 'Comportements à risque', label: 'Prostitution / rapports contre rémunération', detail: 'Délai de 4 mois après le dernier rapport sexuel tarifé ou en échange de rémunération.', delai: '4 mois', status: 'temporaire', tags: ['prostitution', 'sexuel', 'risque', 'IST'] },
  { id: 'detenu', category: 'Comportements à risque', label: 'Incarcération', detail: 'Délai de 4 mois après libération d\'un établissement pénitentiaire.', delai: '4 mois', status: 'temporaire', tags: ['prison', 'incarcération', 'risque'] },

  // Situations femmes
  { id: 'grossesse', category: 'Femmes', label: 'Grossesse en cours', detail: 'Contre-indication absolue pendant toute la durée de la grossesse.', status: 'ineligible', tags: ['grossesse', 'femme', 'obstétrique'] },
  { id: 'post_partum', category: 'Femmes', label: 'Post-partum / Allaitement', detail: 'Délai de 6 mois après l\'accouchement. Allaitement : délai jusqu\'à 3 mois après le sevrage.', delai: '6 mois (accouchement) / 3 mois (sevrage)', status: 'temporaire', tags: ['post-partum', 'accouchement', 'allaitement', 'femme'] },
  { id: 'fcs', category: 'Femmes', label: 'Fausse couche / IVG', detail: 'Délai de 6 mois après fausse couche ou IVG.', delai: '6 mois', status: 'temporaire', tags: ['fausse couche', 'IVG', 'avortement', 'femme'] },
  { id: 'menstruations', category: 'Femmes', label: 'Menstruations en cours', detail: 'Aucune contre-indication en dehors d\'une anémie associée. Don déconseillé si syndrome prémenstruel marqué.', status: 'eligible', tags: ['menstruations', 'règles', 'femme'] },
];

export const CRITERIA: Criterion[] = [...CURATED_CRITERIA, ...MANUAL_CRITERIA];

export const QUESTIONNAIRE_STEPS = [
  {
    id: 'identity',
    title: 'Identité & État général',
    questions: [
      { id: 'q_age', text: 'Avez-vous au moins 18 ans et, s\'il s\'agit de votre premier don, au plus 65 ans révolus ?', type: 'yesno', yes: 'continue', no: 'ineligible', ineligibleReason: 'Pour un premier don, l\'âge requis est de 18 à 65 ans révolus.' },
      { id: 'q_poids', text: 'Pesez-vous au moins 50 kg ?', type: 'yesno', yes: 'continue', no: 'ineligible', ineligibleReason: 'Un poids minimum de 50 kg est requis pour le don.' },
      { id: 'q_bien_portant', text: 'Vous sentez-vous en bonne santé aujourd\'hui ?', type: 'yesno', yes: 'continue', no: 'ineligible', ineligibleReason: 'Le don est déconseillé si vous ne vous sentez pas en bonne santé.' },
    ]
  },
  {
    id: 'antecedents',
    title: 'Antécédents médicaux',
    questions: [
      { id: 'q_vih', text: 'Avez-vous été diagnostiqué(e) porteur/porteuse du VIH ou de l\'hépatite B ou C ?', type: 'yesno', yes: 'ineligible', no: 'continue', ineligibleReason: 'Le VIH et les hépatites virales constituent une contre-indication permanente au don de sang.' },
      { id: 'q_cancer', text: 'Avez-vous des antécédents de cancer ou d\'hémopathie maligne ?', type: 'yesno', yes: 'ineligible', no: 'continue', ineligibleReason: 'Les antécédents de cancer constituent généralement une contre-indication. Consultez le médecin de sélection.' },
      { id: 'q_greffe', text: 'Avez-vous bénéficié d\'une greffe d\'organe ou de tissu ?', type: 'yesno', yes: 'ineligible', no: 'continue', ineligibleReason: 'La greffe d\'organe constitue une contre-indication permanente au don.' },
      { id: 'q_drogue', text: 'Avez-vous déjà consommé des drogues par voie intraveineuse ou intramusculaire ?', type: 'yesno', yes: 'ineligible', no: 'continue', ineligibleReason: 'L\'usage de drogues injectables constitue une contre-indication permanente.' },
      { id: 'q_cardiopathie', text: 'Avez-vous des antécédents de maladie coronarienne, d\'infarctus ou d\'AVC ?', type: 'yesno', yes: 'ineligible', no: 'continue', ineligibleReason: 'Ces antécédents cardiovasculaires sont généralement une contre-indication permanente.' },
      { id: 'q_grossesse', text: 'Êtes-vous enceinte ou avez-vous accouché il y a moins de 6 mois ?', type: 'yesno', yes: 'ineligible', no: 'continue', ineligibleReason: 'La grossesse et la période post-partum constituent une contre-indication au don.' },
    ]
  },
  {
    id: 'recent',
    title: 'Événements récents',
    questions: [
      { id: 'q_infection', text: 'Avez-vous eu une infection (grippe, angine...) ou pris des antibiotiques dans les 2 dernières semaines ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '2 semaines après guérison et arrêt des antibiotiques' },
      { id: 'q_chirurgie', text: 'Avez-vous subi une intervention chirurgicale ou une endoscopie dans les 6 derniers mois ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '6 mois après une chirurgie (4 mois pour endoscopie avec biopsies)' },
      { id: 'q_tatouage', text: 'Avez-vous eu un tatouage, un piercing ou une acupuncture (aiguilles non stériles) dans les 4 derniers mois ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '4 mois' },
      { id: 'q_vaccin', text: 'Avez-vous reçu un vaccin vivant (ROR, varicelle, fièvre jaune) dans les 4 dernières semaines ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '4 semaines après vaccination vivante' },
      { id: 'q_transfusion', text: 'Avez-vous reçu une transfusion sanguine dans les 4 derniers mois ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '4 mois' },
    ]
  },
  {
    id: 'voyage_risque',
    title: 'Voyages & Comportements à risque',
    questions: [
      { id: 'q_voyage_tropical', text: 'Avez-vous voyagé dans une zone tropicale (Afrique, Asie du Sud-Est, Amérique latine) dans les 4 derniers mois ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '4 mois minimum après le retour d\'une zone palustre' },
      { id: 'q_partenaire', text: 'Avez-vous eu un nouveau partenaire sexuel ou des rapports non protégés avec statut inconnu dans les 4 derniers mois ?', type: 'yesno', yes: 'temporaire', no: 'continue', delai: '4 mois' },
    ]
  },
];
