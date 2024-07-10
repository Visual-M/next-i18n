// /app/[lang]/components/Footer.tsx

'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { Navigation, Category } from '@/types/dictionary' // Adjust types as per your structure
import whiteLogo from '@/public/images/logoWhite.svg' // Adjust path to your logo
import { FaFacebookSquare, FaInstagram, FaPhone } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'

interface Props {
  lang: Locale
}

const Footer: React.FC<Props> = ({ lang }) => {
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dict = await getDictionary(lang) // Fetching data using getDictionary
        setNavigation(dict)
      } catch (error) {
        console.error('Error fetching navigation data:', error)
      }
    }

    fetchData()
  }, [lang])

  if (!navigation) {
    return <div>Loading...</div> // You can render a loader or handle loading state
  }

  // Function to render categories
  const renderCategories = (categories: Category[] | undefined) => {
    if (!categories) return null

    return categories.map(category => (
      <div key={category.id} className='flex py-2'>
        <Link href={category.url} passHref>
          <span className='block text-left hover:text-white'>
            {category.title}
          </span>
        </Link>
      </div>
    ))
  }

  // Function to render social media links
  const renderSocialLinks = () => {
    const socialPlatforms = [
      {
        name: 'Facebook',
        url: navigation.contacts.facebook,
        icon: FaFacebookSquare
      },
      {
        name: 'Instagram',
        url: navigation.contacts.instagram,
        icon: FaInstagram
      }
    ]

    return (
      <div className='mt-2 flex'>
        {socialPlatforms.map(
          (platform, index) =>
            platform.url && (
              <Link
                key={index}
                href={platform.url}
                target='_blank'
                className='mr-2'
                rel='noopener noreferrer'
              >
                <platform.icon className='text-xl text-white hover:text-gray-300' />
              </Link>
            )
        )}
      </div>
    )
  }

  return (
    <footer className='bg-black py-4 text-center md:flex-row'>
      <div className='container mx-auto flex flex-col p-4 text-left text-white md:flex-row md:justify-between'>
        <div>
          <Image className='w-40' src={whiteLogo} alt='logo' />
          <p>{navigation.contacts.paragraph}</p>
        </div>

        <div className='mt-8 md:mt-0'>
          <span className='font-semibold uppercase'>
            {navigation.company.title}
          </span>
          {renderCategories(navigation.company.categories)}
        </div>
        <div className=''>
          <span className='font-semibold uppercase'>
            {navigation.products.title}
          </span>
          {renderCategories(navigation.products.categories)}
        </div>
        <div className='flex flex-col'>
          <span className='font-semibold uppercase'>
            {navigation.contacts.title}
          </span>
          <p className='flex flex-row items-center py-1'>
            <span className='mr-2'>
              <IoLocationSharp />
            </span>
            {navigation.contacts.address}
          </p>
          <p className='flex flex-row items-center py-1'>
            <span className='mr-2'>
              <FaPhone />
            </span>
            {navigation.contacts.phone}
          </p>
          <p className='flex flex-row items-center py-1'>
            <span className='mr-2'>
              <MdEmail />
            </span>
            {navigation.contacts.email}
          </p>{' '}
          {renderSocialLinks()}
        </div>
      </div>

      <div className='container mx-auto'>
        <p className='text-sm text-white'>
          © {currentYear} SDMetal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
