import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  createEmptyServiceValues,
  getServiceIconOption,
  LANGUAGE_TABS,
  SERVICE_CATEGORIES,
  SERVICE_ICON_OPTIONS,
  type ServiceFormValues,
  type ServiceIconName,
  type ServiceItem,
  type ServiceLanguage,
} from './service-config';

const localizedFieldSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
});

const serviceIconValues = SERVICE_ICON_OPTIONS.map((icon) => icon.value) as [
  ServiceIconName,
  ...ServiceIconName[],
];

export const serviceFormSchema = z.object({
  icon: z.enum(serviceIconValues, {
    required_error: 'Please select an icon',
  }),
  category: z.string().trim().min(1, 'Category is required'),
  locales: z.object({
    az: localizedFieldSchema,
    ru: localizedFieldSchema,
    en: localizedFieldSchema,
  }),
});

const languageLabels: Record<ServiceLanguage, { title: string; description: string }> = {
  az: { title: 'Title (AZ)', description: 'Description (AZ)' },
  ru: { title: 'Title (RU)', description: 'Description (RU)' },
  en: { title: 'Title (EN)', description: 'Description (EN)' },
};

interface ServiceFormProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: ServiceItem | null;
  onOpenChange: (open: boolean) => void;
  onSave: (values: ServiceFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

const getFormDefaults = (initialValues?: ServiceItem | null): ServiceFormValues => {
  if (!initialValues) {
    return createEmptyServiceValues();
  }

  return {
    icon: initialValues.icon,
    category: initialValues.category,
    locales: {
      az: { ...initialValues.locales.az },
      ru: { ...initialValues.locales.ru },
      en: { ...initialValues.locales.en },
    },
  };
};

export function ServiceForm({
  open,
  mode,
  initialValues,
  onOpenChange,
  onSave,
  isSubmitting = false,
}: ServiceFormProps) {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const defaultValues = useMemo(() => getFormDefaults(initialValues), [initialValues]);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form, open]);

  const handleSubmit = async (values: ServiceFormValues) => {
    await onSave(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-white/50 bg-white/70 p-0 backdrop-blur-xl">
        <div className="glass-card rounded-none border-0 p-6 shadow-none sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-slate-900">
              {mode === 'create' ? 'Add Service' : 'Edit Service'}
            </DialogTitle>
            <DialogDescription>
              Fill in all localized fields (AZ, RU, EN) to publish this service.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => {
                    const selectedIcon = getServiceIconOption(field.value);
                    const SelectedIconComponent = selectedIcon.icon;

                    return (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-full justify-between border-slate-200 bg-white/80',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  <SelectedIconComponent className="h-4 w-4 text-blue-600" />
                                  {selectedIcon.label}
                                </span>
                                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-[320px] p-0">
                            <Command>
                              <CommandInput placeholder="Search icon..." />
                              <CommandList>
                                <CommandEmpty>No icon found.</CommandEmpty>
                                <CommandGroup>
                                  {SERVICE_ICON_OPTIONS.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                      <CommandItem
                                        key={option.value}
                                        value={`${option.label} ${option.keywords.join(' ')}`}
                                        onSelect={() => {
                                          field.onChange(option.value);
                                          setIconPickerOpen(false);
                                        }}
                                      >
                                        <Icon className="mr-2 h-4 w-4 text-blue-600" />
                                        <span>{option.label}</span>
                                        <Check
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            option.value === field.value ? 'opacity-100' : 'opacity-0',
                                          )}
                                        />
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-white/80">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SERVICE_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-4">
                <Tabs defaultValue="az" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    {LANGUAGE_TABS.map((language) => (
                      <TabsTrigger key={language.value} value={language.value}>
                        {language.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {LANGUAGE_TABS.map((language) => {
                    const titleFieldName = `locales.${language.value}.title` as const;
                    const descriptionFieldName = `locales.${language.value}.description` as const;
                    const labels = languageLabels[language.value];

                    return (
                      <TabsContent key={language.value} value={language.value} className="space-y-4 pt-4">
                        <FormField
                          control={form.control}
                          name={titleFieldName}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{labels.title}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter ${labels.title.toLowerCase()}`}
                                  className="bg-white/80"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={descriptionFieldName}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{labels.description}</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={`Enter ${labels.description.toLowerCase()}`}
                                  className="min-h-[130px] bg-white/80"
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
                  {isSubmitting ? 'Saving...' : 'Save Service'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
