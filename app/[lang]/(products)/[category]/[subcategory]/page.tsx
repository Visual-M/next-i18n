import Image from 'next/image'
import SteelPipes from '@/public/images/poladborular.png'
import Link from 'next/link'

const Subcategory = () => {
  return (
    <div className='h-auto w-full'>
      <div className='container'>
        <div className='flex flex-col  items-center  md:flex-row md:justify-around'>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold'>Polad Borular</h1>
            <p className='text-xl font-medium'>
              Geniş çeşiddə polad borular və profillər
            </p>
          </div>
          <Image src={SteelPipes} className='' alt='' />
        </div>
        <Link href='' className=''>
          <Image className='h-36 w-36' src={SteelPipes} alt='' />
          <span>Welded steel pipes</span>
        </Link>
      </div>
    </div>
  )
}

export default Subcategory
