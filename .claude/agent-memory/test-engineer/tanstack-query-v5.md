---
name: TanStack Query v5 mutationFn signature
description: In TanStack Query v5, mutationFn receives a second argument with client/meta/mutationKey — use expect.anything() for assertions
type: feedback
---

In TanStack Query v5, `mutationFn` is called with `(variables, { client, meta, mutationKey })`. When asserting mock calls, use `expect.anything()` as second arg:

```ts
expect(mockService).toHaveBeenCalledWith(validData, expect.anything());
```

**Why:** Initial test failed because `toHaveBeenCalledWith(validData)` didn't account for the second TanStack context argument.
**How to apply:** Any test that mocks a mutation service function and asserts its call arguments.
