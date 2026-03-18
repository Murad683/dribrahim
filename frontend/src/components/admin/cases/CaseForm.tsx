import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';
import { toast } from '@/components/ui/sonner';
import { ADMIN_LANGUAGE_TABS } from '@/components/admin/shared/localization';
import { CaseImageUpload } from './CaseImageUpload';
import { createEmptyCaseValues, type CaseFormValues, type CaseItem } from './case-config';

const localizedCaseSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  statLabel: z.string().trim().min(1, 'Stat label is required'),
});

export const caseFormSchema = z.object({
  image: z.string().min(1, 'Image is required'),
  stat: z.string().trim().min(1, 'Stat is required'),
  locales: z.object({
    az: localizedCaseSchema,
    ru: localizedCaseSchema,
    en: localizedCaseSchema,
  }),
});

const localeLabels = {
  az: { title: 'Title (AZ)', description: 'Description (AZ)', statLabel: 'Stat Label (AZ)' },
  ru: { title: 'Title (RU)', description: 'Description (RU)', statLabel: 'Stat Label (RU)' },
  en: { title: 'Title (EN)', description: 'Description (EN)', statLabel: 'Stat Label (EN)' },
} as const;

interface CaseFormProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: CaseItem | null;
  onOpenChange: (open: boolean) => void;
  onSave: (values: CaseFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

const getFormDefaults = (initialValues?: CaseItem | null): CaseFormValues => {
  if (!initialValues) {
    return createEmptyCaseValues();
  }

  return {
    image: initialValues.image,
    stat: initialValues.stat,
    locales: {
      az: { ...initialValues.locales.az },
      ru: { ...initialValues.locales.ru },
      en: { ...initialValues.locales.en },
    },
  };
};

export function CaseForm({
  open,
  mode,
  initialValues,
  onOpenChange,
  onSave,
  isSubmitting = false,
}: CaseFormProps) {
  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: getFormDefaults(initialValues),
  });

  useEffect(() => {
    if (open) {
      form.reset(getFormDefaults(initialValues));
    }
  }, [form, initialValues, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto border-white/50 bg-white/75 p-0 backdrop-blur-xl">
        <div className="glass-card rounded-none border-0 p-6 shadow-none sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-slate-900">
              {mode === 'create' ? 'Add Case' : 'Edit Case'}
            </DialogTitle>
            <DialogDescription>
              Upload a preview image and complete all localized fields for this treatment case.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                async (values) => onSave(values),
                () =>
                  toast.error('Case form is incomplete', {
                    description: 'Fill all localized fields and add an image before saving.',
                  }),
              )}
              className="mt-6 space-y-6"
            >
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Image</FormLabel>
                      <FormControl>
                        <CaseImageUpload value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="rounded-[28px] border border-slate-200/80 bg-white/65 p-5">
                  <FormField
                    control={form.control}
                    name="stat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stat</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 98%" className="bg-white/85" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-600">
                    This metric stays global while each language gets its own `statLabel`.
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200/80 bg-white/65 p-5">
                <Tabs defaultValue="az" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    {ADMIN_LANGUAGE_TABS.map((language) => (
                      <TabsTrigger key={language.value} value={language.value}>
                        {language.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {ADMIN_LANGUAGE_TABS.map((language) => {
                    const labels = localeLabels[language.value];

                    return (
                      <TabsContent key={language.value} value={language.value} className="space-y-4 pt-4">
                        <FormField
                          control={form.control}
                          name={`locales.${language.value}.statLabel`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{labels.statLabel}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter ${labels.statLabel.toLowerCase()}`}
                                  className="bg-white/85"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`locales.${language.value}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{labels.title}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter ${labels.title.toLowerCase()}`}
                                  className="bg-white/85"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`locales.${language.value}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{labels.description}</FormLabel>
                              <FormControl>
                                <AutoResizeTextarea
                                  placeholder={`Enter ${labels.description.toLowerCase()}`}
                                  className="min-h-[160px] bg-white/85"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30"
                >
                  {isSubmitting ? 'Saving...' : 'Save Case'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
