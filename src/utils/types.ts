export type NavMenuItem = {
  title: string
  url: string
}

export type NavMenuGroup = {
  title: string
  icon: React.ReactNode
  items: NavMenuItem[]
}
