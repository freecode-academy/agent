export const LOCALES = {
  ru: { label: 'Русский', flag: '🇷🇺' },
  en: { label: 'English', flag: '🇬🇧' },
} as const

export type Locale = keyof typeof LOCALES
export const LOCALE_CODES = Object.keys(LOCALES) as Locale[]

export type LocaleOption = {
  code: Locale
  label: string
  flag: string
  href: string
}

export const LOCALE_OPTIONS = Object.entries(LOCALES).map(([code, data]) => ({
  code: code as Locale,
  label: data.label,
  flag: data.flag,
}))

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALE_CODES as string[]).includes(value)
}

export const DEFAULT_LOCALE: Locale = 'ru'

/** Publication date, no time, formatted per locale conventions. */
export function formatDate(
  iso: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) {
    return iso
  }
  return d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
