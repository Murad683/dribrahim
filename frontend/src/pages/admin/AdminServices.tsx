import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { ServiceForm } from '@/components/admin/services/ServiceForm';
import { ServicesDataTable } from '@/components/admin/services/ServicesDataTable';
import { type ServiceFormValues, type ServiceItem } from '@/components/admin/services/service-config';
import { apiClient, getErrorMessage } from '@/lib/api-client';
import { notifyPublicDataChanged } from '@/lib/content-sync';

export default function AdminServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);

      try {
        const response = await apiClient.get<ServiceItem[]>('/api/admin/services');
        setServices(response);
      } catch (error) {
        toast.error('Failed to load services', {
          description: getErrorMessage(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    void loadServices();
  }, []);

  const openCreateDialog = () => {
    setFormMode('create');
    setActiveService(null);
    setIsFormOpen(true);
  };

  const handleEdit = (service: ServiceItem) => {
    setFormMode('edit');
    setActiveService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (service: ServiceItem) => {
    try {
      await apiClient.delete(`/api/admin/services/${service.id}`);
      setServices((currentServices) => currentServices.filter((item) => item.id !== service.id));
      notifyPublicDataChanged('services');
      toast.success('Service deleted', {
        description: `${service.locales.az.title} was removed.`,
      });
    } catch (error) {
      toast.error('Failed to delete service', {
        description: getErrorMessage(error),
      });
    }
  };

  const handleSave = async (values: ServiceFormValues) => {
    setIsSaving(true);

    try {
      if (formMode === 'edit' && activeService) {
        const updatedService = await apiClient.put<ServiceItem, ServiceFormValues>(
          `/api/admin/services/${activeService.id}`,
          values,
        );

        setServices((currentServices) =>
          currentServices.map((service) =>
            service.id === activeService.id ? updatedService : service,
          ),
        );

        toast.success('Service saved', {
          description: 'The selected service was updated successfully.',
        });
        notifyPublicDataChanged('services');
      } else {
        const createdService = await apiClient.post<ServiceItem, ServiceFormValues>(
          '/api/admin/services',
          values,
        );

        setServices((currentServices) => [createdService, ...currentServices]);
        notifyPublicDataChanged('services');

        toast.success('Service saved', {
          description: 'A new service has been added.',
        });
      }

      setIsFormOpen(false);
      setActiveService(null);
    } catch (error) {
      toast.error('Failed to save service', {
        description: getErrorMessage(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Manage localized service content and icons shown on the public website.
          </p>
        </div>
        <Button
          type="button"
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/30"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <GlassCard className="p-5 md:p-6">
        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-500">Loading services...</div>
        ) : (
          <ServicesDataTable services={services} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </GlassCard>

      <ServiceForm
        open={isFormOpen}
        mode={formMode}
        initialValues={activeService}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) {
            setActiveService(null);
          }
        }}
        onSave={handleSave}
        isSubmitting={isSaving}
      />
    </div>
  );
}
