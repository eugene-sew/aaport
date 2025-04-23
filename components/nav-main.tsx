"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SidebarMenu, SidebarMenuItem, SidebarMenuLink, SidebarMenuTrigger } from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  isActive?: boolean
  items?: NavItem[]
}

interface NavMainProps {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      <Accordion type="multiple" className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={item.title} className="border-b-0">
            <AccordionTrigger
              className={cn(
                "flex w-full items-center justify-between py-2 text-sm transition-all hover:no-underline",
                item.isActive || pathname === item.url ? "font-medium text-red-600" : "text-muted-foreground",
              )}
            >
              <span>{item.title}</span>
              {item.items && item.items.length > 0 && (
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              )}
            </AccordionTrigger>
            {item.items && item.items.length > 0 ? (
              <AccordionContent className="pb-1 pt-0">
                <SidebarMenu className="ml-4">
                  {item.items.map((subItem, subIndex) => (
                    <SidebarMenuItem key={subIndex}>
                      <SidebarMenuLink
                        href={subItem.url}
                        className={cn(
                          "text-sm",
                          subItem.isActive || pathname === subItem.url
                            ? "font-medium text-red-600"
                            : "text-muted-foreground",
                        )}
                      >
                        {subItem.title}
                      </SidebarMenuLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </AccordionContent>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuTrigger asChild>
                  <Link
                    href={item.url}
                    className={cn(
                      "text-sm",
                      item.isActive || pathname === item.url ? "font-medium text-red-600" : "text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </SidebarMenuTrigger>
              </SidebarMenuItem>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </SidebarMenu>
  )
}
