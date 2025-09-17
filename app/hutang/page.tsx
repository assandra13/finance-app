import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MobileNav } from "@/components/mobile-nav"
import { FloatingActionButton } from "@/components/floating-action-button"
import { DebtOverview } from "@/components/debt-overview"
import { DebtTabs } from "@/components/debt-tabs"

export default async function DebtPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Hutang & Piutang</h1>
            <p className="text-muted-foreground mt-1">Kelola semua hutang dan piutang Anda</p>
          </div>

          {/* Debt Overview */}
          <DebtOverview />

          {/* Debt Tabs */}
          <DebtTabs />
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
            label: "Tambah Hutang",
            onClick: () => console.log("Add debt"),
            color: "bg-destructive hover:bg-destructive/90",
          },
          {
            icon: ({ className }) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            ),
            label: "Tambah Piutang",
            onClick: () => console.log("Add credit"),
            color: "bg-success hover:bg-success/90",
          },
        ]}
      />
    </div>
  )
}
