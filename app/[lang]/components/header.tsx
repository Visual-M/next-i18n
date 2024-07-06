// /app/[lang]/components/header.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import LocaleSwitcher from './locale-switcher'
import logo from '@/public/images/logo.svg'

export default function Header() {
  return (
    <header className='relative flex items-center py-4 font-bold'>
      <div className='w-full mx-auto flex items-center justify-between'>
        <Link href='/'>
          <Image className='w-40' alt='logo' src={logo} />
        </Link>
        {/* Conditionally render LocaleSwitcher based on screen size */}
        <div className='hidden md:flex'>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  )
}
