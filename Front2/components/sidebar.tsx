"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Settings,
  Users,
  TrendingUp,
  BarChart3,
  Brain,
  DollarSign,
  Bed,
  Users2,
  Home,
  FileSpreadsheet,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Paramètres", href: "/parametres", icon: Settings },
  { name: "Concurrents", href: "/concurrents", icon: Users },
  { name: "Rate Shopper", href: "/rate-shopper", icon: TrendingUp },
  { name: "Data Analytics", href: "/data-analytics", icon: BarChart3 },
  { name: "ML Lab", href: "/ml-lab", icon: Brain },
  {
    name: "Tarification",
    icon: DollarSign,
    children: [
      { name: "Single", href: "/tarification/single", icon: Bed },
      { name: "Double", href: "/tarification/double", icon: Users2 },
      { name: "Family", href: "/tarification/family", icon: Home },
    ],
  },
  {
    name: "Performance",
    icon: BarChart3,
    children: [
      { name: "Single", href: "/performance/single", icon: Bed },
      { name: "Double", href: "/performance/double", icon: Users2 },
      { name: "Family", href: "/performance/family", icon: Home },
    ],
  },
  { name: "Comparatif Produits", href: "/comparatif-produits", icon: BarChart3 },
  { name: "Exports Excel", href: "/exports-excel", icon: FileSpreadsheet },
  { name: "Profile", href: "/profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Tarification"])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const isActive = (href: string) => pathname === href
  const isParentActive = (children: any[]) => children.some((child) => pathname === child.href)

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-slate-700 px-6">
        <div className="flex items-center space-x-2">
          <Image 
            src="/ey-white-logo.png" 
            alt="EY Logo" 
            width={40}   // tu peux ajuster la taille
            height={40} 
            priority 
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          if (item.children) {
            const isExpanded = expandedItems.includes(item.name)
            const hasActiveChild = isParentActive(item.children)

            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    hasActiveChild ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>

                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive(child.href)
                            ? "bg-slate-700 text-white"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white",
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        <span>{child.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href) ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
