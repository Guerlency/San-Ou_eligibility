export interface EpiRegion {
  name: string;
  isNew?: boolean; // (*) nouvelle région concernée
  isMobileCollect?: boolean; // jaune = collecte mobile → dépistage systématique
}

export interface EpiCountry {
  country: string;
  regions: EpiRegion[];
}

export interface EpiAlert {
  id: string;
  disease: string;
  riskCode: string;
  riskColor: string;
  updateDate: string;
  deferralRule: string;
  deferralNote?: string;
  author: string;
  specialAlert?: string;
  countries: EpiCountry[];
}

// ─── ALERTE 1 : Dengue & Chikungunya — 23/09/2026 ─────────────────────────
export const CHIKUNGUNYA_ALERT: EpiAlert = {
  id: 'chik-20260923',
  disease: 'Chikungunya',
  riskCode: 'CHIK',
  riskColor: '#D97706',
  updateDate: '23/09/2026',
  deferralRule: 'Exclusion OBLIGATOIRE de 28 jours',
  deferralNote: 'Cette exclusion de 28 jours ne s\'applique pas au plasma destiné au fractionnement.',
  author: 'Dr MICHEL Guerlency — Responsable Hémovigilance / Sécurité Donneurs/Receveurs',
  countries: [
    {
      country: 'France',
      regions: [
        { name: 'Prignac-et-Marcamps (Gironde)' },
        { name: 'Talence (Gironde)' },
        { name: 'Prayssac (Lot)' },
        { name: 'Nogent-sur-Marne (Val-de-Marne)' },
        { name: 'Cavignac (Gironde)' },
        { name: 'Arcachon (Gironde)' },
        { name: 'Bordeaux (Gironde)' },
        { name: 'Étauliers (Gironde)' },
        { name: 'Portets (Gironde)' },
        { name: 'Biscarrosse (Landes)' },
        { name: 'Créon (Gironde)' },
      ],
    },
    {
      country: 'Italie',
      regions: [
        { name: 'Rome' },
      ],
    },
  ],
};

export const DENGUE_ALERT: EpiAlert = {
  id: 'dengue-20260923',
  disease: 'Dengue',
  riskCode: 'D',
  riskColor: '#9D174D',
  updateDate: '23/09/2026',
  deferralRule: 'Exclusion OBLIGATOIRE de 28 jours',
  deferralNote: 'Cette exclusion de 28 jours ne s\'applique pas au plasma destiné au fractionnement.',
  author: 'Dr MICHEL Guerlency — Responsable Hémovigilance / Sécurité Donneurs/Receveurs',
  countries: [
    {
      country: 'France',
      regions: [
        { name: 'Marseille (Bouches-du-Rhône)' },
      ],
    },
    {
      country: 'Italie',
      regions: [
        { name: 'Alliste (Lecce)' },
        { name: 'Ugento (Lecce)' },
        { name: 'Piombino (Livorno)' },
        { name: 'Garbagnate Milanese (Milan)' },
        { name: 'Créon (Milan)' },
      ],
    },
  ],
};

// ─── ALERTE 2 : West Nile Virus — 23/09/2026 ──────────────────────────────
export const WNV_EUROPE_ALERT: EpiAlert = {
  id: 'wnv-20260923',
  disease: 'West Nile Virus (WNV)',
  riskCode: 'WNV',
  riskColor: '#1E40AF',
  updateDate: '23/09/2026',
  deferralRule: 'Exclusion de 28 jours',
  deferralNote: 'Cette exclusion de 28 jours ne s\'applique pas au plasma destiné au fractionnement.',
  author: 'Dr MICHEL Guerlency — Responsable Hémovigilance / Sécurité Donneurs/Receveurs',
  countries: [
    {
      country: 'Belgique',
      regions: [
        { name: 'Vilvorde' },
        { name: 'Zemst' },
        { name: 'Steenokkerzeel' },
        { name: 'Mechelen' },
        { name: 'Grimbergen' },
        { name: 'Arr. Antwerpen', isNew: true },
        { name: 'Arr. Halle-Vilvoorde', isNew: true },
        { name: 'Arr. Mechelen', isNew: true },
        { name: 'Arr. de Bruxelles-Capitale', isNew: true },
      ],
    },
    {
      country: 'Albanie',
      regions: [{ name: 'Korcë' }],
    },
    {
      country: 'Allemagne',
      regions: [
        { name: 'Berlin' },
        { name: 'Leipzig, Kreisfreie Stadt', isNew: true },
        { name: 'Rhein-Pfalz-Kreis' },
      ],
    },
    {
      country: 'Autriche',
      regions: [
        { name: 'Nordburgenland' },
        { name: 'Wien' },
      ],
    },
    {
      country: 'Cyprus',
      regions: [{ name: 'Kýpros' }],
    },
    {
      country: 'Croatie',
      regions: [
        { name: 'Grad Zagreb' },
        { name: 'Koprivničko-križevačka županija' },
        { name: 'Krapinsko-zagorska županija' },
        { name: 'Osječko-baranjska županija', isNew: true },
        { name: 'Zagrebačka županija' },
      ],
    },
    {
      country: 'Espagne',
      regions: [
        { name: 'Badajoz' },
        { name: 'Cáceres' },
        { name: 'Huelva' },
        { name: 'Málaga' },
        { name: 'Sevilla' },
      ],
    },
    {
      country: 'France',
      regions: [
        { name: 'Aude' },
        { name: 'Bouches-du-Rhône' },
        { name: 'Drôme' },
        { name: 'Essonne' },
        { name: 'Gard' },
        { name: 'Gironde' },
        { name: 'Haute-Garonne' },
        { name: 'Hérault', isNew: true },
        { name: 'Loire-Atlantique', isNew: true },
        { name: 'Loiret', isNew: true },
        { name: 'Maine-et-Loire', isNew: true },
        { name: 'Pyrénées-Orientales' },
        { name: 'Seine-et-Marne' },
        { name: 'Seine-Saint-Denis' },
        { name: 'Val-d\'Oise' },
        { name: 'Val-de-Marne' },
        { name: 'Var' },
        { name: 'Vaucluse' },
        { name: 'Yvelines', isNew: true },
      ],
    },
    {
      country: 'Italie',
      regions: [
        { name: 'Alessandria' }, { name: 'Ancona' }, { name: 'Arezzo' }, { name: 'Asti' },
        { name: 'Bari' }, { name: 'Barletta-Andria-Trani' }, { name: 'Bergamo' },
        { name: 'Biella' }, { name: 'Bologna' }, { name: 'Brescia' }, { name: 'Brindisi' },
        { name: 'Campobasso' }, { name: 'Caserta' }, { name: 'Chieti' }, { name: 'Como' },
        { name: 'Cosenza' }, { name: 'Cremona' }, { name: 'Cuneo' }, { name: 'Fermo' },
        { name: 'Ferrara' }, { name: 'Firenze' }, { name: 'Foggia' }, { name: 'Forlì-Cesena' },
        { name: 'Frosinone' }, { name: 'Genova' }, { name: 'Grosseto' }, { name: 'Latina' },
        { name: 'Lecce' }, { name: 'Lecco' }, { name: 'Livorno' }, { name: 'Lodi' },
        { name: 'Macerata' }, { name: 'Mantova' }, { name: 'Milano' }, { name: 'Modena' },
        { name: 'Monza e della Brianza' }, { name: 'Napoli' }, { name: 'Novara' },
        { name: 'Oristano' }, { name: 'Padova' }, { name: 'Parma' }, { name: 'Pavia' },
        { name: 'Perugia' }, { name: 'Pescara' }, { name: 'Piacenza' }, { name: 'Pordenone' },
        { name: 'Ravenna' }, { name: 'Reggio Calabria' }, { name: 'Reggio nell\'Emilia' },
        { name: 'Roma' }, { name: 'Rovigo' }, { name: 'Salerno' }, { name: 'Siena' },
        { name: 'Sondrio' }, { name: 'Sud Sardegna', isNew: true }, { name: 'Teramo' },
        { name: 'Torino' }, { name: 'Trento' }, { name: 'Treviso' }, { name: 'Varese' },
        { name: 'Venezia' }, { name: 'Vercelli' }, { name: 'Verona' }, { name: 'Vicenza' },
        { name: 'Viterbo' },
      ],
    },
    {
      country: 'Grèce',
      regions: [
        { name: 'Anatoliki Attiki' }, { name: 'Dytiki Attiki' }, { name: 'Dytikos Tomeas Athinon' },
        { name: 'Evros' }, { name: 'Evvoia' }, { name: 'Imathia' }, { name: 'Irakleio' },
        { name: 'Karditsa, Trikala' }, { name: 'Kentrikos Tomeas Athinon' },
        { name: 'Kilkis', isNew: true }, { name: 'Lakonia, Messinia' }, { name: 'Larisa' },
        { name: 'Notios Tomeas Athinon' }, { name: 'Peiraias, Nisoi' }, { name: 'Pella' },
        { name: 'Pieria' }, { name: 'Rethymni' }, { name: 'Rodopi' }, { name: 'Serres' },
        { name: 'Thessaloniki' }, { name: 'Voiotia' }, { name: 'Voreios Tomeas Athinon' },
      ],
    },
    {
      country: 'Hongrie',
      regions: [{ name: 'Budapest' }, { name: 'Bács-Kiskun' }, { name: 'Pest' }],
    },
    {
      country: 'Kosovo',
      regions: [{ name: 'Ferizaj', isNew: true }, { name: 'Gjakovë' }],
    },
    {
      country: 'Macédoine du Nord',
      regions: [
        { name: 'Pelagoniski' }, { name: 'Severoistočen' },
        { name: 'Skopski' }, { name: 'Vardarski' },
      ],
    },
    {
      country: 'Pays-Bas',
      regions: [
        { name: 'Agglomeratie \'s-Gravenhage' },
        { name: 'Agglomeratie Leiden en Bollenstreek' },
        { name: 'Arnhem/Nijmegen', isNew: true },
        { name: 'Groot-Amsterdam' },
        { name: 'Groot-Rijnmond' },
        { name: 'Het Gooi en Vechtstreek', isNew: true },
        { name: 'IJmond', isNew: true },
        { name: 'Midden-Noord-Brabant' },
        { name: 'Oost-Zuid-Holland' },
        { name: 'Utrecht' },
        { name: 'Veluwe' },
        { name: 'Zuidoost-Zuid-Holland' },
        { name: 'Zuidwest-Overijssel' },
      ],
    },
    {
      country: 'Roumanie',
      regions: [
        { name: 'Argeș' }, { name: 'Bihor' }, { name: 'Botoșani' }, { name: 'Brăila' },
        { name: 'București' }, { name: 'Buzău', isNew: true }, { name: 'Călărași' },
        { name: 'Cluj' }, { name: 'Constanța' }, { name: 'Dâmbovița', isNew: true },
        { name: 'Galați' }, { name: 'Giurgiu' }, { name: 'Ialomița' }, { name: 'Iași' },
        { name: 'Ilfov' }, { name: 'Mureș' }, { name: 'Prahova' }, { name: 'Satu Mare' },
        { name: 'Suceava' }, { name: 'Teleorman' }, { name: 'Vaslui' }, { name: 'Vrancea' },
      ],
    },
    {
      country: 'Serbie',
      regions: [
        { name: 'City of Belgrade' },
        { name: 'Južnobačka oblast' },
        { name: 'Južnobanatska oblast' },
        { name: 'Pomoravska oblast', isNew: true },
        { name: 'Severnobanatska oblast' },
        { name: 'Srednjobanatska oblast' },
        { name: 'Šumadijska oblast' },
        { name: 'Zapadnobačka oblast' },
      ],
    },
  ],
};

// ─── ALERTE 3 : WNV Belgique — communes 25/09/2026 ────────────────────────
export const WNV_BELGIQUE_ALERT: EpiAlert = {
  id: 'wnv-belgique-20260925',
  disease: 'West Nile Virus — Belgique (communes)',
  riskCode: 'WNV 🇧🇪',
  riskColor: '#1E40AF',
  updateDate: '25/09/2026',
  deferralRule: 'Dépistage WNV OBLIGATOIRE',
  deferralNote: 'Pour le risque WNV en Belgique, le dépistage WNV est obligatoire pour tout donneur résidant ou ayant séjourné au moins une nuit dans une des communes affectées, sans restriction de date (même pour un séjour remontant à juin).',
  specialAlert: 'Les communes surlignées en jaune sont des sites de collectes mobiles : dépistage systématique de TOUS les donneurs à chaque collecte.',
  author: 'Dr MICHEL Guerlency — Responsable Hémovigilance / Sécurité Donneurs/Receveurs',
  countries: [
    {
      country: 'Arr. Antwerpen (28 communes)',
      regions: [
        { name: 'Aartselaar' }, { name: 'Anvers (Antwerpen)' }, { name: 'Boechout' },
        { name: 'Boom' }, { name: 'Brasschaat' }, { name: 'Brecht' }, { name: 'Edegem' },
        { name: 'Essen' }, { name: 'Hemiksem' }, { name: 'Hove' }, { name: 'Kalmthout' },
        { name: 'Kapellen' }, { name: 'Kontich' }, { name: 'Lint' }, { name: 'Malle' },
        { name: 'Mortsel' }, { name: 'Niel' }, { name: 'Ranst' }, { name: 'Rumst' },
        { name: 'Schilde' }, { name: 'Schoten' }, { name: 'Stabroek' }, { name: 'Wijnegem' },
        { name: 'Wommelgem' }, { name: 'Wuustwezel' }, { name: 'Zandhoven' },
        { name: 'Zoersel' }, { name: 'Zwijndrecht' },
      ],
    },
    {
      country: 'Arr. Halle-Vilvoorde (35 communes)',
      regions: [
        { name: 'Affligem' }, { name: 'Asse', isMobileCollect: true },
        { name: 'Beersel' }, { name: 'Biévène (Bever)' }, { name: 'Dilbeek' },
        { name: 'Drogenbos', isMobileCollect: true }, { name: 'Galmaarden' },
        { name: 'Gooik' }, { name: 'Grimbergen' }, { name: 'Hal (Halle)', isMobileCollect: true },
        { name: 'Herne' }, { name: 'Hoeilaart' }, { name: 'Kampenhout' },
        { name: 'Kapelle-op-den-Bos' }, { name: 'Kraainem' }, { name: 'Lennik' },
        { name: 'Liedekerke' }, { name: 'Linkebeek', isMobileCollect: true },
        { name: 'Londerzeel' }, { name: 'Machelen' }, { name: 'Meise' },
        { name: 'Merchthem' }, { name: 'Opwijk' }, { name: 'Overijse' },
        { name: 'Pepingen' }, { name: 'Rhode-Saint-Genèse', isMobileCollect: true },
        { name: 'Roosdaal' }, { name: 'Sint-Pieters-Leeuw', isMobileCollect: true },
        { name: 'Steenokkerzeel' }, { name: 'Ternat' }, { name: 'Vilvorde (Vilvoorde)' },
        { name: 'Wemmel' }, { name: 'Wezembeek-Oppem' }, { name: 'Zaventem' },
        { name: 'Zemst' },
      ],
    },
    {
      country: 'Arr. Mechelen (12 communes)',
      regions: [
        { name: 'Berlaar' }, { name: 'Bonheiden' }, { name: 'Bornem' }, { name: 'Duffel' },
        { name: 'Heist-op-den-Berg' }, { name: 'Lier (Lierre)' }, { name: 'Malines (Mechelen)' },
        { name: 'Nijlen' }, { name: 'Putte' }, { name: 'Sint-Katelijne-Waver' },
        { name: 'Willebroek' },
      ],
    },
  ],
};

export const ALL_ALERTS: EpiAlert[] = [WNV_EUROPE_ALERT, WNV_BELGIQUE_ALERT, CHIKUNGUNYA_ALERT, DENGUE_ALERT];
