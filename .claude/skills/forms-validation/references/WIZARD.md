# Formularios Multi-Step / Wizard

## Patrón: Un Schema por Step
```typescript
const step1Schema = z.object({ name: z.string(), email: z.string().email() });
const step2Schema = z.object({ address: z.string(), city: z.string() });

// Schema completo
const fullSchema = step1Schema.merge(step2Schema);

// En el componente: validar solo el step actual
const currentSchema = step === 1 ? step1Schema : step2Schema;
```

## Patrón: Discriminated Union
```typescript
const wizardSchema = z.discriminatedUnion('step', [
  z.object({ step: z.literal(1), name: z.string(), email: z.string().email() }),
  z.object({ step: z.literal(2), address: z.string(), city: z.string() }),
]);
```
