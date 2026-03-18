export const ADMIN_LANGUAGE_TABS = [
  { value: 'az', label: 'AZ' },
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
] as const;

export type AdminLanguage = (typeof ADMIN_LANGUAGE_TABS)[number]['value'];

export type LocalizedText = Record<AdminLanguage, string>;

export const createEmptyLocalizedText = (): LocalizedText => ({
  az: '',
  ru: '',
  en: '',
});
