// root/lib/dictionary.ts

import { Locale } from '@/i18n.config'
import type { Navigation } from '@/types/dictionary'

// Define dictionaries as a Record where each key maps to a function returning a Promise
const dictionaries: Record<Locale, () => Promise<any>> = {
  az: () => import('@/dictionaries/az.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  ru: () => import('@/dictionaries/ru.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale): Promise<Navigation> =>
  dictionaries[locale]()
