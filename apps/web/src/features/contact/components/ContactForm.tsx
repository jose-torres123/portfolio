import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button, Input, Textarea, Label, Card, CardContent } from "@repo/ui";
import { contactMessageSchema, type ContactMessageInput } from "../types/contact.schemas.js";
import { useSubmitContact } from "../hooks/useSubmitContact.js";
import { useI18n } from "@/lib/i18n/index.js";

export function ContactForm(): React.JSX.Element {
  const { t } = useI18n();
  const f = t.contact.form;
  const mutation = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
  });

  function onSubmit(data: ContactMessageInput): void {
    mutation.mutate(data, {
      onSuccess: () => { reset(); },
    });
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {mutation.isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-3 py-8 text-center"
            >
              <CheckCircle className="size-12 text-emerald-500" />
              <h3 className="text-lg font-semibold">{f.successTitle}</h3>
              <p className="text-sm text-muted-foreground">{f.successMessage}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { mutation.reset(); }}
                className="mt-2"
              >
                Send another
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={(e) => { void handleSubmit(onSubmit)(e); }}
              className="flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name">{f.name}</Label>
                  <Input
                    id="contact-name"
                    placeholder={f.namePlaceholder}
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-xs text-destructive">{errors.name.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-email">{f.email}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder={f.emailPlaceholder}
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-subject">{f.subject}</Label>
                <Input
                  id="contact-subject"
                  placeholder={f.subjectPlaceholder}
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                />
                {errors.subject && (
                  <span className="text-xs text-destructive">{errors.subject.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-message">{f.message}</Label>
                <Textarea
                  id="contact-message"
                  placeholder={f.messagePlaceholder}
                  className="min-h-[140px]"
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && (
                  <span className="text-xs text-destructive">{errors.message.message}</span>
                )}
              </div>

              {mutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <AlertCircle className="size-4 shrink-0" />
                  {f.errorMessage}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="gradient"
                disabled={mutation.isPending}
                className="w-full sm:w-auto sm:self-end"
              >
                {mutation.isPending ? f.submitting : f.submit}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
