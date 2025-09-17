import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MobileNav } from "@/components/mobile-nav"
import { FloatingActionButton } from "@/components/floating-action-button"
import { BudgetOverview } from "@/components/budget-overview"
import { BudgetCategories } from "@/components/budget-categories"
import { BudgetHistory } from "@/components/budget-history"

export default async function BudgetPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Budget Management</h1>
            <p className="text-muted-foreground mt-1">Kelola anggaran bulanan Anda dengan bijak</p>
          </div>

          {/* Budget Overview */}
          <BudgetOverview />

          {/* Budget Categories */}
          <BudgetCategories />

          {/* Budget History */}
          <BudgetHistory />
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
            label: "Tambah Budget",
            onClick: () => console.log("Add budget"),
            color: "bg-primary hover:bg-primary/90",
          },
          {
            icon: ({ className }) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            ),
            label: "Lihat Laporan",
            onClick: () => console.log("View report"),
            color: "bg-secondary hover:bg-secondary/90",
          },
        ]}
      />
    </div>
  )
}
