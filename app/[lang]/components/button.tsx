'use client'

import { use } from 'react'

export default function Button({ jsonPromise }: { jsonPromise: Promise<any> }) {
  const json = use(jsonPromise)

  return (
    <>
      <button
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-blue-600'
        onClick={() => console.log('Clicked')}
      >
        {json.cta.label}
      </button>
    </>
  )
}
