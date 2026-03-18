import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { type UseFormReturn } from 'react-hook-form';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ADMIN_LANGUAGE_TABS, type AdminLanguage } from '@/components/admin/shared/localization';
import { createEmptyAchievementDrafts, type ProfileFormValues } from './profile-config';

interface AchievementsManagerProps {
  form: UseFormReturn<ProfileFormValues>;
}

export function AchievementsManager({ form }: AchievementsManagerProps) {
  const [drafts, setDrafts] = useState(createEmptyAchievementDrafts());

  const handleAddAchievement = (language: AdminLanguage) => {
    const nextAchievement = drafts[language].trim();

    if (!nextAchievement) {
      toast.error('Achievement cannot be empty', {
        description: 'Enter a short achievement label before adding it.',
      });
      return;
    }

    const currentAchievements = form.getValues(`achievements.${language}`) ?? [];
    form.setValue(`achievements.${language}`, [...currentAchievements, nextAchievement], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setDrafts((currentDrafts) => ({ ...currentDrafts, [language]: '' }));

    toast.success('Achievement added', {
      description: `New ${language.toUpperCase()} achievement added to the draft.`,
    });
  };

  const handleRemoveAchievement = (language: AdminLanguage, index: number) => {
    const currentAchievements = form.getValues(`achievements.${language}`) ?? [];
    const removedAchievement = currentAchievements[index];
    const nextAchievements = currentAchievements.filter((_, achievementIndex) => achievementIndex !== index);

    form.setValue(`achievements.${language}`, nextAchievements, {
      shouldDirty: true,
      shouldValidate: true,
    });

    toast.success('Achievement removed', {
      description: 'The achievement was removed from the draft.',
      action: {
        label: 'Undo',
        onClick: () =>
          form.setValue(
            `achievements.${language}`,
            [
              ...nextAchievements.slice(0, index),
              removedAchievement,
              ...nextAchievements.slice(index),
            ],
            {
              shouldDirty: true,
              shouldValidate: true,
            },
          ),
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-display text-lg font-semibold text-slate-900">Achievements</h3>
        <p className="text-sm text-slate-500">Maintain the short highlights shown in the about section.</p>
      </div>

      <Tabs defaultValue="az" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {ADMIN_LANGUAGE_TABS.map((language) => (
            <TabsTrigger key={language.value} value={language.value}>
              {language.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ADMIN_LANGUAGE_TABS.map((language) => {
          const achievements = form.watch(`achievements.${language.value}`) ?? [];

          return (
            <TabsContent key={language.value} value={language.value} className="space-y-4 pt-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <Input
                  value={drafts[language.value]}
                  onChange={(event) =>
                    setDrafts((currentDrafts) => ({
                      ...currentDrafts,
                      [language.value]: event.target.value,
                    }))
                  }
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleAddAchievement(language.value);
                    }
                  }}
                  placeholder={`Add ${language.label} achievement`}
                  className="bg-white/80"
                />
                <Button
                  type="button"
                  onClick={() => handleAddAchievement(language.value)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30"
                >
                  <Plus className="h-4 w-4" />
                  Add Achievement
                </Button>
              </div>

              {achievements.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 px-4 py-6 text-sm text-slate-500">
                  No achievements added for {language.label} yet.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {achievements.map((achievement, index) => (
                    <Badge
                      key={`${language.value}-${achievement}-${index}`}
                      variant="secondary"
                      className="rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-slate-700"
                    >
                      <span>{achievement}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(language.value, index)}
                        className="ml-2 rounded-full text-slate-500 transition-colors hover:text-red-600"
                        aria-label={`Remove ${achievement}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
