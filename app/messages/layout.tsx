import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { CustomerSidebar } from "@/components/customer-sidebar"

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <CustomerSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
