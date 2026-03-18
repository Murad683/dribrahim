import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { subscribeToContentChanges } from '@/lib/content-sync';
import { type ProfileFormValues } from '@/components/admin/profile/profile-config';

export default function About() {
  const { t, lang } = useLanguage();
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await apiClient.get<ProfileFormValues>('/api/profile');
        setProfile(response);
      } catch {
        setProfile(null);
      }
    };

    void loadProfile();

    return subscribeToContentChanges('profile', () => {
      void loadProfile();
    });
  }, []);

  const education = profile?.education ?? t.about.education.map((item) => ({
    year: item.year,
    locales: {
      az: { title: item.title, description: item.desc },
      ru: { title: item.title, description: item.desc },
      en: { title: item.title, description: item.desc },
    },
  }));

  const achievements = profile?.achievements[lang] ?? t.about.achievements;
  const bio = profile?.bio[lang] ?? t.about.bio;

  return (
    <PageTransition>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-2">{t.about.title}</h1>
            <p className="text-lg text-accent font-medium">{t.about.subtitle}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <GlassCard hover={false} className="p-10 mb-12">
              <p className="text-muted-foreground leading-relaxed text-lg">{bio}</p>
            </GlassCard>
          </motion.div>

          {/* Timeline */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-accent" />
              Təhsil & Təcrübə
            </h2>
            <div className="space-y-4">
              {education.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="flex items-center gap-6 p-6">
                    <div className="font-display text-2xl font-bold text-accent min-w-[60px]">{item.year}</div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{item.locales[lang].title}</h3>
                      <p className="text-sm text-muted-foreground">{item.locales[lang].description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" />
              Nailiyyətlər
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="p-5 text-center">
                    <p className="text-sm font-medium text-foreground">{item}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
