import { createEmptyLocalizedText, type AdminLanguage, type LocalizedText } from '@/components/admin/shared/localization';

export type LocalizedEducationContent = {
  title: string;
  description: string;
};

export type EducationEntry = {
  year: string;
  locales: Record<AdminLanguage, LocalizedEducationContent>;
};

export type ProfileFormValues = {
  bio: LocalizedText;
  education: EducationEntry[];
  achievements: Record<AdminLanguage, string[]>;
};

export const createEmptyEducationEntry = (): EducationEntry => ({
  year: '',
  locales: {
    az: { title: '', description: '' },
    ru: { title: '', description: '' },
    en: { title: '', description: '' },
  },
});

export const createDefaultProfileValues = (): ProfileFormValues => ({
  bio: {
    az: 'Dr. Ibrahim Abdulla dijital stomatologiya ve kompleks estetik mualice uzre ixtisaslasmis hekimdir. Her pasiyent ucun ferdi ve texnologiya yonumlu mualice strategiyasi qurur.',
    ru: 'Dr. Ibrahim Abdulla spetsializiruetsya na tsifrovoy stomatologii i kompleksnom esteticheskom lechenii. Dlya kazhdogo patsienta formiruetsya individualnaya strategiia.',
    en: 'Dr. Ibrahim Abdulla specializes in digital dentistry and comprehensive aesthetic treatment. Every patient receives a tailored, technology-led care strategy.',
  },
  education: [
    {
      year: '2008',
      locales: {
        az: {
          title: 'Baki Tibb Universiteti',
          description: 'Stomatologiya uzre baza tibbi hazirliq ve kliniki tecrube.',
        },
        ru: {
          title: 'Bakinskiy Meditsinskiy Universitet',
          description: 'Bazovaya podgotovka po stomatologii i klinicheskaya praktika.',
        },
        en: {
          title: 'Baku Medical University',
          description: 'Core dental training with foundational clinical practice.',
        },
      },
    },
    {
      year: '2016',
      locales: {
        az: {
          title: 'Berlin Digital Dentistry Program',
          description: 'Raqemsal planlama, implantologiya ve smile design uzre sertifikat.',
        },
        ru: {
          title: 'Berlin Digital Dentistry Program',
          description: 'Sertifikatsiya po tsifrovomu planirovaniyu, implantologii i smile design.',
        },
        en: {
          title: 'Berlin Digital Dentistry Program',
          description: 'Certification in digital planning, implantology, and smile design.',
        },
      },
    },
  ],
  achievements: {
    az: ['1500+ ugurlu implant', '15+ il tecrube', '98% pasiyent memnuniyyeti'],
    ru: ['1500+ uspeshnykh implantov', '15+ let opyta', '98% udovletvorennosti patsientov'],
    en: ['1500+ successful implants', '15+ years of experience', '98% patient satisfaction'],
  },
});

export const createEmptyAchievementDrafts = (): LocalizedText => createEmptyLocalizedText();
