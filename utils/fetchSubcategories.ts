// utils/fetchSubcategories.ts

import { Subcategory } from '@/types/dictionary'

export const fetchSubcategories = async (lang: string, category: string, subcategory: string): Promise<Subcategory[]> => {
  const response = await fetch(`/api/${lang}/${category}/${subcategory}`)
  if (!response.ok) {
    throw new Error('Failed to fetch subcategories')
  }
  const data = await response.json()
  return data
}
