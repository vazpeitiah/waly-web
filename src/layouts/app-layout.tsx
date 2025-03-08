import { Outlet } from 'react-router'

import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar, Breadcrumbs, ThemeSelector } from '@/components'
import { useGetUserProfile } from '@/queries/user'
import { useAuthStore } from '@/stores/auth'
import { useEffect } from 'react'

export default function AppLayout() {
  const { setUser } = useAuthStore()
  const { data: user, isSuccess: isSuccessProfile } = useGetUserProfile()

  useEffect(() => {
    if (isSuccessProfile && user) {
      setUser(user)
    }
  }, [isSuccessProfile, user, setUser])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between pr-4">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <ThemeSelector />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
