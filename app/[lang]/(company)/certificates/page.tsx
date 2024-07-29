// app/[lang]/company/certificates/page.tsx
import { getDictionary } from '@/lib/dictionary'
// import CompanyPage from '@/app/[lang]/components/companyPage'
import { Locale } from '@/i18n.config'
import { Category } from '@/types/dictionary'

// export default async function CertificatesPage({
//   params: { lang }
// }: {
//   params: { lang: Locale }
// }) {
//   const dict = await getDictionary(lang)
//   const certificates = dict.company.categories.find(
//     (category: Category) => category.url === '/certificates'
//   )

//   if (!certificates) {
//     return <p>Not Found</p>
//   }

//   return (
//     <CompanyPage
//       title={certificates.title}
//       description={certificates.description}
//       image={certificates.image}
//     />
//   )
// }
import React from 'react'

const Certificates = () => {
  return (
    <div>Certificates page</div>
  )
}

export default Certificates
