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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  projects: [
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()

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
            {data.projects.map((item) => (
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
      <SidebarFooter>{<NavUser user={data.user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
