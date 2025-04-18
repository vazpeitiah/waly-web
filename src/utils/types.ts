export type NavMenuItem = {
  title: string
  url: string
}

export type NavMenuGroup = {
  title: string
  icon: React.ReactNode
  items: NavMenuItem[]
}

export type ConfirmParams = {
  title: React.ReactNode
  description?: React.ReactNode
}

export type BreadcrumbItem = {
  title: string
  url: string
}

export type DateRange = [Date | null, Date | null]
