# TanStack Query + Supabase

## Query hook
```typescript
import { useQuery } from '@tanstack/react-query';
import { getAll } from '../services/tableService';

export const QUERY_KEYS = { all: ['table'] as const, detail: (id: string) => ['table', id] as const };

export function useItems() {
  return useQuery({ queryKey: QUERY_KEYS.all, queryFn: getAll });
}
```

## Mutation hook
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all }),
  });
}
```

## Optimistic updates
```typescript
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.all });
      const previous = queryClient.getQueryData(QUERY_KEYS.all);
      queryClient.setQueryData(QUERY_KEYS.all, (old) => old?.map(i => i.id === newItem.id ? { ...i, ...newItem } : i));
      return { previous };
    },
    onError: (err, vars, context) => queryClient.setQueryData(QUERY_KEYS.all, context?.previous),
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.all }),
  });
}
```
