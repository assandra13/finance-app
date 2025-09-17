import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MobileNav } from "@/components/mobile-nav"
import { FloatingActionButton } from "@/components/floating-action-button"
import { DashboardOverview } from "@/components/dashboard-overview"
import { QuickActions } from "@/components/quick-actions"
import { RecentTransactions } from "@/components/recent-transactions"

export default async function HomePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileNav />

      {/* Main Content */}
      <main className="pb-20 md:pb-6 md:ml-64">
        <div className="p-4 md:p-6 space-y-6">
          {/* Dashboard Overview */}
          <DashboardOverview />

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Transactions */}
          <RecentTransactions />
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}
