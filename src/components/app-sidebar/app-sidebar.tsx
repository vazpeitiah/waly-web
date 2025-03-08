import { ArrowLeftRight, Tags, Wallet, WalletMinimal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/utils/const'
import { NavUser } from '@/components/app-sidebar'
import { useAuthStore } from '@/stores/auth'

const menus = [
  {
    name: 'navbar.transactions',
    url: ROUTES.transactions.root,
    icon: ArrowLeftRight,
  },
  {
    name: 'navbar.categories',
    url: ROUTES.categories.root,
    icon: Tags,
  },
  {
    name: 'navbar.accounts',
    url: ROUTES.accounts.root,
    icon: WalletMinimal,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to={ROUTES.home}>
          <SidebarMenuButton size="lg">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Wallet className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{t('app.title')}</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Menús</SidebarGroupLabel>
          <SidebarMenu>
            {menus.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{t(item.name)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {user && <SidebarFooter>{<NavUser user={user} />}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  )
}
