'use client'

import { Field, Label, Description, Switch } from '@headlessui/react'

export function PremiumSwitch({ checked, onChange, hint }: { checked: boolean; onChange: (v: boolean) => void; hint: string }) {
  return (
    <Field className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4">
      <div>
        <Label className="text-sm font-semibold text-ink">Contenido Premium</Label>
        <Description className="text-xs text-slate-600">{hint}</Description>
      </div>
      <Switch
        checked={checked}
        onChange={onChange}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full bg-slate-300 transition data-[checked]:bg-brand-600"
      >
        <span className="pointer-events-none inline-block h-5 w-5 translate-x-0.5 translate-y-0.5 rounded-full bg-white shadow transition group-data-[checked]:translate-x-[22px]" />
      </Switch>
    </Field>
  )
}

export function FormActions({ onCancel, submitLabel, busy }: { onCancel: () => void; submitLabel: string; busy: boolean }) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
      <button type="button" className="btn-secondary" onClick={onCancel}>
        Cancelar
      </button>
      <button type="submit" className="btn-primary" disabled={busy}>
        {busy ? 'Guardando…' : submitLabel}
      </button>
    </div>
  )
}

export function FormError({ message }: { message: string }) {
  if (!message) return null
  return (
    <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {message}
    </p>
  )
}
