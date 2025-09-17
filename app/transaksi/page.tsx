import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MobileNav } from "@/components/mobile-nav"
import { FloatingActionButton } from "@/components/floating-action-button"
import { TransactionList } from "@/components/transaction-list"
import { TransactionFilters } from "@/components/transaction-filters"
import { TransactionStats } from "@/components/transaction-stats"

export default async function TransactionPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-balance">Transaksi</h1>
            <p className="text-muted-foreground mt-1">Kelola semua pemasukan dan pengeluaran Anda</p>
          </div>

          {/* Transaction Stats */}
          <TransactionStats />

          {/* Filters */}
          <TransactionFilters />

          {/* Transaction List */}
          <TransactionList />
        </div>
      </main>

      {/* Floating Action Button for Adding Transactions */}
      <FloatingActionButton
        actions={[
          {
            icon: ({ className }) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            ),
            label: "Tambah Pemasukan",
            onClick: () => console.log("Add income"),
            color: "bg-success hover:bg-success/90",
          },
          {
            icon: ({ className }) => (
              <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            ),
            label: "Tambah Pengeluaran",
            onClick: () => console.log("Add expense"),
            color: "bg-destructive hover:bg-destructive/90",
          },
        ]}
      />
    </div>
  )
}
