"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Plus, CreditCard, Target, BarChart3, Menu, X, DollarSign, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navItems = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/transaksi", label: "Transaksi", icon: CreditCard },
  { href: "/hutang", label: "Hutang", icon: Plus },
  { href: "/tujuan", label: "Tujuan", icon: Target },
  { href: "/budget", label: "Budget", icon: DollarSign },
  { href: "/laporan", label: "Laporan", icon: BarChart3 },
]

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold text-primary">Keuangan Pribadi</h1>
          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="border-t bg-card">
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg transition-colors",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}

              <div className="border-t pt-2 mt-4">
                {user && (
                  <div className="p-3 text-sm text-muted-foreground border-b mb-2">
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
            <h1 className="text-xl font-bold text-sidebar-primary">Keuangan Pribadi</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "text-sidebar-primary bg-sidebar-primary/10"
                      : "text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            {user && (
              <div className="mb-3 p-3 bg-sidebar-accent/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-sidebar-foreground">
                  <LogOut className="h-4 w-4" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
