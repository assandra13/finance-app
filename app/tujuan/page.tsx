import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MobileNav } from "@/components/mobile-nav"
import { FloatingActionButton } from "@/components/floating-action-button"
import { GoalsOverview } from "@/components/goals-overview"
import { GoalsList } from "@/components/goals-list"
import { GoalsStats } from "@/components/goals-stats"

export default async function GoalsPage() {
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
          {/* Page Header */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Tujuan Keuangan</h1>
            <p className="text-muted-foreground mt-1">Wujudkan impian Anda dengan perencanaan yang tepat</p>
          </div>

          {/* Goals Stats */}
          <GoalsStats />

          {/* Goals Overview */}
          <GoalsOverview />

          {/* Goals List */}
          <GoalsList />
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton
        actions={[
          {
            icon: ({ className }) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            ),
            label: "Tambah Tujuan",
            onClick: () => console.log("Add goal"),
            color: "bg-primary hover:bg-primary/90",
          },
          {
            icon: ({ className }) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            ),
            label: "Tambah Kontribusi",
            onClick: () => console.log("Add contribution"),
            color: "bg-success hover:bg-success/90",
          },
        ]}
      />
    </div>
  )
}
