import { useLanguage } from '@/contexts/LanguageContext';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

const contactIcons = [Phone, Mail, MapPin, Clock];

export default function Contact() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const infoItems = [
    { icon: Phone, value: t.contact.info.phone },
    { icon: Mail, value: t.contact.info.email },
    { icon: MapPin, value: t.contact.info.address },
    { icon: Clock, value: t.contact.info.hours },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Mesajınız göndərildi!');
    }, 1000);
  };

  return (
    <PageTransition>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-4">{t.contact.title}</h1>
            <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <GlassCard hover={false} className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input placeholder={t.contact.form.name} className="bg-background/50 border-border/50 h-12" required />
                  <Input placeholder={t.contact.form.phone} type="tel" className="bg-background/50 border-border/50 h-12" required />
                  <Select>
                    <SelectTrigger className="bg-background/50 border-border/50 h-12">
                      <SelectValue placeholder={t.contact.form.service} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.services.items.map((s, i) => (
                        <SelectItem key={i} value={s.title}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="date" className="bg-background/50 border-border/50 h-12" />
                  <Textarea placeholder={t.contact.form.message} rows={4} className="bg-background/50 border-border/50 resize-none" />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
                  >
                    {loading ? '...' : t.contact.form.submit}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Info cards */}
            <div className="lg:col-span-2 space-y-4">
              {infoItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    <GlassCard className="flex items-center gap-4 p-5">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <p className="text-sm text-foreground">{item.value}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
              <GlassCard hover={false} className="overflow-hidden p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12156.42155503337!2d49.844456699999995!3d40.3843568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d005f7cb6d3%3A0x8a0fa2efbc135309!2sDental%20Elegance%20Clinic!5e0!3m2!1saz!2skz!4v1773851362433!5m2!1saz!2skz"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dental Elegance Clinic"
                  />
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
