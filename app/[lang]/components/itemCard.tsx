import Link from 'next/link'
import Image from 'next/image'

const itemCard = () => {
  return (
    <Link href='' className='p-8'>
      <Image className='h-36 w-36' src="" alt='' />
      <span className='text-lg font-medium'>Welded steel pipes</span>
    </Link>
  )
}

export default itemCard
