// /root/types/dictionary.ts

export type AlterSubcategory = {
  id: number
  title: string
  url: string
  image?: string
  description?: string
}

export type Subcategory = {
  id: number
  title: string
  url: string
  image?: string
  description?: string
  altersubcategories?: AlterSubcategory[]
}

export type Category = {
  id: number
  title: string
  url: string
  image?: string
  description?: string
  subcategories?: Subcategory[]
}

export type Navigation = {
  home: {
    id: number
    title: string
    url: string
  }
  company: {
    id: number
    title: string
    image?: string
    description?: string
    categories: Category[]
  }
  products: {
    id: number
    title: string
    image?: string
    description?: string
    categories: Category[]
  }
  news: {
    id: number
    title: string
    url: string
    image?: string
    description?: string
  }
  contacts: {
    id: number
    title: string
    url: string
    image?: string
    description?: string
    address?: string 
    phone?: string 
    email?: string 
    facebook?: string 
    instagram?: string
    location:string
    telephone:string
    mail:string
    paragraph:string
  }
}
