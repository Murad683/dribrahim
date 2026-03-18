import type { AdminLanguage } from '@/components/admin/shared/localization';

export type LocalizedCaseContent = {
  title: string;
  description: string;
  statLabel: string;
};

export type CaseFormValues = {
  image: string;
  stat: string;
  locales: Record<AdminLanguage, LocalizedCaseContent>;
};

export type CaseItem = CaseFormValues & {
  id: string;
};

export const createEmptyCaseValues = (): CaseFormValues => ({
  image: '',
  stat: '',
  locales: {
    az: { title: '', description: '', statLabel: '' },
    ru: { title: '', description: '', statLabel: '' },
    en: { title: '', description: '', statLabel: '' },
  },
});

export const createCaseId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `case-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};
