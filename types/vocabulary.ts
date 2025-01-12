export interface VerbForm {
  form: string | string[];
  pronunciation: string | string[];
  example?: string | string[];
}

export interface VerbItem {
  word: string;
  infinitive: VerbForm;
  past_simple: VerbForm;
  past_participle: VerbForm;
  meaning: string;
}

export interface GroupedData {
  [key: string]: VerbItem[];
}
