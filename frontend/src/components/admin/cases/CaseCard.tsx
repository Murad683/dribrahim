import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type CaseItem } from './case-config';

interface CaseCardProps {
  item: CaseItem;
  onEdit: (item: CaseItem) => void;
  onDelete: (item: CaseItem) => void;
}

export function CaseCard({ item, onEdit, onDelete }: CaseCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <Card className="glass-card glow-border overflow-hidden rounded-[28px] border-white/30 bg-white/65 shadow-xl shadow-slate-200/40">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {item.image ? (
            <img src={item.image} alt={item.locales.az.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 text-slate-400">
              No preview
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-500/10">
            {item.stat} {item.locales.az.statLabel}
          </div>
        </div>

        <CardHeader className="space-y-3 pb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Localized Titles</p>
            <CardTitle className="mt-2 font-display text-xl text-slate-900">{item.locales.az.title}</CardTitle>
          </div>
          <div className="space-y-1 text-sm text-slate-500">
            <p>{item.locales.ru.title}</p>
            <p>{item.locales.en.title}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">{item.locales.az.description}</p>
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Metric</p>
            <p className="mt-2 text-base font-semibold text-slate-900">{item.locales.en.statLabel}</p>
          </div>
        </CardContent>

        <CardFooter className="justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="border-slate-200 bg-white/75"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item)}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
