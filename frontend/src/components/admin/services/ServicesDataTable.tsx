import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Pencil, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SERVICE_CATEGORIES, getServiceIcon, type ServiceItem } from './service-config';

interface ServicesDataTableProps {
  services: ServiceItem[];
  onEdit: (service: ServiceItem) => void;
  onDelete: (service: ServiceItem) => void;
}

export function ServicesDataTable({ services, onEdit, onDelete }: ServicesDataTableProps) {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [titleSort, setTitleSort] = useState<'asc' | 'desc'>('asc');

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return [...services]
      .filter((service) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          service.locales.az.title.toLowerCase().includes(normalizedQuery) ||
          service.category.toLowerCase().includes(normalizedQuery);
        const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;

        return matchesQuery && matchesCategory;
      })
      .sort((left, right) => {
        const compareResult = left.locales.az.title.localeCompare(right.locales.az.title, undefined, {
          sensitivity: 'base',
        });
        return titleSort === 'asc' ? compareResult : -compareResult;
      });
  }, [categoryFilter, query, services, titleSort]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by AZ title or category..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full bg-white/80 md:w-[220px]">
            <SelectValue placeholder="Filter category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {SERVICE_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/90 hover:bg-slate-50/90">
              <TableHead className="w-[96px]">Icon</TableHead>
              <TableHead>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setTitleSort((current) => (current === 'asc' ? 'desc' : 'asc'))}
                  className="-ml-2 h-8 px-2 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Title (AZ)
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="w-[220px]">Category</TableHead>
              <TableHead className="w-[170px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-sm text-slate-500">
                  No services found for this filter.
                </TableCell>
              </TableRow>
            ) : (
              <AnimatePresence initial={false} mode="popLayout">
                {filteredServices.map((service, index) => {
                  const Icon = getServiceIcon(service.icon);

                  return (
                    <motion.tr
                      key={service.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                      className="border-b transition-colors hover:bg-muted/40"
                    >
                      <TableCell>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{service.locales.az.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="rounded-full">
                          {service.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(service)}
                            className="h-8 border-slate-200"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(service)}
                            className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
