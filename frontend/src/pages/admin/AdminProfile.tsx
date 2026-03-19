import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { AchievementsManager } from '@/components/admin/profile/AchievementsManager';
import { EducationTimelineFields } from '@/components/admin/profile/EducationTimelineFields';
import {
  createDefaultProfileValues,
  type ProfileFormValues,
} from '@/components/admin/profile/profile-config';
import {
  ADMIN_LANGUAGE_TABS,
  type AdminLanguage,
} from '@/components/admin/shared/localization';
import { apiClient, getErrorMessage } from '@/lib/api-client';
import { notifyPublicDataChanged } from '@/lib/content-sync';

const localizedTextSchema = z.string().trim().min(1, 'This field is required');
const localizedEducationSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
});

const profileFormSchema = z.object({
  bio: z.object({
    az: localizedTextSchema,
    ru: localizedTextSchema,
    en: localizedTextSchema,
  }),
  education: z
    .array(
      z.object({
        year: z.string().trim().min(1, 'Year is required'),
        locales: z.object({
          az: localizedEducationSchema,
          ru: localizedEducationSchema,
          en: localizedEducationSchema,
        }),
      }),
    )
    .min(1, 'Add at least one education entry'),
  achievements: z.object({
    az: z.array(z.string().trim().min(1, 'Achievement cannot be empty')),
    ru: z.array(z.string().trim().min(1, 'Achievement cannot be empty')),
    en: z.array(z.string().trim().min(1, 'Achievement cannot be empty')),
  }),
});

const bioFieldLabels: Record<AdminLanguage, string> = {
  az: 'Biography (AZ)',
  ru: 'Biography (RU)',
  en: 'Biography (EN)',
};

const sectionVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' as const } },
};

export default function AdminProfile() {
  const [profileData, setProfileData] = useState(createDefaultProfileValues);
  const [activeBioLanguage, setActiveBioLanguage] = useState<AdminLanguage>('az');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData,
  });

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);

      try {
        const response = await apiClient.get<ProfileFormValues>('/api/admin/profile');
        setProfileData(response);
        form.reset(response);
      } catch (error) {
        toast.error('Failed to load profile', {
          description: getErrorMessage(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [form]);

  const handleValidSubmit = async (values: ProfileFormValues) => {
    const nextValues: ProfileFormValues = {
      ...values,
      achievements: {
        az: values.achievements.az.map((item) => item.trim()).filter(Boolean),
        ru: values.achievements.ru.map((item) => item.trim()).filter(Boolean),
        en: values.achievements.en.map((item) => item.trim()).filter(Boolean),
      },
    };

    setIsSaving(true);

    try {
      const savedProfile = await apiClient.post<ProfileFormValues, ProfileFormValues>(
        '/api/admin/profile',
        nextValues,
      );

      setProfileData(savedProfile);
      form.reset(savedProfile);
      notifyPublicDataChanged('profile');

      toast.success('Profile saved', {
        description: 'Biography, education timeline, and achievements were updated.',
      });
    } catch (error) {
      toast.error('Failed to save profile', {
        description: getErrorMessage(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInvalidSubmit = () => {
    toast.error('Profile form is incomplete', {
      description: 'Fill all required localized fields before saving.',
    });
  };

  if (isLoading) {
    return (
      <GlassCard className="p-6 text-center text-sm text-slate-500 sm:p-10">
        Loading profile...
      </GlassCard>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleValidSubmit, handleInvalidSubmit)} className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-sm text-slate-500">
            Update the doctor profile, timeline milestones, and localized achievements shown on the public site.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset(profileData)}
              disabled={isSaving}
              className="min-h-11 w-full border-slate-200 bg-white/70 sm:w-auto"
            >
              Reset Draft
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="min-h-11 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30 sm:w-auto"
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>

        <motion.div initial="hidden" animate="show" variants={sectionVariants}>
          <GlassCard className="p-0 overflow-hidden">
            <div className="border-b border-white/40 px-4 py-4 sm:px-6 sm:py-5">
              <h3 className="font-display text-base font-semibold text-slate-900 sm:text-lg">Bio Editor</h3>
              <p className="text-sm text-slate-500">Long-form doctor biography with localized editing tabs.</p>
            </div>

            <div className="p-4 sm:p-6">
              <Tabs
                value={activeBioLanguage}
                onValueChange={(value) => setActiveBioLanguage(value as AdminLanguage)}
                className="w-full"
              >
                <TabsList className="grid h-auto w-full grid-cols-3 gap-1">
                  {ADMIN_LANGUAGE_TABS.map((language) => (
                    <TabsTrigger key={language.value} value={language.value} className="min-h-11">
                      {language.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {ADMIN_LANGUAGE_TABS.map((language) => (
                  <TabsContent key={language.value} value={language.value} className="pt-4">
                    <FormField
                      control={form.control}
                      name={`bio.${language.value}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{bioFieldLabels[language.value]}</FormLabel>
                          <FormControl>
                            <AutoResizeTextarea
                              placeholder={`Write ${language.label} biography`}
                              className="min-h-[200px] w-full bg-white/80 sm:min-h-[220px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={sectionVariants}>
          <GlassCard className="glow-border p-4 sm:p-6">
            <EducationTimelineFields form={form} />
          </GlassCard>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={sectionVariants}>
          <GlassCard className="p-4 sm:p-6">
            <AchievementsManager form={form} />
          </GlassCard>
        </motion.div>
      </form>
    </Form>
  );
}
