import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AutoResizeTextarea } from '@/components/ui/auto-resize-textarea';
import { ADMIN_LANGUAGE_TABS } from '@/components/admin/shared/localization';
import { createEmptyEducationEntry, type ProfileFormValues } from './profile-config';

interface EducationTimelineFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

const localizedLabels = {
  az: { title: 'Title (AZ)', description: 'Description (AZ)' },
  ru: { title: 'Title (RU)', description: 'Description (RU)' },
  en: { title: 'Title (EN)', description: 'Description (EN)' },
} as const;

export function EducationTimelineFields({ form }: EducationTimelineFieldsProps) {
  const { fields, append, insert, remove } = useFieldArray({
    control: form.control,
    name: 'education',
  });

  const handleAdd = () => {
    append(createEmptyEducationEntry());
    toast.success('Education entry added', {
      description: 'A new timeline block is ready to fill in.',
    });
  };

  const handleRemove = (index: number) => {
    const removedEntry = form.getValues(`education.${index}`);
    remove(index);

    toast.success('Education entry removed', {
      description: 'The timeline block was removed from the draft.',
      action: {
        label: 'Undo',
        onClick: () => insert(index, removedEntry),
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900">Education Timeline</h3>
          <p className="text-sm text-slate-500">Manage year markers and localized academic details.</p>
        </div>
        <Button
          type="button"
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30"
        >
          <Plus className="h-4 w-4" />
          Add New Education
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm"
          >
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-sm font-semibold text-blue-600">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-slate-900">Timeline Entry</p>
                  <p className="text-sm text-slate-500">Localized title and description per language.</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(index)}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`education.${index}.year`}
                render={({ field: yearField }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2016" className="max-w-[220px] bg-white/80" {...yearField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tabs defaultValue="az" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {ADMIN_LANGUAGE_TABS.map((language) => (
                    <TabsTrigger key={language.value} value={language.value}>
                      {language.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {ADMIN_LANGUAGE_TABS.map((language) => {
                  const labels = localizedLabels[language.value];

                  return (
                    <TabsContent key={language.value} value={language.value} className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name={`education.${index}.locales.${language.value}.title`}
                        render={({ field: titleField }) => (
                          <FormItem>
                            <FormLabel>{labels.title}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={`Enter ${labels.title.toLowerCase()}`}
                                className="bg-white/80"
                                {...titleField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`education.${index}.locales.${language.value}.description`}
                        render={({ field: descriptionField }) => (
                          <FormItem>
                            <FormLabel>{labels.description}</FormLabel>
                            <FormControl>
                              <AutoResizeTextarea
                                placeholder={`Enter ${labels.description.toLowerCase()}`}
                                className="bg-white/80"
                                {...descriptionField}
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
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
