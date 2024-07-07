// app/[lang]/components/navbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Navigation, Category, Subcategory } from '@/types/dictionary'
import { IoIosArrowDown } from 'react-icons/io'
import Header from './header'
import LocaleSwitcher from './locale-switcher'

interface Props {
  lang: Locale
}

const Navbar: React.FC<Props> = ({ lang }) => {
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const dict = await getDictionary(lang)
      setNavigation(dict)
    }
    fetchData()
  }, [lang])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title)
  }

  if (!navigation) return <div>Loading...</div>

  const renderSubcategories = (subcategories: Subcategory[] | undefined) => {
    if (!subcategories) return null

    return (
      <div>
        {subcategories.map(subcategory => (
          <div key={subcategory.id}>
            <Link
              href={subcategory.url}
              className='block p-4 hover:bg-black hover:text-white'
            >
              {subcategory.title}
            </Link>
          </div>
        ))}
      </div>
    )
  }

  const renderCategoriesDropdownWithSubcategories = (
    categories: Category[] | undefined,
    title: string
  ) => {
    if (!categories) return null

    const isOpen = openDropdown === title

    return (
      <div
        className={`md:group-hover:flex ${isOpen ? 'block' : 'hidden'} md:hidden`}
      >
        <div className='left-0 top-0 flex w-full flex-row items-end bg-white text-black md:absolute md:mt-8 md:w-auto md:shadow-lg'>
          <div className='flex w-full flex-col md:relative md:flex-row'>
            {categories.map(category => (
              <div key={category.id} className='flex flex-col'>
                <div className='flex items-center p-4'>
                  <span className='font-semibold'>{category.title}</span>
                </div>
                {category.subcategories &&
                  renderSubcategories(category.subcategories)}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderCategoriesDropdownWithoutSubcategories = (
    categories: Category[] | undefined,
    title: string
  ) => {
    if (!categories) return null

    const isOpen = openDropdown === title

    return (
      <div
        className={`md:group-hover:flex ${isOpen ? 'block' : 'hidden'} md:hidden`}
      >
        <div className='left-0 top-2 flex w-full flex-col bg-white text-black md:absolute md:mt-8 md:w-auto md:shadow-lg'>
          {categories.map(category => (
            <div key={category.id} className='relative'>
              <Link
                href={category.url}
                className='block p-4 hover:bg-black hover:text-white'
              >
                {category.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderNavItem = (
    title: string,
    url?: string,
    categories?: Category[]
  ) => {
    const hasSubcategories = categories?.some(
      cat => cat.subcategories && cat.subcategories.length > 0
    )

    return (
      <div className='group md:relative md:flex'>
        {categories && categories.length > 0 ? (
          <div className='flex flex-col items-baseline md:items-center'>
            <button
              className='flex w-full items-center px-4 py-2 font-bold uppercase md:bg-transparent'
              onClick={() => toggleDropdown(title)}
            >
              <span>{title}</span>
              <IoIosArrowDown className='ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:rotate-180' />
            </button>
            {hasSubcategories
              ? renderCategoriesDropdownWithSubcategories(categories, title)
              : renderCategoriesDropdownWithoutSubcategories(categories, title)}
          </div>
        ) : (
          <Link
            href={url ?? '#'}
            className='block px-4 py-2 font-bold uppercase'
          >
            {title}
          </Link>
        )}
      </div>
    )
  }

  return (
    <nav className={`container mx-auto p-4 text-black md:block`}>
      <Header />
      <div className='absolute right-5 top-10 flex items-center justify-between'>
        <button
          className='flex items-center p-2 md:hidden'
          onClick={toggleMenu}
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`w-full flex-col whitespace-nowrap ${isMenuOpen ? 'flex' : 'hidden'} md:flex md:flex-row`}
      >
        <div className='md:hidden'>
          <LocaleSwitcher />
        </div>

        {renderNavItem(navigation.home.title, navigation.home.url)}
        {renderNavItem(
          navigation.company.title,
          undefined,
          navigation.company.categories
        )}
        {renderNavItem(
          navigation.products.title,
          undefined,
          navigation.products.categories
        )}
        {renderNavItem(navigation.contacts.title, navigation.contacts.url)}
        {renderNavItem(navigation.news.title, navigation.news.url)}
      </div>
    </nav>
  )
}

export default Navbar
