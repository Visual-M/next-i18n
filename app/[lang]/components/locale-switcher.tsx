// app/[lang]/components/LocaleSwitcher.tsx

import Link from 'next/link'
import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  return (
    <div className='flex justify-end gap-2 uppercase text-black lg:gap-4'>
      {i18n.locales.map(locale => (
        <Link
          key={locale}
          className='p-1 font-bold transition-colors duration-300 ease-in-out hover:bg-black hover:text-white lg:p-3'
          href={`/${locale}`} // Update the href to navigate to the locale path
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}
