import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="font-display text-xl font-bold text-primary">
              Dr. İbrahim<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t.footer.slogan}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-accent" />
              {t.contact.info.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 text-accent" />
              {t.contact.info.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              {t.contact.info.address}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <div className="flex gap-4 text-sm">
              <Link to="/xidmetler" className="text-muted-foreground hover:text-foreground transition-colors duration-500">{t.nav.services}</Link>
              <Link to="/texnologiya" className="text-muted-foreground hover:text-foreground transition-colors duration-500">{t.nav.technology}</Link>
              <Link to="/elaqe" className="text-muted-foreground hover:text-foreground transition-colors duration-500">{t.nav.contact}</Link>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              © 2024 Dr. İbrahim Abdulla. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
