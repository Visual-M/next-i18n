import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Button from './components/button'

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const jsonPromise = getDictionary(lang)

  return (
    <section className='py-24'>
      <div className='container'>
        <Heading jsonPromise={jsonPromise} />
        <Button jsonPromise={jsonPromise} />
      </div>
    </section>
  )
}

async function Heading({ jsonPromise }: { jsonPromise: Promise<any> }) {
  const { page } = await jsonPromise

  return (
    <div>
      <h1 className='text-3xl font-bold'>{page.home.title}</h1>
      <p className='text-gray-500'>{page.home.description}</p>
    </div>
  )
}
