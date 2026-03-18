import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { CaseCard } from '@/components/admin/cases/CaseCard';
import { CaseForm } from '@/components/admin/cases/CaseForm';
import {
  type CaseFormValues,
  type CaseItem,
} from '@/components/admin/cases/case-config';
import { apiClient, getErrorMessage } from '@/lib/api-client';
import { notifyPublicDataChanged } from '@/lib/content-sync';

export default function AdminCases() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [activeCase, setActiveCase] = useState<CaseItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadCases = async () => {
      setIsLoading(true);

      try {
        const response = await apiClient.get<CaseItem[]>('/api/admin/cases');
        setCases(response);
      } catch (error) {
        toast.error('Failed to load cases', {
          description: getErrorMessage(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    void loadCases();
  }, []);

  const openCreateDialog = () => {
    setFormMode('create');
    setActiveCase(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: CaseItem) => {
    setFormMode('edit');
    setActiveCase(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (item: CaseItem) => {
    try {
      await apiClient.delete(`/api/admin/cases/${item.id}`);
      setCases((currentCases) => currentCases.filter((caseItem) => caseItem.id !== item.id));
      notifyPublicDataChanged('cases');
      toast.success('Case deleted', {
        description: `${item.locales.az.title} was removed from the gallery.`,
      });
    } catch (error) {
      toast.error('Failed to delete case', {
        description: getErrorMessage(error),
      });
    }
  };

  const handleSave = async (values: CaseFormValues) => {
    setIsSaving(true);

    try {
      if (formMode === 'edit' && activeCase) {
        const updatedCase = await apiClient.put<CaseItem, CaseFormValues>(
          `/api/admin/cases/${activeCase.id}`,
          values,
        );

        setCases((currentCases) =>
          currentCases.map((item) => (item.id === activeCase.id ? updatedCase : item)),
        );

        toast.success('Case saved', {
          description: 'The selected treatment case was updated.',
        });
        notifyPublicDataChanged('cases');
      } else {
        const createdCase = await apiClient.post<CaseItem, CaseFormValues>('/api/admin/cases', values);

        setCases((currentCases) => [createdCase, ...currentCases]);
        notifyPublicDataChanged('cases');

        toast.success('Case saved', {
          description: 'A new treatment case has been added.',
        });
      }

      setIsFormOpen(false);
      setActiveCase(null);
    } catch (error) {
      toast.error('Failed to save case', {
        description: getErrorMessage(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-slate-500">
          Curate the treatment gallery with localized case content, metrics, and image previews.
        </p>
        <Button
          type="button"
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30"
        >
          <Plus className="h-4 w-4" />
          Add Case
        </Button>
      </div>

      {isLoading ? (
        <GlassCard className="p-10 text-center text-sm text-slate-500">
          Loading cases...
        </GlassCard>
      ) : cases.length === 0 ? (
        <GlassCard className="p-10 text-center">
          <h3 className="font-display text-xl font-semibold text-slate-900">No cases yet</h3>
          <p className="mt-2 text-sm text-slate-500">
            Add the first treatment case to start building the gallery.
          </p>
        </GlassCard>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>
            {cases.map((item) => (
              <CaseCard key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <CaseForm
        open={isFormOpen}
        mode={formMode}
        initialValues={activeCase}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setActiveCase(null);
          }
        }}
        onSave={handleSave}
        isSubmitting={isSaving}
      />
    </div>
  );
}
