import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <VendorSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
