import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DynamicSidebar } from "@/components/dynamic-sidebar"

export default function AITryOnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DynamicSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
