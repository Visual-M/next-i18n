// app/[lang]/company/history/page.tsx
// import { getDictionary } from '@/lib/dictionary'
// import CompanyPage from '@/app/[lang]/components/companyPage'
// import { Locale } from '@/i18n.config'
// import { Category } from '@/types/dictionary'

// export default async function HistoryPage({
//   params: { lang }
// }: {
//   params: { lang: Locale }
// }) {
//   const dict = await getDictionary(lang)
//   const history = dict.company.categories.find(
//     (category: Category) => category.url === '/history'
//   )

//   if (!history) {
//     return <p>Not Found</p>
//   }

//   return (
//     <CompanyPage
//       title={history.title}
//       description={history.description}
//       image={history.image}
//     />
//   )
// }

import React from 'react'

const History = () => {
  return (
    <div>History page</div>
  )
}

export default History
