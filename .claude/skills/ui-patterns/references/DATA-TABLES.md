# Tablas de Datos

## Tabla Completa — Filtros + Sorting + Paginación
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import { Input } from '@repo/ui';
import { Button } from '@repo/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';
import { ChevronLeft, ChevronRight, Search, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string; sortable?: boolean }[];
  searchKey?: keyof T;
  pageSize?: number;
}

export function DataTable<T extends { id: string }>({
  data, columns, searchKey, pageSize = 10
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);

  const filtered = searchKey
    ? data.filter(item => String(item[searchKey]).toLowerCase().includes(search.toLowerCase()))
    : data;

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  return (
    <div className="flex flex-col gap-4">
      {/* Filtros */}
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9"
          />
        </div>
      )}

      {/* Tabla — scroll horizontal en mobile */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead key={String(col.key)}>
                  {col.sortable ? (
                    <Button variant="ghost" size="sm" className="-ml-3"
                      onClick={() => {
                        if (sortKey === col.key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
                        else { setSortKey(col.key); setSortDir('asc'); }
                      }}>
                      {col.label}
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ) : col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map(item => (
              <TableRow key={item.id}>
                {columns.map(col => (
                  <TableCell key={String(col.key)}>{String(item[col.key])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{sorted.length} resultado{sorted.length !== 1 ? 's' : ''}</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>{page + 1} / {totalPages || 1}</span>
          <Button variant="outline" size="icon" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## Tabla Mobile — Cards en vez de filas
```tsx
// En mobile mostrar cards, en desktop mostrar tabla
<div className="hidden md:block">
  <DataTable data={items} columns={columns} />
</div>
<div className="flex flex-col gap-3 md:hidden">
  {items.map(item => (
    <Card key={item.id} className="p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">{item.name}</span>
        <Badge>{item.status}</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
    </Card>
  ))}
</div>
```

## Tabla con Selección
```tsx
const [selected, setSelected] = useState<Set<string>>(new Set());

const toggleAll = () => {
  if (selected.size === data.length) setSelected(new Set());
  else setSelected(new Set(data.map(d => d.id)));
};

const toggle = (id: string) => {
  const next = new Set(selected);
  next.has(id) ? next.delete(id) : next.add(id);
  setSelected(next);
};

// En header: <Checkbox checked={selected.size === data.length} onCheckedChange={toggleAll} />
// En row: <Checkbox checked={selected.has(item.id)} onCheckedChange={() => toggle(item.id)} />
// Acción bulk: {selected.size > 0 && <Button>Eliminar ({selected.size})</Button>}
```
