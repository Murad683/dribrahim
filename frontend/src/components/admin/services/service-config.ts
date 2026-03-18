import {
  AlignLeft,
  Baby,
  BadgeCheck,
  CircleDot,
  HeartPulse,
  Layers,
  Microscope,
  Shell,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';

export const LANGUAGE_TABS = [
  { value: 'az', label: 'AZ' },
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
] as const;

export type ServiceLanguage = (typeof LANGUAGE_TABS)[number]['value'];

export type ServiceIconName =
  | 'stethoscope'
  | 'sparkles'
  | 'smile'
  | 'shield-check'
  | 'heart-pulse'
  | 'syringe'
  | 'microscope'
  | 'wand-sparkles'
  | 'shell'
  | 'layers'
  | 'baby'
  | 'badge-check'
  | 'align-left'
  | 'circle-dot';

export type LocalizedServiceContent = {
  title: string;
  description: string;
};

export type ServiceFormValues = {
  icon: ServiceIconName;
  category: string;
  locales: Record<ServiceLanguage, LocalizedServiceContent>;
};

export type ServiceItem = ServiceFormValues & {
  id: string;
};

export const SERVICE_CATEGORIES = [
  'Implantology',
  'Orthodontics',
  'Aesthetic Dentistry',
  'Endodontics',
  'Prosthetics',
  'Pediatric Dentistry',
] as const;

export type ServiceIconOption = {
  value: ServiceIconName;
  label: string;
  icon: LucideIcon;
  keywords: string[];
};

export const SERVICE_ICON_OPTIONS: ServiceIconOption[] = [
  {
    value: 'stethoscope',
    label: 'Stethoscope',
    icon: Stethoscope,
    keywords: ['clinic', 'doctor', 'general'],
  },
  {
    value: 'sparkles',
    label: 'Sparkles',
    icon: Sparkles,
    keywords: ['esthetic', 'cosmetic', 'shine'],
  },
  {
    value: 'smile',
    label: 'Smile',
    icon: Smile,
    keywords: ['smile', 'teeth', 'design'],
  },
  {
    value: 'shield-check',
    label: 'Shield Check',
    icon: ShieldCheck,
    keywords: ['safe', 'care', 'protection'],
  },
  {
    value: 'heart-pulse',
    label: 'Heart Pulse',
    icon: HeartPulse,
    keywords: ['monitoring', 'recovery', 'health'],
  },
  {
    value: 'syringe',
    label: 'Syringe',
    icon: Syringe,
    keywords: ['treatment', 'anesthesia', 'procedure'],
  },
  {
    value: 'microscope',
    label: 'Microscope',
    icon: Microscope,
    keywords: ['precision', 'diagnostics', 'advanced'],
  },
  {
    value: 'wand-sparkles',
    label: 'Wand Sparkles',
    icon: WandSparkles,
    keywords: ['transformation', 'esthetic', 'design'],
  },
  {
    value: 'shell',
    label: 'Shell',
    icon: Shell,
    keywords: ['veneer', 'surface', 'cosmetic'],
  },
  {
    value: 'layers',
    label: 'Layers',
    icon: Layers,
    keywords: ['restoration', 'prosthetics', 'structure'],
  },
  {
    value: 'baby',
    label: 'Baby',
    icon: Baby,
    keywords: ['kids', 'children', 'pediatric'],
  },
  {
    value: 'badge-check',
    label: 'Badge Check',
    icon: BadgeCheck,
    keywords: ['quality', 'trust', 'certified'],
  },
  {
    value: 'align-left',
    label: 'Align Left',
    icon: AlignLeft,
    keywords: ['alignment', 'orthodontics', 'straightening'],
  },
  {
    value: 'circle-dot',
    label: 'Circle Dot',
    icon: CircleDot,
    keywords: ['implant', 'focus', 'target'],
  },
];

export const getServiceIconOption = (iconName: string): ServiceIconOption =>
  SERVICE_ICON_OPTIONS.find((icon) => icon.value === iconName) ?? SERVICE_ICON_OPTIONS[0];

export const getServiceIcon = (iconName: string): LucideIcon => getServiceIconOption(iconName).icon;

export const createEmptyServiceValues = (): ServiceFormValues => ({
  icon: 'stethoscope',
  category: SERVICE_CATEGORIES[0],
  locales: {
    az: { title: '', description: '' },
    ru: { title: '', description: '' },
    en: { title: '', description: '' },
  },
});
