'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation' // Import useSearchParams from next/navigation
import {
  AlterSubcategory,
  Subcategory as SubcategoryType
} from '@/types/dictionary'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/i18n.config'

const Subcategory = () => {
  const searchParams = useSearchParams() // Use useSearchParams to get query parameters
  const lang = searchParams.get('lang') as Locale
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subcategory')

  const [subCategoryData, setSubCategoryData] =
    useState<SubcategoryType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (lang && category && subcategory) {
        const dict = await getDictionary(lang) // Fetch dictionary based on language
        if (dict && dict.products && dict.products.categories) {
          const categoryData = dict.products.categories.find(
            cat => cat.url === `/${category}`
          )
          if (categoryData && categoryData.subcategories) {
            const subCategory = categoryData.subcategories.find(
              sub => sub.url === `/${category}/${subcategory}`
            )
            setSubCategoryData(subCategory || null)
          }
        }
      }
    }
    fetchData()
  }, [lang, category, subcategory])

  if (!subCategoryData) return <div>Loading...</div>

  return (
    <div className='h-auto w-full'>
      {/* 1st section */}
      <div className='my-16 w-full bg-gray-100'>
        <div className='container flex flex-col items-center md:flex-row md:justify-around'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold'>{subCategoryData.title}</h1>
            <p className='text-xl font-medium'>{subCategoryData.description}</p>
          </div>
          <Image
            src={subCategoryData.image || '/placeholder.jpg'}
            className=''
            alt=''
          />
        </div>
      </div>

      {/* 2nd section */}
      <div className='my-16 w-full'>
        <div className='container flex flex-wrap items-center justify-center md:flex-row md:justify-start'>
          {subCategoryData.altersubcategories?.map(
            (alterSubcategory: AlterSubcategory) => (
              <Link
                key={alterSubcategory.id}
                href={alterSubcategory.url}
                className='p-8'
              >
                <Image
                  className='h-36 w-36'
                  src={alterSubcategory.image || '/placeholder.jpg'}
                  alt=''
                />
                <span className='text-lg font-medium'>
                  {alterSubcategory.title}
                </span>
              </Link>
            )
          )}
        </div>
      </div>

      {/* 3rd section */}
      <div className='my-16'>
        <div className='container flex flex-col justify-center'>
          <h1 className='text-center text-4xl font-semibold'>Other Products</h1>
          <div className='my-8 flex flex-wrap items-center justify-between md:flex-row'>
            {subCategoryData?.altersubcategories?.map(
              (sub: AlterSubcategory) => (
                <Link
                  key={sub.id}
                  href={sub.url}
                  className='flex flex-row items-center gap-8 bg-gray-100 p-4'
                >
                  <h3 className='text-lg font-semibold'>{sub.title}</h3>
                  <Image
                    className='h-36 w-36'
                    src={sub.image || '/placeholder.jpg'}
                    alt=''
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subcategory
