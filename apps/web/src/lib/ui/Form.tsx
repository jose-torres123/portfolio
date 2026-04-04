import * as React from 'react'
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/cn'

interface FormProps<TFieldValues extends FieldValues>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<TFieldValues>
}

const Form = React.forwardRef<
  HTMLFormElement,
  FormProps<FieldValues>
>(({ form, className, ...props }, ref) => (
  <FormProvider {...form}>
    <form ref={ref} className={cn('space-y-4', className)} {...props} />
  </FormProvider>
))
Form.displayName = 'Form'

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
))
FormField.displayName = 'FormField'

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
))
FormItem.displayName = 'FormItem'

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn('text-sm font-medium leading-none', className)} {...props} />
))
FormLabel.displayName = 'FormLabel'

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
FormControl.displayName = 'FormControl'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm font-medium text-destructive', className)}
    {...props}
  />
))
FormMessage.displayName = 'FormMessage'

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }
