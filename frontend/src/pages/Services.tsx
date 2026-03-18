import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api-client';
import { subscribeToContentChanges } from '@/lib/content-sync';
import { getServiceIcon, type ServiceItem } from '@/components/admin/services/service-config';

export default function Services() {
  const { t, lang } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);

      try {
        const response = await apiClient.get<ServiceItem[]>('/api/services');
        setServices(response);
      } finally {
        setIsLoading(false);
      }
    };

    void loadServices();

    return subscribeToContentChanges('services', () => {
      void loadServices();
    });
  }, []);

  return (
    <PageTransition>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">{t.services.title}</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t.services.subtitle}</p>
          </motion.div>

          {isLoading ? (
            <div className="mx-auto max-w-5xl py-12 text-center text-sm text-muted-foreground">
              Loading services...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.map((item, i) => {
                const Icon = getServiceIcon(item.icon);
                const locale = item.locales[lang];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <GlassCard className="h-full p-8">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">{locale.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{locale.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
