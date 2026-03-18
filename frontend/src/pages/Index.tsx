import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Smile, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import { subscribeToContentChanges } from '@/lib/content-sync';
import { getServiceIcon, type ServiceItem } from '@/components/admin/services/service-config';
import { type CaseItem } from '@/components/admin/cases/case-config';

const valueIcons = [Heart, Cpu, Smile, Sparkles];

export default function Home() {
  const { t, lang } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    const loadLandingContent = async () => {
      try {
        const [servicesResponse, casesResponse] = await Promise.all([
          apiClient.get<ServiceItem[]>('/api/services'),
          apiClient.get<CaseItem[]>('/api/cases'),
        ]);

        setServices(servicesResponse);
        setCases(casesResponse);
      } catch {
        setServices([]);
        setCases([]);
      }
    };

    void loadLandingContent();

    return subscribeToContentChanges('all', () => {
      void loadLandingContent();
    });
  }, []);

  const featuredService = services[0];
  const featuredCase = cases[0];
  const FeaturedServiceIcon = useMemo(
    () => getServiceIcon(featuredService?.icon ?? 'stethoscope'),
    [featuredService?.icon],
  );

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden py-32 md:py-44">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Digital Dentistry
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link to="/elaqe">{t.hero.cta}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link to="/xidmetler">
                  {t.nav.services}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values bento grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="h-full text-center p-8">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{val.title}</h3>
                    <p className="text-sm text-muted-foreground">{val.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <GlassCard className="p-10 h-full">
                <Cpu className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{t.technology.title}</h3>
                <p className="text-muted-foreground mb-3">{t.technology.subtitle}</p>
                {featuredCase ? (
                  <div className="mb-6 rounded-2xl border border-accent/10 bg-accent/5 p-4">
                    <div className="font-display text-2xl font-bold text-accent">{featuredCase.stat}</div>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {featuredCase.locales[lang].statLabel}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {featuredCase.locales[lang].title}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
                      {cases.length} live case{cases.length === 1 ? '' : 's'}
                    </p>
                  </div>
                ) : null}
                <Button asChild variant="ghost" className="text-accent hover:text-accent/80 hover:bg-transparent duration-500 p-0">
                  <Link to="/texnologiya" className="flex items-center gap-1">
                    {t.nav.technology} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </GlassCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <GlassCard className="p-10 h-full">
                <FeaturedServiceIcon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">{t.services.title}</h3>
                <p className="text-muted-foreground mb-3">{t.services.subtitle}</p>
                {featuredService ? (
                  <div className="mb-6 rounded-2xl border border-accent/10 bg-accent/5 p-4">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                      {featuredService.category}
                    </p>
                    <p className="mt-2 font-display text-xl font-semibold text-foreground">
                      {featuredService.locales[lang].title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {featuredService.locales[lang].description}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
                      {services.length} live service{services.length === 1 ? '' : 's'}
                    </p>
                  </div>
                ) : null}
                <Button asChild variant="ghost" className="text-accent hover:text-accent/80 hover:bg-transparent duration-500 p-0">
                  <Link to="/xidmetler" className="flex items-center gap-1">
                    {t.nav.services} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
