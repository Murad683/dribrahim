import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { subscribeToContentChanges } from '@/lib/content-sync';
import { type CaseItem } from '@/components/admin/cases/case-config';

export default function Technology() {
  const { t, lang } = useLanguage();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCases = async () => {
      setIsLoading(true);

      try {
        const response = await apiClient.get<CaseItem[]>('/api/cases');
        setCases(response);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCases();

    return subscribeToContentChanges('cases', () => {
      void loadCases();
    });
  }, []);

  return (
    <PageTransition>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Before & After
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">{t.technology.title}</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t.technology.subtitle}</p>
          </motion.div>

          {isLoading ? (
            <div className="mx-auto max-w-4xl py-12 text-center text-sm text-muted-foreground">
              Loading cases...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {cases.map((item, i) => {
                const locale = item.locales[lang];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <GlassCard className="h-full overflow-hidden p-0">
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        {item.image ? (
                          <img src={item.image} alt={locale.title} className="h-full w-full object-cover" />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                        <div className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-right shadow-lg shadow-blue-500/10">
                          <div className="font-display text-2xl font-bold text-accent">{item.stat}</div>
                          <div className="text-xs text-muted-foreground">{locale.statLabel}</div>
                        </div>
                      </div>

                      <div className="p-8">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">{locale.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{locale.description}</p>
                      </div>
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
