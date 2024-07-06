// /app/[lang]/layout.tsx

// Import necessary modules from Next.js
import './globals.css'
import type { Metadata } from 'next'
import { Locale, i18n } from '@/i18n.config'
import Navbar from './components/navbar'
import Footer from './components/footer'

// Import Server Components from Next.js
import { Montserrat } from 'next/font/google'

// Import Client Components from Next.js
import LocaleSwitcher from './components/locale-switcher'

// Initialize the Montserrat font subset
const montserrat = Montserrat({ subsets: ['latin'] })

// Define metadata for the page
export const metadata: Metadata = {
  title: 'SDMetal',
  description: 'Tikinti məhsullarının tək məkanı'
}

// Generate static parameters asynchronously
export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

// Define the default export for the layout component
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  // Render the layout structure using JSX
  return (
    <html lang={params.lang}>
      <body className={montserrat.className}>
        <div className='w-full'>
          <Navbar lang={params.lang} />
          <main>{children}</main>
          <Footer lang={params.lang} />
        </div>
      </body>
    </html>
  )
}
