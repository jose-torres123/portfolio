# Feedback y Estados

## Skeleton Loading — Por tipo de contenido
```tsx
import { Skeleton } from '@repo/ui';

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-4/5" />
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

// Table skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        <Skeleton className="h-4 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b p-4 last:border-0">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      ))}
    </div>
  );
}

// List skeleton
export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-1 h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Skeleton → Content Transition
```tsx
import { AnimatePresence, motion } from 'motion/react';

interface AsyncContentProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export function AsyncContent({ isLoading, skeleton, children }: AsyncContentProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          {skeleton}
        </motion.div>
      ) : (
        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Uso:
// <AsyncContent isLoading={query.isLoading} skeleton={<CardSkeleton />}>
//   <ActualCard data={query.data} />
// </AsyncContent>
```

## Empty State
```tsx
import { Button } from '@repo/ui';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4">
        {icon ?? <Inbox className="h-8 w-8 text-muted-foreground" />}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && (
        <Button className="mt-4" onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  );
}

// Uso:
// <EmptyState
//   title="Sin resultados"
//   description="No se encontraron items. Crea el primero."
//   action={{ label: "Crear item", onClick: () => navigate('/new') }}
// />
```

## Error State
```tsx
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui';
import { Button } from '@repo/ui';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Error', message, onRetry }: ErrorStateProps) {
  return (
    <Alert variant="destructive" className="mx-auto max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
            <RefreshCw className="mr-2 h-4 w-4" /> Reintentar
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
```

## Query State Wrapper — Combina loading + error + empty + content
```tsx
interface QueryStateProps<T> {
  query: { isLoading: boolean; isError: boolean; error: Error | null; data: T | undefined };
  skeleton: React.ReactNode;
  empty: { title: string; description: string };
  isEmpty: (data: T) => boolean;
  children: (data: T) => React.ReactNode;
}

export function QueryState<T>({ query, skeleton, empty, isEmpty, children }: QueryStateProps<T>) {
  if (query.isLoading) return <>{skeleton}</>;
  if (query.isError) return <ErrorState message={query.error?.message ?? 'Error desconocido'} />;
  if (!query.data || isEmpty(query.data)) return <EmptyState title={empty.title} description={empty.description} />;
  return <>{children(query.data)}</>;
}

// Uso:
// <QueryState
//   query={usersQuery}
//   skeleton={<ListSkeleton />}
//   empty={{ title: "Sin usuarios", description: "No hay usuarios registrados." }}
//   isEmpty={(data) => data.length === 0}
// >
//   {(users) => <UserList users={users} />}
// </QueryState>
```

## Confirm Dialog
```tsx
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@repo/ui';

interface ConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({ trigger, title, description, confirmLabel = 'Confirmar', onConfirm, destructive }: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={destructive ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Toast Pattern (con sonner)
```tsx
import { toast } from 'sonner';

// En mutations:
const mutation = useMutation({
  mutationFn: createItem,
  onSuccess: () => {
    toast.success('Item creado exitosamente');
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all });
  },
  onError: (error) => {
    toast.error('Error al crear item', { description: error.message });
  },
});
```
