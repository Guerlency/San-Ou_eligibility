export type RiskCode = 'A' | 'C' | 'D' | 'T' | 'Z' | 'M';
export type DeferralValue = 'Ok' | '28 jours' | '4 mois' | '6 mois' | '6 mois + TEST';

export interface CountryEntry {
  region: string;
  continent: string;
  subtype?: string; // e.g. "Séjour en plein air / habitation précaire" vs "Séjour à l'hôtel"
  risks: RiskCode[];
  stho: DeferralValue;
  plas: DeferralValue;
  plqt: DeferralValue;
  highVIH?: boolean; // pays en gras = haute prévalence VIH
}

export const RISK_LABELS: Record<RiskCode, string> = {
  A: 'Arbovirus',
  C: 'Chagas',
  D: 'Dengue',
  T: 'Tropical',
  Z: 'Zika',
  M: 'Malaria',
};

export const RISK_COLORS: Record<RiskCode, { bg: string; text: string; border: string }> = {
  A: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  C: { bg: '#FEF9C3', text: '#854D0E', border: '#FDE047' },
  D: { bg: '#FCE7F3', text: '#9D174D', border: '#F9A8D4' },
  T: { bg: '#FFEDD5', text: '#9A3412', border: '#FED7AA' },
  Z: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
  M: { bg: '#EDE9FE', text: '#5B21B6', border: '#C4B5FD' },
};

export const DEFERRAL_COLORS: Record<DeferralValue, { bg: string; text: string }> = {
  'Ok': { bg: '#DCFCE7', text: '#166534' },
  '28 jours': { bg: '#FEF9C3', text: '#854D0E' },
  '4 mois': { bg: '#FED7AA', text: '#9A3412' },
  '6 mois': { bg: '#FEE2E2', text: '#991B1B' },
  '6 mois + TEST': { bg: '#FEE2E2', text: '#7F1D1D' },
};

export const COUNTRIES: CountryEntry[] = [
  // A
  { region: 'Afghanistan', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: false },
  { region: 'Afrique du Sud', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Albanie', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Algérie', continent: 'Afrique Nord', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Allemagne', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Andorre', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Angola', continent: 'Afrique', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Anguilla', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Antigua et Barbuda', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Antilles (Amérique)', continent: 'Amérique', risks: ['T'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Arabie Saoudite', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Argentine – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Argentine – autre type de séjour (hôtel...)', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Arménie', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Aruba', continent: 'Amérique', risks: ['A', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Australie', continent: 'Océanie', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Autriche', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Azerbaïdjan', continent: 'Asie', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  // B
  { region: 'Bahamas', continent: 'Amérique', risks: ['Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Bahrein', continent: 'Asie', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Bali (Indonésie)', continent: 'Asie', risks: ['T'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Bangladesh', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Barbade', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Belgique', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Bermudes', continent: 'Amérique', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Belize – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Belize – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Bénin', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Bhoutan', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Biélorussie', continent: 'Europe', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Birmanie / Myanmar', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Bolivie – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Bolivie – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Bonaire (île)', continent: 'Amérique', risks: ['A', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Bosnie-Herzégovine', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Botswana', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Brésil – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Brésil – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Brunei', continent: 'Asie', risks: ['T'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Bulgarie', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Burkina Faso', continent: 'Afrique', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Burundi', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  // C
  { region: 'Caïmans (îles)', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Cambodge', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Cameroun', continent: 'Afrique', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Canada', continent: 'Amérique', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Canaries (îles)', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Cap-Vert', continent: 'Afrique', risks: ['Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Caraïbes', continent: 'Amérique', risks: ['D', 'T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Chili – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Chili – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Chine', continent: 'Asie', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Chypre', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Colombie – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Colombie – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Comores', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Congo Brazzaville', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Corée du Nord', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Corée du Sud', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Corse', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  // D-E
  { region: 'Djibouti', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Égypte', continent: 'Afrique Nord', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Émirats arabes unis', continent: 'Asie', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Équateur – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Équateur – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Érythrée', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Éthiopie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  // F
  { region: 'Fidji', continent: 'Océanie', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'France', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  // G
  { region: 'Gabon', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Gambie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Ghana', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Guatemala – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Guatemala – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Guinée', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Guinée équatoriale', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Guyane française', continent: 'Amérique', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  // H-I
  { region: 'Haïti', continent: 'Amérique', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Honduras – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Honduras – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Inde', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Indonésie', continent: 'Asie', risks: ['M', 'T'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Irak', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Iran', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  // J-K
  { region: 'Jamaïque', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Japon', continent: 'Asie', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Kenya', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Kirghizistan', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  // L
  { region: 'Laos', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Lesotho', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Liberia', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Libye', continent: 'Afrique Nord', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Luxembourg', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  // M
  { region: 'Madagascar', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Malaisie', continent: 'Asie', risks: ['M', 'T'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Malawi', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Maldives', continent: 'Asie', risks: ['T'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Mali', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Maroc', continent: 'Afrique Nord', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Martinique', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Maurice (île)', continent: 'Afrique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Mauritanie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Mexique', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Moldavie', continent: 'Europe', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Mozambique', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  // N
  { region: 'Namibie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Népal', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Nicaragua – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Nicaragua – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Niger', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Nigeria', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Norvège', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  // O-P
  { region: 'Ouganda', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Pakistan', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Panama – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Panama – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Papouasie-Nouvelle-Guinée', continent: 'Océanie', risks: ['M', 'T'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Paraguay – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Paraguay – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Pays-Bas', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Pérou – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Pérou – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Philippines', continent: 'Asie', risks: ['M', 'T'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  // R-S
  { region: 'République centrafricaine', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'République démocratique du Congo', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Réunion (île)', continent: 'Afrique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Roumanie', continent: 'Europe', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Russie', continent: 'Europe', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Rwanda', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Salvador – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Salvador – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Sénégal', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Sierra Leone', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Somalie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Soudan', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Sri Lanka', continent: 'Asie', risks: ['T'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Suriname – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Suriname – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Swaziland', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  // T
  { region: 'Tanzanie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Tchad', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Thaïlande', continent: 'Asie', risks: ['M', 'T'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Togo', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Trinidad et Tobago', continent: 'Amérique', risks: ['T', 'Z'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Tunisie', continent: 'Afrique Nord', risks: [], stho: 'Ok', plas: 'Ok', plqt: 'Ok' },
  { region: 'Turkménistan', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  // U-V
  { region: 'Ukraine', continent: 'Europe', risks: ['A'], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Uruguay', continent: 'Amérique', risks: [], stho: '28 jours', plas: '28 jours', plqt: '28 jours' },
  { region: 'Venezuela – séjour en plein air / habitation précaire', continent: 'Amérique', subtype: 'Plein air / précaire', risks: ['C', 'M', 'Z'], stho: '6 mois', plas: '6 mois', plqt: '6 mois' },
  { region: 'Venezuela – autre type de séjour', continent: 'Amérique', subtype: 'Hôtel / standard', risks: ['M', 'Z'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Viêt Nam', continent: 'Asie', risks: ['M', 'T'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  // W-Z
  { region: 'Yémen', continent: 'Asie', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois' },
  { region: 'Zambie', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
  { region: 'Zimbabwe', continent: 'Afrique', risks: ['M'], stho: '4 mois', plas: '28 jours', plqt: '6 mois', highVIH: true },
];

export const CONTINENTS = ['Afrique', 'Afrique Nord', 'Amérique', 'Asie', 'Europe', 'Océanie'] as const;
